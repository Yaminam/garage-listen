import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Switch } from "../../components/ui/switch";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { AlertTriangle, TrendingUp, Bell, Plus, Settings } from "lucide-react";
import { SentimentBadge } from "../../components/ui/sentiment-badge";

const alerts = [
  {
    id: 1,
    type: "sentiment" as const,
    title: "Negative Sentiment Spike",
    description: "Negative mentions increased by 45% in the last 2 hours",
    severity: "high" as const,
    time: "10 minutes ago",
    status: "active" as const,
  },
  {
    id: 2,
    type: "volume" as const,
    title: "Volume Threshold Exceeded",
    description: "Mentions exceeded 500/hour threshold",
    severity: "medium" as const,
    time: "1 hour ago",
    status: "active" as const,
  },
  {
    id: 3,
    type: "influencer" as const,
    title: "High-Profile Mention",
    description: "@techcrunch mentioned your brand (2.4M followers)",
    severity: "low" as const,
    time: "2 hours ago",
    status: "resolved" as const,
  },
];

const spikeData = [
  { time: "10:00", mentions: 45, sentiment: 72 },
  { time: "11:00", mentions: 52, sentiment: 70 },
  { time: "12:00", mentions: 89, sentiment: 65 },
  { time: "13:00", mentions: 234, sentiment: 48 },
  { time: "14:00", mentions: 456, sentiment: 42 },
  { time: "15:00", mentions: 389, sentiment: 45 },
  { time: "16:00", mentions: 267, sentiment: 52 },
  { time: "17:00", mentions: 156, sentiment: 58 },
];

const negativeSources = [
  { source: "@angry_customer", mentions: 12, platform: "Twitter", reach: "45K" },
  { source: "Reddit r/ProductReviews", mentions: 8, platform: "Reddit", reach: "120K" },
  { source: "TechBlog Daily", mentions: 3, platform: "News", reach: "250K" },
];

const aiActions = [
  "Prepare response template for pricing concerns",
  "Alert customer service team",
  "Monitor competitor mentions",
  "Schedule executive review meeting",
];

export function AlertsCrisisPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900 mb-2">Alerts & Crisis Management</h1>
          <p className="text-gray-600">Monitor critical events and respond to crisis situations</p>
        </div>
        <Button className="gap-2 bg-primary">
          <Plus className="w-4 h-4" />
          Create Alert
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-sm border-l-4 border-l-error-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-error-50 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-error-500" />
              </div>
              <Badge className="bg-error-500 text-white">Critical</Badge>
            </div>
            <h3 className="text-3xl mb-1">1</h3>
            <p className="text-sm text-gray-600">Critical Alerts</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm border-l-4 border-l-warning-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-warning-50 rounded-xl flex items-center justify-center">
                <Bell className="w-6 h-6 text-warning-500" />
              </div>
              <Badge className="bg-warning-500 text-white">Medium</Badge>
            </div>
            <h3 className="text-3xl mb-1">1</h3>
            <p className="text-sm text-gray-600">Active Alerts</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm border-l-4 border-l-accent-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-accent-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent-600" />
              </div>
              <Badge className="bg-accent text-white">Resolved</Badge>
            </div>
            <h3 className="text-3xl mb-1">1</h3>
            <p className="text-sm text-gray-600">Resolved Today</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Active Alerts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border-l-4 ${
                alert.severity === "high"
                  ? "border-l-error-500 bg-error-50"
                  : alert.severity === "medium"
                  ? "border-l-warning-500 bg-warning-50"
                  : "border-l-accent-500 bg-accent-50"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{alert.title}</h4>
                    <Badge
                      className={
                        alert.severity === "high"
                          ? "bg-error-500 text-white"
                          : alert.severity === "medium"
                          ? "bg-warning-500 text-white"
                          : "bg-accent text-white"
                      }
                    >
                      {alert.severity}
                    </Badge>
                    {alert.status === "resolved" && (
                      <Badge variant="outline">Resolved</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{alert.description}</p>
                  <span className="text-xs text-gray-500">{alert.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">View Details</Button>
                  {alert.status === "active" && (
                    <Button size="sm" className="bg-primary">Resolve</Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Crisis Timeline - Sentiment Spike</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={spikeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#6b7280" />
              <YAxis yAxisId="left" stroke="#6b7280" />
              <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
              <Tooltip />
              <Line yAxisId="left" type="monotone" dataKey="mentions" stroke="#6366f1" strokeWidth={2} name="Mentions" />
              <Line yAxisId="right" type="monotone" dataKey="sentiment" stroke="#ef4444" strokeWidth={2} name="Sentiment %" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Top Negative Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {negativeSources.map((source, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{source.source}</span>
                    <SentimentBadge sentiment="negative" size="sm">
                      {source.mentions} mentions
                    </SentimentBadge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{source.platform}</span>
                    <span>Reach: {source.reach}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-primary-50 to-accent-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Settings className="w-4 h-4 text-white" />
              </div>
              AI Suggested Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {aiActions.map((action, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm flex-1">{action}</span>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4 bg-primary">Execute Actions</Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Alert Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium mb-1">Sentiment Threshold Alert</h4>
                <p className="text-sm text-gray-600">Alert when negative sentiment exceeds 20%</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium mb-1">Volume Spike Alert</h4>
                <p className="text-sm text-gray-600">Alert when mentions exceed 500/hour</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium mb-1">Influencer Mention Alert</h4>
                <p className="text-sm text-gray-600">Alert for mentions from accounts with 100K+ followers</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
