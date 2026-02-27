import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Mention {
  id: string;
  author: string;
  handle: string;
  platform: 'twitter' | 'instagram' | 'facebook' | 'linkedin' | 'reddit' | 'tiktok' | 'youtube' | 'threads' | 'bluesky';
  content: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  timestamp: Date;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    reposts: number;
  };
  avatar: string;
  verified: boolean;
  tags: string[];
  isRead: boolean;
  isStarred: boolean;
}

interface MentionsContextType {
  mentions: Mention[];
  selectedMention: Mention | null;
  setSelectedMention: (mention: Mention | null) => void;
  addMention: (mention: Mention) => void;
  markAsRead: (mentionId: string) => void;
  toggleStar: (mentionId: string) => void;
  deleteMention: (mentionId: string) => void;
  filterMentions: (filters: {
    sentiment?: string[];
    platform?: string[];
    dateRange?: string;
  }) => Mention[];
}

const MentionsContext = createContext<MentionsContextType | undefined>(undefined);

// Sample mentions data
const SAMPLE_MENTIONS: Mention[] = [
  {
    id: '1',
    author: 'Sarah Johnson',
    handle: '@sarahjohnson',
    platform: 'twitter',
    content: 'Just tried the new product and absolutely love it! The design is incredible. #UX #Design',
    sentiment: 'positive',
    timestamp: new Date(Date.now() - 30 * 60000),
    engagement: { likes: 234, comments: 45, shares: 12, reposts: 89 },
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    verified: true,
    tags: ['product', 'design', 'ux'],
    isRead: false,
    isStarred: false,
  },
  {
    id: '2',
    author: 'Mike Chen',
    handle: '@mikechen_dev',
    platform: 'twitter',
    content: 'Been using this for a week and the interface is really intuitive. Highly recommend!',
    sentiment: 'positive',
    timestamp: new Date(Date.now() - 60 * 60000),
    engagement: { likes: 156, comments: 28, shares: 5, reposts: 42 },
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    verified: false,
    tags: ['recommendation', 'review'],
    isRead: false,
    isStarred: false,
  },
  {
    id: '3',
    author: 'Alex Rivera',
    handle: '@alexrivera',
    platform: 'instagram',
    content: 'Love the new features! This update really improves my workflow 😍',
    sentiment: 'positive',
    timestamp: new Date(Date.now() - 120 * 60000),
    engagement: { likes: 892, comments: 156, shares: 0, reposts: 0 },
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    verified: false,
    tags: ['features', 'update'],
    isRead: true,
    isStarred: true,
  },
  {
    id: '4',
    author: 'Jamie Lee',
    handle: '@jamielee',
    platform: 'linkedin',
    content: 'Impressive platform! We integrated it into our workflow and saw immediate improvements.',
    sentiment: 'positive',
    timestamp: new Date(Date.now() - 180 * 60000),
    engagement: { likes: 234, comments: 12, shares: 8, reposts: 15 },
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie',
    verified: true,
    tags: ['business', 'integration'],
    isRead: true,
    isStarred: false,
  },
  {
    id: '5',
    author: 'Taylor Smith',
    handle: '@taylorsmith',
    platform: 'twitter',
    content: 'Had some issues with the latest update. Performance seems slower than before.',
    sentiment: 'negative',
    timestamp: new Date(Date.now() - 240 * 60000),
    engagement: { likes: 45, comments: 23, shares: 2, reposts: 8 },
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor',
    verified: false,
    tags: ['bug', 'performance'],
    isRead: true,
    isStarred: false,
  },
];

export function MentionsProvider({ children }: { children: ReactNode }) {
  const [mentions, setMentions] = useState<Mention[]>(SAMPLE_MENTIONS);
  const [selectedMention, setSelectedMention] = useState<Mention | null>(null);

  const addMention = (mention: Mention) => {
    setMentions([mention, ...mentions]);
  };

  const markAsRead = (mentionId: string) => {
    setMentions(
      mentions.map((m) =>
        m.id === mentionId ? { ...m, isRead: true } : m
      )
    );
  };

  const toggleStar = (mentionId: string) => {
    setMentions(
      mentions.map((m) =>
        m.id === mentionId ? { ...m, isStarred: !m.isStarred } : m
      )
    );
  };

  const deleteMention = (mentionId: string) => {
    setMentions(mentions.filter((m) => m.id !== mentionId));
    if (selectedMention?.id === mentionId) {
      setSelectedMention(null);
    }
  };

  const filterMentions = (filters: {
    sentiment?: string[];
    platform?: string[];
    dateRange?: string;
  }) => {
    let filtered = [...mentions];

    if (filters.sentiment && filters.sentiment.length > 0) {
      filtered = filtered.filter((m) => filters.sentiment!.includes(m.sentiment));
    }

    if (filters.platform && filters.platform.length > 0) {
      filtered = filtered.filter((m) => filters.platform!.includes(m.platform));
    }

    return filtered;
  };

  return (
    <MentionsContext.Provider
      value={{
        mentions,
        selectedMention,
        setSelectedMention,
        addMention,
        markAsRead,
        toggleStar,
        deleteMention,
        filterMentions,
      }}
    >
      {children}
    </MentionsContext.Provider>
  );
}

export function useMentions() {
  const context = useContext(MentionsContext);
  if (!context) {
    throw new Error('useMentions must be used within MentionsProvider');
  }
  return context;
}
