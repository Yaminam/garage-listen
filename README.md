# Garage Listen

A social listening and brand intelligence SaaS frontend built with React 19, TypeScript, and Tailwind CSS v4.

---

## Project Purpose

Garage Listen helps brands and teams:

- Monitor mentions across multiple platforms
- Analyze sentiment and emotional signals
- Track competitor performance
- Discover emerging trends
- Detect and manage crisis situations
- Generate professional reports
- Chat with an AI assistant about their data
- Manage multi-workspace environments

> This repository contains the complete frontend implementation only. No backend or real API integrations are included.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 (class-based dark mode) |
| UI Primitives | Radix UI |
| Icons | Lucide React |
| Charts | Recharts 2.15.2 |
| Animations | Motion (Framer Motion) |
| Toasts | Sonner |
| Build | Vite 6 |
| State | React Context API |
| Drag & Drop | react-dnd |
| Forms | react-hook-form |

---

## Getting Started

**Prerequisites:** Node.js 18+, npm 9+

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`

---

## Route Structure

```
/                          → Redirect to /auth/login
/auth/login                → Login
/auth/signup               → Sign up
/auth/forgot-password      → Forgot password
/auth/reset-password       → Reset password

/onboarding                → Protected — 9-step onboarding wizard

/dashboard                 → Home overview
/dashboard/listening       → Social Listening feed
/dashboard/inbox           → Unified Inbox
/dashboard/sentiment       → Sentiment Analytics
/dashboard/competitors     → Competitor Monitoring
/dashboard/trends          → Trend Discovery
/dashboard/alerts          → Alerts & Crisis
/dashboard/reports         → Report Builder
/dashboard/settings        → Settings
/dashboard/ask-ai          → AI Insights Chat
```

---

## Project Structure

```
src/
├── main.tsx
├── app/
│   ├── App.tsx
│   ├── routes.tsx
│   ├── components/
│   │   ├── figma/
│   │   │   └── ImageWithFallback.tsx
│   │   ├── ui/               ← shadcn/Radix UI components
│   │   ├── ProtectedRoute.tsx
│   │   └── ThemeToggle.tsx
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   │   ├── NotificationContext.tsx
│   │   ├── SavedSearchContext.tsx
│   │   ├── MentionsContext.tsx
│   │   └── WorkspaceContext.tsx
│   ├── layouts/
│   │   ├── AuthLayout.tsx
│   │   └── DashboardLayout.tsx
│   ├── lib/
│   │   └── validation.ts     ← shared validation utilities
│   └── pages/
│       ├── auth/
│       │   ├── LoginPage.tsx
│       │   ├── SignupPage.tsx
│       │   ├── ForgotPasswordPage.tsx
│       │   └── ResetPasswordPage.tsx
│       ├── onboarding/
│       │   └── OnboardingPage.tsx
│       └── dashboard/
│           ├── DashboardHome.tsx
│           ├── SocialListeningPage.tsx
│           ├── UnifiedInboxPage.tsx
│           ├── SentimentAnalyticsPage.tsx
│           ├── CompetitorMonitoringPage.tsx
│           ├── TrendDiscoveryPage.tsx
│           ├── AlertsCrisisPage.tsx
│           ├── ReportBuilderPage.tsx
│           ├── SettingsPage.tsx
│           └── AIChatPage.tsx
└── styles/
    ├── fonts.css
    ├── index.css
    ├── tailwind.css
    └── theme.css
```

---

## Feature Overview

### Authentication & User Flow

- Email / password login and signup with full inline validation
- Google OAuth (mock flow)
- 4-bar password strength meter on signup and reset password
- Confirm password match indicator
- Per-field error messages with AlertCircle icons
- Loading spinner state on all form submissions
- Forgot password flow with success confirmation screen
- Persistent auth via localStorage (authToken, authUser, onboardingCompleted)
- ProtectedRoute enforces the onboarding gate — authenticated users without completed onboarding are redirected to /onboarding before accessing any dashboard route

### Shared Validation (src/app/lib/validation.ts)

Utilities used across all auth and onboarding forms:

- `validateEmail(email)` — RFC-compliant regex check
- `validateRequired(value, label)` — empty / whitespace check
- `validateMinLength(value, min, label)`
- `validatePasswordMatch(password, confirm)`
- `getPasswordStrength(password)` → `{ score: 0–4, label, color, textColor }` (Tailwind classes)
- `FieldErrors<T>` generic type
- `hasErrors(errors)`

### Auth Context (AuthContext.tsx)

| Export | Description |
|---|---|
| `AuthUser` | `{ email, firstName, lastName, company }` |
| `isAuthenticated` | boolean, localStorage-backed |
| `onboardingCompleted` | boolean, localStorage-backed |
| `user` | `AuthUser or null` |
| `login()` | sets auth flag |
| `register(user, password)` | stores AuthUser and sets auth |
| `completeOnboarding()` | sets onboarding flag |
| `logout()` | clears all auth state from localStorage |

### 9-Step Onboarding Wizard

Sidebar + main content layout.

**Layout:**
- Fixed left sidebar (hidden on mobile): logo, icon-based step list with completed/current/future states, progress bar + percentage
- Step states: completed (emerald checkmark), current (violet highlight + dot indicator), future (dimmed)
- Mobile top bar: "Step X/9" pill + thin fill bar
- Step header above card: icon badge, step title, description
- Content wrapped in a white rounded-2xl shadow card

**Steps:**
1. Account Info
2. Brand Setup
3. Hashtags & Keywords
4. Competitors
5. Platform Selection
6. Region & Language
7. Monitoring Goals
8. Connect Accounts
9. Setup Complete

Inline validation with `tried` state — errors shown only after the user attempts to proceed.

### Dashboard Modules

| Page | Key Features |
|---|---|
| Dashboard Home | KPI cards, 30-day trend chart, recent mentions feed |
| Social Listening | Mention feed, filters, detail drawer, saved searches |
| Unified Inbox | Tabs by platform, reply/assign/archive, unread badges |
| Sentiment Analytics | Pie + bar + line charts, emotion distribution |
| Competitor Monitoring | Side-by-side competitor metrics, share-of-voice |
| Trend Discovery | Trending hashtags, topic clusters |
| Alerts & Crisis | Crisis severity levels, alert queue |
| Report Builder | Section builder, export options |
| Settings | Profile, notifications, team, billing, integrations |
| AI Insights Chat | Keyword-matched AI assistant for data queries |

### AI Insights Chat (/dashboard/ask-ai)

- User / AI chat bubbles with distinct avatars
- Keyword-matching responses covering: sentiment, mentions, competitors, trends, alerts, reports, keywords/hashtags, influencers, platforms
- 3-dot typing indicator
- Suggested question chips (hidden after first exchange)
- Per-AI-message: Copy, ThumbsUp, ThumbsDown (toggleable)
- Enter to send, Shift+Enter for newline
- Auto-scroll to bottom and clear chat button
- Message renderer: bold, inline code, bullet lists, numbered lists, table rows

### Notifications

- Real-time notification queue (Info, Warning, Error, Success)
- Auto-dismiss after 5 seconds
- Mark as read, remove individual, clear all
- Unread count badge in sidebar

### Filtering & Saved Searches

- Filter by: Sentiment, Platform, Date Range, Language, Engagement, Keyword
- Apply / Reset controls
- Save, load, and delete filter combinations
- Persisted via SavedSearchContext (localStorage)

### Role-Based Access Control

| Role | Access Level |
|---|---|
| Admin | Full system access |
| Team Lead | Team & reporting access |
| Analyst | Analytics & export access |
| Viewer | Read-only access |

### Theme System

- Light / Dark mode toggle
- ThemeContext toggles `dark` class on root element
- Tailwind `darkMode: 'class'` configuration
- Theme preference persisted in localStorage

### Multi-Workspace Support

- WorkspaceSwitcher in sidebar
- Workspace metadata: name, member count, plan type, color avatar
- Create new workspace
- State managed via WorkspaceContext

### Charts (Recharts)

- Sentiment distribution — Pie
- Platform distribution — Bar
- 30-day mention trend — Line
- Engagement breakdown — Bar
- Fully responsive with interactive tooltips

### Loading & Empty States

- LoadingSpinner (3 sizes)
- Skeleton loaders for card, chart, and feed
- Generic EmptyState and specialized EmptyFeedState components

### UI Motion

- Fade + scale card animations
- Staggered entrance sequences
- Pulse indicators for live data
- Shimmer loading effects
- Motion wrappers: fadeIn, slideInUp, slideInDown, scaleIn

---

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile: iOS 12+, Android 5+

---

## Performance Notes

- Route-based code splitting via React Router
- Chart responsiveness optimized per container
- Animation durations controlled to avoid layout thrash
- Virtualization recommended for 1000+ mention items
