import type React from "react"
import Link from "next/link"
import { Coins, BarChart3, Wallet, TrendingUp, Layers, Users } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"
import { useChat } from "@/components/DappLayout"
import { useWallet } from "@/contexts/WalletContext"
import { WalletConnection } from "./WalletConnection"
import { Badge } from "@/components/ui/badge"

export const Header: React.FC = () => {
  const { isChatOpen } = useChat()
  const { walletAddress } = useWallet()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900/95 via-blue-900/95 to-purple-900/95 backdrop-filter backdrop-blur-md h-[70px] border-b border-blue-500/30 transition-colors duration-200">
      <div
        className={`container mx-auto px-4 h-full flex items-center justify-between transition-all duration-300 ${isChatOpen ? "md:pr-[450px]" : ""}`}
      >
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-3">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ₿ CryptoMeto
            </div>
            <Badge variant="secondary" className="text-xs">
              BETA
            </Badge>
          </Link>
          <nav className="hidden lg:flex items-center space-x-6">
            <Link
              href="/market-analysis"
              className="flex items-center space-x-2 text-sm hover:text-blue-400 transition-colors"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </Link>
            <Link
              href="/portfolio"
              className="flex items-center space-x-2 text-sm hover:text-purple-400 transition-colors"
            >
              <Wallet className="h-4 w-4" />
              <span>Portfolio</span>
            </Link>
            <Link href="/defi" className="flex items-center space-x-2 text-sm hover:text-green-400 transition-colors">
              <Layers className="h-4 w-4" />
              <span>DeFi</span>
            </Link>
            <Link
              href="/trading"
              className="flex items-center space-x-2 text-sm hover:text-yellow-400 transition-colors"
            >
              <TrendingUp className="h-4 w-4" />
              <span>Trading</span>
            </Link>
            <Link href="/social" className="flex items-center space-x-2 text-sm hover:text-pink-400 transition-colors">
              <Users className="h-4 w-4" />
              <span>Social</span>
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-400">Live</span>
            </div>
            <div className="flex items-center">
              <Coins className="h-4 w-4 mr-1 text-blue-400" />
              <span className="text-sm">BTC: $45,234</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-400">Portfolio: </span>
              <span className="text-green-400 font-semibold">$12,450</span>
            </div>
          </div>
          <ThemeToggle />
          <WalletConnection />
        </div>
      </div>
    </header>
  )
}
