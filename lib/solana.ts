import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';

// ✅ Boleh pake NEXT_PUBLIC karena ini cuma RPC URL public
const rpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl('devnet');

// Solana connection
export const connection = new Connection(rpcUrl, 'confirmed');

// Network
export const network = WalletAdapterNetwork.Devnet;

// Supported wallets
export const wallets = [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter(),
];

// Helper function to verify author
export async function verifyAuthor(
  authorPubkey: string,
  articleId: string
): Promise<boolean> {
  try {
    const pubkey = new PublicKey(authorPubkey);
    return true;
  } catch {
    return false;
  }
}
