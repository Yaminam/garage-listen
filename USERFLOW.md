# Garage Listen — User Flow

## Overview

Garage Listen is a social listening SaaS. Below is the complete end-to-end flow a user goes through from first visit to daily use.

---

## 1. First Visit — Authentication

```
User visits app
      │
      ▼
/auth/login  (default redirect from /)
      │
  ┌───┴───────────────────┐
  │                       │
New user             Returning user
  │                       │
  ▼                       ▼
/auth/signup         Enter email + password
  │                       │
Fill name,               Click "Log In"
email, password           │
  │                       ▼
Click "Sign Up"      → /onboarding  (if onboarding not done)
  │                  → /dashboard   (if onboarding done)
  ▼
/auth/verify-email
  │
  ▼
Verify email link
  │
  ▼
/onboarding
```

**Other auth paths:**
- Forgot password → `/auth/forgot-password` → enter email → get reset link
- Reset password → `/auth/reset-password` → enter new password → redirects to login

---

## 2. Onboarding (8 Steps — First-time only)

After signup, every new user must complete onboarding before accessing the dashboard.

```
Step 1 — Account Info
  Enter: Full Name, Job Title, Company Name, Company Size
        │
        ▼
Step 2 — Brand Setup
  Enter: Brand Name, Website, Industry, Brand Description
        │
        ▼
Step 3 — Competitors
  Add: Competitor names/websites (up to 5)
        │
        ▼
Step 4 — Platforms
  Select: Twitter, Instagram, YouTube, News, Reddit, LinkedIn, TikTok, Facebook
        │
        ▼
Step 5 — Region & Language
  Select: Regions to monitor + primary language
        │
        ▼
Step 6 — Goals
  Choose: Primary objectives (Brand awareness, Crisis management, etc.)
        │
        ▼
Step 7 — Connect Accounts (optional)
  Connect: Social media accounts via OAuth
  OR skip this step
        │
        ▼
Step 8 — Done ✓
  Live 3-second countdown shown
  Auto-redirects → /dashboard after 3 seconds
  OR click "Go to Dashboard Now" to skip countdown
```

> Onboarding cannot be skipped. Users who try to access `/dashboard` directly are redirected to `/onboarding` first.

---

## 3. Dashboard — Main Navigation

Once inside the dashboard, users navigate via the left sidebar (desktop) or hamburger menu (mobile). All routes are protected — unauthenticated users are sent back to `/auth/login`.

```
/dashboard                    → Home (KPIs, charts, recent mentions)
/dashboard/listening          → Social Listening (mentions feed + search)
/dashboard/sentiment          → Sentiment Analytics (trend charts)
/dashboard/competitors        → Competitor Monitoring (share of voice)
/dashboard/trends             → Trend Discovery (rising keywords)
/dashboard/alerts             → Alerts & Crisis Management
/dashboard/reports            → Report Builder
/dashboard/settings           → Account Settings
```

---

## 4. Page-by-Page User Flows

---

### 4a. Dashboard Home `/dashboard`

```
User lands on home
      │
      ▼
Views KPI cards (Total Mentions, Sentiment Score, Share of Voice, Active Alerts)
      │
      ▼
Views charts (Mentions over time, Sentiment distribution, Platform breakdown)
      │
      ▼
Reviews "Trending Topics" table
      │
      ▼
Reviews "Recent Mentions" feed
      │
      ▼
Clicks any mention → opens mention drawer with full details
```

---

### 4b. Social Listening `/dashboard/listening`

```
User arrives at Social Listening
      │
      ▼
Types keyword in Search Builder (e.g. "Garage Listen")
      │
Clicks "Search"
      │
      ▼
Mention list filters in real time
      │
      ├─ Apply Platform filter  → list narrows to selected platform
      ├─ Apply Sentiment filter → list narrows to positive/neutral/negative
      ├─ Apply Date Range       → shows time-scoped results
      │
Active filter badges shown → click ✕ on any badge to remove that filter
Click "Clear all" → resets all filters
      │
      ▼
Views mentions in Card view or Table view (toggle top-right)
      │
Clicks any mention card
      │
      ▼
Mention detail drawer opens:
  - Full text
  - AI summary
  - Sentiment + emotion analysis
  - Engagement stats (likes, comments, shares, reach)
  - Tags
  - Actions: Add Tag / Export / Create Alert
      │
      ▼
Click "Export" (top-right header)
  → Downloads CSV of all currently filtered mentions
      │
      ▼
Click "Create Alert"
  → Dialog opens: enter alert name + keyword + trigger condition
  → Click "Create Alert" → success toast shown
```

---

### 4c. Sentiment Analytics `/dashboard/sentiment`

```
User arrives at Sentiment Analytics
      │
      ▼
Views summary cards (Overall Sentiment Score, Positive %, Negative %)
      │
      ▼
Reviews Sentiment Trend chart (area chart — positive/neutral/negative over time)
      │
      ▼
Reviews Emotion Breakdown (bar chart — joy, trust, surprise, sadness, anger)
      │
      ▼
Reviews Platform Sentiment comparison (grouped bars per platform)
      │
      ▼
Reviews Region Sentiment (table — North America, Europe, Asia, etc.)
      │
      ▼
Reviews Sentiment Drivers (topics driving positive/negative change)
```

---

### 4d. Competitor Monitoring `/dashboard/competitors`

```
User arrives at Competitor Monitoring
      │
      ▼
Views Share of Voice overview cards (your brand % vs competitors)
      │
      ▼
Uses top-right dropdown to filter by specific competitor (or "All")
      │
      ▼
Reviews Share of Voice line chart (your brand vs Competitors A/B/C over 7 days)
      │
      ▼
Reviews Competitor Metrics table
  (Mentions, Sentiment score, Engagement, Growth trend — per competitor)
      │
      ▼
Reviews Top Mentions per Competitor
  (sample mentions for each competitor with sentiment badges)
```

---

### 4e. Trend Discovery `/dashboard/trends`

```
User arrives at Trend Discovery
      │
      ▼
Views summary cards (Trending Topics count, Highest Growth Rate)
      │
      ▼
Reviews Rising Keywords list (ranked by growth %, with forecast)
      │
      ▼
Reviews Topic Clusters (AI-grouped keyword buckets)
      │
      ▼
Reviews Mention Forecast chart (actual data + projected future line)
```

---

### 4f. Alerts & Crisis Management `/dashboard/alerts`

```
User arrives at Alerts
      │
      ├─ View live counts: Critical / Active / Resolved alerts (update as alerts change)
      │
      ▼
Reviews Active Alerts list
      │
      ├─ Click "View Details" → expands inline detail panel with context
      │
      ├─ Click "Resolve" (on active alert)
      │       → Alert status changes to Resolved
      │       → Count cards update immediately
      │       → Toast: "Alert marked as resolved"
      │
      ├─ Click "Create Alert" (top-right)
      │       → Dialog opens:
      │           • Alert Name
      │           • Alert Type (Sentiment / Volume / Influencer)
      │           • Condition / Threshold
      │       → Click "Create Alert"
      │       → New alert row added to list
      │       → Toast: "Alert created"
      │
      ▼
Reviews Crisis Timeline chart (sentiment vs mention volume over time)
      │
      ▼
Reviews Top Negative Sources
      │
      ▼
AI Suggested Actions panel:
  ├─ Check/uncheck individual actions
  └─ Click "Execute Actions" → marks all unchecked as done + toast
      │
      ▼
Alert Configuration toggles:
  ├─ Sentiment Threshold Alert (on/off) → toast on change
  ├─ Volume Spike Alert (on/off) → toast on change
  └─ Influencer Mention Alert (on/off) → toast on change
```

---

### 4g. Report Builder `/dashboard/reports`

```
User arrives at Report Builder
      │
      ▼
Configures report:
  ├─ Select Date Range (Last 7 Days / 30 Days / Quarter / Custom)
  ├─ Select Platforms (checkboxes: Twitter, Instagram, YouTube, News, Reddit, LinkedIn)
  └─ Select Report Modules (Executive Overview, Sentiment, Top Mentions, Trends, Competitors, Platforms)
      │
      ▼
Preview panel on the right updates live as modules are checked/unchecked
      │
      ▼
Optionally toggle "Schedule Email Delivery"
  └─ If ON: enter frequency (Daily/Weekly/Monthly) + recipient emails
      │
      ▼
User actions:
  ├─ Click "Generate Report"
  │       → Loading toast → success toast with module/platform count
  │
  ├─ Click "Email Report"
  │       → Validates recipients → "Report scheduled" toast
  │
  └─ Click PDF / Excel / PPT (export format buttons)
          → Loading toast → download toast per format
```

---

### 4h. Settings `/dashboard/settings`

Five tabs, each independently functional:

```
[Profile Tab]
  ├─ Edit First Name, Last Name, Email, Company
  ├─ Click "Save Changes" → success toast
  ├─ Click "Change Photo" → (UI only)
  ├─ Enter Current / New / Confirm Password
  └─ Click "Update Password" → validates all fields → success toast

[Team Tab]
  ├─ View team members table (Name, Email, Role, Status)
  ├─ Change role via dropdown (Admin/Editor/Viewer) per member
  ├─ Click trash icon → removes member from table → success toast
  ├─ Type email in "Add Member" input → press Enter or click "Add Member"
  └─ New row appears in table with status "Pending" → invite sent toast

[API Keys Tab]
  ├─ Toggle Show/Hide API key
  ├─ Click Copy icon → copies to clipboard → toast
  ├─ Click "Generate Key" → creates new key + copies to clipboard → toast
  └─ "Connect" buttons for Twitter/Instagram/YouTube APIs

[Billing Tab]
  ├─ View current plan usage (progress bar)
  ├─ Click "Change Plan" / "Upgrade" (UI feedback)
  ├─ Click "Update" payment method (UI feedback)
  └─ Click "Download" on invoice rows → download-progress toast per invoice

[Notifications Tab]
  ├─ Toggle Alert Notifications (email)
  ├─ Toggle Weekly Report (email)
  ├─ Toggle Product Updates (email)
  ├─ Toggle Browser Notifications
  └─ Toggle Mobile Notifications
```

---

## 5. Global UI Behaviors

| Behavior | How it works |
|----------|-------------|
| **Dark Mode** | Moon/Sun icon in top header — toggles `.dark` class on `<html>`, persists to `localStorage` |
| **Toast notifications** | All actions (save, resolve, copy, export, etc.) show toasts top-right via Sonner |
| **404 Page** | Any unknown URL (`/xyz`) renders a friendly 404 page with links back to Dashboard or Login |
| **Protected Routes** | All `/dashboard/*` and `/onboarding` routes require authentication; unauthenticated users redirect to `/auth/login` |
| **Logout** | User dropdown (top-right avatar) → "Log out" → clears auth state → redirects to `/auth/login` |
| **Mobile Sidebar** | Hamburger icon shown on screens < lg; tapping it slides in a full-height sidebar overlay |
| **Header Search** | Search bar in top header (UI present — connects to Social Listening search in a future version) |

---

## 6. Error & Edge Case Flows

```
Unknown URL
  → /404 page with "Go to Dashboard" and "Back to Login" buttons

Not authenticated → tries to access /dashboard
  → Redirected to /auth/login

Empty search results on Social Listening
  → Empty state shown: "No mentions found. Try adjusting your search or filters."

Form validation failures (Settings, Create Alert, Report Builder)
  → Error toast shown inline (e.g. "Passwords do not match", "Please fill in all fields")

Onboarding incomplete → tries to access /dashboard
  → Redirected to /onboarding
```

---

## 7. Simplified Flow Diagram

```
[Visit App]
     │
     ▼
[Login / Signup]
     │
     ├── New User ──────────────────► [8-Step Onboarding] ──► [Dashboard]
     │                                                              │
     └── Returning User ────────────────────────────────────► [Dashboard]
                                                                    │
                         ┌──────────────────────────────────────────┤
                         │                                          │
                    [Sidebar Nav]                          [Header Actions]
                         │                                          │
          ┌──────────────┼──────────────┐              ┌───────────┼──────────┐
          │              │              │              │           │          │
    [Listening]   [Sentiment]  [Competitors]     [Dark Mode]  [Profile]  [Logout]
    [Trends]      [Alerts]     [Reports]
    [Settings]
```
