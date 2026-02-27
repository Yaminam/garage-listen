// Utility functions for chart data generation and formatting

export interface ChartDataPoint {
  name: string;
  value: number;
  percentage?: number;
  color?: string;
}

export interface TrendDataPoint {
  date: string;
  value: number;
}

export const generateSentimentData = () => [
  { name: 'Positive', value: 1234, percentage: 56, color: '#10b981' },
  { name: 'Neutral', value: 678, percentage: 31, color: '#6b7280' },
  { name: 'Negative', value: 234, percentage: 13, color: '#ef4444' },
];

export const generatePlatformData = () => [
  { name: 'Twitter', value: 1845, percentage: 40, color: '#1da1f2' },
  { name: 'Instagram', value: 923, percentage: 20, color: '#e4405f' },
  { name: 'LinkedIn', value: 734, percentage: 16, color: '#0a66c2' },
  { name: 'TikTok', value: 512, percentage: 11, color: '#000000' },
  { name: 'Facebook', value: 256, percentage: 5, color: '#1877f2' },
  { name: 'YouTube', value: 145, percentage: 3, color: '#ff0000' },
];

export const generateTrendData = () => {
  const data: TrendDataPoint[] = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.floor(Math.random() * 500) + 200,
    });
  }
  return data;
};

export const generateEngagementData = () => [
  { name: 'Likes', value: 3456, color: '#ef4444' },
  { name: 'Comments', value: 2134, color: '#3b82f6' },
  { name: 'Shares', value: 987, color: '#8b5cf6' },
  { name: 'Reposts', value: 1234, color: '#10b981' },
];

export const formatLargeNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const getColorByIndex = (index: number): string => {
  const colors = [
    '#3b82f6', // blue
    '#ef4444', // red
    '#10b981', // green
    '#f59e0b', // amber
    '#8b5cf6', // purple
    '#ec4899', // pink
    '#06b6d4', // cyan
    '#14b8a6', // teal
  ];
  return colors[index % colors.length];
};

export const calculateGrowthRate = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};
