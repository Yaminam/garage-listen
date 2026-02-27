import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Sparkles } from "lucide-react";

const trendingKeywords = [
  { keyword: "#ProductLaunch", volume: 3240, growth: "+145%", forecast: "+200%" },
  { keyword: "AI Features", volume: 2890, growth: "+89%", forecast: "+120%" },
  { keyword: "Customer Service", volume: 2180, growth: "+23%", forecast: "+35%" },
  { keyword: "Integration", volume: 1890, growth: "+67%", forecast: "+85%" },
  { keyword: "Mobile App", volume: 1560, growth: "+45%", forecast: "+60%" },
];

const topicClusters = [
  { name: "Product Features", keywords: ["AI", "Dashboard", "Analytics", "Reports"], mentions: 8900 },
  { name: "Customer Experience", keywords: ["Support", "UX", "Interface", "Onboarding"], mentions: 6700 },
  { name: "Pricing & Plans", keywords: ["Cost", "Value", "ROI", "Subscription"], mentions: 4200 },
  { name: "Integrations", keywords: ["API", "Zapier", "Slack", "Tools"], mentions: 3100 },
];

const forecastData = [
  { date: "Feb 20", actual: 2400, forecast: null },
  { date: "Feb 21", actual: 2890, forecast: null },
  { date: "Feb 22", actual: 3200, forecast: null },
  { date: "Feb 23", actual: 2800, forecast: null },
  { date: "Feb 24", actual: 3600, forecast: null },
  { date: "Feb 25", actual: 4200, forecast: null },
  { date: "Feb 26", actual: 3900, forecast: null },
  { date: "Feb 27", actual: 4100, forecast: 4100 },
  { date: "Feb 28", actual: null, forecast: 4500 },
  { date: "Mar 1", actual: null, forecast: 4800 },
  { date: "Mar 2", actual: null, forecast: 5200 },
];

export function TrendDiscoveryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-gray-900 mb-2">Trend Discovery</h1>
        <p className="text-gray-600">Discover emerging trends and forecast future conversations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-warning-50 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-warning-500" />
            </div>
            <h3 className="text-3xl mb-1">12</h3>
            <p className="text-sm text-gray-600">Trending Topics (7 days)</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-3xl mb-1">+145%</h3>
            <p className="text-sm text-gray-600">Highest Growth Rate</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Rising Keywords</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trendingKeywords.map((keyword, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">#{index + 1}</span>
                    <span className="font-medium text-lg">{keyword.keyword}</span>
                  </div>
                  <Badge className="bg-accent text-white">{keyword.growth}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{keyword.volume.toLocaleString()} mentions</span>
                  <span>Forecast: {keyword.forecast}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Topic Clusters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topicClusters.map((cluster, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium mb-3">{cluster.name}</h4>
                <div className="flex flex-wrap gap-2 mb-3">
                  {cluster.keywords.map((kw, i) => (
                    <Badge key={i} variant="secondary">{kw}</Badge>
                  ))}
                </div>
                <p className="text-sm text-gray-600">{cluster.mentions.toLocaleString()} mentions</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Trend Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Line type="monotone" dataKey="actual" stroke="#6366f1" strokeWidth={2} name="Actual" />
              <Line type="monotone" dataKey="forecast" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" name="Forecast" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm bg-gradient-to-br from-primary-50 to-accent-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-4 bg-white rounded-lg">
              <h4 className="font-medium mb-2">🚀 Emerging Trend</h4>
              <p className="text-sm text-gray-700">
                #ProductLaunch is gaining momentum 145% faster than average. Expected to reach 6K+ mentions by next week.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <h4 className="font-medium mb-2">💡 Opportunity</h4>
              <p className="text-sm text-gray-700">
                "Mobile App" conversations are rising. Consider creating content around mobile features.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
