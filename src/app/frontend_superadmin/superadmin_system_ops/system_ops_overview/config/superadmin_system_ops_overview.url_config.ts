const SUPERADMIN_SYSTEM_OPS_PHYSICAL_ROOT = '/frontend_superadmin/superadmin_system_ops';
/** Feature-owned navigation and frozen wire endpoints. Only these two contracts are exported. */
export const SUPERADMIN_SYSTEM_OPS_OVERVIEW_ROUTES = {
  ...({
  MAIN: SUPERADMIN_SYSTEM_OPS_PHYSICAL_ROOT,
  VIEW: (view: 'overview' | 'infrastructure' | 'jobs' | 'backups' | 'migrations') => {
    switch (view) {
      case 'overview': return `${SUPERADMIN_SYSTEM_OPS_PHYSICAL_ROOT}/system_ops_overview`;
      case 'infrastructure': return `${SUPERADMIN_SYSTEM_OPS_PHYSICAL_ROOT}/system_ops_infrastructure`;
      case 'jobs': return `${SUPERADMIN_SYSTEM_OPS_PHYSICAL_ROOT}/system_ops_jobs`;
      case 'backups': return `${SUPERADMIN_SYSTEM_OPS_PHYSICAL_ROOT}/system_ops_backups`;
      case 'migrations': return `${SUPERADMIN_SYSTEM_OPS_PHYSICAL_ROOT}/system_ops_migrations`;
    }
  },
  INFRASTRUCTURE: `${SUPERADMIN_SYSTEM_OPS_PHYSICAL_ROOT}/system_ops_infrastructure`,
  CANONICAL_INFRASTRUCTURE: `${SUPERADMIN_SYSTEM_OPS_PHYSICAL_ROOT}/system_ops_infrastructure`,
  JOBS: `${SUPERADMIN_SYSTEM_OPS_PHYSICAL_ROOT}/system_ops_jobs`,
  BACKUPS: `${SUPERADMIN_SYSTEM_OPS_PHYSICAL_ROOT}/system_ops_backups`,
  MIGRATIONS: `${SUPERADMIN_SYSTEM_OPS_PHYSICAL_ROOT}/system_ops_migrations`,
  CANONICAL_BACKUPS: `${SUPERADMIN_SYSTEM_OPS_PHYSICAL_ROOT}/system_ops_backups`,
  CANONICAL_JOBS: `${SUPERADMIN_SYSTEM_OPS_PHYSICAL_ROOT}/system_ops_jobs`,
  CANONICAL_MIGRATIONS: `${SUPERADMIN_SYSTEM_OPS_PHYSICAL_ROOT}/system_ops_migrations`,
} as const),
  SUPERADMIN_SYSTEM_OPS_BACKUPS_ROUTES: ({ MAIN: `${SUPERADMIN_SYSTEM_OPS_PHYSICAL_ROOT}/system_ops_backups`, CANONICAL_LEAF: `${SUPERADMIN_SYSTEM_OPS_PHYSICAL_ROOT}/system_ops_backups` } as const),
  SUPERADMIN_SYSTEM_OPS_JOBS_ROUTES: ({ MAIN: `${SUPERADMIN_SYSTEM_OPS_PHYSICAL_ROOT}/system_ops_jobs`, CANONICAL_LEAF: `${SUPERADMIN_SYSTEM_OPS_PHYSICAL_ROOT}/system_ops_jobs` } as const),
  SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_ROUTES: ({ MAIN: `${SUPERADMIN_SYSTEM_OPS_PHYSICAL_ROOT}/system_ops_infrastructure`, LEGACY: `${SUPERADMIN_SYSTEM_OPS_PHYSICAL_ROOT}/system_ops_overview?view=infrastructure` } as const),
} as const;
export const SUPERADMIN_SYSTEM_OPS_OVERVIEW_API = {
  ...({ SUMMARY: '/superadmin/system-ops/summary' } as const),

} as const;
