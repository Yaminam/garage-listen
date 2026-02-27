# Garage Listen - Social Media Monitoring & Sentiment Analysis Platform

A comprehensive SaaS application for monitoring social media mentions, analyzing sentiment, tracking competitors, discovering trends, and managing real-time alerts. Built with React, TypeScript, Tailwind CSS, and modern web technologies.

## Project Purpose

**Garage Listen** is a social listening platform designed to help brands and teams:
- Monitor mentions across multiple social media platforms
- Analyze sentiment and emotional context of mentions
- Track competitor activity and performance
- Discover emerging trends in real-time
- Manage crisis alerts and escalations
- Generate comprehensive reports
- Customize dashboards and analytics

## Key Features

### 1. **Authentication & Authorization**
- Email/password login and signup
- Google OAuth integration
- Persistent authentication (localStorage-based)
- Protected routes - dashboard access requires login

### 2. **Onboarding Flow (8 Steps)**
- **Account Info**: Collect user and company details
- **Brand Setup**: Define brand name and description
- **Competitors**: Add competitor names for monitoring
- **Platforms**: Select platforms to monitor (9 available)
- **Region & Language**: Configure language preferences and regional focus
- **Goals**: Define monitoring objectives (6 goal types)
- **Connect Accounts**: Link social media accounts
- **Done**: Summary and dashboard redirect

### 3. **Dashboard Features**
- **Social Listening**: Monitor mentions and keywords across platforms
- **Sentiment Analytics**: Analyze positive, neutral, and negative mentions
- **Competitor Monitoring**: Track competitor activity
- **Trend Discovery**: Identify emerging trends in your industry
- **Alerts & Crisis**: Real-time notifications for critical mentions
- **Report Builder**: Generate custom reports
- **Settings**: User preferences and account management

### 4. **Dark Mode / Theme Switcher**
- Toggle between light and dark themes
- Theme preference persists across sessions
- Automatic theme application to all components

### 5. **Notification System**
- Real-time notification queue
- 4 notification types: Info, Warning, Error, Success
- Mark as read, dismiss individual, or clear all
- Auto-dismiss notifications after 5 seconds

### 6. **Advanced Filtering**
- Filter by sentiment (positive, neutral, negative)
- Filter by platform
- Date range selection
- Language filtering
- Engagement threshold settings
- Keyword/search term filtering
- Save filter combinations for quick reuse

### 7. **Saved Searches**
- Persist and organize filter configurations
- Quick access to frequently used filters
- Rename, load, and delete saved searches

### 8. **Role-Based Access Control (RBAC)**
- **Admin**: Full access (manage users, settings, data deletion)
- **Team Lead**: Management access (team management, task assignment, reporting)
- **Analyst**: Report access (view analytics, create reports, export data)
- **Viewer**: Read-only access (view analytics only)

## âœ¨ New Premium Features (Top 5)

### 9. **Mentions Feed + Detail Drawer**
- Real-time mention feed with author avatars and verified badges
- Interactive mention details drawer with full engagement metrics
- Sort mentions by: Recent, Engagement, Sentiment
- Mark as read/unread, star favorites, delete mentions
- View sentiment, platform, author info, engagement (likes, comments, shares, reposts)
- Hover cards with quick actions
- Sample data from 9 social media platforms

### 10. **Advanced Charts System**
- **SentimentChart**: Pie chart showing sentiment distribution (Positive/Neutral/Negative)
- **PlatformChart**: Horizontal bar chart with mention counts by platform
- **TrendChart**: 30-day line chart tracking mention trends over time
- **EngagementChart**: Bar chart showing engagement by type (Likes, Comments, Shares, Reposts)
- All charts are responsive and interactive with Recharts
- Automatic data generation with sample mentions

### 11. **Loading & Empty States**
- **LoadingSpinner**: Animated spinner (3 sizes: sm/md/lg)
- **Skeleton Loaders**: Card, chart, and feed skeletons for better perceived performance
- **EmptyState**: Generic empty state with icon, title, description, and action button
- **EmptyFeedState**: Specialized empty state for mention feeds with search context
- Smooth transitions and professional placeholders

### 12. **Multi-Workspace Support**
- **WorkspaceSwitcher**: Dropdown menu in sidebar for easy workspace switching
- Support for up to 4+ workspaces per user
- Each workspace shows: name, member count, plan type (Free/Pro/Enterprise)
- Color-coded workspace avatars for quick visual identification
- Create new workspace button for easy onboarding
- Workspace context persists across page navigation
- Sample workspaces: Acme Corp, Product Launch 2025, Competitor Analysis, Crisis Management

### 13. **UI Polish & Animations**
- **Tooltips**: Enhanced tooltips with customizable position, delay, and styling
- **Animated Cards**: Cards with fade-in effect and smooth hover scale animations
- **Staggered Animations**: Coordinated animation sequences for multiple elements
- **Pulse Indicators**: Live notification dots with pulsing animation
- **Gradient Badges**: 6 gradient color options for visual emphasis
- **Shimmer Cards**: Shimmer animation effect for loading states
- **Motion Divs**: Configurable animation wrapper (fadeIn, slideInUp, slideInDown, scaleIn)
- **Custom Animations**: 4 smooth animation variants (150ms/300ms/500ms durations)

## Project Structure

```
src/
â”œâ”€â”€ app/
â”‚   â”œâ”€â”€ components/
â”‚   â”‚   â”œâ”€â”€ figma/          # Figma design components
â”‚   â”‚   â””â”€â”€ ui/             # Reusable UI components (Radix UI based)
â”‚   â”œâ”€â”€ context/            # Context providers (Auth, Theme, Notifications, SavedSearch)
â”‚   â”œâ”€â”€ layouts/            # Page layouts (Auth, Dashboard)
â”‚   â”œâ”€â”€ pages/              # Application pages
â”‚   â”‚   â”œâ”€â”€ auth/           # Login, Signup, Password reset
â”‚   â”‚   â”œâ”€â”€ dashboard/      # Dashboard pages
â”‚   â”‚   â””â”€â”€ onboarding/     # Onboarding flow
â”‚   â”œâ”€â”€ utils/              # Utility functions and helpers
â”‚   â”œâ”€â”€ App.tsx             # Root component with provider setup
â”‚   â””â”€â”€ routes.tsx          # Route configuration
â”œâ”€â”€ styles/                 # Global styles and theme
â””â”€â”€ main.tsx                # Application entry point
```

## Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Routing**: React Router v7
- **Styling**: Tailwind CSS + PostCSS
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **State Management**: Context API (Auth, Theme, Notifications, Saved Searches)
- **Build Tool**: Vite
- **Package Manager**: npm

## Context Providers

The application uses multiple Context providers for global state management:

### AuthContext
- Manages user authentication state
- Handles login/logout operations
- Persists authentication to localStorage
- Used by: ProtectedRoute, all pages

### ThemeContext
- Manages light/dark mode theme
- Persists preference to localStorage
- Applies theme class to document root
- Used by: ThemeToggle component, all styled components

### NotificationContext
- Manages real-time notification queue
- Supports 4 notification types
- Auto-dismissal after 5 seconds
- Used by: NotificationCenter component, dashboard pages

### SavedSearchContext
- Persists saved filter configurations
- Manages save/load/delete operations
- Uses localStorage for persistence
- Used by: AdvancedFilters component, dashboard pages

### MentionsContext
- Manages real-time mention feed data
- Handles mention state (read, starred, deleted)
- Provides filtering by sentiment, platform, date range
- Sample data with 5+ mentions across multiple platforms
- Used by: MentionsFeed, MentionDrawer components

### WorkspaceContext
- Manages multiple workspaces for the user
- Handles workspace switching, creation, deletion
- Stores workspace metadata (name, description, plan, members)
- Persists current workspace selection
- Used by: WorkspaceSwitcher component, dashboard layout

## Route Structure

```
/                          â†’ Redirects to /auth/login
/auth/login                â†’ Login page (public)
/auth/signup               â†’ Signup page (public)
/auth/forgot-password      â†’ Forgot password (public)
/auth/reset-password       â†’ Reset password (public)
/auth/email-verification   â†’ Email verification (public)
/onboarding                â†’ 8-step onboarding (protected)
/dashboard                 â†’ Dashboard home (protected)
/dashboard/listening       â†’ Social Listening (protected)
/dashboard/sentiment       â†’ Sentiment Analytics (protected)
/dashboard/competitors     â†’ Competitor Monitoring (protected)
/dashboard/trends          â†’ Trend Discovery (protected)
/dashboard/alerts          â†’ Alerts & Crisis (protected)
/dashboard/reports         â†’ Report Builder (protected)
/dashboard/settings        â†’ Settings (protected)
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server
The app runs on `http://localhost:5173` by default (Vite dev server).

### Default Flow
1. Access the app â†’ redirected to login
2. Sign up or login with email
3. Complete 8-step onboarding
4. Access dashboard and its features

### Dark Mode
The application includes full dark mode support:
1. Click the moon/sun icon in the top right of the dashboard header
2. Dark mode preference is saved to localStorage
3. All components automatically switch to dark theme
4. Use `dark:` Tailwind prefix for dark mode styling

### Workspace Switcher
To switch workspaces in the dashboard:
1. Look at the left sidebar below the "Garage Listen" logo
2. Click the workspace button (showing workspace name and member count)
3. A dropdown menu appears with all available workspaces
4. Click any workspace to switch to it
5. Click "Create Workspace" to add a new workspace
6. Current workspace is indicated with a blue checkmark

## Authentication Flow

```
User Access
    â†“
ProtectedRoute Check
    â†“
Is Authenticated? 
    â”œâ”€ No â†’ Redirect to /auth/login
    â””â”€ Yes â†’ Continue
        â†“
    On Login Success â†’ Redirect to /onboarding
        â†“
    Complete Onboarding â†’ Redirect to /dashboard
```

## Features Integration

### Using Notifications
```typescript
const { addNotification } = useNotification();
addNotification("Success", "Filter applied successfully", "success");
```

### Using Saved Searches
```typescript
const { savedSearches, saveSearch, loadSearch } = useSavedSearch();
saveSearch("My Filter", { sentiment: "positive", platform: "twitter" });
```

### Using Theme
```typescript
const { theme, toggleTheme } = useTheme();
```

### Checking Permissions
```typescript
import { hasPermission } from "../utils/roles";
if (hasPermission("admin", "manage_users")) {
  // Show admin panel
}
```

## Code Quality

- **TypeScript**: Full type safety throughout the application
- **Component-based**: Modular, reusable components
- **Context API**: Clean state management without Redux complexity
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Error Handling**: Protected routes and form validation

## File Purposes Summary

| File | Purpose |
|------|---------|
| `AuthContext.tsx` | Manages login/logout and auth state persistence |
| `ThemeContext.tsx` | Manages dark/light mode switching |
| `NotificationContext.tsx` | Manages real-time notification queue |
| `SavedSearchContext.tsx` | Persists and manages filter configurations |
| `MentionsContext.tsx` | Manages mention feed data and filtering |
| `WorkspaceContext.tsx` | Manages multiple workspaces and switching |
| `ProtectedRoute.tsx` | Route wrapper requiring authentication |
| `AdvancedFilters.tsx` | Filtering UI component with save functionality |
| `MentionsFeed.tsx` | Interactive mention timeline with sorting |
| `MentionDrawer.tsx` | Side panel for detailed mention information |
| `Charts.tsx` | Sentiment, Platform, Trend, and Engagement charts |
| `LoadingAndEmpty.tsx` | Loading spinners and empty state components |
| `WorkspaceSwitcher.tsx` | Dropdown switcher for workspace selection |
| `UIPolish.tsx` | Tooltips, animations, and polish components |
| `ThemeToggle.tsx` | Dark/light mode toggle button |
| `roles.ts` | Role definitions and permission utilities |
| `chartUtils.ts` | Chart data generators and formatting utilities |
| `animations.ts` | Animation utilities and keyframe definitions |
| `DashboardLayout.tsx` | Navigation and header for dashboard |
| `routes.tsx` | Complete route configuration |

## Original Design Source
This project is based on the SaaS Product UI Design available at https://www.figma.com/design/wVNHO2BNgRZymPab7wokaF/SaaS-Product-UI-Design

## Dark Mode Implementation

Dark mode is fully implemented using Tailwind CSS class-based approach:

1. **ThemeContext** (`src/app/context/ThemeContext.tsx`)
   - Manages theme state (light/dark)
   - Toggles 'dark' class on document root
   - Persists preference to localStorage

2. **ThemeToggle Component** (`src/app/components/ThemeToggle.tsx`)
   - Moon/Sun icon button in dashboard header
   - Click to toggle between light and dark modes
   - Visual feedback with icon change

3. **Tailwind Configuration** (`tailwind.config.ts`)
   - Configured with `darkMode: 'class'`
   - All components use `dark:` prefix for dark styles
   - Example: `bg-white dark:bg-slate-950`

4. **How It Works**
   - User clicks theme toggle
   - ThemeContext sets theme and adds 'dark' class to `<html>`
   - Tailwind applies dark: variant styles
   - Preference saved to localStorage for persistence

### Styling Dark Mode

When creating new components, use Tailwind's `dark:` prefix:

```tsx
<div className="bg-white dark:bg-slate-950 text-gray-900 dark:text-white">
  Content
</div>
```

## Workspace Switcher Implementation

The workspace switcher is a dropdown menu in the dashboard sidebar:

1. **WorkspaceContext** (`src/app/context/WorkspaceContext.tsx`)
   - Manages workspace list and current selection
   - Provides methods to add, delete, update workspaces
   - Contains sample workspaces with member counts and plan types

2. **WorkspaceSwitcher Component** (`src/app/components/features/WorkspaceSwitcher.tsx`)
   - Dropdown menu showing all workspaces
   - Current workspace highlighted with checkmark
   - Color-coded workspace badges
   - "Create Workspace" button for adding new workspaces

3. **Integration in DashboardLayout**
   - Imported in sidebar below the logo
   - Provides easy workspace switching
   - Member count and plan type displayed

4. **Using Workspace Context**

```tsx
import { useWorkspace } from '../context/WorkspaceContext';

export function MyComponent() {
  const { currentWorkspace, workspaces, setCurrentWorkspace } = useWorkspace();
  
  return (
    <div>
      <h1>{currentWorkspace.name}</h1>
      <p>{currentWorkspace.membersCount} members</p>
    </div>
  );
}
```

## Troubleshooting

### Dark Mode Not Working
- Ensure `tailwind.config.ts` exists with `darkMode: 'class'`
- Check that ThemeProvider wraps your app in `App.tsx`
- Clear browser cache and localStorage
- Verify browser developer tools show `dark` class on `<html>`

### Workspace Switcher Not Showing
- Confirm WorkspaceSwitcher component is imported in DashboardLayout
- Check that WorkspaceProvider wraps the entire app in `App.tsx`
- Verify the workspace button is rendered in the sidebar (`{/* Workspace Switcher */}` section)
- Check console for any import errors

### Charts Not Rendering
- Ensure `recharts` is installed: `npm install recharts`
- Verify `ResponsiveContainer` is wrapping the chart components
- Check that sample data is loading in chartUtils.ts
- Clear node_modules and reinstall if needed

### Mentions Feed Empty
- Sample data is loaded automatically from MentionsContext
- Check that MentionsProvider wraps the app
- Verify MentionsFeed is imported and rendered in your page
- Use the useMentions hook to access mention data

### Animations Not Working
- Verify custom animations are defined in `src/styles/tailwind.css`
- Check that animation classes are imported correctly
- Browser DevTools â†’ Elements â†’ check for `animate-fade-in` etc classes
- Ensure Tailwind CSS is properly compiled

### Dev Server Issues
```bash
# Port conflict - try a different port or kill the process
# Linux/Mac:
lsof -i :5173
kill -9 <PID>

# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## Performance Optimization

- Mention feeds with 1000+ items: Consider virtualization
- Charts: Adjust ResponsiveContainer height for performance
- Animations: Use `will-change` CSS for performance-critical animations
- Images: Optimize avatars and workspace logos
- Code splitting: Dashboard routes are naturally code-split by React Router

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile: iOS 12+, Android 5+

The app uses:
- CSS Grid and Flexbox (flex)
- CSS Custom Properties (CSS variables)
- Tailwind v4 with modern CSS
- ES2020+ JavaScript features
 
 
