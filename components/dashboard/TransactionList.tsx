"use client";

import { useTransactions } from "@/hooks/useTransactions";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

export default function TransactionList() {
  const { data, isLoading } = useTransactions();

  if (isLoading) {
    return <p className="text-zinc-400 mt-6">Loading transactions...</p>;
  }

  return (
    <div className="w-full max-w-2xl mt-6">
      <h2 className="text-xl font-semibold mb-2">Recent Transactions</h2>

      {/* 🔥 Mini analytics */}
      <p className="text-sm text-zinc-500 mb-4">
        Showing last {data?.length} transactions
      </p>

      <div className="space-y-3">
        {data?.map((tx, i) => {
          const isReceived = tx.amount > 0;

          return (
            <a
              key={i}
              href={`https://solscan.io/tx/${tx.signature}?cluster=devnet`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex justify-between items-center bg-zinc-900 border border-zinc-800 p-4 rounded-xl hover:bg-zinc-800 transition cursor-pointer">
                
                {/* LEFT SIDE */}
                <div>
                  <p className="text-xs text-zinc-400">
                    {tx.signature.slice(0, 20)}...
                  </p>

                  <p className="text-xs text-zinc-500 mt-1">
                    {tx.time
                      ? new Date(tx.time * 1000).toLocaleString()
                      : "No timestamp"}
                  </p>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-2">
                  {isReceived ? (
                    <ArrowDownLeft className="text-green-400 w-4 h-4" />
                  ) : (
                    <ArrowUpRight className="text-red-400 w-4 h-4" />
                  )}

                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        isReceived ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {isReceived ? "+" : ""}
                      {tx.amount?.toFixed(4)} SOL
                    </p>

                    <p className="text-xs text-zinc-500">
                      {isReceived ? "Received" : "Sent"}
                    </p>
                  </div>
                </div>

              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}