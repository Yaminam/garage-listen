import { useState } from "react";
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
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../../components/ui/sheet";
import { SentimentBadge } from "../../components/ui/sentiment-badge";
import { PlatformTag } from "../../components/ui/platform-tag";
import { EmotionTag } from "../../components/ui/emotion-tag";
import { Search, Filter, LayoutGrid, List, Calendar, Globe, Tag, Download, Bell, X } from "lucide-react";

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
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState("7days");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900 mb-2">Social Listening</h1>
          <p className="text-gray-600">Monitor mentions and conversations across platforms</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button variant="outline" className="gap-2">
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
                className="flex-1"
              />
              <Button className="bg-primary">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
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
              <Select>
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
              <Select>
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
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-600">Active filters:</span>
            <Badge variant="secondary" className="gap-1">
              Date: Last 7 days
              <X className="w-3 h-3 cursor-pointer" />
            </Badge>
            <Badge variant="secondary" className="gap-1">
              Keyword: "Garage Listen"
              <X className="w-3 h-3 cursor-pointer" />
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Mentions Feed */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Mentions Feed</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                {mentions.length.toLocaleString()} mentions found
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
            <div className="space-y-4">
              {mentions.map((mention) => (
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
                  {mentions.map((mention) => (
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
    </div>
  );
}
