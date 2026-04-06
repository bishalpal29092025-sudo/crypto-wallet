"use client";

import { useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";

export default function SendForm() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    try {
      if (!publicKey) {
        toast.error("Connect your wallet first");
        return;
      }
      let toPubkey: PublicKey;
      try {
        toPubkey = new PublicKey(address);
      } catch {
        toast.error("Invalid address");
        return;
      }
      const lamports = Number(amount) * LAMPORTS_PER_SOL;
      if (lamports <= 0) {
        toast.error("Invalid amount");
        return;
      }
      setLoading(true);
      const transaction = new Transaction().add(
        SystemProgram.transfer({ fromPubkey: publicKey, toPubkey, lamports })
      );
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "confirmed");
      toast.success("Transaction sent! 🚀", {
        style: { background: "#0a0a0a", border: "1px solid rgba(20,241,149,0.3)", color: "#fff" }
      });
      setAddress("");
      setAmount("");
    } catch (err) {
      console.error(err);
      toast.error("Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-5 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9945ff]/40 to-transparent" />

      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-[#9945ff]/10 border border-[#9945ff]/20 flex items-center justify-center">
          <Send className="w-4 h-4 text-[#9945ff]" />
        </div>
        <h2 className="text-sm font-bold text-white/80 uppercase tracking-widest">Send SOL</h2>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Recipient address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/4 border border-white/6 text-white text-sm placeholder-white/20 outline-none focus:border-[#9945ff]/40 focus:bg-[#9945ff]/5 transition-all duration-200 font-mono"
          />
        </div>

        <div className="relative">
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/4 border border-white/6 text-white text-sm placeholder-white/20 outline-none focus:border-[#9945ff]/40 focus:bg-[#9945ff]/5 transition-all duration-200 pr-14"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/30 font-semibold">SOL</span>
        </div>

        <button
          onClick={handleSend}
          disabled={loading}
          className="w-full py-3 rounded-xl font-bold text-sm relative overflow-hidden group transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ background: "linear-gradient(135deg, #9945ff 0%, #14f195 100%)" }}
        >
          <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          <span className="relative flex items-center justify-center gap-2 text-black">
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
            ) : (
              <><Send className="w-4 h-4" /> Send SOL</>
            )}
          </span>
        </button>
      </div>
    </div>
  );
}