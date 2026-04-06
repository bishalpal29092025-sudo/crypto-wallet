"use client";

import dynamic from "next/dynamic";

const WalletMultiButton = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export default function WalletConnect() {
  return (
    <div className="glass-card p-8 text-center relative overflow-hidden">
      {/* Decorative top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#14f195]/50 to-transparent" />
      
      {/* Floating SOL logo */}
      <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-br from-[#14f195]/20 to-[#9945ff]/20 border border-[#14f195]/20 flex items-center justify-center animate-float">
        <span className="text-3xl">◎</span>
      </div>

      <h2 className="text-2xl font-bold text-white mb-1 tracking-tight">
        Your Solana Wallet
      </h2>
      <p className="text-white/40 text-sm mb-6">
        Connect to track balances, tokens & transactions
      </p>

      <div className="flex justify-center">
        <WalletMultiButton />
      </div>

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#14f195]/10 blur-xl rounded-full" />
    </div>
  );
}