import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Workspace {
  id: string;
  name: string;
  description: string;
  logo?: string;
  plan: 'free' | 'pro' | 'enterprise';
  membersCount: number;
  createdAt: Date;
  color: string;
}

interface WorkspaceContextType {
  workspaces: Workspace[];
  currentWorkspace: Workspace;
  setCurrentWorkspace: (workspace: Workspace) => void;
  addWorkspace: (workspace: Workspace) => void;
  deleteWorkspace: (workspaceId: string) => void;
  updateWorkspace: (workspaceId: string, updates: Partial<Workspace>) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

// Sample workspaces
const SAMPLE_WORKSPACES: Workspace[] = [
  {
    id: '1',
    name: 'Acme Corp',
    description: 'Main brand monitoring workspace',
    plan: 'pro',
    membersCount: 8,
    createdAt: new Date('2024-01-15'),
    color: 'bg-blue-500',
  },
  {
    id: '2',
    name: 'Product Launch 2025',
    description: 'Dedicated monitoring for new product launch',
    plan: 'pro',
    membersCount: 5,
    createdAt: new Date('2024-06-20'),
    color: 'bg-purple-500',
  },
  {
    id: '3',
    name: 'Competitor Analysis',
    description: 'Tracking competitor mentions and sentiment',
    plan: 'free',
    membersCount: 2,
    createdAt: new Date('2024-09-10'),
    color: 'bg-orange-500',
  },
  {
    id: '4',
    name: 'Crisis Management',
    description: 'Real-time crisis monitoring and response',
    plan: 'enterprise',
    membersCount: 12,
    createdAt: new Date('2024-03-05'),
    color: 'bg-red-500',
  },
];

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>(SAMPLE_WORKSPACES);
  const [currentWorkspace, setCurrentWorkspaceState] = useState<Workspace>(SAMPLE_WORKSPACES[0]);

  const setCurrentWorkspace = (workspace: Workspace) => {
    setCurrentWorkspaceState(workspace);
  };

  const addWorkspace = (workspace: Workspace) => {
    setWorkspaces([...workspaces, workspace]);
  };

  const deleteWorkspace = (workspaceId: string) => {
    const updated = workspaces.filter((w) => w.id !== workspaceId);
    setWorkspaces(updated);
    if (currentWorkspace.id === workspaceId && updated.length > 0) {
      setCurrentWorkspaceState(updated[0]);
    }
  };

  const updateWorkspace = (workspaceId: string, updates: Partial<Workspace>) => {
    const updated = workspaces.map((w) =>
      w.id === workspaceId ? { ...w, ...updates } : w
    );
    setWorkspaces(updated);
    if (currentWorkspace.id === workspaceId) {
      setCurrentWorkspaceState({ ...currentWorkspace, ...updates });
    }
  };

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces,
        currentWorkspace,
        setCurrentWorkspace,
        addWorkspace,
        deleteWorkspace,
        updateWorkspace,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within WorkspaceProvider');
  }
  return context;
}
