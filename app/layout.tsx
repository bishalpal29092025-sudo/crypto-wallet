import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import QueryProvider from "@/components/providers/QueryProvider";
import SolanaProvider from "@/components/providers/WalletProvider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crypto Wallet",
  description: "Solana Wallet Tracker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(inter.className, "font-sans", geist.variable)}>
      <body className="min-h-screen bg-zinc-950 text-white">
        <QueryProvider>
          <SolanaProvider>{children}</SolanaProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
