"use client";

import { useBalance } from "@/hooks/useBalance";
import { useSolPrice } from "@/hooks/useSolPrice";
import { DollarSign } from "lucide-react";

export default function BalanceCard() {
  const { data, isLoading } = useBalance();
  const { data: price } = useSolPrice();

  const usdValue = data && price ? data * price : 0;

  return (
    <div className="glass-card p-6 relative overflow-hidden group hover:border-white/10 transition-all duration-500">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      {/* Subtle corner glow */}
      <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-[#9945ff]/10 blur-2xl group-hover:bg-[#9945ff]/20 transition-all duration-500" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center">
            <span className="text-[#9945ff] text-sm font-black">◎</span>
          </div>
          <span className="text-xs text-white/40 uppercase tracking-widest font-medium">SOL Balance</span>
        </div>

        {isLoading ? (
          <div className="space-y-2">
            <div className="h-10 w-40 rounded-lg animate-shimmer bg-white/5" />
            <div className="h-4 w-24 rounded animate-shimmer bg-white/5" />
          </div>
        ) : (
          <>
            <p className="text-4xl font-black text-white tracking-tight animate-number">
              {data?.toFixed(4)}{" "}
              <span className="text-2xl font-semibold text-white/40">SOL</span>
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <DollarSign className="w-3.5 h-3.5 text-white/25" />
              <p className="text-sm text-white/35">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                }).format(usdValue)}
                <span className="text-white/20 ml-1 text-xs">USD</span>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}