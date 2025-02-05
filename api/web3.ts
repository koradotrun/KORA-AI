import { 
  PublicKey, 
  Transaction, 
  Keypair,
  Connection,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import bs58 from 'bs58';
import axios from 'axios';
import FormData from 'form-data';

// API endpoints
const PUMP_API = 'https://pumpportal.fun/api';
const PUMP_IPFS_API = 'https://pump.fun/api/ipfs';

// Initialize Solana connection
const connection = new Connection('https://api.mainnet-beta.solana.com', {
  commitment: 'confirmed',
  wsEndpoint: 'wss://api.mainnet-beta.solana.com/',
});

export async function getBalance(publicKey: string): Promise<number> {
  try {
    const balance = await connection.getBalance(new PublicKey(publicKey));
    return balance / LAMPORTS_PER_SOL;
  } catch (error) {
    console.error('Error fetching balance:', error);
    throw error;
  }
}

interface TokenData {
  name: string;
  symbol: string;
  description: string;
  image?: File;
  initialBuyAmount: number;
  twitter?: string;
  website?: string;
  telegram?: string;
  jitoPriority: 'default' | 'high' | 'ultra';
  jitoTip: number;
}

interface TokenCreationStatus {
  message: string;
  error?: string;
}

interface TokenCreationResponse {
  success: boolean;
  signature: string;
  tokenAddress?: string;
  pumpFunUrl?: string;
}

declare global {
  interface Window {
    solana?: {
      connect(): Promise<{ publicKey: PublicKey }>;
      disconnect(): Promise<void>;
      signTransaction(transaction: Transaction): Promise<Transaction>;
      publicKey: PublicKey;
      isPhantom?: boolean;
      on(event: string, callback: () => void): void;
      removeAllListeners(event: string): void;
      connection: Connection;
    };
  }
}

export async function connectWallet(): Promise<PublicKey> {
  if (!window.solana?.isPhantom) {
    throw new Error('Phantom wallet not found! Please install Phantom wallet.');
  }

  try {
    const resp = await window.solana.connect();
    return resp.publicKey;
  } catch (err) {
    console.error('Error connecting to wallet:', err);
    throw new Error('Failed to connect to wallet');
  }
}

async function uploadMetadata(tokenData: TokenData): Promise<any> {
  try {
    const formData = new FormData();
    formData.append('name', tokenData.name.trim());
    formData.append('symbol', tokenData.symbol.trim().toUpperCase());
    formData.append('description', tokenData.description.trim());
    formData.append('showName', 'true');
    
    if (tokenData.image) {
      formData.append('file', tokenData.image);
    }
    
    if (tokenData.twitter?.trim()) {
      formData.append('twitter', tokenData.twitter.trim());
    }
    
    if (tokenData.website?.trim()) {
      formData.append('website', tokenData.website.trim());
    }
    
    if (tokenData.telegram?.trim()) {
      formData.append('telegram', tokenData.telegram.trim());
    }

    const response = await axios.post(PUMP_IPFS_API, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (!response.data.metadata || !response.data.metadataUri) {
      throw new Error('Invalid response format from server');
    }

    return response.data;
  } catch (error) {
    console.error('Error uploading metadata:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to upload metadata: ${error.response?.data?.message || error.message}`);
    }
    throw error;
  }
}

async function waitForPumpFunConfirmation(
  mintAddress: string,
  maxAttempts: number = 30,
  delayMs: number = 2000
): Promise<{ success: boolean; tokenAddress: string }> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const response = await axios.get(`${PUMP_API}/token/${mintAddress}/status`);
      
      if (response.data.status === 'confirmed') {
        return {
          success: true,
          tokenAddress: mintAddress
        };
      }

      if (response.data.status === 'failed') {
        throw new Error(response.data.error || 'Token creation failed');
      }

      await new Promise(resolve => setTimeout(resolve, delayMs));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
        continue;
      }
      console.error('Error checking token status:', error);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }

  throw new Error('Timeout waiting for token confirmation');
}

export async function createToken(
  tokenData: TokenData,
  onStatusUpdate: (status: TokenCreationStatus) => void
): Promise<TokenCreationResponse> {
  if (!window.solana?.publicKey) {
    throw new Error('Wallet not connected');
  }

  try {
    // Upload metadata to IPFS
    onStatusUpdate({ message: 'Uploading token metadata...' });
    const metadataResponse = await uploadMetadata(tokenData);

    // Generate mint keypair
    const mintKeypair = Keypair.generate();

    // Create token transaction
    onStatusUpdate({ message: 'Creating token transaction...' });
    const response = await axios.post(`${PUMP_API}/trade-local`, {
      publicKey: window.solana.publicKey.toString(),
      action: 'create',
      tokenMetadata: {
        name: metadataResponse.metadata.name,
        symbol: metadataResponse.metadata.symbol,
        uri: metadataResponse.metadataUri
      },
      mint: mintKeypair.publicKey.toString(),
      denominatedInSol: 'true',
      amount: tokenData.initialBuyAmount,
      slippage: 10,
      priorityFee: tokenData.jitoTip,
      pool: 'pump'
    });

    // Sign transaction
    onStatusUpdate({ message: 'Please approve the transaction in your wallet...' });
    const transaction = Transaction.from(Buffer.from(response.data.transaction, 'base64'));
    
    // Sign with mint keypair first
    transaction.sign(mintKeypair);
    
    // Then sign with wallet
    const signedTx = await window.solana.signTransaction(transaction);

    // Send transaction
    onStatusUpdate({ message: 'Sending transaction...' });
    const encodedTx = bs58.encode(signedTx.serialize());
    const sendResponse = await axios.post(`${PUMP_API}/send`, {
      transaction: encodedTx
    });

    if (!sendResponse.data.signature) {
      throw new Error('Failed to get transaction signature');
    }

    // Wait for confirmation from pump.fun
    onStatusUpdate({ message: 'Waiting for confirmation from pump.fun...' });
    const confirmation = await waitForPumpFunConfirmation(mintKeypair.publicKey.toString());

    if (!confirmation.success) {
      throw new Error('Failed to get confirmation from pump.fun');
    }

    onStatusUpdate({ message: 'Token created successfully!' });

    return {
      success: true,
      signature: sendResponse.data.signature,
      tokenAddress: confirmation.tokenAddress,
      pumpFunUrl: `https://pump.fun/token/${confirmation.tokenAddress}`
    };

  } catch (error) {
    console.error('Error creating token:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to create token: ${error.response?.data?.message || error.message}`);
    }
    throw error;
  }
}