import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
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
import { SentimentBadge } from "../../components/ui/sentiment-badge";
import { PlatformTag } from "../../components/ui/platform-tag";
import {
  Inbox,
  Reply,
  UserCheck,
  Archive,
  CheckCheck,
  Search,
  Filter,
  MessageSquare,
} from "lucide-react";

type InboxItem = {
  id: number;
  platform: "twitter" | "instagram" | "youtube" | "reddit" | "news" | "linkedin";
  author: string;
  handle: string;
  text: string;
  sentiment: "positive" | "neutral" | "negative";
  time: string;
  read: boolean;
  archived: boolean;
  assignee: string | null;
};

const initialInboxItems: InboxItem[] = [
  {
    id: 1,
    platform: "twitter",
    author: "Sarah Chen",
    handle: "@sarahchen_mkt",
    text: "Just tried @GarageListen — the sentiment dashboard is genuinely impressive. Real-time updates are smooth. Would love a mobile app though! 📱",
    sentiment: "positive",
    time: "2m ago",
    read: false,
    archived: false,
    assignee: null,
  },
  {
    id: 2,
    platform: "instagram",
    author: "Mark Thompson",
    handle: "@markthompsondesign",
    text: "The competitor analysis in Garage Listen saves us hours every week. Shoutout to the team for an amazing product 🙌",
    sentiment: "positive",
    time: "15m ago",
    read: false,
    archived: false,
    assignee: null,
  },
  {
    id: 3,
    platform: "reddit",
    author: "u/data_driven_cmo",
    handle: "u/data_driven_cmo",
    text: "Does anyone have experience with Garage Listen pricing? The enterprise plan seems expensive — is it worth it for a 10-person team?",
    sentiment: "neutral",
    time: "1h ago",
    read: false,
    archived: false,
    assignee: null,
  },
  {
    id: 4,
    platform: "youtube",
    author: "Digital Marketing Pro",
    handle: "@digitalmarketingpro",
    text: "I tested 5 social listening tools and Garage Listen came out on top for sentiment accuracy. BUT the UI is clunky on mobile and the onboarding is confusing.",
    sentiment: "negative",
    time: "3h ago",
    read: true,
    archived: false,
    assignee: "Alice",
  },
  {
    id: 5,
    platform: "twitter",
    author: "James Okafor",
    handle: "@jamesokafor_io",
    text: "The alert system in @GarageListen just saved us from a PR crisis. Their sentiment spike detection is 🔥. Highly recommend.",
    sentiment: "positive",
    time: "5h ago",
    read: true,
    archived: false,
    assignee: null,
  },
  {
    id: 6,
    platform: "linkedin",
    author: "Priya Mehta",
    handle: "Priya Mehta",
    text: "We've been using Garage Listen for 3 months and our response time to customer mentions has improved by 60%. The crisis alert feature is a game-changer for brand managers.",
    sentiment: "positive",
    time: "8h ago",
    read: true,
    archived: false,
    assignee: null,
  },
  {
    id: 7,
    platform: "reddit",
    author: "u/growthmarketer99",
    handle: "u/growthmarketer99",
    text: "Garage Listen's export feature is broken for me — tries to download CSV but nothing happens. Anyone else facing this?",
    sentiment: "negative",
    time: "1d ago",
    read: false,
    archived: false,
    assignee: null,
  },
];

const teamMembers = ["Alice", "Bob", "Charlie", "Diana"];

const tabs = [
  { id: "all", label: "All", icon: Inbox },
  { id: "unread", label: "Unread", icon: MessageSquare },
  { id: "assigned", label: "Assigned", icon: UserCheck },
  { id: "archived", label: "Archived", icon: Archive },
];

export function UnifiedInboxPage() {
  const [items, setItems] = useState<InboxItem[]>(initialInboxItems);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [replyOpen, setReplyOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InboxItem | null>(null);
  const [replyText, setReplyText] = useState("");
  const [assignee, setAssignee] = useState("");

  const unreadCount = items.filter((i) => !i.read && !i.archived).length;

  const filteredItems = items.filter((item) => {
    const matchSearch =
      !searchQuery ||
      item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.handle.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "unread") return !item.read && !item.archived && matchSearch;
    if (activeTab === "assigned") return !!item.assignee && !item.archived && matchSearch;
    if (activeTab === "archived") return item.archived && matchSearch;
    return !item.archived && matchSearch;
  });

  const markAsRead = (id: number) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, read: true } : i)));
  };

  const handleArchive = (item: InboxItem) => {
    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, archived: true } : i)));
    toast.success("Mention archived");
  };

  const handleMarkAllRead = () => {
    setItems((prev) => prev.map((i) => ({ ...i, read: true })));
    toast.success("All mentions marked as read");
  };

  const openReply = (item: InboxItem) => {
    setSelectedItem(item);
    markAsRead(item.id);
    setReplyOpen(true);
  };

  const openAssign = (item: InboxItem) => {
    setSelectedItem(item);
    setAssignee(item.assignee ?? "");
    setAssignOpen(true);
  };

  const handleSendReply = () => {
    if (!replyText.trim()) {
      toast.error("Reply cannot be empty");
      return;
    }
    toast.success(`Reply sent to ${selectedItem?.handle}`);
    setReplyText("");
    setReplyOpen(false);
  };

  const handleAssign = () => {
    if (!assignee) {
      toast.error("Select a team member");
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === selectedItem?.id ? { ...i, assignee } : i))
    );
    toast.success(`Assigned to ${assignee}`);
    setAssignOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900 dark:text-white mb-2 flex items-center gap-3">
            <Inbox className="w-8 h-8 text-primary" />
            Unified Inbox
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            All mentions from every platform in one place — reply, assign, and manage.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" className="gap-2" onClick={handleMarkAllRead}>
              <CheckCheck className="w-4 h-4" />
              Mark All Read
            </Button>
          )}
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Mentions", value: items.filter((i) => !i.archived).length, color: "text-primary" },
          { label: "Unread", value: items.filter((i) => !i.read && !i.archived).length, color: "text-error-500" },
          { label: "Assigned", value: items.filter((i) => !!i.assignee && !i.archived).length, color: "text-accent-600" },
          { label: "Archived", value: items.filter((i) => i.archived).length, color: "text-gray-500" },
        ].map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search + Tabs */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search mentions, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 dark:bg-slate-800 rounded-lg p-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const count =
                  tab.id === "unread"
                    ? items.filter((i) => !i.read && !i.archived).length
                    : undefined;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                    {count !== undefined && count > 0 && (
                      <span className="ml-1 bg-error-500 text-white text-xs rounded-full px-1.5 py-0.5">
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inbox Items */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center justify-between">
            <span>{filteredItems.length} mention{filteredItems.length !== 1 ? "s" : ""}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <Inbox className="w-12 h-12 mb-4 opacity-40" />
              <p className="text-lg font-medium">No mentions here</p>
              <p className="text-sm mt-1">
                {activeTab === "unread"
                  ? "You're all caught up!"
                  : activeTab === "archived"
                  ? "Nothing archived yet"
                  : "No mentions match your search"}
              </p>
            </div>
          ) : (
            <div className="divide-y dark:divide-slate-700">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => markAsRead(item.id)}
                  className={`p-5 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors cursor-pointer ${
                    !item.read ? "bg-blue-50/40 dark:bg-blue-900/10" : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Unread dot */}
                    <div className="mt-2 w-2 h-2 flex-shrink-0">
                      {!item.read && (
                        <span className="block w-2 h-2 bg-primary rounded-full" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center flex-wrap gap-2 mb-1">
                        <PlatformTag platform={item.platform} />
                        <span className="font-semibold text-sm text-gray-900 dark:text-white">
                          {item.author}
                        </span>
                        <span className="text-xs text-gray-400">{item.handle}</span>
                        <span className="text-xs text-gray-400">· {item.time}</span>
                        <SentimentBadge sentiment={item.sentiment} size="sm">
                          {item.sentiment}
                        </SentimentBadge>
                        {item.assignee && (
                          <Badge variant="outline" className="text-xs">
                            Assigned: {item.assignee}
                          </Badge>
                        )}
                        {!item.read && (
                          <Badge className="text-xs bg-primary text-white">New</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                        {item.text}
                      </p>
                    </div>

                    {/* Actions */}
                    <div
                      className="flex items-center gap-1 flex-shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        size="sm"
                        variant="ghost"
                        className="gap-1 text-xs h-8"
                        onClick={() => openReply(item)}
                      >
                        <Reply className="w-3.5 h-3.5" />
                        Reply
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="gap-1 text-xs h-8"
                        onClick={() => openAssign(item)}
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        Assign
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="gap-1 text-xs h-8 text-gray-400 hover:text-gray-600"
                        onClick={() => handleArchive(item)}
                      >
                        <Archive className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reply Dialog */}
      <Dialog open={replyOpen} onOpenChange={setReplyOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Reply to {selectedItem?.handle}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {selectedItem && (
              <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-lg text-sm text-gray-600 dark:text-gray-400 italic border-l-4 border-primary">
                "{selectedItem.text.slice(0, 120)}..."
              </div>
            )}
            <div className="space-y-2">
              <Label>Your Reply</Label>
              <textarea
                className="w-full p-3 rounded-lg border border-gray-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                rows={4}
                placeholder={`Write a reply to ${selectedItem?.handle}...`}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
            </div>
            <p className="text-xs text-gray-500">
              This will be sent via your connected {selectedItem?.platform} account.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReplyOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-primary" onClick={handleSendReply}>
              <Reply className="w-4 h-4 mr-2" />
              Send Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Dialog */}
      <Dialog open={assignOpen} onOpenChange={setAssignOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Assign Mention</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Assign this mention from <strong>{selectedItem?.handle}</strong> to a team member.
            </p>
            <div className="space-y-2">
              <Label>Team Member</Label>
              <Select value={assignee} onValueChange={setAssignee}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a member..." />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-primary" onClick={handleAssign}>
              <UserCheck className="w-4 h-4 mr-2" />
              Assign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
