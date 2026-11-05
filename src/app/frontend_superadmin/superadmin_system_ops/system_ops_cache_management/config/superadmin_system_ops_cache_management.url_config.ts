
/** Feature-owned navigation and frozen wire endpoints. Only these two contracts are exported. */
export const SUPERADMIN_SYSTEM_OPS_CACHE_MANAGEMENT_ROUTES = {
  ...({
  MAIN: '/frontend_superadmin/superadmin_system_ops/system_ops_cache_management',
  LEGACY: '/frontend_superadmin/superadmin_system_ops/system_ops_overview?view=infrastructure',
} as const),

} as const;
export const SUPERADMIN_SYSTEM_OPS_CACHE_MANAGEMENT_API = {
  ...({
  BASE: '/superadmin/system-ops/infrastructure',
  REDIS_TELEMETRY: '/superadmin/system-ops/infrastructure/redis',
  REDIS_FLUSH_GLOBAL: '/superadmin/system-ops/infrastructure/redis/flush-global',
  REDIS_FLUSH_TENANT: '/superadmin/system-ops/infrastructure/redis/flush-tenant',
  TENANTS: '/superadmin/gyms',
  UPTIME_HISTORY: '/superadmin/system-ops/infrastructure/uptime-history',
} as const),
  SUPERADMIN_SYSTEM_OPS_CACHE_MANAGEMENT_API_HEALTH: ({
  BACKEND_API: { BASE: '/superadmin/system-ops/infrastructure/api-health' },
} as const),
} as const;
