"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { Copy, CheckCheck, QrCode } from "lucide-react";
import { toast } from "sonner";

export default function ReceiveQR() {
  const { publicKey } = useWallet();
  const [copied, setCopied] = useState(false);

  if (!publicKey) return null;

  const address = publicKey.toBase58();

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    toast.success("Address copied!", {
      style: { background: "#0a0a0a", border: "1px solid rgba(20,241,149,0.3)", color: "#fff" }
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card p-5 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00c4ff]/40 to-transparent" />

      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-[#00c4ff]/10 border border-[#00c4ff]/20 flex items-center justify-center">
          <QrCode className="w-4 h-4 text-[#00c4ff]" />
        </div>
        <h2 className="text-sm font-bold text-white/80 uppercase tracking-widest">Receive SOL</h2>
      </div>

      {/* QR Code with scan animation */}
      <div className="flex justify-center mb-4">
        <div className="relative p-3 rounded-2xl bg-white">
          <QRCodeSVG value={address} size={140} />
          <div className="scan-line" />
        </div>
      </div>

      {/* Address + copy */}
      <div className="flex items-center gap-2 bg-white/4 rounded-xl p-3 border border-white/6">
        <p className="text-[10px] text-white/35 font-mono flex-1 truncate">{address}</p>
        <button
          onClick={handleCopy}
          className="flex-shrink-0 w-7 h-7 rounded-lg bg-white/5 hover:bg-[#00c4ff]/10 border border-white/5 hover:border-[#00c4ff]/20 flex items-center justify-center transition-all duration-200"
        >
          {copied ? (
            <CheckCheck className="w-3.5 h-3.5 text-[#14f195]" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-white/40" />
          )}
        </button>
      </div>
    </div>
  );
}