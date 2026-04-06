"use client";

import { useTokens } from "@/hooks/useTokens";
import { TOKEN_MAP } from "@/lib/tokens";
import Image from "next/image";
import { Coins } from "lucide-react";

export default function TokenList() {
  const { data, isLoading } = useTokens();

  return (
    <div className="glass-card p-5 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center">
          <Coins className="w-4 h-4 text-white/50" />
        </div>
        <h2 className="text-sm font-bold text-white/80 uppercase tracking-widest">Token Balances</h2>
        {data && data.length > 0 && (
          <span className="ml-auto text-xs bg-white/5 border border-white/8 rounded-full px-2.5 py-0.5 text-white/40">
            {data.length}
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5">
              <div className="w-9 h-9 rounded-full animate-shimmer bg-white/5" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 w-20 rounded animate-shimmer bg-white/5" />
                <div className="h-2.5 w-28 rounded animate-shimmer bg-white/5" />
              </div>
              <div className="h-4 w-16 rounded animate-shimmer bg-white/5" />
            </div>
          ))}
        </div>
      ) : data?.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-12 h-12 rounded-full bg-white/3 border border-white/5 flex items-center justify-center mx-auto mb-3">
            <Coins className="w-5 h-5 text-white/20" />
          </div>
          <p className="text-sm text-white/25">No SPL tokens found</p>
        </div>
      ) : (
        <div className="space-y-2">
          {data?.map((token, i) => {
            const meta = TOKEN_MAP[token.mint];
            return (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl bg-white/3 border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all duration-200 group cursor-default"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center gap-3">
                  {meta?.logo ? (
                    <Image
                      src={meta.logo}
                      alt={meta.symbol || "token"}
                      width={36}
                      height={36}
                      className="rounded-full ring-1 ring-white/10"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-xs text-white/30 font-bold">
                      {(meta?.symbol || "?").slice(0, 2)}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-white group-hover:text-[#14f195] transition-colors duration-200">
                      {meta?.symbol || "Unknown"}
                    </p>
                    <p className="text-xs text-white/30">
                      {meta?.name || token.mint.slice(0, 8) + "..."}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">
                    {token.amount?.toFixed(4)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}