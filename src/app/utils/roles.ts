// User roles definition
export type UserRole = 'admin' | 'team_lead' | 'analyst' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

// Permission definitions
const PERMISSIONS: Record<UserRole, string[]> = {
  admin: [
    'manage_users',
    'manage_settings',
    'view_analytics',
    'create_reports',
    'export_data',
    'manage_integrations',
    'delete_data',
  ],
  team_lead: [
    'view_analytics',
    'create_reports',
    'export_data',
    'assign_tasks',
    'manage_team',
  ],
  analyst: [
    'view_analytics',
    'create_reports',
    'export_data',
  ],
  viewer: [
    'view_analytics',
  ],
};

const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  admin: 'Full access to all features and settings',
  team_lead: 'Can manage team, create reports, and assign tasks',
  analyst: 'Can view analytics and create reports',
  viewer: 'Read-only access to analytics',
};

export function hasPermission(role: UserRole, permission: string): boolean {
  return PERMISSIONS[role].includes(permission);
}

export function canPerformAction(role: UserRole, action: string): boolean {
  return hasPermission(role, action);
}

export function getRoleDescription(role: UserRole): string {
  return ROLE_DESCRIPTIONS[role];
}

export function getAllRoles(): Array<{ role: UserRole; description: string }> {
  return Object.entries(ROLE_DESCRIPTIONS).map(([role, description]) => ({
    role: role as UserRole,
    description,
  }));
}
