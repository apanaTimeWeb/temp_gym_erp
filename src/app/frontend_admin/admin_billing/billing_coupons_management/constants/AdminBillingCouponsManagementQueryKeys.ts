// RESPONSIBILITY: Canonical TanStack Query key registry for the AdminCoupons Admin feature.
// DATA FLOW: feature hook/API/component → stable feature constants → requests, cache keys, and UI behavior (admin_coupons/coupons_management/constants/AdminBillingCouponsManagementQueryKeys.ts)

/**
 * Provides one stable cache-key construction surface with explicit list/detail/resource identity boundaries.
 * @remarks Every server-state consumer in this feature must import this registry rather than inventing literals.
 */
export const ADMIN_COUPONS_QUERY_KEYS = {
  all: ['admin_coupons'] as const,
  lists: () => [...ADMIN_COUPONS_QUERY_KEYS.all, 'list'] as const,
  list: (filters?: unknown) => filters === undefined ? ADMIN_COUPONS_QUERY_KEYS.lists() : [...ADMIN_COUPONS_QUERY_KEYS.lists(), filters] as const,
  details: () => [...ADMIN_COUPONS_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...ADMIN_COUPONS_QUERY_KEYS.details(), id] as const,
  key: (...segments: readonly unknown[]) => [...ADMIN_COUPONS_QUERY_KEYS.all, ...segments] as const,
};
