"use client"

import { useEffect, useRef, useState } from "react"
import { CustomButton } from "@/components/ui/custom-button"
import { GlassCard } from "@/components/ui/glass-card"
import Link from "next/link"
import {
  Coins,
  TrendingUp,
  Wallet,
  CreditCard,
  BarChart3,
  MessageSquare,
  Brain,
  Shield,
  Layers,
  Target,
  Users,
  Globe,
  Smartphone,
} from "lucide-react"
import { BuyStep } from "@/components/BuyStep"
import { AnimatedSection } from "@/components/AnimatedSection"
import { motion, useScroll, useTransform } from "framer-motion"
import { SwapInterface } from "@/components/SwapInterface"
import LiveTokenChart from "@/components/LiveTokenChart"
import LandingLayout from "./landing-layout"
import FeatureCard from "@/components/FeatureCard"

export default function Home() {
  const [activeStep, setActiveStep] = useState(0)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2

      stepsRef.current.forEach((step, index) => {
        if (step && step.offsetTop <= scrollPosition) {
          setActiveStep(index)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <LandingLayout>
      <div className="relative">
        {/* Crypto-themed Banner */}
        <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 2xl:h-80 overflow-hidden z-50">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 opacity-90"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-pulse">₿ CryptoMeto ₿</h1>
              <p className="text-lg md:text-xl">The Future of Digital Finance</p>
            </div>
          </div>
        </div>

        {/* Animated Background */}
        <div className="fixed top-0 left-0 w-full h-full z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 opacity-95"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 animate-pulse"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)] animate-ping"></div>
          </div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 text-white">
          <main className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <motion.section style={{ opacity }} className="text-center mb-12 pt-4 sm:pt-6 md:pt-8 lg:pt-10">
              <h1
                className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text fade-in"
                style={{
                  background: "linear-gradient(45deg, #00D4FF, #5A67D8, #9F7AEA, #F093FB)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 30px rgba(0, 212, 255, 0.5)",
                }}
              >
                CryptoMeto
              </h1>
              <p className="text-2xl md:text-3xl mb-4 fade-in delay-200 font-semibold">
                Advanced Crypto Trading & DeFi Platform
              </p>
              <p className="text-lg md:text-xl mb-8 fade-in delay-300 text-gray-300 max-w-4xl mx-auto">
                Trade, stake, analyze, and earn with the most comprehensive cryptocurrency platform. AI-powered
                insights, real-time analytics, and cutting-edge DeFi features.
              </p>
              <motion.div
                className="flex flex-col items-center sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <Link href="/dashboard" className="w-full sm:w-auto">
                  <CustomButton variant="gold" size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
                    🚀 Launch Platform
                  </CustomButton>
                </Link>
                <Link href="/market-analysis" className="w-full sm:w-auto">
                  <CustomButton variant="secondary" size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Live Analytics
                  </CustomButton>
                </Link>
                <Link href="/portfolio" className="w-full sm:w-auto">
                  <CustomButton variant="secondary" size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
                    <Wallet className="mr-2 h-5 w-5" />
                    Portfolio
                  </CustomButton>
                </Link>
              </motion.div>
            </motion.section>

            {/* Advanced Features Grid */}
            <AnimatedSection>
              <section className="mb-20">
                <h2
                  className="text-4xl md:text-5xl font-bold mb-12 text-center"
                  style={{ textShadow: "0 0 20px rgba(0, 212, 255, 0.5)" }}
                >
                  Advanced Crypto Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  <FeatureCard
                    icon={<BarChart3 className="h-12 w-12 text-blue-400" />}
                    title="AI Analytics"
                    description="Machine learning powered market analysis with sentiment tracking and price predictions."
                    delay={0.1}
                  />
                  <FeatureCard
                    icon={<Coins className="h-12 w-12 text-green-400" />}
                    title="Multi-Chain DeFi"
                    description="Access DeFi protocols across Ethereum, Solana, BSC, and Polygon networks."
                    delay={0.2}
                  />
                  <FeatureCard
                    icon={<TrendingUp className="h-12 w-12 text-purple-400" />}
                    title="Advanced Trading"
                    description="Spot, futures, options trading with automated strategies and copy trading."
                    delay={0.3}
                  />
                  <FeatureCard
                    icon={<Shield className="h-12 w-12 text-cyan-400" />}
                    title="Portfolio Insurance"
                    description="Protect your investments with smart contract insurance and risk management."
                    delay={0.4}
                  />
                  <FeatureCard
                    icon={<Layers className="h-12 w-12 text-yellow-400" />}
                    title="Yield Farming"
                    description="Maximize returns through liquidity mining and automated yield optimization."
                    delay={0.5}
                  />
                  <FeatureCard
                    icon={<Target className="h-12 w-12 text-red-400" />}
                    title="Arbitrage Bot"
                    description="Automated arbitrage opportunities across multiple exchanges and DEXs."
                    delay={0.6}
                  />
                  <FeatureCard
                    icon={<Users className="h-12 w-12 text-indigo-400" />}
                    title="Social Trading"
                    description="Follow top traders, copy strategies, and share insights with the community."
                    delay={0.7}
                  />
                  <FeatureCard
                    icon={<Globe className="h-12 w-12 text-pink-400" />}
                    title="Cross-Chain Bridge"
                    description="Seamlessly move assets between different blockchain networks."
                    delay={0.8}
                  />
                </div>
              </section>
            </AnimatedSection>

            {/* Live Market Dashboard Preview */}
            <AnimatedSection>
              <section className="mb-20">
                <h2
                  className="text-4xl md:text-5xl font-bold mb-12 text-center"
                  style={{ textShadow: "0 0 20px rgba(147, 51, 234, 0.5)" }}
                >
                  Real-Time Crypto Intelligence
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                  <GlassCard className="p-8 text-center bg-gradient-to-br from-blue-900/50 to-purple-900/50">
                    <BarChart3 className="h-16 w-16 text-blue-400 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold mb-4">Live Market Data</h3>
                    <p className="text-gray-300 text-lg">
                      Real-time prices, volume analysis, and technical indicators for 1000+ cryptocurrencies.
                    </p>
                    <div className="mt-6 text-3xl font-bold text-blue-400">$2.1T</div>
                    <div className="text-sm text-gray-400">Total Market Cap</div>
                  </GlassCard>
                  <GlassCard className="p-8 text-center bg-gradient-to-br from-purple-900/50 to-pink-900/50">
                    <Brain className="h-16 w-16 text-purple-400 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold mb-4">AI Predictions</h3>
                    <p className="text-gray-300 text-lg">
                      Advanced machine learning models analyze market trends and predict price movements.
                    </p>
                    <div className="mt-6 text-3xl font-bold text-purple-400">87%</div>
                    <div className="text-sm text-gray-400">Prediction Accuracy</div>
                  </GlassCard>
                  <GlassCard className="p-8 text-center bg-gradient-to-br from-green-900/50 to-cyan-900/50">
                    <MessageSquare className="h-16 w-16 text-green-400 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold mb-4">Sentiment Analysis</h3>
                    <p className="text-gray-300 text-lg">
                      Track social media sentiment, news analysis, and market psychology indicators.
                    </p>
                    <div className="mt-6 text-3xl font-bold text-green-400">Bullish</div>
                    <div className="text-sm text-gray-400">Current Market Sentiment</div>
                  </GlassCard>
                </div>
                <div className="text-center">
                  <Link href="/market-analysis">
                    <CustomButton variant="gold" size="lg" className="text-xl px-12 py-6">
                      <BarChart3 className="mr-3 h-6 w-6" />
                      Access Full Analytics Suite
                    </CustomButton>
                  </Link>
                </div>
              </section>
            </AnimatedSection>

            {/* DeFi & Trading Features */}
            <AnimatedSection>
              <section className="mb-20">
                <h2
                  className="text-4xl md:text-5xl font-bold mb-12 text-center"
                  style={{ textShadow: "0 0 20px rgba(34, 197, 94, 0.5)" }}
                >
                  DeFi & Advanced Trading
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <GlassCard className="p-8 bg-gradient-to-br from-green-900/30 to-blue-900/30">
                      <h3 className="text-2xl font-bold mb-4 text-green-400">🌾 Yield Farming</h3>
                      <p className="text-gray-300 mb-4">
                        Earn up to 150% APY through automated yield farming strategies across multiple protocols.
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-green-400">$2.5M</div>
                          <div className="text-sm text-gray-400">Total Value Locked</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-400">45%</div>
                          <div className="text-sm text-gray-400">Average APY</div>
                        </div>
                      </div>
                    </GlassCard>

                    <GlassCard className="p-8 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
                      <h3 className="text-2xl font-bold mb-4 text-purple-400">🤖 Trading Bots</h3>
                      <p className="text-gray-300 mb-4">
                        Automated trading strategies with grid trading, DCA, and arbitrage opportunities.
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-purple-400">24/7</div>
                          <div className="text-sm text-gray-400">Active Trading</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-400">15+</div>
                          <div className="text-sm text-gray-400">Bot Strategies</div>
                        </div>
                      </div>
                    </GlassCard>
                  </div>

                  <div className="space-y-8">
                    <GlassCard className="p-8 bg-gradient-to-br from-blue-900/30 to-cyan-900/30">
                      <h3 className="text-2xl font-bold mb-4 text-blue-400">🔗 Cross-Chain</h3>
                      <p className="text-gray-300 mb-4">
                        Bridge assets across 15+ blockchains with minimal fees and maximum security.
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-blue-400">15+</div>
                          <div className="text-sm text-gray-400">Supported Chains</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-400">0.1%</div>
                          <div className="text-sm text-gray-400">Bridge Fee</div>
                        </div>
                      </div>
                    </GlassCard>

                    <GlassCard className="p-8 bg-gradient-to-br from-yellow-900/30 to-orange-900/30">
                      <h3 className="text-2xl font-bold mb-4 text-yellow-400">💎 NFT Trading</h3>
                      <p className="text-gray-300 mb-4">
                        Trade NFTs across multiple marketplaces with advanced analytics and rarity tools.
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-yellow-400">500K+</div>
                          <div className="text-sm text-gray-400">NFTs Listed</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-yellow-400">$50M</div>
                          <div className="text-sm text-gray-400">Volume Traded</div>
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                </div>
              </section>
            </AnimatedSection>

            {/* Live Token Chart Section */}
            <AnimatedSection>
              <section className="mb-20">
                <h2
                  className="text-4xl md:text-5xl font-bold mb-12 text-center"
                  style={{ textShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
                >
                  Live Market Dashboard
                </h2>
                <GlassCard className="p-6 bg-gradient-to-br from-gray-900/50 to-blue-900/30">
                  <LiveTokenChart />
                </GlassCard>
              </section>
            </AnimatedSection>

            {/* Getting Started Section */}
            <section className="pt-16 mb-32">
              <AnimatedSection>
                <h2
                  className="text-4xl md:text-5xl font-bold mb-12 text-center text-transparent bg-clip-text"
                  style={{
                    background: "linear-gradient(45deg, #00D4FF, #5A67D8, #9F7AEA)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 0 30px rgba(0, 212, 255, 0.5)",
                  }}
                >
                  Start Your Crypto Journey
                </h2>
              </AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-16">
                <div className="space-y-12">
                  <AnimatedSection delay={0.2}>
                    <BuyStep
                      ref={(el) => (stepsRef.current[0] = el)}
                      icon={<Wallet className="w-16 h-16" />}
                      title="Connect Your Wallet"
                      description="Connect any Web3 wallet (MetaMask, Phantom, WalletConnect) to access the full platform."
                      isActive={activeStep === 0}
                      index={0}
                    />
                  </AnimatedSection>
                  <AnimatedSection delay={0.4}>
                    <BuyStep
                      ref={(el) => (stepsRef.current[1] = el)}
                      icon={<CreditCard className="w-16 h-16" />}
                      title="Fund Your Account"
                      description="Buy crypto with fiat, transfer from exchanges, or bridge from other chains."
                      isActive={activeStep === 1}
                      index={1}
                    />
                  </AnimatedSection>
                  <AnimatedSection delay={0.6}>
                    <BuyStep
                      ref={(el) => (stepsRef.current[2] = el)}
                      icon={<TrendingUp className="w-16 h-16" />}
                      title="Start Trading & Earning"
                      description="Access advanced trading, DeFi yields, and AI-powered investment strategies."
                      isActive={activeStep === 2}
                      index={2}
                    />
                  </AnimatedSection>
                </div>
                <AnimatedSection delay={0.8} className="pt-8 md:pt-0">
                  <SwapInterface className="w-full max-w-md mx-auto" />
                </AnimatedSection>
              </div>
            </section>

            {/* Mobile App Section */}
            <AnimatedSection>
              <section className="mb-20">
                <div className="text-center">
                  <h2
                    className="text-4xl md:text-5xl font-bold mb-8"
                    style={{ textShadow: "0 0 20px rgba(168, 85, 247, 0.5)" }}
                  >
                    Coming Soon: Mobile App
                  </h2>
                  <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                    Take CryptoMeto with you everywhere. Advanced trading, portfolio management, and DeFi features in a
                    beautiful mobile experience.
                  </p>
                  <div className="flex justify-center space-x-6">
                    <CustomButton variant="secondary" size="lg" className="text-lg px-8 py-4">
                      <Smartphone className="mr-2 h-5 w-5" />
                      iOS App Store
                    </CustomButton>
                    <CustomButton variant="secondary" size="lg" className="text-lg px-8 py-4">
                      <Smartphone className="mr-2 h-5 w-5" />
                      Google Play
                    </CustomButton>
                  </div>
                </div>
              </section>
            </AnimatedSection>
          </main>
        </div>
      </div>
    </LandingLayout>
  )
}
