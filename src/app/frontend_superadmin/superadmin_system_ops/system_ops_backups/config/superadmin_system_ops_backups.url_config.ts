
/** Feature-owned navigation and frozen wire endpoints. Only these two contracts are exported. */
export const SUPERADMIN_SYSTEM_OPS_BACKUPS_ROUTES = {
  ...({ MAIN: '/frontend_superadmin/superadmin_system_ops/system_ops_backups', CANONICAL_LEAF: '/frontend_superadmin/superadmin_system_ops/system_ops_backups' } as const),

} as const;
export const SUPERADMIN_SYSTEM_OPS_BACKUPS_API = {
  ...({ BASE: '/superadmin/system-ops/backups', SCHEDULE: '/superadmin/system-ops/backups/schedule', TRIGGER: '/superadmin/system-ops/backups/trigger', DOWNLOAD: (id: string) => `/superadmin/system-ops/backups/${encodeURIComponent(id)}/download`, RESTORE: (id: string) => `/superadmin/system-ops/backups/${encodeURIComponent(id)}/restore` } as const),
  SUPERADMIN_SYSTEM_OPS_BACKUPS_HEALTH: ({ BACKEND_API: { BASE: '/superadmin/system-ops/backups/health' } } as const),
} as const;
