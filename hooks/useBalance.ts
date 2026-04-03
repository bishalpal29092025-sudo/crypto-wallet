"use client";

import { useQuery } from "@tanstack/react-query";
import { getBalance } from "@/lib/solana";
import { useWallet } from "@solana/wallet-adapter-react";

export function useBalance() {
  const { publicKey } = useWallet();

  return useQuery({
    queryKey: ["balance", publicKey?.toBase58()],
    queryFn: () => getBalance(publicKey!),
    enabled: !!publicKey,
  });
}