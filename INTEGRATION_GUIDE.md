# Integration Guide: Top 5 New Features

This guide demonstrates how to use the 5 new features added to Garage Listen.

## 1. Mentions Feed + Mention Drawer

The Mentions Feed displays a social media mention timeline with sentiment, engagement metrics, and author information. Users can click on any mention to view detailed information in a side drawer.

### Components:
- `MentionsFeed.tsx` - Main feed component
- `MentionDrawer.tsx` - Detail drawer when selecting a mention
- `MentionsContext.tsx` - State management for mentions

### Usage:

```tsx
import { useMentions } from '../context/MentionsContext';
import { MentionsFeed } from '../components/features/MentionsFeed';
import { MentionDrawer } from '../components/features/MentionDrawer';

export function SocialListeningPage() {
  const { mentions, selectedMention } = useMentions();

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Feed on the left */}
      <div className="col-span-1">
        <MentionsFeed />
      </div>

      {/* Main content in the middle */}
      <div className="col-span-2">
        {/* Your dashboard content */}
      </div>

      {/* Drawer opens when a mention is selected */}
      <MentionDrawer />
    </div>
  );
}
```

### Features:
- Sort by: Recent, Engagement, Sentiment
- Mark as read/unread
- Star/unstar mentions
- Delete mentions
- View author details, engagement metrics, tags
- Platform badges with sentiment indicators

### Sample Data:
The MentionsContext comes with sample mentions from 5 platforms (Twitter, Instagram, LinkedIn, Reddit, YouTube) with varying sentiments and engagement levels.

---

## 2. Charts System

A comprehensive charting system using Recharts for data visualization with 4 Chart types.

### Components:
- `Charts.tsx` - Contains 4 chart components
- `chartUtils.ts` - Helper functions and data generators

### Chart Types:

#### SentimentChart
Pie chart showing distribution of positive, neutral, and negative mentions.

```tsx
import { SentimentChart } from '../components/features/Charts';

<SentimentChart className="mb-6" />
```

#### PlatformChart
Horizontal bar chart showing mention count by platform.

```tsx
import { PlatformChart } from '../components/features/Charts';

<PlatformChart className="mb-6" />
```

#### TrendChart
Line chart showing mention trends over the past 30 days.

```tsx
import { TrendChart } from '../components/features/Charts';

<TrendChart title="Mentions Over Time" className="mb-6" />
```

#### EngagementChart
Bar chart showing total engagement by type (likes, comments, shares, reposts).

```tsx
import { EngagementChart } from '../components/features/Charts';

<EngagementChart className="mb-6" />
```

### Utilities:
```tsx
import { generateSentimentData, formatLargeNumber, calculateGrowthRate } from '../utils/chartUtils';

// Generate sample data
const data = generateSentimentData(); // Returns sentiment distribution

// Format large numbers
formatLargeNumber(1234567); // Returns '1.2M'

// Calculate growth rate
calculateGrowthRate(100, 80); // Returns 25
```

---

## 3. Loading & Empty States

Components for handling loading states and empty states throughout the application.

### Components:
- `LoadingAndEmpty.tsx` - Contains loading and empty state components

### Loading Components:

#### LoadingSpinner
Simple rotating spinner.

```tsx
import { LoadingSpinner } from '../components/features/LoadingAndEmpty';

<LoadingSpinner size="md" />
<LoadingSpinner size="lg" className="mx-auto" />
```

#### Skeletons
Skeleton loaders for different content types.

```tsx
import { 
  SkeletonLoader, 
  CardSkeleton, 
  ChartSkeleton, 
  FeedSkeleton 
} from '../components/features/LoadingAndEmpty';

// While loading mentions:
<FeedSkeleton />

// While loading a chart:
<ChartSkeleton />

// Individual card skeleton:
<CardSkeleton />

// Custom skeleton:
<SkeletonLoader className="h-10 w-32" />
```

### Empty State Components:

#### EmptyState
Generic empty state with icon, title, description, and action button.

```tsx
import { EmptyState } from '../components/features/LoadingAndEmpty';

<EmptyState
  icon="🔍"
  title="No mentions yet"
  description="Start monitoring to see mentions here."
  action={{
    label: 'Start Monitoring',
    onClick: () => navigate('/setup')
  }}
/>
```

#### EmptyFeedState
Specialized empty state for mention feeds.

```tsx
import { EmptyFeedState } from '../components/features/LoadingAndEmpty';

<EmptyFeedState 
  searchTerm="AI sentiment"
  onClearFilters={() => clearFilters()}
/>
```

---

## 4. Workspace Switcher

Multi-workspace support with easy switching between different brand/team workspaces.

### Components:
- `WorkspaceSwitcher.tsx` - Dropdown menu switcher
- `WorkspaceContext.tsx` - Workspace state management

### Usage:

```tsx
import { useWorkspace } from '../context/WorkspaceContext';

export function DashboardLayout() {
  const { workspaces, currentWorkspace, setCurrentWorkspace } = useWorkspace();
  
  // Current workspace is automatically selected
  // Users can switch workspaces from the WorkspaceSwitcher component
  
  return (
    // The WorkspaceSwitcher is already integrated in DashboardLayout
  );
}
```

### Features:
- Switch between up to 4 sample workspaces
- See member count and plan type for each workspace
- Create new workspace button
- Color-coded workspace badges
- Current workspace indicator

### Sample Workspaces:
1. Acme Corp (Pro, 8 members)
2. Product Launch 2025 (Pro, 5 members)
3. Competitor Analysis (Free, 2 members)
4. Crisis Management (Enterprise, 12 members)

---

## 5. UI Polish Elements

Enhanced user experience with tooltips, animations, and visual polish.

### Components:
- `UIPolish.tsx` - Contains all polish components
- `animations.ts` - Animation utilities

### Available Components:

#### EnhancedTooltip
Smooth tooltips with customizable position and delay.

```tsx
import { EnhancedTooltip } from '../components/features/UIPolish';

<EnhancedTooltip 
  content="Click to view more details"
  side="top"
  delayDuration={200}
>
  <button>Hover me</button>
</EnhancedTooltip>
```

#### AnimatedCard
Card with fade-in and hover effects.

```tsx
import { AnimatedCard } from '../components/features/UIPolish';

<AnimatedCard delay={0} hoverScale={true}>
  <h3>Card Title</h3>
  <p>Card content</p>
</AnimatedCard>
```

#### StaggeredContainer
Container that staggers animation of child elements.

```tsx
import { StaggeredContainer } from '../components/features/UIPolish';

<StaggeredContainer staggerDelay={100}>
  <ItemComponent />
  <ItemComponent />
  <ItemComponent />
</StaggeredContainer>
```

#### PulseIndicator
Animated pulse indicator (like live notifications).

```tsx
import { PulseIndicator } from '../components/features/UIPolish';

<PulseIndicator color="bg-red-500" />
```

#### GradientBadge
Badge with gradient colors.

```tsx
import { GradientBadge } from '../components/features/UIPolish';

<GradientBadge gradient="blue">New</GradientBadge>
<GradientBadge gradient="purple">Premium</GradientBadge>
```

#### ShimmerCard
Card with shimmer animation effect.

```tsx
import { ShimmerCard } from '../components/features/UIPolish';

<ShimmerCard className="bg-gray-200 h-32 rounded-lg" />
```

#### MotionDiv
Div with configurable animation.

```tsx
import { MotionDiv } from '../components/features/UIPolish';

<MotionDiv 
  animation="slideInUp" 
  duration="normal" 
  delay={200}
>
  Content that slides in
</MotionDiv>
```

### Available Animations:
- `fadeIn` - Fade in effect
- `slideInUp` - Slide in from bottom
- `slideInDown` - Slide in from top
- `scaleIn` - Scale and fade in

### Durations:
- `fast` - 150ms
- `normal` - 300ms
- `slow` - 500ms

---

## Complete Integration Example

Here's a complete example combining all 5 features:

```tsx
import { useState } from 'react';
import { useMentions } from '../context/MentionsContext';
import { useWorkspace } from '../context/WorkspaceContext';
import { MentionsFeed } from '../components/features/MentionsFeed';
import { MentionDrawer } from '../components/features/MentionDrawer';
import { SentimentChart, TrendChart, PlatformChart } from '../components/features/Charts';
import { LoadingSpinner, FeedSkeleton, EmptyState } from '../components/features/LoadingAndEmpty';
import { StaggeredContainer, AnimatedCard, EnhancedTooltip } from '../components/features/UIPolish';

export function EnhancedDashboard() {
  const { mentions, selectedMention } = useMentions();
  const { currentWorkspace } = useWorkspace();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="space-y-6">
      {/* Workspace Header */}
      <div>
        <h1 className="text-2xl font-bold">{currentWorkspace.name}</h1>
        <p className="text-gray-600">{currentWorkspace.description}</p>
      </div>

      {/* Charts Section */}
      <StaggeredContainer staggerDelay={100}>
        <div className="grid grid-cols-2 gap-6">
          <AnimatedCard delay={0}>
            <SentimentChart />
          </AnimatedCard>
          <AnimatedCard delay={1}>
            <TrendChart />
          </AnimatedCard>
          <AnimatedCard delay={2} className="col-span-2">
            <PlatformChart />
          </AnimatedCard>
        </div>
      </StaggeredContainer>

      {/* Mentions Feed Section */}
      <div className="grid grid-cols-3 gap-6">
        <AnimatedCard delay={3} className="col-span-1">
          {isLoading ? (
            <FeedSkeleton />
          ) : mentions.length > 0 ? (
            <>
              <MentionsFeed />
              <MentionDrawer />
            </>
          ) : (
            <EmptyState
              icon="📭"
              title="No mentions yet"
              description="Start monitoring to see mentions here."
            />
          )}
        </AnimatedCard>

        {/* Main Content */}
        <AnimatedCard delay={4} className="col-span-2">
          <h3 className="text-lg font-semibold mb-4">Analytics</h3>
          {selectedMention && (
            <div className="space-y-4">
              <EnhancedTooltip content="Click to view full mention details">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium">{selectedMention.author}</p>
                  <p className="text-sm text-gray-600 mt-2">{selectedMention.content}</p>
                </div>
              </EnhancedTooltip>
            </div>
          )}
        </AnimatedCard>
      </div>
    </div>
  );
}
```

---

## Context Providers

All new features require their respective providers. These are already wrapped in `App.tsx`:

```tsx
<AuthProvider>
  <ThemeProvider>
    <NotificationProvider>
      <SavedSearchProvider>
        <MentionsProvider>
          <WorkspaceProvider>
            <RouterProvider router={router} />
          </WorkspaceProvider>
        </MentionsProvider>
      </SavedSearchProvider>
    </NotificationProvider>
  </ThemeProvider>
</AuthProvider>
```

---

## Dark Mode Support

All new components support dark mode using Tailwind's `dark:` prefix:

```tsx
// Example from MentionsFeed
<div className="bg-white dark:bg-slate-950 p-4 rounded-lg">
  <h2 className="text-gray-900 dark:text-white">Mentions Feed</h2>
</div>
```

Toggle dark mode using the ThemeToggle in the dashboard header.

---

## Animation Details

Animation classes are defined in `src/styles/tailwind.css`:

- `animate-fade-in` - 0.3s fade in
- `animate-slide-in-up` - 0.3s slide from bottom
- `animate-slide-in-down` - 0.3s slide from top
- `animate-scale-in` - 0.2s scale and fade in
- `animate-shimmer` - Infinite shimmer effect

Use the `MotionDiv` component or `animationClasses` utility to apply these animations.

---

## Performance Considerations

- Charts render with 300px height by default - adjust via `ResponsiveContainer` height prop
- Mention feed virtualization recommended for 1000+ mentions
- Skeleton loaders shown while data fetches
- All components memoized to prevent unnecessary re-renders

---

## Customization

### Changing Sample Data

Edit the SAMPLE_MENTIONS in `MentionsContext.tsx` to use your own data.

### Customizing Charts

Modify chart colors in `Charts.tsx` component props or create custom data generators in `chartUtils.ts`.

### Platform Colors

Platform badge colors defined in both `MentionsFeed.tsx` and `MentionDrawer.tsx`:

```tsx
const PLATFORM_COLORS = {
  twitter: 'bg-blue-500/20 text-blue-700 dark:text-blue-400',
  instagram: 'bg-pink-500/20 text-pink-700 dark:text-pink-400',
  // ... other platforms
};
```

---

For questions or issues, refer to the individual component files or check the context implementations.
