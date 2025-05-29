"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Wallet, Layers, TrendingUp, Users, Smartphone } from "lucide-react"
import { useChat } from "@/components/DappLayout"

export function FooterMenu({ className = "" }: { className?: string }) {
  const pathname = usePathname()
  const { isChatOpen } = useChat()

  // Don't render the FooterMenu on the landing page
  if (pathname === "/") return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900/95 via-blue-900/95 to-purple-900/95 backdrop-blur-lg border-t border-blue-500/30 z-50 transition-all duration-300 ${isChatOpen ? "md:pr-[450px]" : ""} ${className}`}
    >
      <div className="flex justify-around items-center h-16 px-2 max-w-6xl mx-auto">
        <Link
          href="/dashboard"
          className={`flex flex-col items-center justify-center flex-1 h-full text-xs transition-colors ${
            pathname === "/dashboard" ? "text-blue-400" : "text-gray-400 hover:text-blue-400"
          }`}
        >
          <BarChart3 className="h-5 w-5 mb-1" />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/portfolio"
          className={`flex flex-col items-center justify-center flex-1 h-full text-xs transition-colors ${
            pathname === "/portfolio" ? "text-purple-400" : "text-gray-400 hover:text-purple-400"
          }`}
        >
          <Wallet className="h-5 w-5 mb-1" />
          <span>Portfolio</span>
        </Link>
        <Link
          href="/defi"
          className={`flex flex-col items-center justify-center flex-1 h-full text-xs transition-colors ${
            pathname === "/defi" ? "text-green-400" : "text-gray-400 hover:text-green-400"
          }`}
        >
          <Layers className="h-5 w-5 mb-1" />
          <span>DeFi</span>
        </Link>
        <Link
          href="/trading"
          className={`flex flex-col items-center justify-center flex-1 h-full text-xs transition-colors ${
            pathname === "/trading" ? "text-yellow-400" : "text-gray-400 hover:text-yellow-400"
          }`}
        >
          <TrendingUp className="h-5 w-5 mb-1" />
          <span>Trading</span>
        </Link>
        <Link
          href="/social"
          className={`flex flex-col items-center justify-center flex-1 h-full text-xs transition-colors ${
            pathname === "/social" ? "text-pink-400" : "text-gray-400 hover:text-pink-400"
          }`}
        >
          <Users className="h-5 w-5 mb-1" />
          <span>Social</span>
        </Link>
        <Link
          href="/mobile"
          className={`flex flex-col items-center justify-center flex-1 h-full text-xs transition-colors ${
            pathname === "/mobile" ? "text-cyan-400" : "text-gray-400 hover:text-cyan-400"
          }`}
        >
          <Smartphone className="h-5 w-5 mb-1" />
          <span>Mobile</span>
        </Link>
      </div>
    </div>
  )
}
