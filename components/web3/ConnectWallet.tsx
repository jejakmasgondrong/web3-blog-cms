'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useEffect, useState } from 'react';

export default function ConnectWallet() {
  const { connected, publicKey, disconnect } = useWallet();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Format address
  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  };

  // Loading state
  if (!mounted) {
    return (
      <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-medium text-sm opacity-50">
        Connect Wallet
      </button>
    );
  }

  // Connected state
  if (connected && publicKey) {
    const address = publicKey.toString();
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-300 hidden sm:inline">
          {formatAddress(address)}
        </span>
        <button
          onClick={() => disconnect()}
          className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  // Disconnected state - custom button
  return (
    <WalletMultiButton className="!bg-gradient-to-r !from-blue-500 !to-purple-500 hover:!opacity-90 !transition-opacity !text-white !font-medium !text-sm !px-4 !py-2 !rounded-lg !border-none !shadow-none !h-auto !min-h-0" />
  );
}
