"use client";

import { usePortfolio } from "@/hooks/usePortfolio";

export default function PortfolioCard() {
  const { total } = usePortfolio();

  return (
    <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-2xl p-6 w-full shadow-xl">
      
      <p className="text-zinc-400 text-sm">Total Portfolio Value</p>

      <h2 className="text-4xl font-bold text-green-400 mt-2">
        ${total.toFixed(2)}
      </h2>

      <p className="text-xs text-zinc-500 mt-1">
        Includes SOL + tokens
      </p>
    </div>
  );
}