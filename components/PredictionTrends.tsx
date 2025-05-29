"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, Target, Brain, BarChart3, AlertTriangle } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ReferenceLine,
} from "recharts"

interface PredictionData {
  coin: string
  currentPrice: number
  predictions: {
    "1d": { price: number; confidence: number; direction: "up" | "down" }
    "7d": { price: number; confidence: number; direction: "up" | "down" }
    "30d": { price: number; confidence: number; direction: "up" | "down" }
  }
  technicalIndicators: {
    rsi: number
    macd: "bullish" | "bearish"
    movingAverage: "above" | "below"
    support: number
    resistance: number
  }
  aiConfidence: number
}

interface TrendData {
  date: string
  actual: number
  predicted: number
  upperBound: number
  lowerBound: number
}

const COINS = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin" },
  { id: "ethereum", symbol: "ETH", name: "Ethereum" },
  { id: "solana", symbol: "SOL", name: "Solana" },
]

export function PredictionTrends() {
  const [selectedCoin, setSelectedCoin] = useState("bitcoin")
  const [predictionData, setPredictionData] = useState<PredictionData | null>(null)
  const [trendData, setTrendData] = useState<TrendData[]>([])
  const [timeframe, setTimeframe] = useState("7d")
  const [loading, setLoading] = useState(true)

  const generateMockPrediction = (coinId: string): PredictionData => {
    const basePrice = coinId === "bitcoin" ? 45000 : coinId === "ethereum" ? 2800 : 100

    return {
      coin: coinId,
      currentPrice: basePrice,
      predictions: {
        "1d": {
          price: basePrice * (1 + (Math.random() - 0.5) * 0.1),
          confidence: Math.random() * 30 + 60,
          direction: Math.random() > 0.5 ? "up" : "down",
        },
        "7d": {
          price: basePrice * (1 + (Math.random() - 0.5) * 0.2),
          confidence: Math.random() * 25 + 55,
          direction: Math.random() > 0.5 ? "up" : "down",
        },
        "30d": {
          price: basePrice * (1 + (Math.random() - 0.5) * 0.4),
          confidence: Math.random() * 20 + 50,
          direction: Math.random() > 0.5 ? "up" : "down",
        },
      },
      technicalIndicators: {
        rsi: Math.random() * 100,
        macd: Math.random() > 0.5 ? "bullish" : "bearish",
        movingAverage: Math.random() > 0.5 ? "above" : "below",
        support: basePrice * 0.9,
        resistance: basePrice * 1.1,
      },
      aiConfidence: Math.random() * 30 + 60,
    }
  }

  const generateMockTrendData = (coinId: string, days: number): TrendData[] => {
    const basePrice = coinId === "bitcoin" ? 45000 : coinId === "ethereum" ? 2800 : 100
    const data: TrendData[] = []

    for (let i = -days; i <= 7; i++) {
      // Past data + 7 days future
      const date = new Date()
      date.setDate(date.getDate() + i)

      const trend = i < 0 ? 0 : i * 0.02 // Slight upward trend for predictions
      const volatility = 0.05
      const randomFactor = (Math.random() - 0.5) * volatility

      const actual = i <= 0 ? basePrice * (1 + randomFactor) : null
      const predicted = basePrice * (1 + trend + randomFactor * 0.5)
      const confidence = 0.1 // 10% confidence interval

      data.push({
        date: date.toISOString().split("T")[0],
        actual: actual || 0,
        predicted,
        upperBound: predicted * (1 + confidence),
        lowerBound: predicted * (1 - confidence),
      })
    }

    return data
  }

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setPredictionData(generateMockPrediction(selectedCoin))
      setTrendData(generateMockTrendData(selectedCoin, Number.parseInt(timeframe)))
      setLoading(false)
    }, 1000)
  }, [selectedCoin, timeframe])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(price)
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-green-500"
    if (confidence >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getRSIStatus = (rsi: number) => {
    if (rsi > 70) return { status: "Overbought", color: "text-red-500" }
    if (rsi < 30) return { status: "Oversold", color: "text-green-500" }
    return { status: "Neutral", color: "text-gray-400" }
  }

  if (!predictionData) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={selectedCoin} onValueChange={setSelectedCoin}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {COINS.map((coin) => (
              <SelectItem key={coin.id} value={coin.id}>
                {coin.symbol} - {coin.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">7 Days</SelectItem>
            <SelectItem value="14d">14 Days</SelectItem>
            <SelectItem value="30d">30 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* AI Prediction Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(predictionData.predictions).map(([period, prediction]) => (
          <Card key={period} className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>{period.toUpperCase()} Prediction</span>
                <Badge variant={prediction.direction === "up" ? "default" : "destructive"}>
                  {prediction.direction === "up" ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {prediction.direction === "up" ? "Bullish" : "Bearish"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-2xl font-bold text-white">{formatPrice(prediction.price)}</p>
                  <p className="text-sm text-gray-400">
                    {(((prediction.price - predictionData.currentPrice) / predictionData.currentPrice) * 100).toFixed(
                      2,
                    )}
                    % from current price
                  </p>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">AI Confidence</span>
                    <span className={getConfidenceColor(prediction.confidence)}>
                      {prediction.confidence.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={prediction.confidence} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Prediction Chart */}
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-primary" />
            Price Prediction Chart
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <defs>
                  <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
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
                  formatter={(value: number, name: string) => [
                    formatPrice(value),
                    name === "actual"
                      ? "Actual Price"
                      : name === "predicted"
                        ? "Predicted Price"
                        : name === "upperBound"
                          ? "Upper Bound"
                          : "Lower Bound",
                  ]}
                />
                <ReferenceLine x={new Date().toISOString().split("T")[0]} stroke="#FFD700" strokeDasharray="2 2" />

                {/* Confidence interval */}
                <Area type="monotone" dataKey="upperBound" stroke="none" fill="url(#confidenceGradient)" />
                <Area type="monotone" dataKey="lowerBound" stroke="none" fill="url(#confidenceGradient)" />

                {/* Actual price line */}
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={false}
                  connectNulls={false}
                />

                {/* Predicted price line */}
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-0.5 bg-green-500 mr-2"></div>
              <span className="text-gray-400">Actual Price</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-0.5 bg-blue-500 border-dashed border-t-2 mr-2"></div>
              <span className="text-gray-400">Predicted Price</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-2 bg-blue-500 opacity-20 mr-2"></div>
              <span className="text-gray-400">Confidence Interval</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-0.5 bg-yellow-500 border-dashed border-t-2 mr-2"></div>
              <span className="text-gray-400">Today</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Target className="w-5 h-5 mr-2 text-primary" />
              Technical Indicators
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">RSI (14)</span>
              <div className="text-right">
                <span className="text-white font-semibold">{predictionData.technicalIndicators.rsi.toFixed(1)}</span>
                <span className={`ml-2 text-sm ${getRSIStatus(predictionData.technicalIndicators.rsi).color}`}>
                  {getRSIStatus(predictionData.technicalIndicators.rsi).status}
                </span>
              </div>
            </div>
            <Progress value={predictionData.technicalIndicators.rsi} className="h-2" />

            <div className="flex justify-between items-center">
              <span className="text-gray-400">MACD Signal</span>
              <Badge variant={predictionData.technicalIndicators.macd === "bullish" ? "default" : "destructive"}>
                {predictionData.technicalIndicators.macd === "bullish" ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                {predictionData.technicalIndicators.macd}
              </Badge>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400">Moving Average</span>
              <Badge variant={predictionData.technicalIndicators.movingAverage === "above" ? "default" : "destructive"}>
                Price {predictionData.technicalIndicators.movingAverage} MA
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Brain className="w-5 h-5 mr-2 text-primary" />
              AI Analysis Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Overall AI Confidence</span>
              <span className={`font-semibold ${getConfidenceColor(predictionData.aiConfidence)}`}>
                {predictionData.aiConfidence.toFixed(1)}%
              </span>
            </div>
            <Progress value={predictionData.aiConfidence} className="h-2" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Support Level</span>
                <span className="text-white">{formatPrice(predictionData.technicalIndicators.support)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Resistance Level</span>
                <span className="text-white">{formatPrice(predictionData.technicalIndicators.resistance)}</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="flex items-start">
                <AlertTriangle className="w-4 h-4 text-yellow-500 mr-2 mt-0.5" />
                <div className="text-sm">
                  <p className="text-yellow-500 font-semibold">Risk Warning</p>
                  <p className="text-gray-400">
                    Predictions are based on AI analysis and should not be considered as financial advice.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
