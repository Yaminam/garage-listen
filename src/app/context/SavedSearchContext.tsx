interface SavedSearch {
  id: string;
  name: string;
  filters: Record<string, any>;
  createdAt: Date;
}

interface SavedSearchContextType {
  savedSearches: SavedSearch[];
  saveSearch: (name: string, filters: Record<string, any>) => void;
  loadSearch: (id: string) => Record<string, any> | undefined;
  deleteSearch: (id: string) => void;
}

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

const SavedSearchContext = createContext<SavedSearchContextType | undefined>(undefined);

export function SavedSearchProvider({ children }: { children: ReactNode }) {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>(() => {
    const saved = localStorage.getItem('savedSearches');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
  }, [savedSearches]);

  const saveSearch = (name: string, filters: Record<string, any>) => {
    const newSearch: SavedSearch = {
      id: Date.now().toString(),
      name,
      filters,
      createdAt: new Date(),
    };
    setSavedSearches(prev => [newSearch, ...prev]);
  };

  const loadSearch = (id: string) => {
    return savedSearches.find(s => s.id === id)?.filters;
  };

  const deleteSearch = (id: string) => {
    setSavedSearches(prev => prev.filter(s => s.id !== id));
  };

  return (
    <SavedSearchContext.Provider value={{ savedSearches, saveSearch, loadSearch, deleteSearch }}>
      {children}
    </SavedSearchContext.Provider>
  );
}

export function useSavedSearch() {
  const context = useContext(SavedSearchContext);
  if (context === undefined) {
    throw new Error('useSavedSearch must be used within a SavedSearchProvider');
  }
  return context;
}
