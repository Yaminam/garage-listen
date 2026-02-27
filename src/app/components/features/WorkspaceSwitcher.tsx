import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Plus, Check } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { cn } from '../ui/utils';

interface WorkspaceSwitcherProps {
  className?: string;
}

export function WorkspaceSwitcher({ className }: WorkspaceSwitcherProps) {
  const { workspaces, currentWorkspace, setCurrentWorkspace } = useWorkspace();
  const [open, setOpen] = useState(false);

  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case 'free':
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
      case 'pro':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300';
      case 'enterprise':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start px-3 py-2 h-auto text-left hover:bg-gray-100 dark:hover:bg-slate-800',
            className
          )}
        >
          <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center text-white font-semibold mr-3 flex-shrink-0', currentWorkspace.color)}>
            {currentWorkspace.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {currentWorkspace.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {currentWorkspace.membersCount} members
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-56 dark:bg-slate-900 dark:border-slate-800">
        <DropdownMenuLabel className="text-gray-600 dark:text-gray-400">
          Workspaces
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="dark:bg-slate-800" />

        {/* Workspace List */}
        {workspaces.map((workspace) => (
          <DropdownMenuItem
            key={workspace.id}
            onClick={() => {
              setCurrentWorkspace(workspace);
              setOpen(false);
            }}
            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800 py-3 px-3"
          >
            <div className="flex items-center gap-3 w-full">
              <div
                className={cn(
                  'w-6 h-6 rounded flex items-center justify-center text-white text-xs font-semibold flex-shrink-0',
                  workspace.color
                )}
              >
                {workspace.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {workspace.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {workspace.membersCount} members
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span
                  className={cn(
                    'text-xs font-medium px-2 py-0.5 rounded-full',
                    getPlanBadgeColor(workspace.plan)
                  )}
                >
                  {workspace.plan}
                </span>
                {workspace.id === currentWorkspace.id && (
                  <Check size={16} className="text-green-500" />
                )}
              </div>
            </div>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator className="dark:bg-slate-800" />

        {/* Create New Workspace */}
        <DropdownMenuItem
          className="cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800 text-blue-600 dark:text-blue-400 focus:text-blue-600 dark:focus:text-blue-400 focus:bg-gray-100 dark:focus:bg-slate-800 py-2 px-3"
        >
          <Plus size={16} className="mr-2" />
          <span className="text-sm font-medium">Create Workspace</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
