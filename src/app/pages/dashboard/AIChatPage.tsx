import { useState, useRef, useEffect } from "react";
import {
  Bot,
  Send,
  User,
  Sparkles,
  RefreshCw,
  Copy,
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
  BarChart2,
  TrendingUp,
  MessageSquare,
  AlertTriangle,
  FileText,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { toast } from "sonner";
import { cn } from "../../components/ui/utils";

// ── Types ──────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  liked?: boolean | null;
}

// ── Smart mock AI brain ────────────────────────────────────────────────────
const CANNED: Array<{ patterns: RegExp[]; reply: string }> = [
  {
    patterns: [/sentiment/i, /positive|negative|neutral/i],
    reply: `**Sentiment Summary — Last 7 Days**

Your overall sentiment score is **72% positive** 📈, up from 64% the previous week.

| Sentiment | Share | Change |
|-----------|-------|--------|
| Positive  | 72 %  | +8 pp  |
| Neutral   | 18 %  | -3 pp  |
| Negative  | 10 %  | -5 pp  |

**Top positive drivers:** product launch coverage, influencer mentions, customer support praise.
**Watch:** a small spike in negative mentions around shipping delays appeared Wednesday — 43 posts, mostly on Twitter.`,
  },
  {
    patterns: [/mention/i, /how many/i, /volume/i],
    reply: `**Mention Volume — Last 30 Days**

You received **12,847 total mentions** across all platforms this month.

- 🐦 Twitter/X — 5,210 (40.5 %)
- 📸 Instagram — 3,102 (24.1 %)
- 🔴 Reddit — 2,441 (19.0 %)
- ▶️ YouTube — 1,204 (9.4 %)
- 💼 LinkedIn — 890 (6.9 %)

Peak day: **February 14th** with 892 mentions (Valentine's Day campaign).
Average daily volume: **415 mentions/day**.`,
  },
  {
    patterns: [/competitor|competition|vs\b|compare/i],
    reply: `**Competitor Share of Voice — This Week**

| Brand          | Share of Voice | Sentiment | Trend   |
|----------------|---------------|-----------|---------|
| 🟢 Your Brand  | **28.4 %**     | 72 % pos  | ↑ +3.1% |
| Nike           | 24.1 %         | 68 % pos  | → flat  |
| Adidas         | 19.8 %         | 71 % pos  | ↓ -1.2% |
| Puma           | 15.6 %         | 65 % pos  | ↑ +0.8% |
| Under Armour   | 12.1 %         | 63 % pos  | ↓ -2.7% |

**You lead share of voice this week** — driven by the sustainability campaign and a Reddit AMA that generated 847 comments.`,
  },
  {
    patterns: [/trend|trending|viral/i],
    reply: `**Trending Topics Around Your Brand — Today**

1. 🔥 **#SustainableFashion** — 3,241 mentions, +180 % vs last week
2. 📦 **Shipping delays** — 892 mentions, negative sentiment, needs attention
3. 🎯 **Spring collection** — 2,107 mentions, 89 % positive
4. 💚 **Eco packaging** — 1,543 mentions, 94 % positive
5. 🤝 **Brand collab** — 677 mentions, mostly curiosity/neutral

**Emerging:** "carbon neutral pledge" started appearing in 230+ posts today — worth monitoring as it could escalate positively or negatively depending on competitor moves.`,
  },
  {
    patterns: [/alert|crisis|urgent|spike/i],
    reply: `**Active Alerts — Right Now**

🔴 **Critical (1)**
- Shipping delay complaints up 340 % in 4 hours — 212 posts on Twitter. Potential PR issue if unaddressed.

🟡 **Warning (2)**
- Negative review thread on Reddit r/frugalmalefashion gaining traction (89 upvotes, 34 comments).
- Influencer @stylewatch posted a mixed review — 18K impressions so far.

🟢 **Informational (3)**
- Brand mention milestone: 10,000th Instagram tag this month.
- New market — mentions from Australia up 45 % this week.
- Spring campaign hashtag trending in top 10 in the UK.

No reputation crisis detected. Recommend responding to the shipping delay thread within 2 hours.`,
  },
  {
    patterns: [/report|summary|weekly|monthly|generate/i],
    reply: `**Auto-Generated Report Snapshot — February 2026**

📊 **Key Metrics**
- Total Mentions: 12,847 (+18 % MoM)
- Avg Sentiment Score: 72 % positive (+8 pp)
- Share of Voice: 28.4 % (industry leading)
- Engagement Rate: 4.2 % avg across platforms
- Response Rate: 67 % (target: 80 %)

📋 **Highlights**
1. Valentine's Day campaign drove single-day peak of 892 mentions
2. Sustainability content outperformed all other content categories (94 % positive)
3. LinkedIn engagement grew 34 % — B2B audience responding to ESG messaging

⚠️ **Action Items**
- Address shipping delay feedback (high priority)
- Publish response to negative Reddit thread
- Schedule Q1 wrap-up report for March 5th

Want me to generate the full PDF report or drill into a specific section?`,
  },
  {
    patterns: [/top keyword|keyword|best hashtag|hashtag/i],
    reply: `**Top Keywords & Hashtags — Last 14 Days**

**Branded keywords:**
1. \`[your brand name]\` — 8,420 mentions
2. \`spring collection\` — 2,107 mentions
3. \`sustainable fashion\` — 3,241 mentions

**Top hashtags:**
1. \`#SustainableFashion\` — 3,241 posts, 94 % positive
2. \`#SpringVibes\` — 1,890 posts
3. \`#EcoFriendly\` — 1,543 posts
4. \`#OOTD\` — 1,102 posts (organic, not campaign-driven)
5. \`#NewCollection\` — 877 posts

**Declining:** \`#WinterSale\` down 89 % (expected seasonal drop).
**Rising:** \`#CarbonNeutral\` +230 % this week — early signal to monitor.`,
  },
  {
    patterns: [/influencer|creator|partner/i],
    reply: `**Top Influencers Mentioning Your Brand — This Month**

| Handle           | Platform   | Followers | Sentiment | Reach Est. |
|------------------|-----------|-----------|-----------|------------|
| @sustainstyle    | Instagram  | 892K      | Positive  | 2.1M       |
| @fashionforward  | TikTok     | 1.2M      | Positive  | 4.4M       |
| @stylewatch      | YouTube    | 445K      | Mixed     | 890K       |
| @ecoliving       | Twitter    | 234K      | Positive  | 560K       |
| @trendsetterUK   | Instagram  | 312K      | Positive  | 780K       |

**Recommendation:** Engage @stylewatch — their mixed review has 18K impressions and a genuine response from your brand could turn it into a positive story. DM template ready in your Inbox.`,
  },
  {
    patterns: [/platform|twitter|instagram|reddit|youtube|linkedin|tiktok/i],
    reply: `**Platform Performance Breakdown — Last 30 Days**

| Platform   | Mentions | Sentiment | Eng. Rate | Best Content Type   |
|-----------|---------|-----------|-----------|---------------------|
| Twitter/X  | 5,210    | 68 % pos  | 3.8 %     | Campaign hashtags   |
| Instagram  | 3,102    | 81 % pos  | 5.9 %     | Visual/UGC          |
| Reddit     | 2,441    | 58 % pos  | 6.4 %     | AMA & long-form     |
| YouTube    | 1,204    | 74 % pos  | 4.1 %     | Unboxing/reviews    |
| LinkedIn   | 890      | 89 % pos  | 7.2 %     | ESG & B2B messaging |
| TikTok     | 0        | —         | —         | Not yet tracked     |

**Insight:** LinkedIn has the highest engagement rate and nearly all-positive sentiment. Consider increasing B2B content frequency. TikTok is untracked — recommend adding it to your listening setup.`,
  },
  {
    patterns: [/hello|hi\b|hey|good morning|good afternoon|whats up/i],
    reply: `Hey there! 👋 I'm your **Garage Listen AI assistant**.

I have full access to your brand's social data, reports, and analytics. Ask me anything like:

- *"What's my sentiment score this week?"*
- *"Which competitor is gaining on me?"*
- *"Show me trending keywords"*
- *"Any active alerts I should know about?"*
- *"Give me a monthly summary"*

What would you like to know?`,
  },
];

function generateReply(input: string): string {
  const trimmed = input.trim();
  for (const { patterns, reply } of CANNED) {
    if (patterns.some((p) => p.test(trimmed))) return reply;
  }
  // Generic fall-through
  return `I've analysed your data based on: **"${trimmed}"**

Here's what I found:

- **Mentions this week:** 3,214 (↑ 12 % vs last week)
- **Avg sentiment:** 72 % positive
- **Top platform for this topic:** Twitter/X (38 % of volume)
- **Relevant alert:** No active crisis detected

For a deeper breakdown, try asking something like:
- *"Show me sentiment details"*
- *"What are my top trending keywords?"*
- *"Compare me against competitors"*

Is there a specific metric you'd like to drill into?`;
}

// ── Suggestion pills ───────────────────────────────────────────────────────
const SUGGESTIONS = [
  { label: "Weekly sentiment summary", icon: TrendingUp },
  { label: "How many mentions this month?", icon: BarChart2 },
  { label: "Competitor share of voice", icon: Users },
  { label: "Any active alerts?", icon: AlertTriangle },
  { label: "Top trending keywords", icon: Sparkles },
  { label: "Generate monthly report", icon: FileText },
  { label: "Which platform performs best?", icon: MessageSquare },
];

function Users(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

// ── Markdown-like renderer (basic bold/table) ──────────────────────────────
function RenderMessage({ content }: { content: string }) {
  const lines = content.split("\n");
  return (
    <div className="space-y-1 text-sm leading-relaxed">
      {lines.map((line, i) => {
        // Table row
        if (line.trim().startsWith("|")) {
          const cells = line.split("|").filter((c) => c.trim() !== "");
          const isSep = cells.every((c) => /^[-:\s]+$/.test(c));
          if (isSep) return null;
          return (
            <div key={i} className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cells.length}, minmax(0,1fr))` }}>
              {cells.map((cell, j) => (
                <span key={j} className="truncate text-xs px-1 py-0.5 rounded bg-gray-100 dark:bg-slate-700/60 font-mono" dangerouslySetInnerHTML={{ __html: boldify(cell.trim()) }} />
              ))}
            </div>
          );
        }
        // Heading
        if (line.startsWith("**") && line.endsWith("**")) {
          return <p key={i} className="font-semibold text-gray-900 dark:text-white mt-2" dangerouslySetInnerHTML={{ __html: boldify(line) }} />;
        }
        // Bullet
        if (line.startsWith("- ") || line.startsWith("* ")) {
          return <li key={i} className="ml-4 list-disc" dangerouslySetInnerHTML={{ __html: boldify(line.slice(2)) }} />;
        }
        // Numbered
        if (/^\d+\. /.test(line)) {
          return <li key={i} className="ml-4 list-decimal" dangerouslySetInnerHTML={{ __html: boldify(line.replace(/^\d+\. /, "")) }} />;
        }
        // Empty
        if (!line.trim()) return <div key={i} className="h-1" />;
        return <p key={i} dangerouslySetInnerHTML={{ __html: boldify(line) }} />;
      })}
    </div>
  );
}

function boldify(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code class='bg-gray-100 dark:bg-slate-700 px-1 rounded text-xs font-mono'>$1</code>")
    .replace(/_(.+?)_/g, "<em>$1</em>");
}

// ── Main Component ─────────────────────────────────────────────────────────
export function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hey there! 👋 I'm your **Garage Listen AI assistant**.

I have full access to your brand's social data, reports, and analytics. Ask me anything like:

- *"What's my sentiment score this week?"*
- *"Which competitor is gaining on me?"*
- *"Show me trending keywords"*
- *"Any active alerts I should know about?"*
- *"Give me a monthly summary"*

What would you like to know?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function handleSend(text?: string) {
    const content = (text ?? input).trim();
    if (!content || isTyping) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking delay
    const delay = 800 + Math.random() * 700;
    setTimeout(() => {
      const aiMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: generateReply(content),
        timestamp: new Date(),
        liked: null,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, delay);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleLike(id: string, val: boolean) {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, liked: m.liked === val ? null : val } : m)));
  }

  function handleCopy(content: string) {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard");
  }

  function handleClear() {
    setMessages([
      {
        id: "welcome-reset",
        role: "assistant",
        content: `Chat cleared! I'm ready for your next question.\n\nWhat would you like to know about your brand data?`,
        timestamp: new Date(),
      },
    ]);
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-gray-900 dark:text-white">AI Insights Chat</h1>
            <p className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              Connected to your live data
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={handleClear} className="gap-2 text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-white">
          <RefreshCw className="w-4 h-4" />
          Clear chat
        </Button>
      </div>

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 bg-gray-50 dark:bg-slate-900">
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex gap-3 max-w-4xl mx-auto", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
            {/* Avatar */}
            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1",
              msg.role === "assistant"
                ? "bg-gradient-to-br from-violet-500 to-indigo-600"
                : "bg-gradient-to-br from-gray-700 to-gray-900 dark:from-slate-600 dark:to-slate-800"
            )}>
              {msg.role === "assistant" ? (
                <Bot className="w-4 h-4 text-white" />
              ) : (
                <User className="w-4 h-4 text-white" />
              )}
            </div>

            {/* Bubble */}
            <div className={cn("flex flex-col gap-1 max-w-[80%]", msg.role === "user" ? "items-end" : "items-start")}>
              <div className={cn("rounded-2xl px-4 py-3",
                msg.role === "user"
                  ? "bg-violet-600 text-white rounded-tr-sm"
                  : "bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-slate-100 rounded-tl-sm shadow-sm"
              )}>
                {msg.role === "user" ? (
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                ) : (
                  <RenderMessage content={msg.content} />
                )}
              </div>

              {/* Actions row for AI messages */}
              {msg.role === "assistant" && msg.id !== "welcome" && msg.id !== "welcome-reset" && (
                <div className="flex items-center gap-1 px-1">
                  <button
                    onClick={() => handleCopy(msg.content)}
                    className="p-1 rounded hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
                    title="Copy"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleLike(msg.id, true)}
                    className={cn("p-1 rounded hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors", msg.liked === true ? "text-emerald-500" : "text-gray-400 hover:text-gray-600 dark:hover:text-white")}
                    title="Helpful"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleLike(msg.id, false)}
                    className={cn("p-1 rounded hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors", msg.liked === false ? "text-red-500" : "text-gray-400 hover:text-gray-600 dark:hover:text-white")}
                    title="Not helpful"
                  >
                    <ThumbsDown className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] text-gray-400 dark:text-slate-500 ml-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3 max-w-4xl mx-auto">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shrink-0 mt-1">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Suggestions (show only at start) ── */}
      {messages.length <= 2 && (
        <div className="px-4 py-3 bg-gray-50 dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs text-gray-500 dark:text-slate-500 mb-2 font-medium">Suggested questions</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  onClick={() => handleSend(label)}
                  disabled={isTyping}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Icon className="w-3 h-3" />
                  {label}
                  <ChevronRight className="w-3 h-3 opacity-50" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Input ── */}
      <div className="px-4 py-4 bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800 shrink-0">
        <div className="max-w-4xl mx-auto flex gap-3 items-end">
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about your brand data, sentiment, competitors, reports…"
              className="min-h-[44px] max-h-36 resize-none pr-4 bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 focus:border-violet-400 focus:ring-violet-400/20 rounded-xl text-sm transition-all"
              rows={1}
            />
          </div>
          <Button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="h-11 w-11 p-0 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-40 shrink-0 shadow-sm"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-center text-[11px] text-gray-400 dark:text-slate-600 mt-2">
          AI responses are based on your connected social listening data · Press Enter to send
        </p>
      </div>
    </div>
  );
}
