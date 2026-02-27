📌 Project Purpose

Garage Listen helps brands and teams:

Monitor mentions across multiple platforms

Analyze sentiment and emotional signals

Track competitor performance

Discover emerging trends

Detect and manage crisis situations

Generate professional reports

Manage multi-workspace environments

This repository contains the complete frontend implementation only.

🧩 Core Feature Overview
🔐 Authentication & Authorization

Email / password login & signup

Google OAuth integration

Persistent authentication (localStorage-based)

Protected route system

Automatic redirect to onboarding after first login

Role-based route protection

🧭 8-Step Onboarding Flow

Account Info (Name, Email, Company)

Brand Setup (Brand name, description)

Competitors (Add competitor names)

Platform Selection (9 available platforms)

Region & Language settings

Monitoring Goals selection

Connect Accounts (OAuth)

Summary → Auto redirect to dashboard

📊 Dashboard Modules

The dashboard includes 8 primary sections:

Dashboard Home

Social Listening

Sentiment Analytics

Competitor Monitoring

Trend Discovery

Alerts & Crisis

Report Builder

Settings

Each module follows a consistent layout and design system.

🌗 Theme System

Light and Dark mode toggle

Theme preference persisted in localStorage

Global ThemeContext implementation

Tailwind class-based dark mode (darkMode: 'class')

🔔 Notification System

Real-time notification queue

4 notification types:

Info

Warning

Error

Success

Auto-dismiss after 5 seconds

Mark as read

Remove individual

Clear all

🔎 Advanced Filtering System

Filter mentions by:

Sentiment

Platform

Date Range

Language

Engagement threshold

Keyword / search term

Features include:

Apply / Reset controls

Save filter combinations

Load & delete saved searches

LocalStorage persistence

👥 Role-Based Access Control (RBAC)

Four user roles:

Role	Access Level
Admin	Full system access
Team Lead	Team & reporting access
Analyst	Analytics & export access
Viewer	Read-only access

Includes permission matrix utilities for conditional rendering.

✨ Premium Feature Set
📥 Mentions Feed + Detail Drawer

Real-time styled mention feed

Author avatars + verified badges

Sort by: Recent, Engagement, Sentiment

Mark read/unread

Star mentions

Delete mentions

Interactive detail drawer

Engagement breakdown (likes, comments, shares, reposts)

Multi-platform sample dataset

📊 Advanced Charts System

Built with Recharts:

Sentiment distribution (Pie)

Platform distribution (Bar)

30-day mention trend (Line)

Engagement breakdown (Bar)

Fully responsive

Interactive tooltips

Sample dynamic data generation

🧱 Loading & Empty States

LoadingSpinner (3 sizes)

Skeleton loaders (card, chart, feed)

Generic EmptyState component

Specialized EmptyFeedState

Smooth transitions for better UX perception

🏢 Multi-Workspace Support

WorkspaceSwitcher in sidebar

Up to 4+ workspaces supported

Workspace metadata:

Name

Member count

Plan type

Color-coded workspace avatars

Workspace context persistence

Create new workspace functionality

🎨 UI Polish & Motion System

Enhanced tooltips

Animated cards (fade + scale)

Staggered entrance animations

Pulse indicators for live data

Gradient badges

Shimmer loading effects

Custom animation utilities

Motion wrappers (fadeIn, slideInUp, slideInDown, scaleIn)

🏗 Project Structure
src/
├── app/
│   ├── components/
│   │   ├── figma/
│   │   └── ui/
│   ├── context/
│   ├── layouts/
│   ├── pages/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   └── onboarding/
│   ├── utils/
│   ├── App.tsx
│   └── routes.tsx
├── styles/
└── main.tsx
⚙️ Technology Stack

React 19

TypeScript

React Router v7

Tailwind CSS

Radix UI

Lucide Icons

Recharts

Vite

Context API (Auth, Theme, Notifications, SavedSearch, Mentions, Workspace)

🧠 Context Architecture
AuthContext

Handles login, logout, auth persistence.

ThemeContext

Manages light/dark theme switching.

NotificationContext

Real-time notification queue.

SavedSearchContext

Filter configuration persistence.

MentionsContext

Mention feed state management.

WorkspaceContext

Multi-workspace environment handling.

🛣 Route Structure
/ → Redirect to login
/auth/* → Public routes
/onboarding → Protected
/dashboard → Protected
/dashboard/listening
/dashboard/sentiment
/dashboard/competitors
/dashboard/trends
/dashboard/alerts
/dashboard/reports
/dashboard/settings
🚀 Getting Started
Prerequisites

Node.js 18+

npm 9+

Installation
npm install
npm run dev

App runs at:

http://localhost:5173
🌗 Dark Mode Implementation

Class-based Tailwind configuration

dark: utility usage

ThemeContext toggles dark class on root

Fully persistent across sessions

🏢 Workspace Switching

Sidebar dropdown with:

Workspace selection

Member count display

Plan type indicator

Create workspace option

🧪 Performance Notes

Chart responsiveness optimized

Animation duration controlled

Virtualization recommended for 1000+ mentions

Natural route-based code splitting

🛡 Browser Support

Chrome (latest 2 versions)

Firefox (latest 2 versions)

Safari (latest 2 versions)

Mobile (iOS 12+, Android 5+)
