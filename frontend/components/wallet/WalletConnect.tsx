"use client";

import dynamic from "next/dynamic";

const WalletMultiButton = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export default function WalletConnect() {
  return (
    <div className="flex justify-center mt-10">
      <WalletMultiButton />
    </div>
  );
}