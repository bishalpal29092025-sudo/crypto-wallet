"use client";

import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "@/lib/solana";
import { useWallet } from "@solana/wallet-adapter-react";

export function useTransactions() {
  const { publicKey } = useWallet();

  return useQuery({
    queryKey: ["transactions", publicKey?.toBase58()],
    queryFn: () => getTransactions(publicKey!),
    enabled: !!publicKey,
  });
}