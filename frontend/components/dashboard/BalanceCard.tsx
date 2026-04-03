"use client";

import { useBalance } from "@/hooks/useBalance";
import { useSolPrice } from "@/hooks/useSolPrice";

export default function BalanceCard() {
  const { data, isLoading } = useBalance();
  const { data: price } = useSolPrice();

  // 💰 Calculate USD
  const usdValue = data && price ? data * price : 0;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md mx-auto shadow-lg">
      
      <p className="text-zinc-400 text-sm">Total Balance</p>

      {isLoading ? (
        <p className="text-white text-xl mt-2 animate-pulse">
          Loading...
        </p>
      ) : (
        <>
          {/* SOL */}
          <p className="text-4xl font-bold text-green-400 mt-2">
            {data?.toFixed(4)} SOL
          </p>

          {/* USD 💰 */}
          <p className="text-zinc-400 mt-2 text-sm">
            ≈ ${usdValue.toFixed(2)} USD
          </p>
        </>
      )}
    </div>
  );
}