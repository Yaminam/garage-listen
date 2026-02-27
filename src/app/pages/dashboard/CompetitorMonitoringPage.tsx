import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { SentimentBadge } from "../../components/ui/sentiment-badge";
import { PlatformTag } from "../../components/ui/platform-tag";
import { TrendingUp, Users, Target } from "lucide-react";

const shareOfVoiceData = [
  { date: "Feb 20", yourBrand: 38, competitor1: 32, competitor2: 20, competitor3: 10 },
  { date: "Feb 21", yourBrand: 40, competitor1: 30, competitor2: 20, competitor3: 10 },
  { date: "Feb 22", yourBrand: 42, competitor1: 28, competitor2: 20, competitor3: 10 },
  { date: "Feb 23", yourBrand: 39, competitor1: 31, competitor2: 20, competitor3: 10 },
  { date: "Feb 24", yourBrand: 41, competitor1: 29, competitor2: 20, competitor3: 10 },
  { date: "Feb 25", yourBrand: 38, competitor1: 32, competitor2: 20, competitor3: 10 },
  { date: "Feb 26", yourBrand: 40, competitor1: 30, competitor2: 19, competitor3: 11 },
  { date: "Feb 27", yourBrand: 38, competitor1: 32, competitor2: 20, competitor3: 10 },
];

const competitorMetrics = [
  { name: "Your Brand", mentions: 9420, sentiment: 74, engagement: 145000, trend: "+12.5%" },
  { name: "Competitor A", mentions: 7890, sentiment: 68, engagement: 128000, trend: "+8.2%" },
  { name: "Competitor B", mentions: 4920, sentiment: 65, engagement: 89000, trend: "+5.1%" },
  { name: "Competitor C", mentions: 2353, sentiment: 58, engagement: 45000, trend: "+2.3%" },
];

const topMentionsByCompetitor = [
  {
    competitor: "Competitor A",
    mentions: [
      { text: "Just switched to Competitor A and loving the interface...", sentiment: "positive" as const, platform: "twitter" as const },
      { text: "Competitor A's customer support is terrible, waited 3 days...", sentiment: "negative" as const, platform: "reddit" as const },
    ],
  },
  {
    competitor: "Competitor B",
    mentions: [
      { text: "Competitor B has the best pricing in the market right now...", sentiment: "positive" as const, platform: "youtube" as const },
      { text: "Not impressed with Competitor B's latest update...", sentiment: "negative" as const, platform: "twitter" as const },
    ],
  },
];

export function CompetitorMonitoringPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900 mb-2">Competitor Monitoring</h1>
          <p className="text-gray-600">Track and compare performance against your competition</p>
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Competitors</SelectItem>
            <SelectItem value="competitor-a">Competitor A</SelectItem>
            <SelectItem value="competitor-b">Competitor B</SelectItem>
            <SelectItem value="competitor-c">Competitor C</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h3 className="text-3xl mb-1">38.4%</h3>
            <p className="text-sm text-gray-600">Your Share of Voice</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-accent-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent-600" />
              </div>
            </div>
            <h3 className="text-3xl mb-1">+6%</h3>
            <p className="text-sm text-gray-600">vs Top Competitor</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-warning-50 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-warning-500" />
              </div>
            </div>
            <h3 className="text-3xl mb-1">4</h3>
            <p className="text-sm text-gray-600">Tracked Competitors</p>
          </CardContent>
        </Card>
      </div>

      {/* Share of Voice Trend */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Share of Voice Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={shareOfVoiceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="yourBrand" stroke="#6366f1" strokeWidth={3} name="Your Brand" />
              <Line type="monotone" dataKey="competitor1" stroke="#10b981" strokeWidth={2} name="Competitor A" />
              <Line type="monotone" dataKey="competitor2" stroke="#f59e0b" strokeWidth={2} name="Competitor B" />
              <Line type="monotone" dataKey="competitor3" stroke="#6b7280" strokeWidth={2} name="Competitor C" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Competitor Comparison Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Side-by-Side Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="pb-3 font-medium text-sm text-gray-600">Brand</th>
                  <th className="pb-3 font-medium text-sm text-gray-600">Mentions</th>
                  <th className="pb-3 font-medium text-sm text-gray-600">Sentiment</th>
                  <th className="pb-3 font-medium text-sm text-gray-600">Total Engagement</th>
                  <th className="pb-3 font-medium text-sm text-gray-600">Growth</th>
                </tr>
              </thead>
              <tbody>
                {competitorMetrics.map((metric, index) => (
                  <tr key={index} className={`border-b ${index === 0 ? "bg-primary-50" : ""}`}>
                    <td className="py-4 font-medium">{metric.name}</td>
                    <td className="py-4">{metric.mentions.toLocaleString()}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{metric.sentiment}%</span>
                        <div className="w-24 bg-gray-100 rounded-full h-2">
                          <div
                            className="h-2 bg-accent-500 rounded-full"
                            style={{ width: `${metric.sentiment}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4">{metric.engagement.toLocaleString()}</td>
                    <td className="py-4">
                      <span className="text-accent-600 font-medium">{metric.trend}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Top Mentions by Competitor */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Top Mentions by Competitor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {topMentionsByCompetitor.map((comp, index) => (
            <div key={index}>
              <h4 className="font-medium mb-3">{comp.competitor}</h4>
              <div className="space-y-3">
                {comp.mentions.map((mention, i) => (
                  <div key={i} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <PlatformTag platform={mention.platform} />
                          <SentimentBadge sentiment={mention.sentiment} size="sm">
                            {mention.sentiment}
                          </SentimentBadge>
                        </div>
                        <p className="text-sm text-gray-700">{mention.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
