import React from 'react';
import { cn } from '../ui/utils';

export function LoadingSpinner({ size = 'md', className }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizeClass = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }[size];

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className={cn('animate-spin rounded-full border-2 border-gray-300 border-t-blue-500 dark:border-slate-700 dark:border-t-blue-400', sizeClass)} />
    </div>
  );
}

export function SkeletonLoader({ className }: { className?: string }) {
  return (
    <div className={cn('animate-pulse bg-gray-200 dark:bg-slate-800 rounded', className)} />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-gray-200 dark:border-slate-800 space-y-4">
      <div className="flex items-center gap-3">
        <SkeletonLoader className="w-10 h-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <SkeletonLoader className="h-4 w-32" />
          <SkeletonLoader className="h-3 w-24" />
        </div>
      </div>
      <SkeletonLoader className="h-4 w-full" />
      <SkeletonLoader className="h-4 w-5/6" />
      <div className="flex gap-2">
        <SkeletonLoader className="h-8 w-12" />
        <SkeletonLoader className="h-8 w-12" />
        <SkeletonLoader className="h-8 w-12" />
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-gray-200 dark:border-slate-800 space-y-4">
      <SkeletonLoader className="h-6 w-48" />
      <SkeletonLoader className="h-64 w-full rounded" />
      <div className="grid grid-cols-3 gap-4">
        <SkeletonLoader className="h-16" />
        <SkeletonLoader className="h-16" />
        <SkeletonLoader className="h-16" />
      </div>
    </div>
  );
}

export function FeedSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {icon && <div className="mb-4 text-gray-400 dark:text-gray-500 text-5xl">{icon}</div>}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      {description && <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>}
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-400 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

interface EmptyFeedStateProps {
  searchTerm?: string;
  onClearFilters?: () => void;
}

export function EmptyFeedState({ searchTerm, onClearFilters }: EmptyFeedStateProps) {
  return (
    <EmptyState
      icon="📭"
      title={searchTerm ? 'No mentions found' : 'No mentions yet'}
      description={
        searchTerm
          ? `No mentions found for "${searchTerm}". Try adjusting your filters.`
          : 'Start monitoring to see mentions here.'
      }
      action={
        searchTerm
          ? { label: 'Clear Filters', onClick: onClearFilters || (() => {}) }
          : undefined
      }
    />
  );
}
