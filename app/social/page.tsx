"use client"

import { useState, useEffect } from "react"
import { DappLayout } from "@/components/DappLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CustomButton } from "@/components/ui/custom-button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Users,
  TrendingUp,
  TrendingDown,
  Copy,
  Heart,
  MessageCircle,
  Share,
  Star,
  Trophy,
  Target,
  Zap,
} from "lucide-react"

interface Trader {
  id: string
  username: string
  avatar: string
  followers: number
  winRate: number
  totalReturn: number
  monthlyReturn: number
  copiers: number
  isFollowing: boolean
  verified: boolean
  rank: number
}

interface Post {
  id: string
  author: Trader
  content: string
  timestamp: string
  likes: number
  comments: number
  shares: number
  isLiked: boolean
  prediction?: {
    symbol: string
    direction: "up" | "down"
    target: number
    timeframe: string
  }
}

export default function Social() {
  const [topTraders, setTopTraders] = useState<Trader[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  // Mock social data
  const generateMockTraders = (): Trader[] => {
    return [
      {
        id: "1",
        username: "CryptoKing",
        avatar: "CK",
        followers: 15420,
        winRate: 78.5,
        totalReturn: 245.6,
        monthlyReturn: 12.8,
        copiers: 892,
        isFollowing: false,
        verified: true,
        rank: 1,
      },
      {
        id: "2",
        username: "BlockchainBull",
        avatar: "BB",
        followers: 12890,
        winRate: 72.3,
        totalReturn: 189.4,
        monthlyReturn: 8.9,
        copiers: 654,
        isFollowing: true,
        verified: true,
        rank: 2,
      },
      {
        id: "3",
        username: "DeFiDegen",
        avatar: "DD",
        followers: 9876,
        winRate: 69.8,
        totalReturn: 156.7,
        monthlyReturn: 15.2,
        copiers: 432,
        isFollowing: false,
        verified: false,
        rank: 3,
      },
      {
        id: "4",
        username: "SatoshiFan",
        avatar: "SF",
        followers: 8765,
        winRate: 75.1,
        totalReturn: 198.3,
        monthlyReturn: 6.7,
        copiers: 567,
        isFollowing: false,
        verified: true,
        rank: 4,
      },
      {
        id: "5",
        username: "EthereumMax",
        avatar: "EM",
        followers: 7654,
        winRate: 71.9,
        totalReturn: 134.5,
        monthlyReturn: 11.4,
        copiers: 389,
        isFollowing: true,
        verified: false,
        rank: 5,
      },
    ]
  }

  const generateMockPosts = (traders: Trader[]): Post[] => {
    const postContents = [
      "Just opened a long position on $BTC. The technical indicators are looking bullish! 🚀",
      "Market sentiment is shifting. Time to take profits on altcoins and move to stablecoins. 📈",
      "DeFi yields are getting crazy again. Found a 45% APY pool on Uniswap V3! 💰",
      "Remember: Never invest more than you can afford to lose. Risk management is key! ⚠️",
      "The correlation between $BTC and traditional markets is weakening. Bullish for crypto! 📊",
      "Layer 2 solutions are the future. $MATIC and $ARB looking strong this week. 🔥",
    ]

    return postContents.map((content, index) => ({
      id: `post-${index}`,
      author: traders[index % traders.length],
      content,
      timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
      likes: Math.floor(Math.random() * 500) + 50,
      comments: Math.floor(Math.random() * 100) + 10,
      shares: Math.floor(Math.random() * 50) + 5,
      isLiked: Math.random() > 0.7,
      prediction:
        Math.random() > 0.6
          ? {
              symbol: ["BTC", "ETH", "SOL", "MATIC"][Math.floor(Math.random() * 4)],
              direction: Math.random() > 0.5 ? "up" : "down",
              target: Math.random() * 50 + 10,
              timeframe: ["1D", "1W", "1M"][Math.floor(Math.random() * 3)],
            }
          : undefined,
    }))
  }

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      const traders = generateMockTraders()
      setTopTraders(traders)
      setPosts(generateMockPosts(traders))
      setLoading(false)
    }, 1000)
  }, [])

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Social Trading
          </h1>
          <p className="text-lg text-gray-400">
            Follow top traders, copy strategies, and share insights with the community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Share Your Thoughts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="What's your market outlook today?" className="bg-gray-800/50 border-gray-600" />
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <CustomButton variant="secondary" size="sm">
                      <Target className="w-4 h-4 mr-1" />
                      Add Prediction
                    </CustomButton>
                    <CustomButton variant="secondary" size="sm">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Add Chart
                    </CustomButton>
                  </div>
                  <CustomButton variant="gold">Post</CustomButton>
                </div>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id} className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-400 text-white">
                          {post.author.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-semibold text-white">{post.author.username}</span>
                          {post.author.verified && (
                            <Badge variant="default" className="text-xs">
                              <Star className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                          <span className="text-sm text-gray-400">#{post.author.rank}</span>
                          <span className="text-sm text-gray-400">•</span>
                          <span className="text-sm text-gray-400">{formatTimestamp(post.timestamp)}</span>
                        </div>
                        <p className="text-white mb-4">{post.content}</p>

                        {post.prediction && (
                          <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Target className="w-4 h-4 text-blue-400" />
                                <span className="font-semibold text-white">Price Prediction</span>
                              </div>
                              <Badge variant={post.prediction.direction === "up" ? "default" : "destructive"}>
                                {post.prediction.direction === "up" ? (
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                ) : (
                                  <TrendingDown className="w-3 h-3 mr-1" />
                                )}
                                {post.prediction.direction.toUpperCase()}
                              </Badge>
                            </div>
                            <div className="mt-2 text-sm text-gray-300">
                              {post.prediction.symbol} target: {post.prediction.target.toFixed(1)}% in{" "}
                              {post.prediction.timeframe}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6">
                            <button
                              className={`flex items-center space-x-1 text-sm transition-colors ${
                                post.isLiked ? "text-red-400" : "text-gray-400 hover:text-red-400"
                              }`}
                            >
                              <Heart className={`w-4 h-4 ${post.isLiked ? "fill-current" : ""}`} />
                              <span>{formatNumber(post.likes)}</span>
                            </button>
                            <button className="flex items-center space-x-1 text-sm text-gray-400 hover:text-blue-400 transition-colors">
                              <MessageCircle className="w-4 h-4" />
                              <span>{formatNumber(post.comments)}</span>
                            </button>
                            <button className="flex items-center space-x-1 text-sm text-gray-400 hover:text-green-400 transition-colors">
                              <Share className="w-4 h-4" />
                              <span>{formatNumber(post.shares)}</span>
                            </button>
                          </div>
                          <CustomButton variant="secondary" size="sm">
                            <Copy className="w-4 h-4 mr-1" />
                            Copy Trade
                          </CustomButton>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Traders */}
            <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                  Top Traders
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topTraders.slice(0, 5).map((trader) => (
                  <div key={trader.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-yellow-400">#{trader.rank}</span>
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-400 text-white text-xs">
                            {trader.avatar}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <div className="flex items-center space-x-1">
                          <span className="font-semibold text-white text-sm">{trader.username}</span>
                          {trader.verified && <Star className="w-3 h-3 text-yellow-400" />}
                        </div>
                        <div className="text-xs text-gray-400">{trader.winRate.toFixed(1)}% win rate</div>
                      </div>
                    </div>
                    <CustomButton variant={trader.isFollowing ? "secondary" : "gold"} size="sm" className="text-xs">
                      {trader.isFollowing ? "Following" : "Follow"}
                    </CustomButton>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Trending Strategies */}
            <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-blue-400" />
                  Trending Strategies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "DCA Bitcoin", followers: 1250, return: 15.6 },
                  { name: "Altcoin Momentum", followers: 890, return: 28.3 },
                  { name: "DeFi Yield Farming", followers: 654, return: 42.1 },
                  { name: "Grid Trading", followers: 432, return: 12.8 },
                ].map((strategy, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white text-sm">{strategy.name}</div>
                      <div className="text-xs text-gray-400">{formatNumber(strategy.followers)} followers</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-green-400">+{strategy.return.toFixed(1)}%</div>
                      <div className="text-xs text-gray-400">30d return</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="w-5 h-5 mr-2 text-purple-400" />
                  Community Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-white">25.4K</div>
                    <div className="text-xs text-gray-400">Active Traders</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">$2.1M</div>
                    <div className="text-xs text-gray-400">Assets Under Management</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">89%</div>
                    <div className="text-xs text-gray-400">Success Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">1.2K</div>
                    <div className="text-xs text-gray-400">Daily Trades</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </DappLayout>
  )
}
