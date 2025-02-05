import dotenv from 'dotenv';
import { TwitterApi } from 'twitter-api-v2';
import axios from 'axios';
import sentiment from 'node-sentiment';
import winston from 'winston';
import cron from 'node-cron';
import { NLP } from 'node-nlp';
import nodemailer from 'nodemailer';
import WebSocket from 'ws';
import { createClient } from 'redis';
import { RSI, EMA, MACD } from 'technicalindicators';

dotenv.config();

// Initialize NLP
const nlp = new NLP({ language: 'en' });

// Initialize Redis
const redis = createClient();
redis.connect();

// Initialize logger with daily rotate
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ 
      filename: 'analysis.log',
      maxSize: '20m',
      maxFiles: '14d'
    }),
    new winston.transports.Console()
  ]
});

// Initialize email transport
const emailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Initialize Twitter client
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

// Cryptocurrency configuration
const CRYPTO_CONFIG = {
  bitcoin: { symbol: 'BTC', keywords: ['bitcoin', 'btc', '$btc'] },
  ethereum: { symbol: 'ETH', keywords: ['ethereum', 'eth', '$eth'] },
  binancecoin: { symbol: 'BNB', keywords: ['bnb', 'binance'] },
  solana: { symbol: 'SOL', keywords: ['solana', 'sol'] },
  cardano: { symbol: 'ADA', keywords: ['cardano', 'ada'] },
  dogecoin: { symbol: 'DOGE', keywords: ['doge', 'dogecoin'] }
};

// Influencer list
const CRYPTO_INFLUENCERS = [
  'elonmusk',
  'cz_binance',
  'VitalikButerin',
  'SBF_FTX',
  'michael_saylor'
];

const ALERT_THRESHOLDS = {
  priceChange: 5, // 5% price change
  sentimentChange: 0.2, // 0.2 sentiment score change
  volumeSpike: 50, // 50% volume increase
  tweetSpike: 100 // 100% increase in tweet volume
};

// WebSocket connection to Binance
const ws = new WebSocket('wss://stream.binance.com:9443/ws');

async function setupWebSocket() {
  const symbols = Object.values(CRYPTO_CONFIG).map(c => c.symbol.toLowerCase() + 'usdt');
  const subscribeMsg = {
    method: 'SUBSCRIBE',
    params: symbols.map(s => `${s}@trade`),
    id: 1
  };

  ws.on('open', () => {
    ws.send(JSON.stringify(subscribeMsg));
    logger.info('WebSocket connection established');
  });

  ws.on('message', async (data) => {
    const trade = JSON.parse(data);
    await redis.set(`price:${trade.s}`, trade.p);
  });
}

async function analyzeTweets() {
  try {
    const allResults = [];
    
    // Analyze tweets for each cryptocurrency
    for (const [coin, config] of Object.entries(CRYPTO_CONFIG)) {
      const query = config.keywords.join(' OR ');
      const tweets = await twitterClient.v2.search({
        query,
        'tweet.fields': ['created_at', 'public_metrics', 'author_id'],
        'user.fields': ['username', 'public_metrics'],
        max_results: 100
      });

      // Advanced sentiment analysis
      const sentimentResults = await Promise.all(tweets.data.map(async tweet => {
        const [sentiment, entities] = await Promise.all([
          nlp.sentiment(tweet.text),
          nlp.extractEntities(tweet.text)
        ]);

        return {
          text: tweet.text,
          sentiment,
          entities,
          metrics: tweet.public_metrics,
          author: tweet.author_id
        };
      }));

      // Store results
      allResults.push({
        coin,
        sentimentResults,
        metrics: calculateMetrics(sentimentResults)
      });

      // Cache results
      await redis.set(`analysis:${coin}`, JSON.stringify(allResults));
    }

    return allResults;
  } catch (error) {
    logger.error('Error analyzing tweets:', error);
    throw error;
  }
}

async function analyzeInfluencers() {
  try {
    const influencerData = await Promise.all(
      CRYPTO_INFLUENCERS.map(async username => {
        const tweets = await twitterClient.v2.userTimeline(username, {
          'tweet.fields': ['created_at', 'public_metrics'],
          max_results: 10
        });

        const sentiments = await Promise.all(
          tweets.data.map(tweet => nlp.sentiment(tweet.text))
        );

        return {
          username,
          tweets: tweets.data,
          sentiments
        };
      })
    );

    return influencerData;
  } catch (error) {
    logger.error('Error analyzing influencers:', error);
    throw error;
  }
}

async function getCryptoMarketData() {
  try {
    const coins = Object.keys(CRYPTO_CONFIG).join(',');
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
      params: {
        ids: coins,
        vs_currencies: 'usd',
        include_24hr_vol: true,
        include_24hr_change: true,
        include_market_cap: true
      }
    });

    // Store historical prices for technical analysis
    for (const [coin, data] of Object.entries(response.data)) {
      const historicalPrices = await redis.lRange(`prices:${coin}`, 0, -1);
      historicalPrices.push(data.usd);
      await redis.lPush(`prices:${coin}`, data.usd);
      await redis.lTrim(`prices:${coin}`, 0, 199); // Keep last 200 prices
    }

    return response.data;
  } catch (error) {
    logger.error('Error fetching market data:', error);
    throw error;
  }
}

async function calculateTechnicalIndicators(coin) {
  try {
    const prices = await redis.lRange(`prices:${coin}`, 0, -1);
    const numericPrices = prices.map(Number);

    const rsi = RSI.calculate({
      values: numericPrices,
      period: 14
    });

    const ema = EMA.calculate({
      values: numericPrices,
      period: 20
    });

    const macd = MACD.calculate({
      values: numericPrices,
      fastPeriod: 12,
      slowPeriod: 26,
      signalPeriod: 9
    });

    return {
      rsi: rsi[rsi.length - 1],
      ema: ema[ema.length - 1],
      macd: macd[macd.length - 1]
    };
  } catch (error) {
    logger.error('Error calculating technical indicators:', error);
    throw error;
  }
}

function calculateMetrics(sentimentResults) {
  const sentiments = sentimentResults.map(r => r.sentiment.score);
  return {
    averageSentiment: sentiments.reduce((a, b) => a + b, 0) / sentiments.length,
    tweetVolume: sentimentResults.length,
    topEntities: extractTopEntities(sentimentResults),
    engagement: calculateEngagement(sentimentResults)
  };
}

function extractTopEntities(results) {
  const entities = results.flatMap(r => r.entities);
  const entityCount = {};
  entities.forEach(e => {
    entityCount[e] = (entityCount[e] || 0) + 1;
  });
  return Object.entries(entityCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);
}

function calculateEngagement(results) {
  return results.reduce((acc, curr) => ({
    likes: acc.likes + (curr.metrics.like_count || 0),
    retweets: acc.retweets + (curr.metrics.retweet_count || 0),
    replies: acc.replies + (curr.metrics.reply_count || 0)
  }), { likes: 0, retweets: 0, replies: 0 });
}

async function checkAlerts(analysis, marketData) {
  const alerts = [];

  for (const [coin, data] of Object.entries(marketData)) {
    const previousPrice = await redis.get(`previous_price:${coin}`);
    const previousSentiment = await redis.get(`previous_sentiment:${coin}`);
    
    if (previousPrice && previousSentiment) {
      const priceChange = ((data.usd - previousPrice) / previousPrice) * 100;
      const sentimentChange = analysis.find(a => a.coin === coin)?.metrics.averageSentiment - previousSentiment;

      if (Math.abs(priceChange) >= ALERT_THRESHOLDS.priceChange) {
        alerts.push({
          type: 'PRICE_ALERT',
          coin,
          change: priceChange
        });
      }

      if (Math.abs(sentimentChange) >= ALERT_THRESHOLDS.sentimentChange) {
        alerts.push({
          type: 'SENTIMENT_ALERT',
          coin,
          change: sentimentChange
        });
      }
    }

    // Update previous values
    await redis.set(`previous_price:${coin}`, data.usd);
    await redis.set(`previous_sentiment:${coin}`, analysis.find(a => a.coin === coin)?.metrics.averageSentiment);
  }

  if (alerts.length > 0) {
    await sendAlerts(alerts);
  }

  return alerts;
}

async function sendAlerts(alerts) {
  const emailContent = alerts.map(alert => `
    ${alert.type}: ${alert.coin}
    Change: ${alert.change.toFixed(2)}${alert.type === 'PRICE_ALERT' ? '%' : ''}
  `).join('\n');

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ALERT_EMAIL,
    subject: 'Crypto Market Alerts',
    text: emailContent
  };

  try {
    await emailTransport.sendMail(mailOptions);
    logger.info('Alerts sent successfully');
  } catch (error) {
    logger.error('Error sending alerts:', error);
  }
}

async function generateAnalysis() {
  try {
    const [tweetAnalysis, marketData, influencerData] = await Promise.all([
      analyzeTweets(),
      getCryptoMarketData(),
      analyzeInfluencers()
    ]);

    // Calculate technical indicators for each coin
    const technicalIndicators = await Promise.all(
      Object.keys(CRYPTO_CONFIG).map(async coin => ({
        coin,
        indicators: await calculateTechnicalIndicators(coin)
      }))
    );

    // Check for alerts
    const alerts = await checkAlerts(tweetAnalysis, marketData);

    // Generate comprehensive insights
    const insights = {
      timestamp: new Date(),
      marketData,
      socialAnalysis: tweetAnalysis,
      technicalAnalysis: technicalIndicators,
      influencerAnalysis: influencerData,
      alerts
    };

    logger.info('Analysis complete', insights);
    return insights;
  } catch (error) {
    logger.error('Error generating analysis:', error);
    throw error;
  }
}

// Setup WebSocket connection
setupWebSocket().catch(error => {
  logger.error('WebSocket setup failed:', error);
});

// Run analysis every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  logger.info('Starting scheduled analysis');
  await generateAnalysis();
});

// Initial analysis
logger.info('Starting Enhanced Crypto Market Analysis Tool');
generateAnalysis().catch(error => {
  logger.error('Initial analysis failed:', error);
});

// Cleanup on exit
process.on('SIGINT', async () => {
  logger.info('Shutting down...');
  await redis.quit();
  ws.close();
  process.exit(0);
});