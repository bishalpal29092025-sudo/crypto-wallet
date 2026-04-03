import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

export const connection = new Connection(
  clusterApiUrl("devnet"),
  "confirmed"
);

// ✅ REQUIRED FUNCTION
export async function getBalance(publicKey: PublicKey) {
  const balance = await connection.getBalance(publicKey);
  return balance / 1e9;
}

export async function getTransactions(publicKey: PublicKey) {
  const signatures = await connection.getSignaturesForAddress(publicKey, {
    limit: 10,
  });

  const txs = await Promise.all(
    signatures.map(async (sig) => {
      const tx = await connection.getTransaction(sig.signature, {
        maxSupportedTransactionVersion: 0,
      });

      let amount = 0;

      if (tx?.meta && publicKey) {
        const keys =
          tx.transaction.message.getAccountKeys().staticAccountKeys;

        const index = keys.findIndex(
          (key: PublicKey) => key.toBase58() === publicKey.toBase58()
        );

        if (index !== -1) {
          const pre = tx.meta.preBalances[index];
          const post = tx.meta.postBalances[index];

          amount = (post - pre) / 1e9;
        }
      }

      return {
        signature: sig.signature,
        slot: sig.slot,
        time: sig.blockTime,
        amount,
      };
    })
  );

  return txs;
}