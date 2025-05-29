"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { TrendingUp, TrendingDown, Activity, DollarSign } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface CoinData {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  volume_24h: number
  sparkline_in_7d: {
    price: number[]
  }
}

interface ChartDataPoint {
  time: string
  price: number
  volume?: number
}

const FEATURED_COINS = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin" },
  { id: "ethereum", symbol: "ETH", name: "Ethereum" },
  { id: "solana", symbol: "SOL", name: "Solana" },
  { id: "cardano", symbol: "ADA", name: "Cardano" },
  { id: "polygon", symbol: "MATIC", name: "Polygon" },
  { id: "chainlink", symbol: "LINK", name: "Chainlink" },
]

export function LiveCoinCharts() {
  const [coinData, setCoinData] = useState<CoinData[]>([])
  const [selectedCoin, setSelectedCoin] = useState("bitcoin")
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [timeframe, setTimeframe] = useState("7d")
  const [loading, setLoading] = useState(true)

  // Mock data for demonstration (replace with real API calls)
  const generateMockData = (coinId: string, days: number): ChartDataPoint[] => {
    const data: ChartDataPoint[] = []
    const now = new Date()
    const basePrice = coinId === "bitcoin" ? 45000 : coinId === "ethereum" ? 2800 : 100

    for (let i = days; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      const randomVariation = (Math.random() - 0.5) * 0.1
      const price = basePrice * (1 + randomVariation)

      data.push({
        time: date.toISOString().split("T")[0],
        price: price,
        volume: Math.random() * 1000000000,
      })
    }
    return data
  }

  const generateMockCoinData = (): CoinData[] => {
    return FEATURED_COINS.map((coin) => ({
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      current_price: coin.id === "bitcoin" ? 45000 : coin.id === "ethereum" ? 2800 : Math.random() * 1000,
      price_change_percentage_24h: (Math.random() - 0.5) * 20,
      market_cap: Math.random() * 1000000000000,
      volume_24h: Math.random() * 10000000000,
      sparkline_in_7d: {
        price: Array.from({ length: 168 }, () => Math.random() * 1000),
      },
    }))
  }

  useEffect(() => {
    // Simulate API call
    setLoading(true)
    setTimeout(() => {
      setCoinData(generateMockCoinData())
      setChartData(generateMockData(selectedCoin, Number.parseInt(timeframe)))
      setLoading(false)
    }, 1000)
  }, [selectedCoin, timeframe])

  const selectedCoinData = coinData.find((coin) => coin.id === selectedCoin)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(price)
  }

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`
    return `$${marketCap.toFixed(2)}`
  }

  return (
    <div className="space-y-6">
      {/* Top Coins Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coinData.slice(0, 6).map((coin) => (
          <Card
            key={coin.id}
            className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => setSelectedCoin(coin.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-primary-foreground">{coin.symbol.slice(0, 2)}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{coin.symbol}</h3>
                    <p className="text-xs text-gray-400">{coin.name}</p>
                  </div>
                </div>
                <Badge variant={coin.price_change_percentage_24h >= 0 ? "default" : "destructive"}>
                  {coin.price_change_percentage_24h >= 0 ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-lg font-bold text-white">{formatPrice(coin.current_price)}</p>
                <p className="text-xs text-gray-400">MCap: {formatMarketCap(coin.market_cap)}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Chart */}
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <CardTitle className="text-white">
                {selectedCoinData?.name} ({selectedCoinData?.symbol})
              </CardTitle>
              {selectedCoinData && (
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-white">{formatPrice(selectedCoinData.current_price)}</span>
                  <Badge variant={selectedCoinData.price_change_percentage_24h >= 0 ? "default" : "destructive"}>
                    {selectedCoinData.price_change_percentage_24h >= 0 ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {Math.abs(selectedCoinData.price_change_percentage_24h).toFixed(2)}%
                  </Badge>
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <Select value={selectedCoin} onValueChange={setSelectedCoin}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FEATURED_COINS.map((coin) => (
                    <SelectItem key={coin.id} value={coin.id}>
                      {coin.symbol} - {coin.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1d">1D</SelectItem>
                  <SelectItem value="7d">7D</SelectItem>
                  <SelectItem value="30d">30D</SelectItem>
                  <SelectItem value="90d">90D</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="price" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="price">Price Chart</TabsTrigger>
              <TabsTrigger value="volume">Volume Chart</TabsTrigger>
            </TabsList>
            <TabsContent value="price" className="mt-4">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FFD700" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#FFD700" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9CA3AF" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                    <YAxis
                      stroke="#9CA3AF"
                      tick={{ fill: "#9CA3AF", fontSize: 12 }}
                      tickFormatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#F9FAFB",
                      }}
                      formatter={(value: number) => [formatPrice(value), "Price"]}
                    />
                    <Area type="monotone" dataKey="price" stroke="#FFD700" strokeWidth={2} fill="url(#priceGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="volume" className="mt-4">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9CA3AF" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                    <YAxis
                      stroke="#9CA3AF"
                      tick={{ fill: "#9CA3AF", fontSize: 12 }}
                      tickFormatter={(value) => `${(value / 1e9).toFixed(1)}B`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#F9FAFB",
                      }}
                      formatter={(value: number) => [`$${(value / 1e9).toFixed(2)}B`, "Volume"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="volume"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      fill="url(#volumeGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Market Stats */}
      {selectedCoinData && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-gray-400">Market Cap</p>
                  <p className="font-semibold text-white">{formatMarketCap(selectedCoinData.market_cap)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-gray-400">24h Volume</p>
                  <p className="font-semibold text-white">{formatMarketCap(selectedCoinData.volume_24h)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-gray-400">24h Change</p>
                  <p
                    className={`font-semibold ${selectedCoinData.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {selectedCoinData.price_change_percentage_24h.toFixed(2)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-gray-400">Current Price</p>
                  <p className="font-semibold text-white">{formatPrice(selectedCoinData.current_price)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
