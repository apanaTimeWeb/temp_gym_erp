// RESPONSIBILITY: Canonical TanStack Query key registry for the AdminSales Admin feature.
// DATA FLOW: feature hook/API/component → stable feature constants → requests, cache keys, and UI behavior (admin_sales/sales_membership_report/constants/AdminSalesAnalyticsQueryKeys.ts)

/**
 * Provides one stable cache-key construction surface with explicit list/detail/resource identity boundaries.
 * @remarks Every server-state consumer in this feature must import this registry rather than inventing literals.
 */
export const ADMIN_SALES_QUERY_KEYS = {
  all: ['admin_sales'] as const,
  lists: () => [...ADMIN_SALES_QUERY_KEYS.all, 'list'] as const,
  list: (filters?: unknown) => filters === undefined ? ADMIN_SALES_QUERY_KEYS.lists() : [...ADMIN_SALES_QUERY_KEYS.lists(), filters] as const,
  details: () => [...ADMIN_SALES_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...ADMIN_SALES_QUERY_KEYS.details(), id] as const,
  key: (...segments: readonly unknown[]) => [...ADMIN_SALES_QUERY_KEYS.all, ...segments] as const,
};
