import WalletConnect from "@/components/wallet/WalletConnect";
import WalletInfo from "@/components/wallet/WalletInfo";
import BalanceCard from "@/components/dashboard/BalanceCard";
import TransactionList from "@/components/dashboard/TransactionList";
import SendForm from "@/components/send/SendForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center gap-6">      
      <h1 className="text-3xl font-bold">
        Crypto Wallet Tracker
      </h1>
      <WalletConnect />
      <WalletInfo />      
      <BalanceCard />
      <SendForm />
      <TransactionList />
    </main>
  );
}