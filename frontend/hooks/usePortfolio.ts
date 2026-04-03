"use client";

import { useBalance } from "./useBalance";
import { useTokens } from "./useTokens";
import { useSolPrice } from "./useSolPrice";
import { useQuery } from "@tanstack/react-query";
import { getTokenPrices } from "@/lib/prices";
import { TOKEN_PRICE_MAP } from "@/lib/tokenPrices";

export function usePortfolio() {
  const { data: sol } = useBalance();
  const { data: tokens } = useTokens();
  const { data: solPrice } = useSolPrice();

  // 🪙 Get token IDs
  const ids =
    tokens
      ?.map((t) => TOKEN_PRICE_MAP[t.mint])
      .filter(Boolean) || [];

  const { data: prices } = useQuery({
    queryKey: ["token-prices", ids],
    queryFn: () => getTokenPrices(ids),
    enabled: ids.length > 0,
  });

  // 💰 SOL value
  const solValue = sol && solPrice ? sol * solPrice : 0;

  // 🪙 Token value
  let tokenValue = 0;

  tokens?.forEach((token) => {
    const id = TOKEN_PRICE_MAP[token.mint];
    const price = prices?.[id]?.usd || 0;

    tokenValue += token.amount * price;
  });

  return {
    total: solValue + tokenValue,
    solValue,
    tokenValue,
  };
}