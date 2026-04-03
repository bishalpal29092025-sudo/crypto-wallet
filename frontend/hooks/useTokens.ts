"use client";

import { useQuery } from "@tanstack/react-query";
import { useWallet } from "@solana/wallet-adapter-react";
import { getTokenBalances } from "@/lib/solana";

export function useTokens() {
  const { publicKey } = useWallet();

  return useQuery({
    queryKey: ["tokens", publicKey?.toBase58()],
    queryFn: () => getTokenBalances(publicKey!),
    enabled: !!publicKey,
  });
}