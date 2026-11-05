// RESPONSIBILITY: Owns the canonical TanStack Query key registry for the Manager dashboard module.
/**
 * @description Provides stable, module-namespaced query-key factories so cache entries cannot collide across resources or filters.
 * @dependencies None; consumed by module-owned query and mutation hooks.
 * @edge-case Resource-specific factories include resource identifiers whenever the query represents a specific entity.
 */
export const MANAGER_DASHBOARD_OVERVIEW_QUERY_KEYS = {
  all: ['manager_dashboard'] as const,
  stats: (params?: Record<string, string>) => [...MANAGER_DASHBOARD_OVERVIEW_QUERY_KEYS.all, 'stats', params] as const,
} as const;

/** Canonical PascalCase alias consumed by module query/mutation hooks. */
export const ManagerDashboardOverviewQueryKeys = MANAGER_DASHBOARD_OVERVIEW_QUERY_KEYS;
