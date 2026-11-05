/**
 * @description Canonical TanStack Query key registry for the Superadmin Backups feature.
 * @invariant Query identity preserves backup list and health resource identities.
 */
export const SUPERADMIN_BACKUPS_QUERY_KEYS = {
  all: ['superadmin_system_ops_backups', 'backups'] as const,
  list: (params: Readonly<Record<string, string>>) => ['superadmin_system_ops_backups', 'backups', params] as const,
  health: ['superadmin_system_ops_backups', 'backups_health'] as const,
  schedule: ['superadmin_system_ops_backups', 'backups', 'schedule'] as const,
} as const;
