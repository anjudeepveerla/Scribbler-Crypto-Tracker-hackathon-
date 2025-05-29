"use client"

import { useState } from "react"
import { DappLayout } from "@/components/DappLayout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LiveCoinCharts } from "@/components/LiveCoinCharts"
import { SentimentAnalysis } from "@/components/SentimentAnalysis"
import { PredictionTrends } from "@/components/PredictionTrends"
import { BarChart3, MessageSquare, TrendingUp, Activity } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function MarketAnalysis() {
  const [activeTab, setActiveTab] = useState("charts")

  return (
    <DappLayout>
      <main className="container mx-auto px-4 pt-24 pb-32 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Live Market Analysis</h1>
          <p className="text-lg text-gray-400">
            Real-time charts, sentiment analysis, and AI-powered predictions for top cryptocurrencies
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-gray-400">Market Cap</p>
                  <p className="font-semibold text-white">$2.1T</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-xs text-gray-400">24h Change</p>
                  <p className="font-semibold text-green-500">+2.4%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-xs text-gray-400">Sentiment</p>
                  <p className="font-semibold text-blue-500">Bullish</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-xs text-gray-400">AI Confidence</p>
                  <p className="font-semibold text-purple-500">78%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="charts" className="flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              Live Charts
            </TabsTrigger>
            <TabsTrigger value="sentiment" className="flex items-center">
              <MessageSquare className="w-4 h-4 mr-2" />
              Sentiment Analysis
            </TabsTrigger>
            <TabsTrigger value="predictions" className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              AI Predictions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="charts">
            <LiveCoinCharts />
          </TabsContent>

          <TabsContent value="sentiment">
            <SentimentAnalysis />
          </TabsContent>

          <TabsContent value="predictions">
            <PredictionTrends />
          </TabsContent>
        </Tabs>
      </main>
    </DappLayout>
  )
}
