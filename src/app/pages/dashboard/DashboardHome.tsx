import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { ArrowUp, ArrowDown, TrendingUp, MessageSquare, Target, Bell, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { SentimentBadge } from "../../components/ui/sentiment-badge";
import { PlatformTag } from "../../components/ui/platform-tag";

const kpiData = [
  {
    name: "Total Mentions",
    value: "24,583",
    change: "+12.5%",
    trend: "up",
    icon: MessageSquare,
    color: "text-primary",
    bgColor: "bg-primary-50 dark:bg-primary/20",
  },
  {
    name: "Sentiment Score",
    value: "72%",
    change: "+5.2%",
    trend: "up",
    icon: TrendingUp,
    color: "text-accent-600 dark:text-accent-500",
    bgColor: "bg-accent-50 dark:bg-accent/20",
  },
  {
    name: "Share of Voice",
    value: "38.4%",
    change: "-2.1%",
    trend: "down",
    icon: Target,
    color: "text-warning-500",
    bgColor: "bg-warning-50 dark:bg-warning/20",
  },
  {
    name: "Active Alerts",
    value: "3",
    change: "+1",
    trend: "up",
    icon: Bell,
    color: "text-error-500",
    bgColor: "bg-error-50 dark:bg-red-500/20",
  },
];

const mentionsData = [
  { date: "Feb 20", mentions: 2400, sentiment: 65 },
  { date: "Feb 21", mentions: 2210, sentiment: 68 },
  { date: "Feb 22", mentions: 2890, sentiment: 70 },
  { date: "Feb 23", mentions: 2500, sentiment: 72 },
  { date: "Feb 24", mentions: 3200, sentiment: 75 },
  { date: "Feb 25", mentions: 3800, sentiment: 73 },
  { date: "Feb 26", mentions: 4200, sentiment: 72 },
  { date: "Feb 27", mentions: 3900, sentiment: 74 },
];

const sentimentData = [
  { name: "Positive", value: 15840, color: "#10b981" },
  { name: "Neutral", value: 6890, color: "#6b7280" },
  { name: "Negative", value: 1853, color: "#ef4444" },
];

const platformData = [
  { platform: "Twitter", mentions: 8500, fill: "#1da1f2" },
  { platform: "Instagram", mentions: 6200, fill: "#e4405f" },
  { platform: "News", mentions: 4300, fill: "#6b7280" },
  { platform: "YouTube", mentions: 3100, fill: "#ff0000" },
  { platform: "Reddit", mentions: 2483, fill: "#ff4500" },
];

const trendingTopics = [
  { topic: "#ProductLaunch", mentions: 3240, sentiment: "positive", growth: "+145%" },
  { topic: "Customer Service", mentions: 2180, sentiment: "neutral", growth: "+23%" },
  { topic: "New Feature", mentions: 1890, sentiment: "positive", growth: "+89%" },
  { topic: "Pricing", mentions: 1240, sentiment: "negative", growth: "+56%" },
];

const recentMentions = [
  {
    platform: "twitter" as const,
    author: "@techcrunch",
    text: "Garage Listen launches AI-powered sentiment analysis for real-time brand monitoring...",
    sentiment: "positive" as const,
    engagement: "2.4K",
    time: "2m ago",
  },
  {
    platform: "instagram" as const,
    author: "@brandwatch",
    text: "Impressed by the new features! The competitor analysis dashboard is game-changing.",
    sentiment: "positive" as const,
    engagement: "890",
    time: "15m ago",
  },
  {
    platform: "news" as const,
    author: "TechNews Daily",
    text: "Social listening platform expands into crisis management with new alert system...",
    sentiment: "neutral" as const,
    engagement: "1.2K",
    time: "1h ago",
  },
];

const wordCloudWords = [
  { word: "#ProductLaunch", size: "text-2xl", color: "text-primary" },
  { word: "pricing", size: "text-xl", color: "text-error-500" },
  { word: "CustomerService", size: "text-2xl", color: "text-accent-600" },
  { word: "innovation", size: "text-lg", color: "text-gray-500 dark:text-slate-400" },
  { word: "AI", size: "text-3xl", color: "text-primary" },
  { word: "quality", size: "text-xl", color: "text-accent-600" },
  { word: "competitor", size: "text-base", color: "text-warning-500" },
  { word: "#SocialListening", size: "text-xl", color: "text-primary" },
  { word: "feedback", size: "text-lg", color: "text-gray-500 dark:text-slate-400" },
  { word: "support", size: "text-2xl", color: "text-accent-600" },
  { word: "trust", size: "text-base", color: "text-gray-400 dark:text-slate-500" },
  { word: "brand", size: "text-xl", color: "text-primary" },
  { word: "crisis", size: "text-sm", color: "text-error-500" },
  { word: "growth", size: "text-lg", color: "text-accent-600" },
  { word: "monitoring", size: "text-base", color: "text-gray-500 dark:text-slate-400" },
  { word: "#Analytics", size: "text-lg", color: "text-primary" },
  { word: "platform", size: "text-sm", color: "text-gray-400 dark:text-slate-500" },
  { word: "strategy", size: "text-sm", color: "text-gray-400 dark:text-slate-500" },
  { word: "engagement", size: "text-xl", color: "text-warning-500" },
  { word: "sentiment", size: "text-2xl", color: "text-accent-600" },
];

export function DashboardHome() {
  const [briefingVisible, setBriefingVisible] = useState(true);
  const { theme } = useTheme();
  const chartGrid = theme === 'dark' ? '#334155' : '#e5e7eb';
  const chartAxis = theme === 'dark' ? '#94a3b8' : '#6b7280';
  return (
    <div className="space-y-8">      {/* AI Morning Briefing */}
      {briefingVisible && (
        <div className="relative bg-gradient-to-r from-primary to-primary-700 rounded-2xl p-6 text-white shadow-lg overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, white 0%, transparent 60%)' }} />
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            onClick={() => setBriefingVisible(false)}
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white/70 text-sm mb-1">AI Morning Briefing · Feb 27, 2026</p>
              <h2 className="text-xl font-semibold mb-3">Good morning! Here's your brand snapshot.</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-white/10 rounded-xl p-3">
                  <p className="text-white/60 text-xs mb-1">🔥 Top Story</p>
                  <p className="text-sm font-medium">#ProductLaunch is trending — 145% above average mentions today.</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3">
                  <p className="text-white/60 text-xs mb-1">⚠️ Watch Out</p>
                  <p className="text-sm font-medium">Negative mentions about pricing rose 56% overnight. Review messaging today.</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3">
                  <p className="text-white/60 text-xs mb-1">💡 Opportunity</p>
                  <p className="text-sm font-medium">Competitor A share of voice dropped 8%. Time to push content on Twitter & LinkedIn.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        <h1 className="text-3xl text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-slate-400">Welcome back! Here's what's happening with your brand today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.name} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-slate-400 mb-1">{kpi.name}</p>
                    <h3 className="text-3xl mb-2 dark:text-white">{kpi.value}</h3>
                    <div className="flex items-center gap-1 text-sm">
                      {kpi.trend === "up" ? (
                        <ArrowUp className="w-4 h-4 text-accent-600" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-error-500" />
                      )}
                      <span className={kpi.trend === "up" ? "text-accent-600" : "text-error-500"}>
                        {kpi.change}
                      </span>
                      <span className="text-gray-500 dark:text-slate-500 ml-1">vs last week</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 ${kpi.bgColor} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${kpi.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mentions Over Time */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Mentions Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mentionsData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} />
                <XAxis dataKey="date" stroke={chartAxis} tick={{ fill: chartAxis }} />
                <YAxis stroke={chartAxis} tick={{ fill: chartAxis }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="mentions" stroke="#6366f1" strokeWidth={2} name="Mentions" />
                <Line type="monotone" dataKey="sentiment" stroke="#10b981" strokeWidth={2} name="Sentiment %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sentiment Distribution */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Sentiment Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${((entry.value / 24583) * 100).toFixed(1)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Distribution */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Platform Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={platformData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} />
                <XAxis type="number" stroke={chartAxis} tick={{ fill: chartAxis }} />
                <YAxis dataKey="platform" type="category" stroke={chartAxis} tick={{ fill: chartAxis }} />
                <Tooltip />
                <Bar dataKey="mentions" radius={[0, 8, 8, 0]}>
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Trending Topics */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Trending Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trendingTopics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium dark:text-white">{topic.topic}</span>
                      <SentimentBadge sentiment={topic.sentiment} size="sm">
                        {topic.sentiment}
                      </SentimentBadge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-slate-400">{topic.mentions.toLocaleString()} mentions</p>
                  </div>
                  <div className="text-right">
                    <span className="text-accent-600 font-medium">{topic.growth}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Word Cloud */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Top Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-x-4 gap-y-3 items-center justify-center min-h-[180px] py-4">
              {wordCloudWords.map((w, i) => (
                <span
                  key={i}
                  className={`${w.size} ${w.color} font-semibold cursor-default select-none hover:opacity-70 transition-opacity`}
                  style={{ lineHeight: 1.2 }}
                >
                  {w.word}
                </span>
              ))}
            </div>
            <p className="text-xs text-center text-gray-400 dark:text-slate-500 mt-2">Word size = frequency · Last 7 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Mentions & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Mentions Preview */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Live Mentions Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMentions.map((mention, index) => (
                <div key={index} className="p-4 border border-gray-200 dark:border-slate-700 rounded-lg hover:border-primary dark:hover:border-primary transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <PlatformTag platform={mention.platform} />
                        <span className="font-medium text-sm dark:text-white">{mention.author}</span>
                        <span className="text-xs text-gray-500 dark:text-slate-500">{mention.time}</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-slate-300 mb-2">{mention.text}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <SentimentBadge sentiment={mention.sentiment} size="sm">
                          {mention.sentiment}
                        </SentimentBadge>
                        <span>❤️ {mention.engagement}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Insight Summary */}
        <Card className="border-0 shadow-sm bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary/10 dark:to-accent/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
                <h4 className="font-medium mb-2 dark:text-white">🎯 Key Finding</h4>
                <p className="text-sm text-gray-600 dark:text-slate-400">
                  Your #ProductLaunch campaign generated 3.2K mentions today, 145% above average. Sentiment is 85% positive.
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
                <h4 className="font-medium mb-2 dark:text-white">⚠️ Alert</h4>
                <p className="text-sm text-gray-600 dark:text-slate-400">
                  Negative mentions about pricing increased by 56%. Consider addressing customer concerns.
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
                <h4 className="font-medium mb-2 dark:text-white">💡 Opportunity</h4>
                <p className="text-sm text-gray-600 dark:text-slate-400">
                  Your competitor mentions dropped 23%. Great time to increase your share of voice.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
