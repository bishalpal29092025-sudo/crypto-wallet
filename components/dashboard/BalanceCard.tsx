"use client";

import { useBalance } from "@/hooks/useBalance";

export default function BalanceCard() {
  const { data, isLoading } = useBalance();

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md mx-auto shadow-lg">
      
      <p className="text-zinc-400 text-sm">Total Balance</p>

      {isLoading ? (
        <p className="text-white text-xl mt-2 animate-pulse">
          Loading...
        </p>
      ) : (
        <p className="text-4xl font-bold text-green-400 mt-2">
          {data?.toFixed(4)} SOL
        </p>
      )}
    </div>
  );
}