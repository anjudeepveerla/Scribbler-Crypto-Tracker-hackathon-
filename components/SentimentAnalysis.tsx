"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  MessageSquare,
  Twitter,
  Newspaper,
  Heart,
  MessageCircle,
  Repeat2,
} from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

interface SentimentData {
  overall: number
  positive: number
  negative: number
  neutral: number
  sources: {
    twitter: number
    news: number
    reddit: number
  }
}

interface NewsItem {
  id: string
  title: string
  source: string
  sentiment: "positive" | "negative" | "neutral"
  timestamp: string
  url: string
  summary: string
}

interface TwitterPost {
  id: string
  username: string
  content: string
  sentiment: "positive" | "negative" | "neutral"
  timestamp: string
  likes: number
  retweets: number
  replies: number
}

const SENTIMENT_COLORS = {
  positive: "#10B981",
  negative: "#EF4444",
  neutral: "#6B7280",
}

export function SentimentAnalysis() {
  const [sentimentData, setSentimentData] = useState<SentimentData>({
    overall: 0,
    positive: 0,
    negative: 0,
    neutral: 0,
    sources: { twitter: 0, news: 0, reddit: 0 },
  })
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [twitterPosts, setTwitterPosts] = useState<TwitterPost[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data generation
  const generateMockSentiment = (): SentimentData => {
    const positive = Math.random() * 60 + 20 // 20-80%
    const negative = Math.random() * 30 + 10 // 10-40%
    const neutral = 100 - positive - negative

    return {
      overall: positive - negative, // Net sentiment
      positive,
      negative,
      neutral,
      sources: {
        twitter: Math.random() * 40 + 30, // 30-70%
        news: Math.random() * 40 + 30,
        reddit: Math.random() * 40 + 30,
      },
    }
  }

  const generateMockNews = (): NewsItem[] => {
    const headlines = [
      "Bitcoin Reaches New All-Time High Amid Institutional Adoption",
      "Ethereum 2.0 Upgrade Shows Promising Results",
      "Regulatory Clarity Boosts Crypto Market Confidence",
      "Major Bank Announces Cryptocurrency Trading Services",
      "DeFi Protocols See Record Trading Volumes",
      "Central Bank Digital Currency Pilot Program Launched",
    ]

    const sources = ["CoinDesk", "CryptoNews", "Bloomberg", "Reuters", "TechCrunch", "Forbes"]
    const sentiments: Array<"positive" | "negative" | "neutral"> = ["positive", "negative", "neutral"]

    return headlines.map((title, index) => ({
      id: `news-${index}`,
      title,
      source: sources[Math.floor(Math.random() * sources.length)],
      sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
      timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
      url: `https://example.com/news/${index}`,
      summary:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    }))
  }

  const generateMockTwitter = (): TwitterPost[] => {
    const posts = [
      "Just bought more $BTC! This dip is a gift 🚀 #Bitcoin #HODL",
      "Ethereum gas fees are getting ridiculous... when will this be fixed? 😤",
      "The future of finance is here with DeFi protocols! Amazing innovation 💡",
      "Market volatility is crazy today, but I'm staying strong 💪",
      "New crypto regulations might actually be good for adoption 🏛️",
      "Web3 is revolutionizing how we think about ownership and value 🌐",
    ]

    const usernames = ["CryptoTrader", "BlockchainBull", "DeFiDegen", "SatoshiFan", "EthereumMax", "CoinHodler"]
    const sentiments: Array<"positive" | "negative" | "neutral"> = ["positive", "negative", "neutral"]

    return posts.map((content, index) => ({
      id: `tweet-${index}`,
      username: usernames[Math.floor(Math.random() * usernames.length)],
      content,
      sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
      timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
      likes: Math.floor(Math.random() * 1000),
      retweets: Math.floor(Math.random() * 500),
      replies: Math.floor(Math.random() * 200),
    }))
  }

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setSentimentData(generateMockSentiment())
      setNewsItems(generateMockNews())
      setTwitterPosts(generateMockTwitter())
      setLoading(false)
    }, 1000)
  }, [])

  const pieData = [
    { name: "Positive", value: sentimentData.positive, color: SENTIMENT_COLORS.positive },
    { name: "Negative", value: sentimentData.negative, color: SENTIMENT_COLORS.negative },
    { name: "Neutral", value: sentimentData.neutral, color: SENTIMENT_COLORS.neutral },
  ]

  const sourceData = [
    { name: "Twitter", sentiment: sentimentData.sources.twitter },
    { name: "News", sentiment: sentimentData.sources.news },
    { name: "Reddit", sentiment: sentimentData.sources.reddit },
  ]

  const getSentimentBadge = (sentiment: string) => {
    const variants = {
      positive: "default",
      negative: "destructive",
      neutral: "secondary",
    }
    return variants[sentiment] || "secondary"
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <TrendingUp className="w-3 h-3" />
      case "negative":
        return <TrendingDown className="w-3 h-3" />
      default:
        return <MessageSquare className="w-3 h-3" />
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  return (
    <div className="space-y-6">
      {/* Overall Sentiment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-primary" />
              Overall Sentiment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div
                className={`text-4xl font-bold mb-2 ${sentimentData.overall >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {sentimentData.overall >= 0 ? "+" : ""}
                {sentimentData.overall.toFixed(1)}%
              </div>
              <Badge variant={sentimentData.overall >= 0 ? "default" : "destructive"}>
                {sentimentData.overall >= 0 ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                {sentimentData.overall >= 0 ? "Bullish" : "Bearish"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Sentiment Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value.toFixed(1)}%`, "Sentiment"]}
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#F9FAFB",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Source Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sourceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                  <YAxis stroke="#9CA3AF" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                  <Tooltip
                    formatter={(value: number) => [`${value.toFixed(1)}%`, "Sentiment"]}
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#F9FAFB",
                    }}
                  />
                  <Bar dataKey="sentiment" fill="#FFD700" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Sentiment Analysis Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="news" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="news" className="flex items-center">
                <Newspaper className="w-4 h-4 mr-2" />
                News Analysis
              </TabsTrigger>
              <TabsTrigger value="social" className="flex items-center">
                <Twitter className="w-4 h-4 mr-2" />
                Social Media
              </TabsTrigger>
            </TabsList>

            <TabsContent value="news" className="mt-6">
              <div className="space-y-4">
                {newsItems.map((item) => (
                  <Card key={item.id} className="bg-gray-800 border-gray-600">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                          <p className="text-sm text-gray-400 mb-2">{item.summary}</p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <span>{item.source}</span>
                            <span>•</span>
                            <span>{formatTimestamp(item.timestamp)}</span>
                          </div>
                        </div>
                        <Badge variant={getSentimentBadge(item.sentiment)} className="ml-4">
                          {getSentimentIcon(item.sentiment)}
                          <span className="ml-1 capitalize">{item.sentiment}</span>
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="social" className="mt-6">
              <div className="space-y-4">
                {twitterPosts.map((post) => (
                  <Card key={post.id} className="bg-gray-800 border-gray-600">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                              <span className="text-xs font-bold text-primary-foreground">{post.username[0]}</span>
                            </div>
                            <span className="font-semibold text-white">@{post.username}</span>
                            <span className="text-xs text-gray-500">{formatTimestamp(post.timestamp)}</span>
                          </div>
                          <p className="text-white mb-3">{post.content}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-400">
                            <div className="flex items-center space-x-1">
                              <Heart className="w-3 h-3" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Repeat2 className="w-3 h-3" />
                              <span>{post.retweets}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="w-3 h-3" />
                              <span>{post.replies}</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant={getSentimentBadge(post.sentiment)} className="ml-4">
                          {getSentimentIcon(post.sentiment)}
                          <span className="ml-1 capitalize">{post.sentiment}</span>
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
