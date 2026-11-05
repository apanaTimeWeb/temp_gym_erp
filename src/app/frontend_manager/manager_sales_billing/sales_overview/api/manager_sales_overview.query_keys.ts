// RESPONSIBILITY: Owns the canonical TanStack Query key registry for the Manager sales module.
/**
 * @description Provides stable, module-namespaced query-key factories so cache entries cannot collide across resources or filters.
 * @dependencies None; consumed by module-owned query and mutation hooks.
 * @edge-case Resource-specific factories include resource identifiers whenever the query represents a specific entity.
 */
export const MANAGER_SALES_OVERVIEW_QUERY_KEYS = {
  all: ['manager_sales'] as const,
  overview: (params?: Record<string, string>) => [...MANAGER_SALES_OVERVIEW_QUERY_KEYS.all, 'overview', params] as const,
  membershipReport: (params?: Record<string, string>) => [...MANAGER_SALES_OVERVIEW_QUERY_KEYS.all, 'membership_report', params] as const,
  pendingPayments: (params?: Record<string, string>) => [...MANAGER_SALES_OVERVIEW_QUERY_KEYS.all, 'pending_payments', params] as const,
  allMemberships: (params?: Record<string, string>) => [...MANAGER_SALES_OVERVIEW_QUERY_KEYS.all, 'all_memberships', params] as const,
} as const;

/** Canonical PascalCase alias consumed by module query/mutation hooks. */
export const ManagerSalesOverviewQueryKeys = MANAGER_SALES_OVERVIEW_QUERY_KEYS;
