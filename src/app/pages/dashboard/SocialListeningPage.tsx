import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../../components/ui/sheet";
import { SentimentBadge } from "../../components/ui/sentiment-badge";
import { PlatformTag } from "../../components/ui/platform-tag";
import { EmotionTag } from "../../components/ui/emotion-tag";
import { Search, LayoutGrid, List, Globe, Tag, Download, Bell, X, Columns } from "lucide-react";

const mentions = [
  {
    id: 1,
    platform: "twitter" as const,
    author: "@techcrunch",
    authorImage: "TC",
    text: "Garage Listen launches AI-powered sentiment analysis for real-time brand monitoring. The new features include emotion detection, crisis alerts, and competitive intelligence dashboards. Early adopters are reporting 40% faster response times to customer feedback.",
    sentiment: "positive" as const,
    emotion: "joy" as const,
    engagement: { likes: 2400, comments: 156, shares: 890 },
    reach: "125K",
    time: "2m ago",
    location: "San Francisco, CA",
    tags: ["#ProductLaunch", "#AI", "#SocialListening"],
  },
  {
    id: 2,
    platform: "instagram" as const,
    author: "@brandwatch",
    authorImage: "BW",
    text: "Impressed by the new features! The competitor analysis dashboard is game-changing. Being able to see real-time share of voice comparisons and sentiment trends side-by-side has transformed our reporting process.",
    sentiment: "positive" as const,
    emotion: "trust" as const,
    engagement: { likes: 890, comments: 45, shares: 230 },
    reach: "45K",
    time: "15m ago",
    location: "London, UK",
    tags: ["#MarketingTools", "#Analytics"],
  },
  {
    id: 3,
    platform: "news" as const,
    author: "TechNews Daily",
    authorImage: "TN",
    text: "Social listening platform expands into crisis management with new alert system. The platform now offers threshold-based alerts, sentiment spike detection, and AI-suggested response actions for brand protection.",
    sentiment: "neutral" as const,
    emotion: "neutral" as const,
    engagement: { likes: 1200, comments: 89, shares: 450 },
    reach: "250K",
    time: "1h ago",
    location: "New York, NY",
    tags: ["#TechNews", "#CrisisManagement"],
  },
  {
    id: 4,
    platform: "reddit" as const,
    author: "u/marketingpro",
    authorImage: "MP",
    text: "Has anyone tried Garage Listen? Looking for feedback on the competitor monitoring features. Need something that can track multiple brands across different platforms and provide actionable insights.",
    sentiment: "neutral" as const,
    emotion: "surprise" as const,
    engagement: { likes: 340, comments: 67, shares: 23 },
    reach: "12K",
    time: "3h ago",
    location: "Toronto, Canada",
    tags: ["#AskMarketing", "#Tools"],
  },
  {
    id: 5,
    platform: "youtube" as const,
    author: "Digital Marketing Hub",
    authorImage: "DM",
    text: "The pricing seems steep for small businesses. While the features are impressive, the entry-level plan at $99/month might be out of reach for startups and solopreneurs. Would love to see a more affordable tier.",
    sentiment: "negative" as const,
    emotion: "sadness" as const,
    engagement: { likes: 560, comments: 124, shares: 89 },
    reach: "78K",
    time: "5h ago",
    location: "Austin, TX",
    tags: ["#Pricing", "#Feedback"],
  },
];

export function SocialListeningPage() {
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [selectedMention, setSelectedMention] = useState<typeof mentions[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedSentiment, setSelectedSentiment] = useState("all");
  const [dateRange, setDateRange] = useState("7days");
  const [createAlertOpen, setCreateAlertOpen] = useState(false);
  const [alertName, setAlertName] = useState("");
  const [alertKeyword, setAlertKeyword] = useState("");
  const [columnSelectorOpen, setColumnSelectorOpen] = useState(false);
  const allColumns = ["Author", "Platform", "Sentiment", "Text", "Likes", "Comments", "Shares", "Reach", "Time", "Location"];
  const [selectedColumns, setSelectedColumns] = useState<string[]>(allColumns);

  const toggleColumn = (col: string) =>
    setSelectedColumns((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );

  const insertOperator = (op: string) => {
    const trimmed = searchQuery.trimEnd();
    setSearchQuery(trimmed ? `${trimmed} ${op} ` : `${op} `);
  };

  const filteredMentions = mentions.filter((m) => {
    const matchSearch = appliedSearch === "" || m.text.toLowerCase().includes(appliedSearch.toLowerCase()) || m.author.toLowerCase().includes(appliedSearch.toLowerCase());
    const matchPlatform = selectedPlatform === "all" || m.platform === selectedPlatform;
    const matchSentiment = selectedSentiment === "all" || m.sentiment === selectedSentiment;
    return matchSearch && matchPlatform && matchSentiment;
  });

  const handleExport = () => {
    // uses selectedColumns
    const colKeys: Record<string, (m: typeof mentions[0]) => string | number> = {
      Author: (m) => m.author,
      Platform: (m) => m.platform,
      Sentiment: (m) => m.sentiment,
      Text: (m) => `"${m.text.replace(/"/g, '""')}"`,
      Likes: (m) => m.engagement.likes,
      Comments: (m) => m.engagement.comments,
      Shares: (m) => m.engagement.shares,
      Reach: (m) => m.reach,
      Time: (m) => m.time,
      Location: (m) => m.location,
    };
    const cols = selectedColumns.filter((c) => colKeys[c]);
    const csv = [
      cols,
      ...filteredMentions.map((m) => cols.map((c) => colKeys[c](m))),
    ].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mentions-export.csv";
    a.click();
    URL.revokeObjectURL(url);
    setColumnSelectorOpen(false);
    toast.success(`Exported ${filteredMentions.length} mentions (${cols.length} columns) to CSV`);
  };

  const handleCreateAlert = () => {
    if (!alertName.trim() || !alertKeyword.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success(`Alert "${alertName}" created for keyword "${alertKeyword}"`);
    setCreateAlertOpen(false);
    setAlertName("");
    setAlertKeyword("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900 mb-2">Social Listening</h1>
          <p className="text-gray-600">Monitor mentions and conversations across platforms</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2" onClick={() => setColumnSelectorOpen(true)}>
            <Columns className="w-4 h-4" />
            Export
          </Button>
          <Button className="gap-2 bg-primary" onClick={() => setCreateAlertOpen(true)}>
            <Bell className="w-4 h-4" />
            Create Alert
          </Button>
        </div>
      </div>

      {/* Search Builder */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search Builder
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Boolean Search */}
          <div className="space-y-2">
            <Label>Search Query</Label>
            <div className="flex gap-2">
              <Input
                placeholder='e.g., "Garage Listen" OR #ProductLaunch'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && setAppliedSearch(searchQuery)}
                className="flex-1"
              />
              <Button className="bg-primary" onClick={() => setAppliedSearch(searchQuery)}>
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
            {/* Boolean operator quick-insert buttons */}
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-xs text-gray-500 self-center">Quick insert:</span>
              {["AND", "OR", "NOT", '"phrase"', "(", ")", "#hashtag", "@mention"].map((op) => (
                <button
                  key={op}
                  type="button"
                  onClick={() => insertOperator(op)}
                  className="text-xs px-2 py-1 bg-gray-100 hover:bg-primary hover:text-white rounded-md border border-gray-200 transition-colors font-mono"
                >
                  {op}
                </button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24hours">Last 24 hours</SelectItem>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Platform</Label>
              <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <SelectTrigger>
                  <SelectValue placeholder="All platforms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All platforms</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="news">News</SelectItem>
                  <SelectItem value="reddit">Reddit</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Sentiment</Label>
              <Select value={selectedSentiment} onValueChange={setSelectedSentiment}>
                <SelectTrigger>
                  <SelectValue placeholder="All sentiments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All sentiments</SelectItem>
                  <SelectItem value="positive">Positive</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                  <SelectItem value="negative">Negative</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Region</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Global" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="global">Global</SelectItem>
                  <SelectItem value="north-america">North America</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="asia">Asia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          {(appliedSearch || selectedPlatform !== "all" || selectedSentiment !== "all") && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">Active filters:</span>
              {appliedSearch && (
                <Badge variant="secondary" className="gap-1">
                  Keyword: "{appliedSearch}"
                  <X className="w-3 h-3 cursor-pointer" onClick={() => { setAppliedSearch(""); setSearchQuery(""); }} />
                </Badge>
              )}
              {selectedPlatform !== "all" && (
                <Badge variant="secondary" className="gap-1 capitalize">
                  Platform: {selectedPlatform}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedPlatform("all")} />
                </Badge>
              )}
              {selectedSentiment !== "all" && (
                <Badge variant="secondary" className="gap-1 capitalize">
                  Sentiment: {selectedSentiment}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedSentiment("all")} />
                </Badge>
              )}
              <button className="text-xs text-gray-500 underline hover:text-gray-800" onClick={() => { setAppliedSearch(""); setSearchQuery(""); setSelectedPlatform("all"); setSelectedSentiment("all"); }}>
                Clear all
              </button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mentions Feed */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Mentions Feed</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                {filteredMentions.length.toLocaleString()} mentions found
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "card" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("card")}
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("table")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === "card" ? (
            filteredMentions.length === 0 ? (
              <div className="text-center py-16">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-1">No mentions found</h3>
                <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
              </div>
            ) : (
            <div className="space-y-4">
              {filteredMentions.map((mention) => (
                <div
                  key={mention.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors cursor-pointer"
                  onClick={() => setSelectedMention(mention)}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">{mention.authorImage}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <PlatformTag platform={mention.platform} />
                        <span className="font-medium text-sm">{mention.author}</span>
                        <span className="text-xs text-gray-500">{mention.time}</span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          {mention.location}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{mention.text}</p>
                      <div className="flex items-center gap-4 flex-wrap">
                        <SentimentBadge sentiment={mention.sentiment}>
                          {mention.sentiment}
                        </SentimentBadge>
                        <EmotionTag emotion={mention.emotion} />
                        <span className="text-xs text-gray-500">
                          ❤️ {mention.engagement.likes}
                        </span>
                        <span className="text-xs text-gray-500">
                          💬 {mention.engagement.comments}
                        </span>
                        <span className="text-xs text-gray-500">
                          🔄 {mention.engagement.shares}
                        </span>
                        <span className="text-xs text-gray-500">
                          👁️ {mention.reach} reach
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        {mention.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            )
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="text-left">
                    <th className="pb-3 font-medium text-sm text-gray-600">Platform</th>
                    <th className="pb-3 font-medium text-sm text-gray-600">Author</th>
                    <th className="pb-3 font-medium text-sm text-gray-600">Content</th>
                    <th className="pb-3 font-medium text-sm text-gray-600">Sentiment</th>
                    <th className="pb-3 font-medium text-sm text-gray-600">Engagement</th>
                    <th className="pb-3 font-medium text-sm text-gray-600">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMentions.map((mention) => (
                    <tr
                      key={mention.id}
                      className="border-b hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedMention(mention)}
                    >
                      <td className="py-3">
                        <PlatformTag platform={mention.platform} />
                      </td>
                      <td className="py-3 text-sm">{mention.author}</td>
                      <td className="py-3 text-sm max-w-md truncate">{mention.text}</td>
                      <td className="py-3">
                        <SentimentBadge sentiment={mention.sentiment} size="sm">
                          {mention.sentiment}
                        </SentimentBadge>
                      </td>
                      <td className="py-3 text-sm">{mention.engagement.likes}</td>
                      <td className="py-3 text-sm text-gray-500">{mention.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mention Detail Drawer */}
      <Sheet open={!!selectedMention} onOpenChange={() => setSelectedMention(null)}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          {selectedMention && (
            <>
              <SheetHeader>
                <SheetTitle>Mention Details</SheetTitle>
              </SheetHeader>
              <div className="space-y-6 mt-6">
                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white">{selectedMention.authorImage}</span>
                  </div>
                  <div>
                    <div className="font-medium">{selectedMention.author}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <PlatformTag platform={selectedMention.platform} size="sm" />
                      <span>{selectedMention.time}</span>
                    </div>
                  </div>
                </div>

                {/* Full Text */}
                <div>
                  <h4 className="font-medium mb-2">Full Text</h4>
                  <p className="text-gray-700">{selectedMention.text}</p>
                </div>

                {/* AI Summary */}
                <div className="p-4 bg-primary-50 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                      <span className="text-white text-xs">AI</span>
                    </span>
                    AI Summary
                  </h4>
                  <p className="text-sm text-gray-700">
                    Positive mention highlighting new AI features and competitive intelligence capabilities.
                    High engagement rate indicates strong audience interest. No action required.
                  </p>
                </div>

                {/* Sentiment Analysis */}
                <div>
                  <h4 className="font-medium mb-3">Sentiment Analysis</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Overall Sentiment</span>
                      <SentimentBadge sentiment={selectedMention.sentiment}>
                        {selectedMention.sentiment}
                      </SentimentBadge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Emotion</span>
                      <EmotionTag emotion={selectedMention.emotion} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Confidence Score</span>
                      <span className="text-sm font-medium">94%</span>
                    </div>
                  </div>
                </div>

                {/* Engagement Stats */}
                <div>
                  <h4 className="font-medium mb-3">Engagement Statistics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Likes</div>
                      <div className="text-xl">{selectedMention.engagement.likes}</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Comments</div>
                      <div className="text-xl">{selectedMention.engagement.comments}</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Shares</div>
                      <div className="text-xl">{selectedMention.engagement.shares}</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Reach</div>
                      <div className="text-xl">{selectedMention.reach}</div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h4 className="font-medium mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMention.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button className="flex-1 gap-2">
                    <Tag className="w-4 h-4" />
                    Add Tag
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2">
                    <Download className="w-4 h-4" />
                    Export
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2">
                    <Bell className="w-4 h-4" />
                    Create Alert
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Create Alert Dialog */}
      <Dialog open={createAlertOpen} onOpenChange={setCreateAlertOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Alert</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Alert Name</Label>
              <Input placeholder="e.g. Brand Mention Alert" value={alertName} onChange={(e) => setAlertName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Keyword to Monitor</Label>
              <Input placeholder='e.g. "Garage Listen"' value={alertKeyword} onChange={(e) => setAlertKeyword(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Trigger When</Label>
              <Select defaultValue="any">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any mention</SelectItem>
                  <SelectItem value="negative">Negative sentiment only</SelectItem>
                  <SelectItem value="spike">Volume spike (&gt;50% increase)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateAlertOpen(false)}>Cancel</Button>
            <Button className="bg-primary" onClick={handleCreateAlert}>Create Alert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Column Selector Dialog */}
      <Dialog open={columnSelectorOpen} onOpenChange={setColumnSelectorOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Columns className="w-5 h-5" />
              Choose Export Columns
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <p className="text-sm text-gray-500">Select which columns to include in your CSV export.</p>
            <div className="space-y-2">
              {allColumns.map((col) => (
                <label key={col} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedColumns.includes(col)}
                    onChange={() => toggleColumn(col)}
                    className="w-4 h-4 rounded border-gray-300 text-primary"
                  />
                  <span className="text-sm font-medium">{col}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-2 pt-1">
              <button onClick={() => setSelectedColumns(allColumns)} className="text-xs text-primary hover:underline">
                Select All
              </button>
              <span className="text-gray-300">·</span>
              <button onClick={() => setSelectedColumns([])} className="text-xs text-gray-500 hover:underline">
                Clear All
              </button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setColumnSelectorOpen(false)}>Cancel</Button>
            <Button className="bg-primary gap-2" onClick={handleExport} disabled={selectedColumns.length === 0}>
              <Download className="w-4 h-4" />
              Export {filteredMentions.length} rows
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
