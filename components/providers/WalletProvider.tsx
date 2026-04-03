"use client";

import {
  ConnectionProvider,
  WalletProvider
} from "@solana/wallet-adapter-react";

import {
  WalletModalProvider
} from "@solana/wallet-adapter-react-ui";

import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom"; // ✅ HERE

import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";

export default function SolanaProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const endpoint = clusterApiUrl("devnet");

  const wallets = useMemo(
    () => [new PhantomWalletAdapter()], // ✅ USED HERE
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}