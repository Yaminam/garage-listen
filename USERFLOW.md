# Garage Listen — User Flow

> Complete journey from first visit through daily dashboard use.
> Every screen, input parameter, validation rule, routing guardrail, and component behaviour documented.

---

## Quick Reference — Route Map

```
/  ──────────────────────────────────────── → /auth/login (redirect)
│
├── /auth/login          ──[success]──────► /onboarding  (new user)
│                                        ► /dashboard    (returning user)
├── /auth/signup         ──[success]──────► /onboarding  (always)
├── /auth/forgot-password ─[submit]───────► success state (mock)
├── /auth/reset-password ──[success]──────► /auth/login
└── /auth/verify-email
│
├── /onboarding          ──[step 9 done]──► /dashboard
│     (ProtectedRoute: auth required)
│
└── /dashboard/*
      (ProtectedRoute: auth + onboarding required)
      ├── /dashboard
      ├── /dashboard/listening
      ├── /dashboard/inbox
      ├── /dashboard/sentiment
      ├── /dashboard/competitors
      ├── /dashboard/trends
      ├── /dashboard/alerts
      ├── /dashboard/reports
      ├── /dashboard/settings
      └── /dashboard/ask-ai
```

---

## 1. Root Entry

**Route:** `/`  
**Behaviour:** `<Navigate to="/auth/login" replace />`  
No component renders. Immediate redirect. No state, no parameters.

---

## 2. Login

**Route:** `/auth/login` · **Layout:** `AuthLayout` · **File:** `LoginPage.tsx`

### Fields & Parameters

| Field | Type | Required | Rule |
|---|---|---|---|
| `email` | string | ✅ | RFC format — `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/` |
| `password` | string | ✅ | Minimum 8 characters |

### Validation behaviour

- Runs on submit only (not on blur)
- Each field's error clears individually when the user starts typing in that field
- `AlertCircle` icon + red text shown inline below the invalid field
- Form-level `errors.form` slot available for auth-failure banners

### Loading state

| Duration | Button state |
|---|---|
| 800 ms simulated delay | `Loader2` spinner shown, button disabled |

### Submit flow

```
validate() passes?
  NO  → set per-field errors, stop
  YES → setLoading(true) → 800ms → login(email, password)
          └─► onboardingCompleted === true  → /dashboard
          └─► onboardingCompleted === false → /onboarding
```

### Additional interactions

- **Enter key** on any field → triggers submit
- **Google button** → calls `login()` directly (mock), same redirect logic
- **"Forgot password"** link → `/auth/forgot-password`
- **"Create an account"** link → `/auth/signup`

### AuthContext side-effect

`login()` sets `isAuthenticated = true` in state and `localStorage`.  
If no `authUser` stored, creates placeholder: `{ email, firstName: "User", lastName: "", company: "" }`.

---

## 3. Sign Up

**Route:** `/auth/signup` · **Layout:** `AuthLayout` · **File:** `SignupPage.tsx`

### Fields & Parameters

| Field | Type | Required | Rule |
|---|---|---|---|
| `firstName` | string | ✅ | Non-empty (trimmed) |
| `lastName` | string | ✅ | Non-empty (trimmed) |
| `company` | string | ✅ | Non-empty (trimmed) |
| `email` | string | ✅ | RFC email format |
| `password` | string | ✅ | Min 8 characters |
| `agreeTerms` | boolean | ✅ | Must be `true` |

### Validation behaviour

| Field | Function | Error message |
|---|---|---|
| firstName | `validateRequired()` | "First name is required" |
| lastName | `validateRequired()` | "Last name is required" |
| company | `validateRequired()` | "Company is required" |
| email | `validateEmail()` | "Enter a valid email address" |
| password | `validateMinLength(8)` | "Password must be at least 8 characters" |
| agreeTerms | `=== false` | "You must accept the terms to continue" |

### Password strength meter

Live 4-bar indicator powered by `getPasswordStrength()`. Scores based on:

| Criterion | Points |
|---|---|
| Length ≥ 8 | +1 |
| Length ≥ 12 | +1 |
| Mixed case (`/[A-Z]/` + `/[a-z]/`) | +1 |
| Contains digit | +1 |
| Contains special character | +1 |

| Score | Label | Bar colour |
|---|---|---|
| 0 | — | gray-200 |
| 1 | Weak | red-400 |
| 2 | Fair | orange-400 |
| 3 | Good | yellow-400 |
| 4 | Strong | emerald-500 |

### Submit flow

```
validate() passes?
  NO  → set per-field errors, stop
  YES → setLoading(true) → 900ms
          → register({ email, firstName, lastName, company }, password)
          → navigate("/onboarding")
```

`register()` stores `AuthUser` in state and `localStorage.authUser` as JSON, sets `isAuthenticated = true`.

---

## 4. Forgot Password

**Route:** `/auth/forgot-password` · **Layout:** `AuthLayout` · **File:** `ForgotPasswordPage.tsx`

### Fields

| Field | Type | Required | Rule |
|---|---|---|---|
| `email` | string | ✅ | RFC email format |

### UI states

| State | Trigger | UI shown |
|---|---|---|
| Initial | on load | Email input + "Send reset link" button |
| Loading | on submit | `Loader2` spinner, button disabled |
| Success | after delay | `MailCheck` icon, "Check your inbox", shows submitted email, "try again" link |

### Guardrails
- Empty / malformed email blocked before submit
- Success state is cosmetic — no real email sent (mock flow)
- "Try again" link resets to initial state

---

## 5. Reset Password

**Route:** `/auth/reset-password` · **Layout:** `AuthLayout` · **File:** `ResetPasswordPage.tsx`

### Fields

| Field | Type | Required | Rule |
|---|---|---|---|
| `newPassword` | string | ✅ | Min 8 characters |
| `confirmPassword` | string | ✅ | Must exactly equal `newPassword` |

### Validation

| Field | Function | Error |
|---|---|---|
| newPassword | `validateMinLength(8)` | "Password must be at least 8 characters" |
| confirmPassword | `validatePasswordMatch()` | "Passwords do not match" / "Please confirm your password" |

- Confirm field shows emerald `CheckCircle2` + "Passwords match" in real time when both fields match and are non-empty
- Live 4-bar strength meter on `newPassword` (same scoring as signup)

### Submit flow

```
validate() passes?
  NO  → show errors, stop
  YES → setLoading(true) → 800ms
          → toast.success("Password reset successfully!")
          → navigate("/auth/login")
```

---

## 6. Route Guard — ProtectedRoute

**File:** `ProtectedRoute.tsx`  
Applied to all `/onboarding` and `/dashboard/*` routes.

### Decision tree

```
ProtectedRoute renders
  │
  ├─ isAuthenticated === false
  │     └─► <Navigate to="/auth/login" replace />
  │
  └─ isAuthenticated === true
        ├─ onboardingCompleted=true  + pathname starts "/onboarding"
        │     └─► <Navigate to="/dashboard" replace />
        │
        ├─ onboardingCompleted=false + pathname starts "/dashboard"
        │     └─► <Navigate to="/onboarding" replace />
        │
        └─ all other cases
              └─► render children ✅
```

### Guardrail matrix

| isAuthenticated | onboardingCompleted | Destination | Result |
|---|---|---|---|
| `false` | any | any protected | → `/auth/login` |
| `true` | `true` | `/onboarding` | → `/dashboard` |
| `true` | `false` | `/dashboard/*` | → `/onboarding` |
| `true` | `true` | `/dashboard/*` | ✅ renders |
| `true` | `false` | `/onboarding` | ✅ renders |

Both flags hydrated from `localStorage` on app load — survive hard refresh.

---

## 7. Onboarding Wizard

**Route:** `/onboarding` · **File:** `OnboardingPage.tsx`  
**Guard:** ProtectedRoute (auth required, will redirect away if onboarding already done)

### Layout structure

```
<div min-h-screen flex>
  <aside w-72 lg:flex hidden>          ← sidebar: logo + step list + progress bar
  <main flex-1>
    [mobile] top bar: logo + Step X/9 pill + thin progress bar
    step header: icon badge + h1 title + description
    <div white card>
      step content (inputs, pickers, toggles)
      [error banner — only visible when tried=true and canProceed()=false]
    </div>
    navigation buttons: Back | Go to Dashboard Now | Continue →
  </main>
</div>
```

### Sidebar step states

| State | Visual |
|---|---|
| Completed (`currentStep > n`) | Emerald `CheckCircle` icon, full opacity |
| Current (`currentStep === n`) | Violet highlighted row + dot indicator + icon |
| Future (`currentStep < n`) | Icon + label at 40% opacity |

### Navigation guardrail

```
handleNext()
  ├─ canProceed() === false
  │     └─► setTried(true)
  │           stepError() → non-null → red error banner shown
  │
  └─ canProceed() === true
        └─► setTried(false) → currentStep++
              └─► currentStep was 8 (last)
                    → completeOnboarding()
                    → navigate("/dashboard")
```

- **Back** button: always allowed, no validation
- **"Go to Dashboard Now"**: visible from step 1 onward, calls `completeOnboarding()` immediately and navigates, skipping remaining steps
- Error banner hidden until `tried === true` (first advance attempt per step)

---

### Step 1 — Account Info (`currentStep = 0`)

| Field | Type | Required | Constraint |
|---|---|---|---|
| `fullName` | string | ✅ | Non-empty, trimmed |
| `email` | string | ✅ | RFC format via `validateEmail()` |
| `company` | string | ✅ | Non-empty, trimmed |

`canProceed`: `fullName ∧ email ∧ company non-empty ∧ validateEmail(email) === null`

**Error messages** (after first Next attempt):
- "Full name is required"
- "Email is required"
- `validateEmail(email)` result (format error)
- "Company name is required"

---

### Step 2 — Brand Setup (`currentStep = 1`)

| Field | Type | Required | Constraint |
|---|---|---|---|
| `brandName` | string | ✅ | Non-empty, trimmed |
| `brandDescription` | string | ❌ | Free text, no length limit |

`canProceed`: `brandName.trim() !== ""`  
**Error:** "Brand name is required"

---

### Step 3 — Keywords (`currentStep = 2`)

| Field | Type | Required | Default |
|---|---|---|---|
| `keywords` | `string[]` | ❌ | `["brand name"]` |
| `keywordOperator` | `"AND" \| "OR" \| "NOT"` | ❌ | `"OR"` |

| Interaction | Behaviour |
|---|---|
| Type + Enter or `+` button | Adds keyword |
| Duplicate entry | Silently ignored |
| `X` on badge | Removes keyword |
| AND / OR / NOT toggle | Updates `keywordOperator` |

`canProceed`: always `true` (optional step)

---

### Step 4 — Competitors (`currentStep = 3`)

| Field | Type | Required |
|---|---|---|
| `competitors` | `string[]` | ❌ |

- Add: input + Enter / `+` button
- Duplicate entries silently ignored
- Remove: `X` per entry

`canProceed`: always `true` (optional step)

---

### Step 5 — Platforms (`currentStep = 4`)

| Field | Type | Required | Constraint |
|---|---|---|---|
| `selectedPlatforms` | `string[]` | ✅ | At least 1 |

**Available (9 platforms):**

| ID | Display |
|---|---|
| `twitter` | Twitter / 𝕏 |
| `instagram` | Instagram |
| `youtube` | YouTube |
| `news` | News |
| `blogs` | Blogs |
| `reddit` | Reddit |
| `linkedin` | LinkedIn |
| `facebook` | Facebook |
| `forums` | Forums |

`canProceed`: `selectedPlatforms.length > 0`  
**Error:** "Select at least one platform"

---

### Step 6 — Region & Language (`currentStep = 5`)

| Field | Type | Required | Default |
|---|---|---|---|
| `region` | string | ❌ | `"global"` |
| `language` | string | ❌ | `"english"` |

`canProceed`: always `true`

---

### Step 7 — Goals (`currentStep = 6`)

| Field | Type | Required | Constraint |
|---|---|---|---|
| `selectedGoals` | `string[]` | ✅ | At least 1 |

**Available (6 goals):**

| ID | Label |
|---|---|
| `brand-monitoring` | Brand Monitoring |
| `competitor-analysis` | Competitor Analysis |
| `customer-insights` | Customer Insights |
| `trend-discovery` | Trend Discovery |
| `crisis-management` | Crisis Management |
| `market-research` | Market Research |

`canProceed`: `selectedGoals.length > 0`  
**Error:** "Select at least one goal"

---

### Step 8 — Connect Accounts (`currentStep = 7`)

| Field | Type | Required |
|---|---|---|
| `connectedAccounts` | `string[]` | ❌ |

- Toggle per platform — optional OAuth linking (mock)

`canProceed`: always `true`

---

### Step 9 — Done (`currentStep = 8`)

- No input fields
- "Complete Setup" → `completeOnboarding()` → `navigate("/dashboard")`
- Sets `localStorage.onboardingCompleted = "true"`

---

## 8. Dashboard Layout

**Layout:** `DashboardLayout.tsx`  
**Guard:** ProtectedRoute (both flags required)

### Top header bar

| Element | Behaviour |
|---|---|
| Search bar | "Search mentions, keywords, trends…" placeholder |
| `ThemeToggle` | Switches light / dark, persisted via `ThemeContext` |
| `Bell` icon | Opens `NotificationCenter` popover, unread badge count |
| `HelpCircle` | Static (no action currently wired) |
| Avatar button | `DropdownMenu` → Profile / Settings / Logout |

### Logout flow

```
handleLogout()
  → logout()        ← clears all 3 localStorage keys + resets state
  → navigate("/auth/login")
```

### Sidebar navigation (10 items)

| Label | Route | Icon |
|---|---|---|
| Dashboard | `/dashboard` | `Home` |
| Social Listening | `/dashboard/listening` | `Ear` |
| Unified Inbox | `/dashboard/inbox` | `Inbox` |
| Sentiment Analytics | `/dashboard/sentiment` | `TrendingUp` |
| Competitors | `/dashboard/competitors` | `Users` |
| Trends | `/dashboard/trends` | `Sparkles` |
| Alerts & Crisis | `/dashboard/alerts` | `Bell` |
| Reports | `/dashboard/reports` | `FileText` |
| Settings | `/dashboard/settings` | `Settings` |
| Ask AI | `/dashboard/ask-ai` | `Bot` |

Active route highlighted with primary colour background pill.  
Mobile: hamburger → slide-in drawer overlay.

---

## 9. Dashboard Home

**Route:** `/dashboard` · **File:** `DashboardHome.tsx`

### AI Morning Briefing card

- Gradient banner (primary → primary-700) with `Sparkles` icon
- Dismissible via `X` button (`briefingVisible` state — resets on navigation)
- 3-column insight grid:

| Column | Label | Sample content |
|---|---|---|
| 1 | 🔥 Top Story | "#ProductLaunch is trending — 145% above average mentions today." |
| 2 | ⚠️ Watch Out | "Negative mentions about pricing rose 56% overnight." |
| 3 | 💡 Opportunity | "Competitor A share of voice dropped 8%. Time to push content on Twitter & LinkedIn." |

### KPI cards (4)

| Metric | Sample value | Change | Trend |
|---|---|---|---|
| Total Mentions | 24,583 | +12.5% | ↑ |
| Sentiment Score | 72% | +5.2% | ↑ |
| Share of Voice | 38.4% | -2.1% | ↓ |
| Active Alerts | 3 | +1 | ↑ |

### Charts

| Chart | Type | Data |
|---|---|---|
| Mentions Over Time | Recharts `LineChart` | 8-day rolling (Feb 20–27), mentions + sentiment score |
| Sentiment Distribution | `PieChart` | Positive 64.4% / Neutral 28% / Negative 7.5% |
| Platform Breakdown | `BarChart` | Twitter, Instagram, News, YouTube, Reddit |
| Trending Topics | Static table | topic, mention count, sentiment badge, growth % |
| Recent Mentions Feed | List | Author, platform tag, sentiment badge, engagement count, timestamp |
| Word Cloud | Inline `div` grid | 20 keywords, size and colour weighted by volume/sentiment |

---

## 10. AI Insights Chat

**Route:** `/dashboard/ask-ai` · **File:** `AIChatPage.tsx`

### Input

| Field | Constraint |
|---|---|
| `message` | Non-empty, trimmed — whitespace-only blocked |

### Keyboard guardrails

| Key | Action |
|---|---|
| `Enter` | Send message |
| `Shift + Enter` | Insert newline |

### Response engine

Keyword-matched response map (checked with `.toLowerCase().includes()`):

| Keyword | Topic returned |
|---|---|
| `sentiment` | Sentiment analysis overview |
| `mention` | Mention volume summary |
| `competitor` | Competitor benchmarking |
| `trend` | Trending topics and hashtags |
| `alert` / `crisis` | Alert status and severity |
| `report` | Report generation guidance |
| `keyword` / `hashtag` | Keyword performance data |
| `influencer` | Influencer identification |
| `platform` | Platform channel breakdown |
| *(no match)* | Generic capability fallback |

### Per-message actions (AI messages only)

| Action | Behaviour |
|---|---|
| Copy | Copies message text to clipboard |
| ThumbsUp | Toggles active state (visual only) |
| ThumbsDown | Toggles active state (visual only) |

### Flow guardrails

- 3-dot typing indicator (`animate-bounce`) shown for 1–2 s before response renders
- Suggested question chips shown only before first exchange, hidden after
- "Clear chat" resets message history and restores suggestion chips
- Auto-scroll to bottom on each new message

---

## 11. Global Guards & Persistence

### localStorage keys

| Key | Type | Set by | Cleared by |
|---|---|---|---|
| `isAuthenticated` | `"true"` | `login()`, `register()` | `logout()` |
| `authUser` | JSON `AuthUser` | `login()`, `register()` | `logout()` |
| `onboardingCompleted` | `"true"` | `completeOnboarding()` | `logout()` |

All three keys read via lazy `useState` initialisers in `AuthProvider` — state hydrates on first render before any route guard can execute.

### AuthUser shape

```ts
interface AuthUser {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
}
```

### Validation library — function reference

**File:** `src/app/lib/validation.ts`

| Function | Signature | Pass → | Fail → |
|---|---|---|---|
| `validateEmail` | `(email: string)` | `null` | `"Enter a valid email address"` |
| `validateRequired` | `(value, label)` | `null` | `"${label} is required"` |
| `validateMinLength` | `(value, min, label)` | `null` | `"${label} must be at least ${min} characters"` |
| `validatePasswordMatch` | `(password, confirm)` | `null` | `"Passwords do not match"` |
| `getPasswordStrength` | `(password)` | `PasswordStrength` object | — |
| `hasErrors` | `(errors: FieldErrors<T>)` | `false` | `true` |

---

## 12. Auth State Machine

```
┌─────────────────────────────────────────────────────────────┐
│                      UNAUTHENTICATED                         │
│                   (isAuthenticated=false)                    │
└────────────────┬────────────────────────────────────────────┘
                 │  login() or register()
                 ▼
┌─────────────────────────────────────────────────────────────┐
│     AUTHENTICATED — ONBOARDING PENDING                       │
│   (isAuthenticated=true, onboardingCompleted=false)          │
│                                                              │
│   All /dashboard/* attempts → redirect /onboarding          │
└────────────────┬────────────────────────────────────────────┘
                 │  completeOnboarding()
                 ▼
┌─────────────────────────────────────────────────────────────┐
│     AUTHENTICATED — ACTIVE                                   │
│   (isAuthenticated=true, onboardingCompleted=true)           │
│                                                              │
│   Full dashboard access granted                              │
│   /onboarding attempts → redirect /dashboard                 │
└────────────────┬────────────────────────────────────────────┘
                 │  logout()
                 ▼
         UNAUTHENTICATED  (all localStorage keys cleared)
```
