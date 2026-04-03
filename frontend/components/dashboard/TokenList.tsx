"use client";

import { useTokens } from "@/hooks/useTokens";
import { TOKEN_MAP } from "@/lib/tokens";
import Image from "next/image";

export default function TokenList() {
  const { data, isLoading } = useTokens();

  if (isLoading) {
    return <p className="text-zinc-400 mt-6">Loading tokens...</p>;
  }

  return (
    <div className="w-full max-w-2xl mt-6">
      <h2 className="text-xl font-semibold mb-4">Token Balances</h2>

      <div className="space-y-3">
        {data?.length === 0 && (
          <p className="text-zinc-500 text-sm">
            No SPL tokens found in this wallet
          </p>
        )}

        {data?.map((token, i) => {
          const meta = TOKEN_MAP[token.mint];

          return (
            <div
              key={i}
              className="flex items-center justify-between bg-zinc-900 border border-zinc-800 p-4 rounded-xl"
            >
              {/* LEFT */}
              <div className="flex items-center gap-3">
                {meta?.logo && (
                  <Image
                    src={meta.logo}
                    alt={meta.symbol || "token"}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                )}

                <div>
                  <p className="text-sm font-semibold">
                    {meta?.symbol || "Unknown"}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {meta?.name || token.mint.slice(0, 6)}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <p className="text-white font-semibold">
                {token.amount?.toFixed(4)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
