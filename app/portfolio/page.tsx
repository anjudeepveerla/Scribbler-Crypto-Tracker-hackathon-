"use client"

import { useState, useEffect } from "react"
import { DappLayout } from "@/components/DappLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CustomButton } from "@/components/ui/custom-button"
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  PieChart,
  BarChart3,
  Target,
  Shield,
  Zap,
  RefreshCw,
  Eye,
  EyeOff,
} from "lucide-react"
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"

interface Asset {
  symbol: string
  name: string
  balance: number
  value: number
  price: number
  change24h: number
  allocation: number
}

interface PortfolioData {
  totalValue: number
  totalChange24h: number
  totalChangePercent: number
  assets: Asset[]
}

const COLORS = ["#00D4FF", "#5A67D8", "#9F7AEA", "#F093FB", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"]

export default function Portfolio() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null)
  const [isBalanceVisible, setIsBalanceVisible] = useState(true)
  const [timeframe, setTimeframe] = useState("24h")
  const [loading, setLoading] = useState(true)

  // Mock portfolio data
  const generateMockPortfolio = (): PortfolioData => {
    const assets: Asset[] = [
      { symbol: "BTC", name: "Bitcoin", balance: 0.5, price: 45000, change24h: 2.5, allocation: 0, value: 0 },
      { symbol: "ETH", name: "Ethereum", balance: 3.2, price: 2800, change24h: -1.2, allocation: 0, value: 0 },
      { symbol: "SOL", name: "Solana", balance: 50, price: 100, change24h: 5.8, allocation: 0, value: 0 },
      { symbol: "MATIC", name: "Polygon", balance: 1000, price: 0.8, change24h: 3.2, allocation: 0, value: 0 },
      { symbol: "LINK", name: "Chainlink", balance: 100, price: 15, change24h: -0.5, allocation: 0, value: 0 },
      { symbol: "UNI", name: "Uniswap", balance: 25, price: 6, change24h: 1.8, allocation: 0, value: 0 },
    ]

    // Calculate values and allocations
    assets.forEach((asset) => {
      asset.value = asset.balance * asset.price
    })

    const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0)

    assets.forEach((asset) => {
      asset.allocation = (asset.value / totalValue) * 100
    })

    const totalChange24h = assets.reduce((sum, asset) => sum + (asset.value * asset.change24h) / 100, 0)
    const totalChangePercent = (totalChange24h / totalValue) * 100

    return {
      totalValue,
      totalChange24h,
      totalChangePercent,
      assets: assets.sort((a, b) => b.value - a.value),
    }
  }

  const generateChartData = () => {
    const data = []
    const now = new Date()
    for (let i = 30; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      const baseValue = portfolioData?.totalValue || 50000
      const variation = (Math.random() - 0.5) * 0.1
      data.push({
        date: date.toISOString().split("T")[0],
        value: baseValue * (1 + variation),
      })
    }
    return data
  }

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setPortfolioData(generateMockPortfolio())
      setLoading(false)
    }, 1000)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const formatNumber = (num: number, decimals = 4) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
    }).format(num)
  }

  if (loading || !portfolioData) {
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

  const pieData = portfolioData.assets.map((asset, index) => ({
    name: asset.symbol,
    value: asset.allocation,
    color: COLORS[index % COLORS.length],
  }))

  return (
    <DappLayout>
      <main className="container mx-auto px-4 pt-24 pb-32 max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Portfolio Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <CustomButton variant="secondary" size="sm" onClick={() => setIsBalanceVisible(!isBalanceVisible)}>
                {isBalanceVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </CustomButton>
              <CustomButton variant="secondary" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </CustomButton>
            </div>
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Wallet className="w-5 h-5 mr-2 text-blue-400" />
                Total Portfolio Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-white">
                  {isBalanceVisible ? formatCurrency(portfolioData.totalValue) : "••••••"}
                </div>
                <div className="flex items-center space-x-2">
                  {portfolioData.totalChangePercent >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-400" />
                  )}
                  <span className={portfolioData.totalChangePercent >= 0 ? "text-green-400" : "text-red-400"}>
                    {portfolioData.totalChangePercent >= 0 ? "+" : ""}
                    {portfolioData.totalChangePercent.toFixed(2)}% (24h)
                  </span>
                </div>
                <div className="text-sm text-gray-400">
                  {portfolioData.totalChangePercent >= 0 ? "+" : ""}
                  {formatCurrency(portfolioData.totalChange24h)} today
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/50 to-cyan-900/50 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Target className="w-5 h-5 mr-2 text-green-400" />
                Best Performer
              </CardTitle>
            </CardHeader>
            <CardContent>
              {(() => {
                const bestPerformer = portfolioData.assets.reduce((best, asset) =>
                  asset.change24h > best.change24h ? asset : best,
                )
                return (
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-white">{bestPerformer.symbol}</div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-green-400">+{bestPerformer.change24h.toFixed(2)}%</span>
                    </div>
                    <div className="text-sm text-gray-400">{formatCurrency(bestPerformer.value)} value</div>
                  </div>
                )
              })()}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <PieChart className="w-5 h-5 mr-2 text-purple-400" />
                Diversification Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-white">8.5/10</div>
                <Progress value={85} className="h-2" />
                <div className="text-sm text-gray-400">
                  Well diversified across {portfolioData.assets.length} assets
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Portfolio Chart and Allocation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gradient-to-br from-gray-900/50 to-blue-900/30 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Portfolio Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={generateChartData()}>
                    <defs>
                      <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#00D4FF" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                    <YAxis stroke="#9CA3AF" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#F9FAFB",
                      }}
                      formatter={(value: number) => [formatCurrency(value), "Portfolio Value"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#00D4FF"
                      strokeWidth={2}
                      fill="url(#portfolioGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900/50 to-purple-900/30 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Asset Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={120} dataKey="value">
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [`${value.toFixed(1)}%`, "Allocation"]}
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#F9FAFB",
                      }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assets Table */}
        <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Your Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {portfolioData.assets.map((asset, index) => (
                <div
                  key={asset.symbol}
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    >
                      {asset.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{asset.symbol}</div>
                      <div className="text-sm text-gray-400">{asset.name}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-semibold text-white">
                      {formatNumber(asset.balance)} {asset.symbol}
                    </div>
                    <div className="text-sm text-gray-400">{formatCurrency(asset.price)} per token</div>
                  </div>

                  <div className="text-right">
                    <div className="font-semibold text-white">
                      {isBalanceVisible ? formatCurrency(asset.value) : "••••••"}
                    </div>
                    <div className="text-sm text-gray-400">{asset.allocation.toFixed(1)}% of portfolio</div>
                  </div>

                  <div className="text-right">
                    <Badge variant={asset.change24h >= 0 ? "default" : "destructive"}>
                      {asset.change24h >= 0 ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      )}
                      {asset.change24h >= 0 ? "+" : ""}
                      {asset.change24h.toFixed(2)}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <CustomButton variant="gold" className="w-full">
            <Zap className="w-4 h-4 mr-2" />
            Quick Buy
          </CustomButton>
          <CustomButton variant="secondary" className="w-full">
            <Shield className="w-4 h-4 mr-2" />
            Rebalance
          </CustomButton>
          <CustomButton variant="secondary" className="w-full">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </CustomButton>
          <CustomButton variant="secondary" className="w-full">
            <Target className="w-4 h-4 mr-2" />
            Set Alerts
          </CustomButton>
        </div>
      </main>
    </DappLayout>
  )
}
