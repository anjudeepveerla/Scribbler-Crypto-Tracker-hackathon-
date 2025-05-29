"use client"

import { useState, useEffect } from "react"
import { DappLayout } from "@/components/DappLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CustomButton } from "@/components/ui/custom-button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { TrendingUp, TrendingDown, BarChart3, Bot, Copy, Settings, Plus } from "lucide-react"

interface TradingPair {
  symbol: string
  price: number
  change24h: number
  volume: number
  high24h: number
  low24h: number
}

interface Order {
  id: string
  type: "buy" | "sell"
  orderType: "market" | "limit" | "stop"
  pair: string
  amount: number
  price: number
  status: "pending" | "filled" | "cancelled"
  timestamp: string
}

interface TradingBot {
  id: string
  name: string
  strategy: string
  pair: string
  isActive: boolean
  profit: number
  profitPercent: number
  trades: number
}

export default function Trading() {
  const [selectedPair, setSelectedPair] = useState("BTC/USDT")
  const [orderType, setOrderType] = useState("market")
  const [tradeType, setTradeType] = useState("buy")
  const [amount, setAmount] = useState("")
  const [price, setPrice] = useState("")
  const [pairs, setPairs] = useState<TradingPair[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [bots, setBots] = useState<TradingBot[]>([])
  const [loading, setLoading] = useState(true)

  // Mock trading data
  const generateMockPairs = (): TradingPair[] => {
    return [
      { symbol: "BTC/USDT", price: 45234, change24h: 2.5, volume: 1250000000, high24h: 46000, low24h: 44500 },
      { symbol: "ETH/USDT", price: 2834, change24h: -1.2, volume: 890000000, high24h: 2900, low24h: 2780 },
      { symbol: "SOL/USDT", price: 102.45, change24h: 5.8, volume: 156000000, high24h: 108, low24h: 98.2 },
      { symbol: "MATIC/USDT", price: 0.845, change24h: 3.2, volume: 78000000, high24h: 0.89, low24h: 0.82 },
      { symbol: "LINK/USDT", price: 15.67, change24h: -0.5, volume: 45000000, high24h: 16.2, low24h: 15.1 },
      { symbol: "UNI/USDT", price: 6.23, change24h: 1.8, volume: 34000000, high24h: 6.5, low24h: 6.0 },
    ]
  }

  const generateMockOrders = (): Order[] => {
    return [
      {
        id: "1",
        type: "buy",
        orderType: "limit",
        pair: "BTC/USDT",
        amount: 0.1,
        price: 44500,
        status: "pending",
        timestamp: new Date().toISOString(),
      },
      {
        id: "2",
        type: "sell",
        orderType: "market",
        pair: "ETH/USDT",
        amount: 2.5,
        price: 2834,
        status: "filled",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
    ]
  }

  const generateMockBots = (): TradingBot[] => {
    return [
      {
        id: "1",
        name: "Grid Trading Bot",
        strategy: "Grid Trading",
        pair: "BTC/USDT",
        isActive: true,
        profit: 1250,
        profitPercent: 8.5,
        trades: 45,
      },
      {
        id: "2",
        name: "DCA Bot",
        strategy: "Dollar Cost Average",
        pair: "ETH/USDT",
        isActive: true,
        profit: 890,
        profitPercent: 12.3,
        trades: 28,
      },
      {
        id: "3",
        name: "Arbitrage Bot",
        strategy: "Cross-Exchange Arbitrage",
        pair: "SOL/USDT",
        isActive: false,
        profit: 456,
        profitPercent: 5.2,
        trades: 67,
      },
    ]
  }

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setPairs(generateMockPairs())
      setOrders(generateMockOrders())
      setBots(generateMockBots())
      setLoading(false)
    }, 1000)
  }, [])

  const formatCurrency = (amount: number, decimals = 2) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(amount)
  }

  const formatNumber = (num: number, decimals = 4) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
    }).format(num)
  }

  const selectedPairData = pairs.find((p) => p.symbol === selectedPair)

  if (loading) {
    return (
      <DappLayout>
        <div className="container mx-auto px-4 pt-24 pb-32 max-w-7xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-700 rounded w-1/4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-gray-700 rounded"></div>
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
            Advanced Trading
          </h1>
          <p className="text-lg text-gray-400">
            Professional trading tools with automated strategies and advanced order types
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Trading Pairs */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Markets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-96 overflow-y-auto">
                {pairs.map((pair) => (
                  <div
                    key={pair.symbol}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedPair === pair.symbol
                        ? "bg-blue-500/20 border border-blue-500/50"
                        : "bg-gray-800/50 hover:bg-gray-700/50"
                    }`}
                    onClick={() => setSelectedPair(pair.symbol)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-white">{pair.symbol}</div>
                        <div className="text-sm text-gray-400">{formatCurrency(pair.price, 2)}</div>
                      </div>
                      <Badge variant={pair.change24h >= 0 ? "default" : "destructive"}>
                        {pair.change24h >= 0 ? "+" : ""}
                        {pair.change24h.toFixed(2)}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Trading Interface */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700 mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">{selectedPair}</CardTitle>
                  {selectedPairData && (
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl font-bold text-white">{formatCurrency(selectedPairData.price, 2)}</div>
                      <Badge variant={selectedPairData.change24h >= 0 ? "default" : "destructive"}>
                        {selectedPairData.change24h >= 0 ? (
                          <TrendingUp className="w-3 h-3 mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 mr-1" />
                        )}
                        {selectedPairData.change24h >= 0 ? "+" : ""}
                        {selectedPairData.change24h.toFixed(2)}%
                      </Badge>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {/* Chart placeholder */}
                <div className="h-64 bg-gray-800/50 rounded-lg flex items-center justify-center mb-6">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400">Advanced TradingView Chart</p>
                    <p className="text-sm text-gray-500">Real-time candlestick data with indicators</p>
                  </div>
                </div>

                {/* Market Stats */}
                {selectedPairData && (
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-sm text-gray-400">24h High</div>
                      <div className="font-semibold text-green-400">{formatCurrency(selectedPairData.high24h, 2)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">24h Low</div>
                      <div className="font-semibold text-red-400">{formatCurrency(selectedPairData.low24h, 2)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">24h Volume</div>
                      <div className="font-semibold text-white">{formatCurrency(selectedPairData.volume, 0)}</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Place Order</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs value={tradeType} onValueChange={setTradeType}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="buy" className="text-green-400">
                      Buy
                    </TabsTrigger>
                    <TabsTrigger value="sell" className="text-red-400">
                      Sell
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <Select value={orderType} onValueChange={setOrderType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="market">Market Order</SelectItem>
                    <SelectItem value="limit">Limit Order</SelectItem>
                    <SelectItem value="stop">Stop Order</SelectItem>
                  </SelectContent>
                </Select>

                {orderType !== "market" && (
                  <div>
                    <Label>Price</Label>
                    <Input type="number" placeholder="0.00" value={price} onChange={(e) => setPrice(e.target.value)} />
                  </div>
                )}

                <div>
                  <Label>Amount</Label>
                  <Input type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {["25%", "50%", "75%", "100%"].map((percent) => (
                    <CustomButton key={percent} variant="secondary" size="sm">
                      {percent}
                    </CustomButton>
                  ))}
                </div>

                <CustomButton variant={tradeType === "buy" ? "default" : "destructive"} className="w-full">
                  {tradeType === "buy" ? "Buy" : "Sell"} {selectedPair.split("/")[0]}
                </CustomButton>

                <div className="text-xs text-gray-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Available:</span>
                    <span>1,250.00 USDT</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fee:</span>
                    <span>0.1%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Trading Bots and Orders */}
        <div className="mt-8">
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="orders">Open Orders</TabsTrigger>
              <TabsTrigger value="bots">Trading Bots</TabsTrigger>
              <TabsTrigger value="history">Trade History</TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="mt-6">
              <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Open Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Badge variant={order.type === "buy" ? "default" : "destructive"}>
                            {order.type.toUpperCase()}
                          </Badge>
                          <div>
                            <div className="font-semibold text-white">{order.pair}</div>
                            <div className="text-sm text-gray-400">
                              {order.orderType} • {formatNumber(order.amount, 4)} @ {formatCurrency(order.price)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={order.status === "filled" ? "default" : "secondary"}>{order.status}</Badge>
                          <CustomButton variant="secondary" size="sm">
                            Cancel
                          </CustomButton>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bots" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {bots.map((bot) => (
                  <Card key={bot.id} className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white flex items-center">
                          <Bot className="w-5 h-5 mr-2 text-blue-400" />
                          {bot.name}
                        </CardTitle>
                        <Switch checked={bot.isActive} />
                      </div>
                      <div className="text-sm text-gray-400">
                        {bot.strategy} • {bot.pair}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-green-400">+{formatCurrency(bot.profit)}</div>
                          <div className="text-xs text-gray-400">Total Profit</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-blue-400">{bot.profitPercent.toFixed(1)}%</div>
                          <div className="text-xs text-gray-400">ROI</div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-400">{bot.trades} trades executed</div>
                      </div>
                      <div className="flex space-x-2">
                        <CustomButton variant="secondary" size="sm" className="flex-1">
                          <Settings className="w-4 h-4 mr-1" />
                          Settings
                        </CustomButton>
                        <CustomButton variant="secondary" size="sm" className="flex-1">
                          <Copy className="w-4 h-4 mr-1" />
                          Clone
                        </CustomButton>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Create New Bot Card */}
                <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/30 border-dashed">
                  <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
                    <Bot className="w-12 h-12 text-blue-400 mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">Create New Bot</h3>
                    <p className="text-sm text-gray-400 mb-4">Set up automated trading strategies</p>
                    <CustomButton variant="gold">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Bot
                    </CustomButton>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Trade History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">No trade history available</p>
                    <p className="text-sm text-gray-500">Your completed trades will appear here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </DappLayout>
  )
}
