"use client";

import { useTransactions } from "@/hooks/useTransactions";
import { ArrowUpRight, ArrowDownLeft, ExternalLink, Activity } from "lucide-react";

export default function TransactionList() {
  const { data, isLoading } = useTransactions();

  return (
    <div className="glass-card p-5 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center">
          <Activity className="w-4 h-4 text-white/50" />
        </div>
        <h2 className="text-sm font-bold text-white/80 uppercase tracking-widest">Recent Transactions</h2>
        {data && (
          <span className="ml-auto text-xs bg-white/5 border border-white/8 rounded-full px-2.5 py-0.5 text-white/40">
            {data.length}
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/3 border border-white/5">
              <div className="w-9 h-9 rounded-full animate-shimmer bg-white/5 flex-shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 w-32 rounded animate-shimmer bg-white/5" />
                <div className="h-2.5 w-24 rounded animate-shimmer bg-white/5" />
              </div>
              <div className="h-4 w-20 rounded animate-shimmer bg-white/5" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {data?.map((tx, i) => {
            const isReceived = tx.amount > 0;
            return (
              <a
                key={i}
                href={`https://solscan.io/tx/${tx.signature}?cluster=devnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-white/3 border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all duration-200 group cursor-pointer"
              >
                {/* Icon */}
                <div className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center border ${
                  isReceived 
                    ? "bg-[#14f195]/8 border-[#14f195]/20" 
                    : "bg-red-500/8 border-red-500/20"
                }`}>
                  {isReceived ? (
                    <ArrowDownLeft className="w-4 h-4 text-[#14f195]" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4 text-red-400" />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-mono text-white/40 truncate">
                      {tx.signature.slice(0, 16)}...
                    </p>
                    <ExternalLink className="w-3 h-3 text-white/15 group-hover:text-white/40 transition-colors flex-shrink-0" />
                  </div>
                  <p className="text-[10px] text-white/25 mt-0.5">
                    {tx.time ? new Date(tx.time * 1000).toLocaleString() : "No timestamp"}
                  </p>
                </div>

                {/* Amount */}
                <div className="text-right flex-shrink-0">
                  <p className={`text-sm font-bold ${isReceived ? "text-[#14f195]" : "text-red-400"}`}>
                    {isReceived ? "+" : ""}{tx.amount?.toFixed(4)}
                  </p>
                  <p className="text-[10px] text-white/25">SOL</p>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}