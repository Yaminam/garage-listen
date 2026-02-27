import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { SentimentBadge } from "../../components/ui/sentiment-badge";

const sentimentTrendData = [
  { date: "Feb 20", positive: 65, neutral: 25, negative: 10 },
  { date: "Feb 21", positive: 68, neutral: 22, negative: 10 },
  { date: "Feb 22", positive: 70, neutral: 20, negative: 10 },
  { date: "Feb 23", positive: 72, neutral: 18, negative: 10 },
  { date: "Feb 24", positive: 75, neutral: 17, negative: 8 },
  { date: "Feb 25", positive: 73, neutral: 19, negative: 8 },
  { date: "Feb 26", positive: 72, neutral: 20, negative: 8 },
  { date: "Feb 27", positive: 74, neutral: 18, negative: 8 },
];

const emotionData = [
  { emotion: "Joy", value: 8500, color: "#f59e0b" },
  { emotion: "Trust", value: 6200, color: "#10b981" },
  { emotion: "Surprise", value: 3100, color: "#ec4899" },
  { emotion: "Neutral", value: 4890, color: "#6b7280" },
  { emotion: "Sadness", value: 1240, color: "#3b82f6" },
  { emotion: "Anger", value: 653, color: "#ef4444" },
];

const platformSentiment = [
  { platform: "Twitter", positive: 72, neutral: 18, negative: 10 },
  { platform: "Instagram", positive: 85, neutral: 12, negative: 3 },
  { platform: "YouTube", positive: 65, neutral: 25, negative: 10 },
  { platform: "News", positive: 58, neutral: 35, negative: 7 },
  { platform: "Reddit", positive: 45, neutral: 35, negative: 20 },
];

const regionSentiment = [
  { region: "North America", positive: 74, neutral: 18, negative: 8 },
  { region: "Europe", positive: 68, neutral: 22, negative: 10 },
  { region: "Asia", positive: 79, neutral: 16, negative: 5 },
  { region: "Oceania", positive: 82, neutral: 13, negative: 5 },
  { region: "South America", positive: 71, neutral: 20, negative: 9 },
];

const sentimentDrivers = [
  {
    topic: "Customer Service",
    sentiment: "positive" as const,
    impact: "+8.2%",
    mentions: 3240,
    trend: "up" as const,
  },
  {
    topic: "Product Quality",
    sentiment: "positive" as const,
    impact: "+6.5%",
    mentions: 2890,
    trend: "up" as const,
  },
  {
    topic: "Pricing",
    sentiment: "negative" as const,
    impact: "-4.3%",
    mentions: 1560,
    trend: "down" as const,
  },
  {
    topic: "Shipping Time",
    sentiment: "negative" as const,
    impact: "-2.8%",
    mentions: 980,
    trend: "down" as const,
  },
];

export function SentimentAnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-gray-900 mb-2">Sentiment Analytics</h1>
        <p className="text-gray-600">Track sentiment trends and emotion analysis across all channels</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-accent-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent-600" />
              </div>
              <Badge className="bg-accent text-white">+5.2%</Badge>
            </div>
            <h3 className="text-3xl mb-1">74%</h3>
            <p className="text-sm text-gray-600">Average Positive Sentiment</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-gray-500" />
              </div>
              <Badge variant="secondary">-1.2%</Badge>
            </div>
            <h3 className="text-3xl mb-1">18%</h3>
            <p className="text-sm text-gray-600">Neutral Sentiment</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-error-50 rounded-xl flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-error-500" />
              </div>
              <Badge className="bg-accent text-white">-4.0%</Badge>
            </div>
            <h3 className="text-3xl mb-1">8%</h3>
            <p className="text-sm text-gray-600">Negative Sentiment</p>
          </CardContent>
        </Card>
      </div>

      {/* Sentiment Trend */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Sentiment Trend Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={sentimentTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="positive"
                stackId="1"
                stroke="#10b981"
                fill="#10b981"
                name="Positive"
              />
              <Area
                type="monotone"
                dataKey="neutral"
                stackId="1"
                stroke="#6b7280"
                fill="#6b7280"
                name="Neutral"
              />
              <Area
                type="monotone"
                dataKey="negative"
                stackId="1"
                stroke="#ef4444"
                fill="#ef4444"
                name="Negative"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emotion Distribution */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Emotion Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emotionData.map((emotion) => (
                <div key={emotion.emotion}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">{emotion.emotion}</span>
                    <span className="text-sm font-medium">{emotion.value.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${(emotion.value / 24583) * 100}%`,
                        backgroundColor: emotion.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sentiment by Platform */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Sentiment by Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={platformSentiment} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#6b7280" />
                <YAxis dataKey="platform" type="category" stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Bar dataKey="positive" fill="#10b981" name="Positive" />
                <Bar dataKey="neutral" fill="#6b7280" name="Neutral" />
                <Bar dataKey="negative" fill="#ef4444" name="Negative" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Sentiment by Region */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Sentiment by Region</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {regionSentiment.map((region) => (
              <div key={region.region} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium">{region.region}</span>
                  <div className="flex gap-2">
                    <SentimentBadge sentiment="positive" size="sm">
                      {region.positive}%
                    </SentimentBadge>
                    <SentimentBadge sentiment="neutral" size="sm">
                      {region.neutral}%
                    </SentimentBadge>
                    <SentimentBadge sentiment="negative" size="sm">
                      {region.negative}%
                    </SentimentBadge>
                  </div>
                </div>
                <div className="flex gap-1 h-2">
                  <div
                    className="bg-accent-500 rounded-l"
                    style={{ width: `${region.positive}%` }}
                  />
                  <div
                    className="bg-gray-400"
                    style={{ width: `${region.neutral}%` }}
                  />
                  <div
                    className="bg-error-500 rounded-r"
                    style={{ width: `${region.negative}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sentiment Drivers & AI Explanation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Top Sentiment Drivers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sentimentDrivers.map((driver, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{driver.topic}</span>
                      <SentimentBadge sentiment={driver.sentiment} size="sm">
                        {driver.sentiment}
                      </SentimentBadge>
                    </div>
                    <div className="flex items-center gap-2">
                      {driver.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-accent-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-error-500" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          driver.trend === "up" ? "text-accent-600" : "text-error-500"
                        }`}
                      >
                        {driver.impact}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {driver.mentions.toLocaleString()} mentions
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Explanation */}
        <Card className="border-0 shadow-sm bg-gradient-to-br from-primary-50 to-accent-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-white" />
              </div>
              Why Sentiment Changed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg">
                <h4 className="font-medium mb-2 text-accent-600">Positive Impact ↑</h4>
                <p className="text-sm text-gray-700">
                  Customer service improvements drove an 8.2% increase in positive sentiment.
                  Response times decreased by 40%.
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h4 className="font-medium mb-2 text-error-500">Negative Impact ↓</h4>
                <p className="text-sm text-gray-700">
                  Pricing concerns increased negative mentions by 4.3%. Consider addressing
                  value communication.
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h4 className="font-medium mb-2">💡 Recommendation</h4>
                <p className="text-sm text-gray-700">
                  Focus on pricing transparency and highlight product value to reduce negative
                  sentiment.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Geo Heatmap — Location Intelligence */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🌍 Geo Sentiment Heatmap
            <span className="text-sm font-normal text-gray-500 ml-2">Sentiment by region</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bar-style heatmap */}
            <div className="space-y-4">
              {[
                { region: "North America", flag: "🇺🇸", positive: 74, neutral: 18, negative: 8, mentions: 9840 },
                { region: "Europe", flag: "🇪🇺", positive: 68, neutral: 22, negative: 10, mentions: 6230 },
                { region: "Asia Pacific", flag: "🌏", positive: 79, neutral: 16, negative: 5, mentions: 5820 },
                { region: "Oceania", flag: "🇦🇺", positive: 82, neutral: 13, negative: 5, mentions: 1240 },
                { region: "South America", flag: "🌎", positive: 71, neutral: 20, negative: 9, mentions: 1453 },
              ].map((r) => (
                <div key={r.region} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium flex items-center gap-2">
                      <span className="text-lg">{r.flag}</span>
                      {r.region}
                    </span>
                    <span className="text-gray-500 text-xs">{r.mentions.toLocaleString()} mentions</span>
                  </div>
                  <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
                    <div
                      className="bg-accent-500 rounded-l-full transition-all"
                      style={{ width: `${r.positive}%` }}
                      title={`Positive: ${r.positive}%`}
                    />
                    <div
                      className="bg-gray-300 transition-all"
                      style={{ width: `${r.neutral}%` }}
                      title={`Neutral: ${r.neutral}%`}
                    />
                    <div
                      className="bg-error-400 rounded-r-full transition-all"
                      style={{ width: `${r.negative}%` }}
                      title={`Negative: ${r.negative}%`}
                    />
                  </div>
                  <div className="flex gap-4 text-xs text-gray-500">
                    <span className="text-accent-600">{r.positive}% positive</span>
                    <span>{r.neutral}% neutral</span>
                    <span className="text-error-500">{r.negative}% negative</span>
                  </div>
                </div>
              ))}
            </div>

            {/* City-level breakdown */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Top Cities by Mention Volume</h4>
              <div className="space-y-3">
                {[
                  { city: "San Francisco, CA", mentions: 3240, sentiment: "positive", pct: 90 },
                  { city: "New York, NY", mentions: 2890, sentiment: "positive", pct: 80 },
                  { city: "London, UK", mentions: 2340, sentiment: "neutral", pct: 65 },
                  { city: "Toronto, CA", mentions: 1890, sentiment: "positive", pct: 53 },
                  { city: "Berlin, DE", mentions: 1450, sentiment: "neutral", pct: 40 },
                  { city: "Sydney, AU", mentions: 1240, sentiment: "positive", pct: 35 },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-6 text-xs text-gray-400">{i + 1}.</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-sm font-medium">{c.city}</span>
                        <span className="text-xs text-gray-500">{c.mentions.toLocaleString()}</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full">
                        <div
                          className={`h-1.5 rounded-full ${
                            c.sentiment === "positive" ? "bg-accent-500" : "bg-gray-400"
                          }`}
                          style={{ width: `${c.pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
