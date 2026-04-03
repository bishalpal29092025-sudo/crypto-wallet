export async function getSolPrice() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
  );

  const data = await res.json();
  return data.solana.usd;
}

export async function getTokenPrices(ids: string[]) {
  if (ids.length === 0) return {};

  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(",")}&vs_currencies=usd`
  );

  return res.json();
}