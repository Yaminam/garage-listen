import React, { useState } from 'react';
import { Star, MessageCircle, Heart, Repeat2, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useMentions } from '../../context/MentionsContext';
import { cn } from '../ui/utils';

const PLATFORM_COLORS = {
  twitter: 'bg-blue-500/20 text-blue-700 dark:text-blue-400',
  instagram: 'bg-pink-500/20 text-pink-700 dark:text-pink-400',
  facebook: 'bg-blue-600/20 text-blue-800 dark:text-blue-300',
  linkedin: 'bg-blue-700/20 text-blue-900 dark:text-blue-200',
  reddit: 'bg-orange-500/20 text-orange-700 dark:text-orange-400',
  tiktok: 'bg-black/20 text-black dark:text-white',
  youtube: 'bg-red-500/20 text-red-700 dark:text-red-400',
  threads: 'bg-purple-500/20 text-purple-700 dark:text-purple-400',
  bluesky: 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-400',
};

export function MentionsFeed() {
  const { mentions, setSelectedMention, markAsRead, toggleStar, deleteMention } = useMentions();
  const [sortBy, setSortBy] = useState<'recent' | 'engagement' | 'sentiment'>('recent');

  const sortedMentions = [...mentions].sort((a, b) => {
    if (sortBy === 'recent') {
      return b.timestamp.getTime() - a.timestamp.getTime();
    } else if (sortBy === 'engagement') {
      const aTotal = a.engagement.likes + a.engagement.comments + a.engagement.shares;
      const bTotal = b.engagement.likes + b.engagement.comments + b.engagement.shares;
      return bTotal - aTotal;
    } else {
      const sentimentOrder = { positive: 3, neutral: 2, negative: 1 };
      return sentimentOrder[b.sentiment] - sentimentOrder[a.sentiment];
    }
  });

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600 dark:text-green-400';
      case 'negative':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-slate-800 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold dark:text-white">Mentions Feed</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {mentions.length} mentions
          </span>
        </div>
        
        {/* Sort Options */}
        <div className="flex gap-2">
          {(['recent', 'engagement', 'sentiment'] as const).map((option) => (
            <button
              key={option}
              onClick={() => setSortBy(option)}
              className={cn(
                'px-3 py-1 rounded-full text-sm transition-colors',
                sortBy === option
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-700'
              )}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Mentions List */}
      <div className="flex-1 overflow-y-auto">
        {sortedMentions.map((mention) => (
          <div
            key={mention.id}
            onClick={() => {
              setSelectedMention(mention);
              markAsRead(mention.id);
            }}
            className={cn(
              'border-b border-gray-200 dark:border-slate-800 p-4 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-slate-900',
              !mention.isRead && 'bg-blue-50 dark:bg-blue-950/30'
            )}
          >
            {/* Author Info */}
            <div className="flex items-start gap-3 mb-2">
              <img
                src={mention.avatar}
                alt={mention.author}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {mention.author}
                  </span>
                  {mention.verified && (
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    {mention.handle}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={cn(
                      'px-2 py-0.5 rounded-full text-xs font-medium',
                      PLATFORM_COLORS[mention.platform]
                    )}
                  >
                    {mention.platform}
                  </span>
                  <span className={cn('text-xs font-medium', getSentimentColor(mention.sentiment))}>
                    {mention.sentiment}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-xs">
                    {formatTime(mention.timestamp)}
                  </span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleStar(mention.id);
                }}
                className="p-1 hover:bg-gray-200 dark:hover:bg-slate-800 rounded transition-colors"
              >
                <Star
                  size={18}
                  className={
                    mention.isStarred
                      ? 'fill-yellow-500 text-yellow-500'
                      : 'text-gray-400 dark:text-gray-500'
                  }
                />
              </button>
            </div>

            {/* Content */}
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-3">
              {mention.content}
            </p>

            {/* Tags */}
            {mention.tags.length > 0 && (
              <div className="flex gap-1 mb-3 flex-wrap">
                {mention.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Engagement */}
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Heart size={14} />
                {mention.engagement.likes}
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle size={14} />
                {mention.engagement.comments}
              </div>
              <div className="flex items-center gap-1">
                <Repeat2 size={14} />
                {mention.engagement.reposts}
              </div>
            </div>
          </div>
        ))}

        {sortedMentions.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <p>No mentions found</p>
          </div>
        )}
      </div>
    </div>
  );
}
