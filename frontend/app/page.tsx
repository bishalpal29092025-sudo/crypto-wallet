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
    <main className="min-h-screen bg-[#050508] text-white relative overflow-x-hidden">
      
      {/* Ambient background orbs */}
      <div className="fixed top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full bg-[#14f195] opacity-[0.04] blur-[120px] pointer-events-none z-0" />
      <div className="fixed top-[30%] right-[-200px] w-[500px] h-[500px] rounded-full bg-[#9945ff] opacity-[0.05] blur-[100px] pointer-events-none z-0" />
      <div className="fixed bottom-[-100px] left-[30%] w-[400px] h-[400px] rounded-full bg-[#00c4ff] opacity-[0.04] blur-[100px] pointer-events-none z-0" />

      {/* Grid background */}
      <div className="fixed inset-0 bg-grid opacity-100 pointer-events-none z-0" />

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#14f195] to-[#9945ff] flex items-center justify-center animate-pulse-glow">
              <span className="text-black font-black text-xs">◎</span>
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-tight">SolVault</h1>
              <p className="text-[10px] text-white/30 tracking-widest uppercase">Solana Tracker</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-white/30 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-[#14f195] animate-pulse inline-block" />
            Mainnet
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8 flex flex-col gap-6">
        
        {/* Hero / Connect */}
        <div className="animate-slide-up-1">
          <WalletConnect />
        </div>

        {/* Wallet address info */}
        <div className="animate-slide-up-2">
          <WalletInfo />
        </div>

        {/* Portfolio + Balance side by side on large, stacked on small */}
        <div className="grid grid-cols-1 gap-4 animate-slide-up-3">
          <PortfolioCard />
          <BalanceCard />
        </div>

        {/* Send + Receive side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slide-up-4">
          <SendForm />
          <ReceiveQR />
        </div>

        {/* Tokens */}
        <div className="animate-slide-up-5">
          <TokenList />
        </div>

        {/* Transactions */}
        <div className="animate-slide-up-6">
          <TransactionList />
        </div>

      </div>
    </main>
  );
}