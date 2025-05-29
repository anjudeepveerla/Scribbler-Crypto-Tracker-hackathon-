"use client"

import { useState, useEffect } from "react"
import { DappLayout } from "@/components/DappLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CustomButton } from "@/components/ui/custom-button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Layers,
  TrendingUp,
  Zap,
  Shield,
  Coins,
  ArrowRightLeft,
  Target,
  Droplets,
  Lock,
  Unlock,
  Plus,
  Minus,
} from "lucide-react"

interface DeFiPool {
  id: string
  name: string
  protocol: string
  apy: number
  tvl: number
  tokens: string[]
  risk: "Low" | "Medium" | "High"
  category: "Lending" | "Liquidity" | "Staking" | "Yield Farming"
}

interface UserPosition {
  poolId: string
  amount: number
  value: number
  earned: number
  apy: number
}

export default function DeFi() {
  const [pools, setPools] = useState<DeFiPool[]>([])
  const [userPositions, setUserPositions] = useState<UserPosition[]>([])
  const [selectedPool, setSelectedPool] = useState<DeFiPool | null>(null)
  const [depositAmount, setDepositAmount] = useState("")
  const [loading, setLoading] = useState(true)

  // Mock DeFi pools data
  const generateMockPools = (): DeFiPool[] => {
    return [
      {
        id: "1",
        name: "USDC-ETH LP",
        protocol: "Uniswap V3",
        apy: 45.2,
        tvl: 125000000,
        tokens: ["USDC", "ETH"],
        risk: "Medium",
        category: "Liquidity",
      },
      {
        id: "2",
        name: "ETH Staking",
        protocol: "Lido",
        apy: 4.8,
        tvl: 8500000000,
        tokens: ["ETH"],
        risk: "Low",
        category: "Staking",
      },
      {
        id: "3",
        name: "USDT Lending",
        protocol: "Aave",
        apy: 8.5,
        tvl: 2100000000,
        tokens: ["USDT"],
        risk: "Low",
        category: "Lending",
      },
      {
        id: "4",
        name: "SOL-USDC Farm",
        protocol: "Raydium",
        apy: 78.9,
        tvl: 45000000,
        tokens: ["SOL", "USDC"],
        risk: "High",
        category: "Yield Farming",
      },
      {
        id: "5",
        name: "BTC-ETH LP",
        protocol: "Curve",
        apy: 25.6,
        tvl: 890000000,
        tokens: ["BTC", "ETH"],
        risk: "Medium",
        category: "Liquidity",
      },
      {
        id: "6",
        name: "MATIC Staking",
        protocol: "Polygon",
        apy: 12.3,
        tvl: 1200000000,
        tokens: ["MATIC"],
        risk: "Low",
        category: "Staking",
      },
    ]
  }

  const generateMockPositions = (): UserPosition[] => {
    return [
      {
        poolId: "1",
        amount: 5000,
        value: 5234,
        earned: 234,
        apy: 45.2,
      },
      {
        poolId: "2",
        amount: 2.5,
        value: 7000,
        earned: 156,
        apy: 4.8,
      },
      {
        poolId: "3",
        amount: 10000,
        value: 10450,
        earned: 450,
        apy: 8.5,
      },
    ]
  }

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setPools(generateMockPools())
      setUserPositions(generateMockPositions())
      setLoading(false)
    }, 1000)
  }, [])

  const formatCurrency = (amount: number) => {
    if (amount >= 1e9) return `$${(amount / 1e9).toFixed(1)}B`
    if (amount >= 1e6) return `$${(amount / 1e6).toFixed(1)}M`
    if (amount >= 1e3) return `$${(amount / 1e3).toFixed(1)}K`
    return `$${amount.toFixed(2)}`
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "text-green-400 bg-green-400/20"
      case "Medium":
        return "text-yellow-400 bg-yellow-400/20"
      case "High":
        return "text-red-400 bg-red-400/20"
      default:
        return "text-gray-400 bg-gray-400/20"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Lending":
        return <Coins className="w-4 h-4" />
      case "Liquidity":
        return <Droplets className="w-4 h-4" />
      case "Staking":
        return <Lock className="w-4 h-4" />
      case "Yield Farming":
        return <Target className="w-4 h-4" />
      default:
        return <Layers className="w-4 h-4" />
    }
  }

  const totalValue = userPositions.reduce((sum, pos) => sum + pos.value, 0)
  const totalEarned = userPositions.reduce((sum, pos) => sum + pos.earned, 0)
  const avgAPY =
    userPositions.length > 0 ? userPositions.reduce((sum, pos) => sum + pos.apy * pos.value, 0) / totalValue : 0

  if (loading) {
    return (
      <DappLayout>
        <div className="container mx-auto px-4 pt-24 pb-32 max-w-7xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-700 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </DappLayout>
    )
  }

  return (
    <DappLayout>
      <main className="container mx-auto px-4 pt-24 pb-32 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">
            DeFi Dashboard
          </h1>
          <p className="text-lg text-gray-400">
            Maximize your yields with advanced DeFi strategies across multiple protocols
          </p>
        </div>

        {/* DeFi Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-900/50 to-cyan-900/50 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Layers className="w-5 h-5 mr-2 text-green-400" />
                Total DeFi Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-white">{formatCurrency(totalValue)}</div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-green-400">+{((totalEarned / totalValue) * 100).toFixed(2)}%</span>
                </div>
                <div className="text-sm text-gray-400">{formatCurrency(totalEarned)} total earned</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Zap className="w-5 h-5 mr-2 text-blue-400" />
                Average APY
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-white">{avgAPY.toFixed(1)}%</div>
                <Progress value={Math.min(avgAPY, 100)} className="h-2" />
                <div className="text-sm text-gray-400">Across {userPositions.length} active positions</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="w-5 h-5 mr-2 text-purple-400" />
                Risk Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-white">7.2/10</div>
                <Progress value={72} className="h-2" />
                <div className="text-sm text-gray-400">Moderate risk portfolio</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pools" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="pools">Available Pools</TabsTrigger>
            <TabsTrigger value="positions">My Positions</TabsTrigger>
            <TabsTrigger value="strategies">Auto Strategies</TabsTrigger>
          </TabsList>

          <TabsContent value="pools">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {pools.map((pool) => (
                <Card
                  key={pool.id}
                  className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700 hover:border-blue-500/50 transition-colors"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white flex items-center">
                        {getCategoryIcon(pool.category)}
                        <span className="ml-2">{pool.name}</span>
                      </CardTitle>
                      <Badge className={getRiskColor(pool.risk)}>{pool.risk}</Badge>
                    </div>
                    <div className="text-sm text-gray-400">{pool.protocol}</div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">APY</span>
                      <span className="text-2xl font-bold text-green-400">{pool.apy.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">TVL</span>
                      <span className="text-white font-semibold">{formatCurrency(pool.tvl)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Tokens</span>
                      <div className="flex space-x-1">
                        {pool.tokens.map((token, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {token}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <CustomButton variant="gold" size="sm" className="flex-1" onClick={() => setSelectedPool(pool)}>
                        <Plus className="w-4 h-4 mr-1" />
                        Deposit
                      </CustomButton>
                      <CustomButton variant="secondary" size="sm" className="flex-1">
                        Details
                      </CustomButton>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="positions">
            <div className="space-y-6">
              {userPositions.map((position) => {
                const pool = pools.find((p) => p.id === position.poolId)
                if (!pool) return null

                return (
                  <Card
                    key={position.poolId}
                    className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white flex items-center">
                          {getCategoryIcon(pool.category)}
                          <span className="ml-2">{pool.name}</span>
                        </CardTitle>
                        <Badge className="text-green-400 bg-green-400/20">Active</Badge>
                      </div>
                      <div className="text-sm text-gray-400">{pool.protocol}</div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-sm text-gray-400">Deposited</div>
                          <div className="text-lg font-semibold text-white">{formatCurrency(position.amount)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Current Value</div>
                          <div className="text-lg font-semibold text-white">{formatCurrency(position.value)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Earned</div>
                          <div className="text-lg font-semibold text-green-400">+{formatCurrency(position.earned)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">APY</div>
                          <div className="text-lg font-semibold text-blue-400">{position.apy.toFixed(1)}%</div>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-6">
                        <CustomButton variant="secondary" size="sm">
                          <Plus className="w-4 h-4 mr-1" />
                          Add More
                        </CustomButton>
                        <CustomButton variant="secondary" size="sm">
                          <Minus className="w-4 h-4 mr-1" />
                          Withdraw
                        </CustomButton>
                        <CustomButton variant="secondary" size="sm">
                          <Unlock className="w-4 h-4 mr-1" />
                          Claim Rewards
                        </CustomButton>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="strategies">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-blue-400" />
                    Auto-Compound Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300">
                    Automatically reinvest your DeFi rewards to maximize compound returns across multiple protocols.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-400">12.5%</div>
                      <div className="text-sm text-gray-400">Boost in APY</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-400">24/7</div>
                      <div className="text-sm text-gray-400">Monitoring</div>
                    </div>
                  </div>
                  <CustomButton variant="gold" className="w-full">
                    Enable Auto-Compound
                  </CustomButton>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-900/50 to-cyan-900/50 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Target className="w-5 h-5 mr-2 text-green-400" />
                    Yield Optimization
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300">
                    AI-powered strategy that automatically moves your funds to the highest yielding opportunities.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-400">45%</div>
                      <div className="text-sm text-gray-400">Avg APY</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-400">0.5%</div>
                      <div className="text-sm text-gray-400">Management Fee</div>
                    </div>
                  </div>
                  <CustomButton variant="gold" className="w-full">
                    Start Optimization
                  </CustomButton>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-purple-400" />
                    Risk Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300">
                    Automated stop-loss and portfolio rebalancing to protect your investments from market volatility.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-purple-400">-5%</div>
                      <div className="text-sm text-gray-400">Max Drawdown</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-400">95%</div>
                      <div className="text-sm text-gray-400">Protection Rate</div>
                    </div>
                  </div>
                  <CustomButton variant="gold" className="w-full">
                    Enable Protection
                  </CustomButton>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border-yellow-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <ArrowRightLeft className="w-5 h-5 mr-2 text-yellow-400" />
                    Cross-Chain Arbitrage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300">
                    Exploit price differences across different blockchains and DEXs for risk-free profits.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-yellow-400">2.3%</div>
                      <div className="text-sm text-gray-400">Daily Returns</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-400">15+</div>
                      <div className="text-sm text-gray-400">Chains</div>
                    </div>
                  </div>
                  <CustomButton variant="gold" className="w-full">
                    Start Arbitrage
                  </CustomButton>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Deposit Modal */}
        {selectedPool && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 w-full max-w-md mx-4">
              <CardHeader>
                <CardTitle className="text-white">Deposit to {selectedPool.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Amount</label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400">Token</label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select token" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedPool.tokens.map((token) => (
                        <SelectItem key={token} value={token}>
                          {token}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">APY</span>
                    <span className="text-green-400">{selectedPool.apy.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Risk Level</span>
                    <Badge className={getRiskColor(selectedPool.risk)}>{selectedPool.risk}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Protocol</span>
                    <span className="text-white">{selectedPool.protocol}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <CustomButton variant="secondary" className="flex-1" onClick={() => setSelectedPool(null)}>
                    Cancel
                  </CustomButton>
                  <CustomButton variant="gold" className="flex-1">
                    Deposit
                  </CustomButton>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </DappLayout>
  )
}
