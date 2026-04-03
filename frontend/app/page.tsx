import WalletConnect from "@/components/wallet/WalletConnect";
import WalletInfo from "@/components/wallet/WalletInfo";
import BalanceCard from "@/components/dashboard/BalanceCard";
import TransactionList from "@/components/dashboard/TransactionList";
import SendForm from "@/components/send/SendForm";
import ReceiveQR from "@/components/wallet/ReceiveQR";
import TokenList from "@/components/dashboard/TokenList";
import PortfolioCard from "@/components/dashboard/PortfolioCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center py-10">
      
      {/* 🔥 WRAPPER (IMPORTANT) */}
      <div className="w-full max-w-3xl flex flex-col gap-8 px-4">

        <h1 className="text-3xl font-bold text-center">
          Crypto Wallet Tracker
        </h1>

        <WalletConnect />
        <WalletInfo />
        <PortfolioCard/>
        <BalanceCard />

        <SendForm />

        {/* 🪙 TOKENS */}
        <TokenList />

        {/* 📱 RECEIVE */}
        <ReceiveQR />

        {/* 🔄 TRANSACTIONS */}
        <TransactionList />

      </div>
    </main>
  );
}