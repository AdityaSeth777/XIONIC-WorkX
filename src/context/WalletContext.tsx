import React, { createContext, useContext, useState, useEffect } from 'react';
import { connectWallet } from '../lib/web3';
import type { WalletState } from '../lib/types';

const WalletContext = createContext<{
  wallet: WalletState;
  connect: () => Promise<void>;
  disconnect: () => void;
} | null>(null);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    balance: null,
    isConnecting: false,
    error: null,
  });

  const connect = async () => {
    try {
      setWallet(prev => ({ ...prev, isConnecting: true, error: null }));
      const { address, balance } = await connectWallet();
      setWallet({
        address,
        balance,
        isConnecting: false,
        error: null,
      });
    } catch (error) {
      setWallet(prev => ({
        ...prev,
        isConnecting: false,
        error: (error as Error).message,
      }));
    }
  };

  const disconnect = () => {
    setWallet({
      address: null,
      balance: null,
      isConnecting: false,
      error: null,
    });
  };

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', () => {
        connect();
      });
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', connect);
        window.ethereum.removeListener('chainChanged', () => {
          window.location.reload();
        });
      }
    };
  }, []);

  return (
    <WalletContext.Provider value={{ wallet, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};