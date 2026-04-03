import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

// 🌐 Create connection to Solana Devnet
export const connection = new Connection(
  clusterApiUrl("devnet"),
  "confirmed"
);

// 💰 Get SOL balance
export async function getBalance(publicKey: PublicKey) {
  const balance = await connection.getBalance(publicKey);
  return balance / 1e9; // lamports → SOL
}

// 🔄 Get recent transactions
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

          amount = (post - pre) / 1e9; // lamports → SOL
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

// 🪙 Get SPL Token balances
export async function getTokenBalances(publicKey: PublicKey) {
  const tokens = await connection.getParsedTokenAccountsByOwner(
    publicKey,
    {
      programId: new PublicKey(
        "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
      ),
    }
  );

  return tokens.value
    .map((token) => {
      const info = token.account.data.parsed.info;

      return {
        mint: info.mint,
        amount: info.tokenAmount.uiAmount,
        decimals: info.tokenAmount.decimals,
      };
    })
    .filter((token) => token.amount > 0); // ✅ hide empty tokens
}