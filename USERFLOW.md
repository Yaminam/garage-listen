# Garage Listen — User Flow

Complete user journey: entry point through onboarding to daily dashboard usage.
Covers every screen, all input parameters, validation rules, and routing guardrails.

---

## Flow Overview

```
GET /
  └─► /auth/login          (unauthenticated)
        ├─► /auth/signup
        │     └─► /onboarding        (new user — always)
        │           └─► /dashboard   (completeOnboarding() called)
        └─► /onboarding or /dashboard (returning user — depends on flag)

/auth/forgot-password
  └─► /auth/reset-password
        └─► /auth/login

/dashboard/*               (requires isAuthenticated + onboardingCompleted)
/onboarding                (requires isAuthenticated)
```

---

## 1. Entry — Root Redirect

**Route:** `/`
**Component:** React Router `<Navigate to="/auth/login" replace />`

- No UI rendered
- Immediately redirects to `/auth/login`
- No parameters, no state

---

## 2. Login

**Route:** `/auth/login`
**Component:** `LoginPage.tsx`
**Layout:** `AuthLayout`

### Functionality
- Email + password credentials form
- Google OAuth button (mock flow — calls `login()` directly)
- "Forgot password" link → `/auth/forgot-password`
- "Create an account" link → `/auth/signup`
- Enter key triggers submit

### Parameters

| Field | Type | Required | Constraints |
|---|---|---|---|
| `email` | string | Yes | RFC email format, non-empty |
| `password` | string | Yes | Min 8 characters |

### Validation (src/app/lib/validation.ts)

| Field | Rule | Error shown |
|---|---|---|
| email | `validateEmail()` — regex `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/` | "Enter a valid email address" |
| password | `validateMinLength(password, 8)` | "Password must be at least 8 characters" |

- Errors cleared per-field on change (not on global re-submit)
- `AlertCircle` icon shown inline beneath each invalid field
- Validation runs on submit only (not on blur)

### Loading State
- `loading = true` for 800 ms simulated async delay
- Submit button shows `Loader2` spinner, disabled during load

### Post-Submit Routing Guardrail
```
login(email, password)
  └─► onboardingCompleted === true  → navigate("/dashboard")
  └─► onboardingCompleted === false → navigate("/onboarding")
```

### AuthContext Side-Effects
- `login()` sets `isAuthenticated = true` in state + `localStorage.isAuthenticated`
- If no stored `authUser`, creates placeholder: `{ email, firstName: "User", lastName: "", company: "" }`

---

## 3. Sign Up

**Route:** `/auth/signup`
**Component:** `SignupPage.tsx`
**Layout:** `AuthLayout`

### Functionality
- Full registration form — creates `AuthUser` object
- 4-bar live password strength meter
- Terms acceptance checkbox
- Google OAuth button (mock)
- Redirects to `/onboarding` on success (always — new users always onboard)

### Parameters

| Field | Type | Required | Constraints |
|---|---|---|---|
| `firstName` | string | Yes | Non-empty |
| `lastName` | string | Yes | Non-empty |
| `company` | string | Yes | Non-empty |
| `email` | string | Yes | RFC email format |
| `password` | string | Yes | Min 8 characters |
| `agreeTerms` | boolean | Yes | Must be `true` |

### Validation

| Field | Rule | Error |
|---|---|---|
| firstName | `validateRequired()` | "First name is required" |
| lastName | `validateRequired()` | "Last name is required" |
| company | `validateRequired()` | "Company is required" |
| email | `validateEmail()` | "Enter a valid email address" |
| password | `validateMinLength(8)` | "Password must be at least 8 characters" |
| agreeTerms | `=== false` | "You must accept the terms to continue" |

- All fields validated on submit
- Per-field errors cleared individually on change
- `AlertCircle` icon shown next to each error

### Password Strength Meter (getPasswordStrength)

| Score | Label | Bar color | Trigger condition |
|---|---|---|---|
| 0 | — | gray | empty |
| 1 | Weak | red-400 | length < 8 or only one criterion |
| 2 | Fair | orange-400 | length >= 8, one additional criterion |
| 3 | Good | yellow-400 | length >= 8, two additional criteria |
| 4 | Strong | emerald-500 | length >= 12 + uppercase + lowercase + number + special char |

Strength criteria checked:
1. `length >= 8`
2. `length >= 12`
3. Mixed case (`/[A-Z]/` AND `/[a-z]/`)
4. Contains digit (`/[0-9]/`)
5. Contains special char (`/[^A-Za-z0-9]/`)

### Loading State
- 900 ms simulated delay
- `Loader2` spinner on button, disabled during load

### Post-Submit Side-Effects
```
register({ email, firstName, lastName, company }, password)
  → isAuthenticated = true                    (state + localStorage)
  → authUser = { email, firstName, ... }      (state + localStorage as JSON)
  → navigate("/onboarding")
```

---

## 4. Forgot Password

**Route:** `/auth/forgot-password`
**Component:** `ForgotPasswordPage.tsx`
**Layout:** `AuthLayout`

### Functionality
- Single email field
- On success: shows confirmation state with `MailCheck` icon + submitted email
- "Try again" link resets to form state
- Back to login link

### Parameters

| Field | Type | Required | Constraints |
|---|---|---|---|
| `email` | string | Yes | RFC email format |

### Validation
- `validateEmail()` — same rule as login
- Error shown inline with `AlertCircle`

### States
| State | UI |
|---|---|
| Initial | Email form with submit button |
| Loading | Spinner, button disabled |
| Success | MailCheck icon, "Check your inbox" message, shows submitted email, "try again" link |

### Guardrail
- No backend call — mock flow only
- Success state is purely cosmetic (not gated on actual email delivery)

---

## 5. Reset Password

**Route:** `/auth/reset-password`
**Component:** `ResetPasswordPage.tsx`
**Layout:** `AuthLayout`

### Functionality
- New password + confirm password fields
- Live strength meter on new password
- Real-time match indicator on confirm field
- On success: `toast.success` → redirect to `/auth/login`

### Parameters

| Field | Type | Required | Constraints |
|---|---|---|---|
| `newPassword` | string | Yes | Min 8 characters |
| `confirmPassword` | string | Yes | Must match `newPassword` exactly |

### Validation

| Field | Rule | Error |
|---|---|---|
| newPassword | `validateMinLength(8)` | "Password must be at least 8 characters" |
| confirmPassword | `validatePasswordMatch()` | "Passwords do not match" / "Please confirm your password" |

- Confirm field shows emerald `CheckCircle2` + "Passwords match" when both fields are equal and non-empty
- Submit blocked if either field fails

### Post-Submit
- 800 ms simulated delay
- `toast.success("Password reset successfully!")`
- `navigate("/auth/login")`

---

## 6. Route Guard — ProtectedRoute

**Component:** `ProtectedRoute.tsx`
Wraps all `/onboarding` and `/dashboard/*` routes.

### Decision Tree

```
Request hits ProtectedRoute
  │
  ├─ isAuthenticated === false
  │     └─► <Navigate to="/auth/login" replace />
  │
  ├─ isAuthenticated === true
  │     ├─ onboardingCompleted === true  AND pathname starts with "/onboarding"
  │     │     └─► <Navigate to="/dashboard" replace />
  │     │
  │     ├─ onboardingCompleted === false AND pathname starts with "/dashboard"
  │     │     └─► <Navigate to="/onboarding" replace />
  │     │
  │     └─ All other cases
  │           └─► render children
```

### Guardrail Matrix

| isAuthenticated | onboardingCompleted | Visiting | Result |
|---|---|---|---|
| false | any | any protected route | → /auth/login |
| true | true | /onboarding | → /dashboard |
| true | false | /dashboard/* | → /onboarding |
| true | true | /dashboard/* | ✅ renders |
| true | false | /onboarding | ✅ renders |

### State Sources
- Both flags read from `localStorage` on hydration (survives hard refresh)
- `isAuthenticated` key: `localStorage.isAuthenticated`
- `onboardingCompleted` key: `localStorage.onboardingCompleted`

---

## 7. Onboarding Wizard

**Route:** `/onboarding`
**Component:** `OnboardingPage.tsx`
**Guard:** `ProtectedRoute` (must be authenticated)

### Layout
- Full-screen two-column layout
- **Left sidebar** (hidden on mobile `lg:flex`): Logo, icon step list, progress bar + %
- **Right main**: mobile top bar + step header (icon badge + title + description) + white card with step content + navigation buttons

### Step Navigation Guardrail
```
handleNext()
  └─► canProceed() === false
        └─► setTried(true) → stepError() returns error message → shown in red banner
  └─► canProceed() === true
        └─► setTried(false) → advance to next step
              └─► currentStep === 8 (last)
                    └─► completeOnboarding() → navigate("/dashboard")
```

- "Back" button always allowed (no blocking)
- "Go to Dashboard Now" available from step 1 onward — calls `completeOnboarding()` directly (skips remaining steps)
- Error banner hidden until `tried === true` (first submit attempt)

---

### Step 1 — Account Info (`currentStep = 0`)

**Purpose:** Populate user identity baseline for the session.

| Field | Type | Required | Constraint |
|---|---|---|---|
| `fullName` | string | Yes | Non-empty (trimmed) |
| `email` | string | Yes | RFC email format via `validateEmail()` |
| `company` | string | Yes | Non-empty (trimmed) |

**canProceed:** `fullName.trim() && email.trim() && company.trim() && validateEmail(email) === null`

**Errors (shown only after first Next attempt):**
- "Full name is required"
- "Email is required"
- `validateEmail(email)` result (format error)
- "Company name is required"

---

### Step 2 — Brand Setup (`currentStep = 1`)

**Purpose:** Define the primary brand being monitored.

| Field | Type | Required | Constraint |
|---|---|---|---|
| `brandName` | string | Yes | Non-empty (trimmed) |
| `brandDescription` | string | No | Free text, no limit enforced |

**canProceed:** `brandName.trim() !== ""`

**Error:** "Brand name is required"

---

### Step 3 — Keywords (`currentStep = 2`)

**Purpose:** Seed the keyword monitoring list.

| Field | Type | Required | Constraint |
|---|---|---|---|
| `keywords` | string[] | No | Defaults to `["brand name"]` |
| `keywordOperator` | "AND" \| "OR" \| "NOT" | No | Defaults to `"OR"` |

**Interactions:**
- Add via input + Enter or `+` button
- Duplicate keywords silently ignored (`!keywords.includes(trimmed)`)
- Remove via `X` badge button
- Operator toggle: AND / OR / NOT

**canProceed:** always `true` (optional step)

---

### Step 4 — Competitors (`currentStep = 3`)

**Purpose:** Build competitor watchlist.

| Field | Type | Required | Constraint |
|---|---|---|---|
| `competitors` | string[] | No | Duplicate entries silently ignored |

**Interactions:**
- Add via input + Enter or `+` button
- Remove via `X`

**canProceed:** always `true` (optional step)

---

### Step 5 — Platforms (`currentStep = 4`)

**Purpose:** Select which social platforms to monitor.

| Field | Type | Required | Constraint |
|---|---|---|---|
| `selectedPlatforms` | string[] | Yes | At least 1 selection required |

**Available platforms (9):**

| ID | Name |
|---|---|
| twitter | Twitter / 𝕏 |
| instagram | Instagram |
| youtube | YouTube |
| news | News |
| blogs | Blogs |
| reddit | Reddit |
| linkedin | LinkedIn |
| facebook | Facebook |
| forums | Forums |

**canProceed:** `selectedPlatforms.length > 0`

**Error:** "Select at least one platform"

---

### Step 6 — Region & Language (`currentStep = 5`)

**Purpose:** Target audience scope for monitoring.

| Field | Type | Required | Default |
|---|---|---|---|
| `region` | string | No | `"global"` |
| `language` | string | No | `"english"` |

**canProceed:** always `true`

---

### Step 7 — Goals (`currentStep = 6`)

**Purpose:** Declare primary monitoring intent (drives dashboard defaults).

| Field | Type | Required | Constraint |
|---|---|---|---|
| `selectedGoals` | string[] | Yes | At least 1 required |

**Available goals (6):**

| ID | Label |
|---|---|
| brand-monitoring | Brand Monitoring |
| competitor-analysis | Competitor Analysis |
| customer-insights | Customer Insights |
| trend-discovery | Trend Discovery |
| crisis-management | Crisis Management |
| market-research | Market Research |

**canProceed:** `selectedGoals.length > 0`

**Error:** "Select at least one goal"

---

### Step 8 — Connect Accounts (`currentStep = 7`)

**Purpose:** OAuth account linking (optional, mock only).

| Field | Type | Required | Constraint |
|---|---|---|---|
| `connectedAccounts` | string[] | No | Toggle on/off per platform |

**canProceed:** always `true`

---

### Step 9 — Done (`currentStep = 8`)

**Purpose:** Completion confirmation and dashboard entry.

- No input fields
- "Complete Setup" button → `completeOnboarding()` + `navigate("/dashboard")`
- Sets `localStorage.onboardingCompleted = "true"`

---

## 8. Dashboard

**Route:** `/dashboard/*`
**Layout:** `DashboardLayout`
**Guard:** `ProtectedRoute` (isAuthenticated + onboardingCompleted)

### Navigation (sidebar, 10 items)

| Route | Page |
|---|---|
| /dashboard | Home overview |
| /dashboard/listening | Social Listening |
| /dashboard/inbox | Unified Inbox |
| /dashboard/sentiment | Sentiment Analytics |
| /dashboard/competitors | Competitor Monitoring |
| /dashboard/trends | Trend Discovery |
| /dashboard/alerts | Alerts & Crisis |
| /dashboard/reports | Report Builder |
| /dashboard/settings | Settings |
| /dashboard/ask-ai | AI Insights Chat |

### Global Dashboard Guardrails

- Any direct URL access to `/dashboard/*` without auth → `/auth/login`
- Any direct URL access to `/dashboard/*` without onboarding → `/onboarding`
- `logout()` clears all three localStorage keys and resets both flags to `false`, forcing full re-auth

---

## 9. AI Insights Chat

**Route:** `/dashboard/ask-ai`
**Component:** `AIChatPage.tsx`

### Functionality
- Freetext user input → keyword-matched AI response
- Suggested question chips (hidden after first message sent)
- Copy / ThumbsUp / ThumbsDown actions per AI response

### Input Parameters

| Field | Type | Constraint |
|---|---|---|
| `message` | string | Non-empty, trimmed |

### Guardrails
- Empty / whitespace messages blocked (not sent)
- Enter key sends; Shift+Enter inserts newline
- Typing indicator shown for 1–2 s before response renders
- Clear chat resets to initial suggested questions state

### Keyword Topics Covered

| Keyword match | Topic |
|---|---|
| sentiment | Sentiment analysis summary |
| mention | Mention volume overview |
| competitor | Competitor benchmarking |
| trend | Trending topics |
| alert / crisis | Alert status |
| report | Report generation |
| keyword / hashtag | Keyword performance |
| influencer | Influencer identification |
| platform | Platform breakdown |
| (fallback) | Generic capability response |

---

## 10. Session Persistence Model

All auth state is stored in `localStorage` and rehydrated on page load. No server session.

| Key | Value | Set by | Cleared by |
|---|---|---|---|
| `isAuthenticated` | `"true"` | `login()`, `register()` | `logout()` |
| `authUser` | JSON string of `AuthUser` | `login()`, `register()` | `logout()` |
| `onboardingCompleted` | `"true"` | `completeOnboarding()` | `logout()` |

### Hydration Order (AuthProvider init)
```
useState(() => localStorage.getItem('isAuthenticated') === 'true')
useState(() => localStorage.getItem('onboardingCompleted') === 'true')
useState(() => JSON.parse(localStorage.getItem('authUser') || 'null'))
```

Hard refresh preserves session entirely. Logout is the only way to reset.

---

## 11. Validation Library Reference

**File:** `src/app/lib/validation.ts`

| Function | Signature | Returns |
|---|---|---|
| `validateEmail` | `(email: string)` | `string \| null` |
| `validateRequired` | `(value: string, label: string)` | `string \| null` |
| `validateMinLength` | `(value: string, min: number, label: string)` | `string \| null` |
| `validatePasswordMatch` | `(password: string, confirm: string)` | `string \| null` |
| `getPasswordStrength` | `(password: string)` | `PasswordStrength` |
| `hasErrors` | `(errors: FieldErrors<T>)` | `boolean` |

All functions return `null` on pass, an error string on fail.

---

## 12. Complete State Machine Summary

```
UNAUTHENTICATED
  │
  ├─[signup]──► AUTHENTICATED (onboardingCompleted=false)
  │                 └─[complete onboarding]──► AUTHENTICATED (onboardingCompleted=true)
  │                                                └─[logout]──► UNAUTHENTICATED
  │
  └─[login (returning)]
        ├─ onboardingCompleted=false ──► /onboarding
        └─ onboardingCompleted=true  ──► /dashboard
```
