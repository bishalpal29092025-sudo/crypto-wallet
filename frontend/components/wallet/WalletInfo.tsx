"use client";

import { usePortfolio } from "@/hooks/usePortfolio";
import { TrendingUp, Layers } from "lucide-react";

export default function PortfolioCard() {
  const { total } = usePortfolio();

  // Format large numbers nicely
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(total);

  return (
    <div className="relative overflow-hidden rounded-[20px] p-6 bg-gradient-to-br from-[#14f195]/10 via-[#050508] to-[#9945ff]/10 border border-[#14f195]/15 group hover:border-[#14f195]/30 transition-all duration-500">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#14f195]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Top shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#14f195]/40 to-transparent" />

      {/* Decorative circle top-right */}
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[#14f195]/5 blur-2xl" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#14f195]/10 border border-[#14f195]/20 flex items-center justify-center">
              <Layers className="w-4 h-4 text-[#14f195]" />
            </div>
            <span className="text-xs text-white/40 uppercase tracking-widest font-medium">Portfolio Value</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#14f195] bg-[#14f195]/10 rounded-full px-2.5 py-1 border border-[#14f195]/15">
            <TrendingUp className="w-3 h-3" />
            <span>All Assets</span>
          </div>
        </div>

        <p className="text-4xl font-black text-white tracking-tight animate-number">
          {formatted}
        </p>
        
        <p className="text-xs text-white/30 mt-2">
          Includes SOL balance + all token holdings
        </p>
      </div>
    </div>
  );
}