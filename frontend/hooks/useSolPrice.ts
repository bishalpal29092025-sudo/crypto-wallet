"use client";

import { useQuery } from "@tanstack/react-query";
import { getSolPrice } from "@/lib/prices";

export function useSolPrice() {
  return useQuery({
    queryKey: ["sol-price"],
    queryFn: getSolPrice,
    refetchInterval: 30000, 
  });
}