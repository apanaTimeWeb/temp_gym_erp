/** Role-navigation route registry: URLs only, with no feature business imports. */
const SUPERADMIN_SYSTEM_OPS_ROUTE_ROOT = '/frontend_superadmin/superadmin_system_ops';
export const SUPERADMIN_SYSTEM_OPS_ROUTES = {
  MAIN: SUPERADMIN_SYSTEM_OPS_ROUTE_ROOT,
  VIEW: (view: 'overview' | 'infrastructure' | 'jobs' | 'backups' | 'migrations') => {
    switch (view) {
      case 'overview': return `${SUPERADMIN_SYSTEM_OPS_ROUTE_ROOT}/system_ops_overview`;
      case 'infrastructure': return `${SUPERADMIN_SYSTEM_OPS_ROUTE_ROOT}/system_ops_overview?view=infrastructure`;
      case 'jobs': return `${SUPERADMIN_SYSTEM_OPS_ROUTE_ROOT}/system_ops_jobs`;
      case 'backups': return `${SUPERADMIN_SYSTEM_OPS_ROUTE_ROOT}/system_ops_backups`;
      case 'migrations': return `${SUPERADMIN_SYSTEM_OPS_ROUTE_ROOT}/system_ops_migrations`;
    }
  },
  INFRASTRUCTURE: `${SUPERADMIN_SYSTEM_OPS_ROUTE_ROOT}/system_ops_overview?view=infrastructure`,
  JOBS: `${SUPERADMIN_SYSTEM_OPS_ROUTE_ROOT}/system_ops_jobs`,
  BACKUPS: `${SUPERADMIN_SYSTEM_OPS_ROUTE_ROOT}/system_ops_backups`,
  MIGRATIONS: `${SUPERADMIN_SYSTEM_OPS_ROUTE_ROOT}/system_ops_migrations`,
  CANONICAL_OVERVIEW: `${SUPERADMIN_SYSTEM_OPS_ROUTE_ROOT}/system_ops_overview`,
  CANONICAL_BACKUPS: `${SUPERADMIN_SYSTEM_OPS_ROUTE_ROOT}/system_ops_backups`,
  CANONICAL_JOBS: `${SUPERADMIN_SYSTEM_OPS_ROUTE_ROOT}/system_ops_jobs`,
  CANONICAL_MIGRATIONS: `${SUPERADMIN_SYSTEM_OPS_ROUTE_ROOT}/system_ops_migrations`,
} as const;
