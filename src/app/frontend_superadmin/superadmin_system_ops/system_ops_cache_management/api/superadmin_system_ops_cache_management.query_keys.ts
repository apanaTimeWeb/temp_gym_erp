/**
 * @description Canonical TanStack Query key registry for the Superadmin Infrastructure feature.
 * @invariant Query identity preserves node, Redis, tenant and uptime resources.
 */
export const SUPERADMIN_CACHE_MANAGEMENT_QUERY_KEYS = {
  all: ['superadmin_system_ops_cache_management', 'infrastructure'] as const,
  nodesAll: ['superadmin_system_ops_cache_management', 'infrastructure', 'nodes'] as const,
  nodes: (normalizedParams: Readonly<Record<string, string>>) => ['superadmin_system_ops_cache_management', 'infrastructure', 'nodes', normalizedParams] as const,
  redis: ['superadmin_system_ops_cache_management', 'infrastructure', 'redis'] as const,
  tenants: ['superadmin_system_ops_cache_management', 'infrastructure', 'tenants'] as const,
  uptimeHistory: ['superadmin_system_ops_cache_management', 'infrastructure', 'uptime-history'] as const,
} as const;
