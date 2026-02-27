import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Switch } from "../../components/ui/switch";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { AlertTriangle, TrendingUp, Bell, Plus, Settings, ChevronDown, ChevronUp } from "lucide-react";
import { SentimentBadge } from "../../components/ui/sentiment-badge";

const initialAlerts = [
  {
    id: 1,
    type: "sentiment" as const,
    title: "Negative Sentiment Spike",
    description: "Negative mentions increased by 45% in the last 2 hours",
    severity: "high" as const,
    time: "10 minutes ago",
    status: "active" as const,
    detail: "Spike originated from Reddit r/ProductReviews and Twitter. Top negative keyword: 'pricing'. Recommend reviewing pricing messaging and preparing a response template.",
  },
  {
    id: 2,
    type: "volume" as const,
    title: "Volume Threshold Exceeded",
    description: "Mentions exceeded 500/hour threshold",
    severity: "medium" as const,
    time: "1 hour ago",
    status: "active" as const,
    detail: "Volume spike driven by a viral tweet from @techcrunch. Majority of mentions are positive (72%). No immediate action required, but monitor for sentiment changes.",
  },
  {
    id: 3,
    type: "influencer" as const,
    title: "High-Profile Mention",
    description: "@techcrunch mentioned your brand (2.4M followers)",
    severity: "low" as const,
    time: "2 hours ago",
    status: "resolved" as const,
    detail: "Mention was positive. @techcrunch praised the new AI-powered sentiment analysis feature. Engagement: 2.4K likes, 890 shares.",
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

const initialAiActions = [
  { id: 1, text: "Prepare response template for pricing concerns", done: false },
  { id: 2, text: "Alert customer service team", done: false },
  { id: 3, text: "Monitor competitor mentions", done: false },
  { id: 4, text: "Schedule executive review meeting", done: false },
];

export function AlertsCrisisPage() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [createAlertOpen, setCreateAlertOpen] = useState(false);
  const [newAlertName, setNewAlertName] = useState("");
  const [newAlertType, setNewAlertType] = useState("sentiment");
  const [newAlertThreshold, setNewAlertThreshold] = useState("");
  const [aiActions, setAiActions] = useState(initialAiActions);

  const activeCount = alerts.filter((a) => a.status === "active" && a.severity === "high").length;
  const mediumCount = alerts.filter((a) => a.status === "active" && a.severity === "medium").length;
  const resolvedCount = alerts.filter((a) => a.status === "resolved").length;

  const resolveAlert = (id: number) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, status: "resolved" as const } : a)));
    toast.success("Alert marked as resolved");
  };

  const toggleExpand = (id: number) => setExpandedId((prev) => (prev === id ? null : id));

  const toggleAiAction = (id: number) =>
    setAiActions((prev) => prev.map((a) => (a.id === id ? { ...a, done: !a.done } : a)));

  const handleExecuteActions = () => {
    const pending = aiActions.filter((a) => !a.done);
    if (pending.length === 0) { toast.info("All actions already completed"); return; }
    setAiActions((prev) => prev.map((a) => ({ ...a, done: true })));
    toast.success(`${pending.length} action${pending.length > 1 ? "s" : ""} marked as executed`);
  };

  const handleCreateAlert = () => {
    if (!newAlertName.trim() || !newAlertThreshold.trim()) { toast.error("Please fill in all required fields"); return; }
    const newAlert = {
      id: Date.now(),
      type: newAlertType as "sentiment" | "volume" | "influencer",
      title: newAlertName,
      description: `Threshold: ${newAlertThreshold}`,
      severity: "medium" as const,
      time: "just now",
      status: "active" as const,
      detail: `Alert rule created: ${newAlertThreshold}`,
    };
    setAlerts((prev) => [newAlert, ...prev]);
    toast.success(`Alert "${newAlertName}" created`);
    setCreateAlertOpen(false);
    setNewAlertName("");
    setNewAlertThreshold("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900 dark:text-white mb-2">Alerts &amp; Crisis Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitor critical events and respond to crisis situations</p>
        </div>
        <Button className="gap-2 bg-primary" onClick={() => setCreateAlertOpen(true)}>
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
            <h3 className="text-3xl mb-1">{activeCount}</h3>
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
            <h3 className="text-3xl mb-1">{mediumCount}</h3>
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
            <h3 className="text-3xl mb-1">{resolvedCount}</h3>
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
              className={`rounded-lg border-l-4 ${
                alert.severity === "high"
                  ? "border-l-error-500 bg-error-50"
                  : alert.severity === "medium"
                  ? "border-l-warning-500 bg-warning-50"
                  : "border-l-accent-500 bg-accent-50"
              }`}
            >
              <div className="p-4">
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
                    <Button size="sm" variant="outline" className="gap-1" onClick={() => toggleExpand(alert.id)}>
                      {expandedId === alert.id ? <><ChevronUp className="w-3 h-3" /> Hide</> : <><ChevronDown className="w-3 h-3" /> View Details</>}
                    </Button>
                    {alert.status === "active" && (
                      <Button size="sm" className="bg-primary" onClick={() => resolveAlert(alert.id)}>Resolve</Button>
                    )}
                  </div>
                </div>
              </div>
              {expandedId === alert.id && (
                <div className="px-4 pb-4 border-t border-black/5 pt-3">
                  <p className="text-sm text-gray-600">{alert.detail}</p>
                </div>
              )}
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
              {aiActions.map((action) => (
                <label key={action.id} className="flex items-center gap-3 p-3 bg-white rounded-lg cursor-pointer">
                  <input type="checkbox" checked={action.done} onChange={() => toggleAiAction(action.id)} className="rounded border-gray-300 accent-primary" />
                  <span className={`text-sm flex-1 ${action.done ? "line-through text-gray-400" : ""}`}>{action.text}</span>
                </label>
              ))}
            </div>
            <Button className="w-full mt-4 bg-primary" onClick={handleExecuteActions}>Execute Actions</Button>
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
              <Switch defaultChecked onCheckedChange={(v) => toast.info(`Sentiment alert ${v ? "enabled" : "disabled"}`)} />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium mb-1">Volume Spike Alert</h4>
                <p className="text-sm text-gray-600">Alert when mentions exceed 500/hour</p>
              </div>
              <Switch defaultChecked onCheckedChange={(v) => toast.info(`Volume alert ${v ? "enabled" : "disabled"}`)} />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium mb-1">Influencer Mention Alert</h4>
                <p className="text-sm text-gray-600">Alert for mentions from accounts with 100K+ followers</p>
              </div>
              <Switch defaultChecked onCheckedChange={(v) => toast.info(`Influencer alert ${v ? "enabled" : "disabled"}`)} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create Alert Dialog */}
      <Dialog open={createAlertOpen} onOpenChange={setCreateAlertOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Alert</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Alert Name *</Label>
              <Input placeholder="e.g. Competitor Spike Alert" value={newAlertName} onChange={(e) => setNewAlertName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Alert Type</Label>
              <Select value={newAlertType} onValueChange={setNewAlertType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sentiment">Sentiment Threshold</SelectItem>
                  <SelectItem value="volume">Volume Spike</SelectItem>
                  <SelectItem value="influencer">Influencer Mention</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Condition *</Label>
              <Input
                placeholder={newAlertType === "sentiment" ? "e.g. Negative > 25%" : newAlertType === "volume" ? "e.g. 1000+ mentions/hour" : "e.g. 500K+ followers"}
                value={newAlertThreshold}
                onChange={(e) => setNewAlertThreshold(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateAlertOpen(false)}>Cancel</Button>
            <Button className="bg-primary" onClick={handleCreateAlert}>Create Alert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}