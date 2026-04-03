"use client";

import { useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { toast } from "sonner";

export default function SendForm() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    try {
      if (!publicKey) {
        alert("Connect wallet first");
        return;
      }

      // ✅ Validate address
      let toPubkey: PublicKey;
      try {
        toPubkey = new PublicKey(address);
      } catch {
        alert("Invalid address");
        return;
      }

      // ✅ Validate amount
      const lamports = Number(amount) * LAMPORTS_PER_SOL;
      if (lamports <= 0) {
        alert("Invalid amount");
        return;
      }

      setLoading(true);

      // 🧾 Create transaction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey,
          lamports,
        })
      );

      // 🔐 Send transaction
      const signature = await sendTransaction(transaction, connection);

      // ⏳ Confirm transaction
      await connection.confirmTransaction(signature, "confirmed");

      toast.success("Transaction successful 🚀");

      setAddress("");
      setAmount("");
    } catch (err) {
      console.error(err);
      alert("Transaction failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md mt-6">
      <h2 className="text-lg font-semibold mb-4">Send SOL</h2>

      <input
        type="text"
        placeholder="Receiver Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full mb-3 p-2 rounded bg-zinc-800 text-white outline-none"
      />

      <input
        type="number"
        placeholder="Amount (SOL)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full mb-4 p-2 rounded bg-zinc-800 text-white outline-none"
      />

      <button
        onClick={handleSend}
        disabled={loading}
        className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-2 rounded"
      >
        {loading ? "Sending..." : "Send SOL"}
      </button>
    </div>
  );
}