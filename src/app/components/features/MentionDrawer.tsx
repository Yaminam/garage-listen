import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { Button } from '../ui/button';
import { Star, MessageCircle, Heart, Repeat2, Trash2, Share, Reply, X } from 'lucide-react';
import { useMentions } from '../../context/MentionsContext';
import { cn } from '../ui/utils';

const PLATFORM_COLORS = {
  twitter: 'bg-blue-500 text-white',
  instagram: 'bg-pink-500 text-white',
  facebook: 'bg-blue-600 text-white',
  linkedin: 'bg-blue-700 text-white',
  reddit: 'bg-orange-500 text-white',
  tiktok: 'bg-black text-white',
  youtube: 'bg-red-500 text-white',
  threads: 'bg-purple-500 text-white',
  bluesky: 'bg-cyan-500 text-white',
};

export function MentionDrawer() {
  const { selectedMention, setSelectedMention, toggleStar, deleteMention } = useMentions();

  if (!selectedMention) return null;

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return { bg: 'bg-green-100 dark:bg-green-950', text: 'text-green-800 dark:text-green-200' };
      case 'negative':
        return { bg: 'bg-red-100 dark:bg-red-950', text: 'text-red-800 dark:text-red-200' };
      default:
        return { bg: 'bg-gray-100 dark:bg-slate-800', text: 'text-gray-800 dark:text-gray-200' };
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const sentiment = getSentimentColor(selectedMention.sentiment);

  return (
    <Sheet open={!!selectedMention} onOpenChange={() => setSelectedMention(null)}>
      <SheetContent className="w-full sm:w-[600px] flex flex-col dark:bg-slate-950">
        <SheetHeader>
          <SheetTitle className="dark:text-white">Mention Details</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto space-y-6">
          {/* Author Card */}
          <div className="pt-4 border-b border-gray-200 dark:border-slate-800 pb-4">
            <div className="flex items-start gap-4">
              <img
                src={selectedMention.avatar}
                alt={selectedMention.author}
                className="w-16 h-16 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold dark:text-white">{selectedMention.author}</h3>
                  {selectedMention.verified && (
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  {selectedMention.handle}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span
                    className={cn(
                      'px-3 py-1 rounded-full text-xs font-medium text-white',
                      PLATFORM_COLORS[selectedMention.platform]
                    )}
                  >
                    {selectedMention.platform}
                  </span>
                  <span
                    className={cn(
                      'px-3 py-1 rounded-full text-xs font-medium',
                      sentiment.bg,
                      sentiment.text
                    )}
                  >
                    {selectedMention.sentiment.charAt(0).toUpperCase() +
                      selectedMention.sentiment.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
              Content
            </h4>
            <p className="text-gray-900 dark:text-gray-100 leading-relaxed">
              {selectedMention.content}
            </p>
          </div>

          {/* Tags */}
          {selectedMention.tags.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedMention.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Engagement Metrics */}
          <div>
            <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
              Engagement
            </h4>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gray-50 dark:bg-slate-900 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Heart size={16} className="text-red-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Likes</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedMention.engagement.likes}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-slate-900 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <MessageCircle size={16} className="text-blue-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Comments</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedMention.engagement.comments}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-slate-900 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Repeat2 size={16} className="text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Reposts</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedMention.engagement.reposts}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-slate-900 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Share size={16} className="text-purple-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Shares</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedMention.engagement.shares}
                </p>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="pt-4 border-t border-gray-200 dark:border-slate-800">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Posted on {formatDate(selectedMention.timestamp)}
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 dark:border-slate-700 dark:hover:bg-slate-900">
                <Reply size={16} className="mr-2" />
                Reply
              </Button>
              <Button variant="outline" size="sm" className="flex-1 dark:border-slate-700 dark:hover:bg-slate-900">
                <Share size={16} className="mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex gap-2 border-t border-gray-200 dark:border-slate-800 pt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleStar(selectedMention.id)}
            className="flex-1 dark:hover:bg-slate-900"
          >
            <Star
              size={16}
              className={
                selectedMention.isStarred
                  ? 'fill-yellow-500 text-yellow-500 mr-2'
                  : 'text-gray-400 dark:text-gray-500 mr-2'
              }
            />
            {selectedMention.isStarred ? 'Starred' : 'Star'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              deleteMention(selectedMention.id);
              setSelectedMention(null);
            }}
            className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 dark:text-red-400"
          >
            <Trash2 size={16} className="mr-2" />
            Delete
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
