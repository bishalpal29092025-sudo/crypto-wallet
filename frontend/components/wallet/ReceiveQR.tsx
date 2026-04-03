"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { QRCodeSVG } from "qrcode.react";
export default function ReceiveQR() {
  const { publicKey } = useWallet();

  if (!publicKey) return null;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md mt-6 text-center">
      <h2 className="text-lg font-semibold mb-4">Receive SOL</h2>

      <div className="flex justify-center mb-4">
        <QRCodeSVG value={publicKey.toBase58()} size={180} />
      </div>

      <p className="text-xs text-zinc-400 break-all">
        {publicKey.toBase58()}
      </p>
    </div>
  );
}