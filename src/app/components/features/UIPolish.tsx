import React, { ReactNode } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { cn } from '../ui/utils';

interface EnhancedTooltipProps {
  content: string;
  children: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  delayDuration?: number;
  className?: string;
}

export function EnhancedTooltip({
  content,
  children,
  side = 'top',
  delayDuration = 200,
  className,
}: EnhancedTooltipProps) {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger asChild className={className}>
          {children}
        </TooltipTrigger>
        <TooltipContent
          side={side}
          className="bg-gray-900 dark:bg-gray-950 text-white text-sm py-2 px-3 rounded-lg border border-gray-700 shadow-lg"
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hoverScale?: boolean;
}

export function AnimatedCard({
  children,
  className,
  delay = 0,
  hoverScale = true,
}: AnimatedCardProps) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6',
        'animate-fade-in transition-all duration-300',
        hoverScale && 'hover:shadow-lg hover:scale-105 dark:hover:shadow-lg dark:hover:shadow-slate-900/50',
        className
      )}
      style={{
        animationDelay: `${delay * 100}ms`,
      }}
    >
      {children}
    </div>
  );
}

interface StaggeredContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number; // in milliseconds
}

export function StaggeredContainer({
  children,
  className,
  staggerDelay = 100,
}: StaggeredContainerProps) {
  return (
    <div className={cn('space-y-0', className)}>
      {React.Children.map(children, (child, index) => (
        <div
          className="animate-fade-in"
          style={{
            animationDelay: `${index * staggerDelay}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

interface PulseIndicatorProps {
  className?: string;
  color?: string;
}

export function PulseIndicator({
  className,
  color = 'bg-red-500',
}: PulseIndicatorProps) {
  return (
    <div className={cn('relative w-3 h-3', className)}>
      <div className={cn('absolute inset-0 rounded-full animate-ping', color)} />
      <div className={cn('absolute inset-0 rounded-full', color)} />
    </div>
  );
}

interface GradientBadgeProps {
  children: ReactNode;
  className?: string;
  gradient?: 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'pink';
}

const gradients = {
  blue: 'bg-gradient-to-r from-blue-400 to-blue-600',
  purple: 'bg-gradient-to-r from-purple-400 to-purple-600',
  green: 'bg-gradient-to-r from-green-400 to-green-600',
  orange: 'bg-gradient-to-r from-orange-400 to-orange-600',
  red: 'bg-gradient-to-r from-red-400 to-red-600',
  pink: 'bg-gradient-to-r from-pink-400 to-pink-600',
};

export function GradientBadge({
  children,
  className,
  gradient = 'blue',
}: GradientBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white',
        gradients[gradient],
        className
      )}
    >
      {children}
    </span>
  );
}

interface ShimmerCardProps {
  children: ReactNode;
  className?: string;
}

export function ShimmerCard({ children, className }: ShimmerCardProps) {
  return (
    <div className={cn('relative overflow-hidden rounded-lg', className)}>
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-shimmer"
        style={{
          backgroundSize: '1000px 100%',
        }}
      />
      {children}
    </div>
  );
}

interface MotionDivProps {
  children: ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'slideInUp' | 'slideInDown' | 'scaleIn';
  duration?: 'fast' | 'normal' | 'slow';
  delay?: number;
}

const animationClasses = {
  fadeIn: 'animate-fade-in',
  slideInUp: 'animate-slide-in-up',
  slideInDown: 'animate-slide-in-down',
  scaleIn: 'animate-scale-in',
};

const durationClasses = {
  fast: 'duration-150',
  normal: 'duration-300',
  slow: 'duration-500',
};

export function MotionDiv({
  children,
  className,
  animation = 'fadeIn',
  duration = 'normal',
  delay = 0,
}: MotionDivProps) {
  return (
    <div
      className={cn(
        'transition-all',
        animationClasses[animation],
        durationClasses[duration],
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
