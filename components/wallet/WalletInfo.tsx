"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import { connection } from "@/lib/solana";

export default function WalletInfo() {
  const { publicKey } = useWallet();

  useEffect(() => {
    if (!publicKey) return;

    const fetchBalance = async () => {
      const balance = await connection.getBalance(publicKey);
      console.log("Balance:", balance / 1e9, "SOL");
    };

    fetchBalance();
  }, [publicKey]);

  if (!publicKey) return null;

  return (
    <div className="text-center mt-6">
      <p className="text-sm text-zinc-400">Connected Wallet</p>
      <p className="text-green-400 font-mono break-all">
        {publicKey.toBase58()}
      </p>
    </div>
  );
}