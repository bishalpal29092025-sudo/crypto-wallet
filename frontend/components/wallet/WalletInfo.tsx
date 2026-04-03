"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import { connection } from "@/lib/solana";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function WalletInfo() {
  const { publicKey } = useWallet();

  // ✅ KEEP YOUR ORIGINAL FUNCTIONALITY
  useEffect(() => {
    if (!publicKey) return;

    const fetchBalance = async () => {
      const balance = await connection.getBalance(publicKey);
      console.log("Balance:", balance / 1e9, "SOL");
    };

    fetchBalance();
  }, [publicKey]);

  if (!publicKey) return null;

  const address = publicKey.toBase58();

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    toast.success("Address copied to clipboard 📋");
  };

  return (
    <div className="text-center mt-6">
      <p className="text-sm text-zinc-400">Connected Wallet</p>

      <div className="flex items-center justify-center gap-2 mt-2">
        <p className="text-green-400 font-mono break-all text-sm">{address}</p>

        <button
          onClick={handleCopy}
          aria-label="Copy wallet address"
          title="Copy"
        >
          <Copy className="w-4 h-4 text-zinc-400 hover:text-white" />
        </button>
      </div>
    </div>
  );
}
