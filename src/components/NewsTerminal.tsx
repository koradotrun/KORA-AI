import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const NewsTerminal: React.FC = () => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const news = [
    "KORA AI detected new market opportunity in DeFi sector...",
    "Token launch successful: 500% ROI achieved in 24 hours...",
    "Neural network predicting bullish trend in next 48 hours...",
    "Smart contract audit completed: 100% secure...",
    "New partnership announcement incoming..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(true);
      setCurrentNewsIndex((prev) => (prev + 1) % news.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isTyping) {
      const timeout = setTimeout(() => {
        setIsTyping(false);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [isTyping]);

  return (
    <div className="tech-card rounded-xl p-6 border border-[#FF6B35]/20 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-4">
        <Terminal className="w-5 h-5 text-[#FF6B35]" />
        <span className="font-mono text-sm">SYSTEM UPDATES</span>
      </div>
      <div className="font-mono text-sm space-y-2">
        <div className="flex items-center space-x-2">
          <span className="text-[#FF6B35]" dangerouslySetInnerHTML={{ __html: '&gt;' }} />
          <span className={`${isTyping ? 'animate-pulse' : ''}`}>
            {news[currentNewsIndex]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsTerminal;