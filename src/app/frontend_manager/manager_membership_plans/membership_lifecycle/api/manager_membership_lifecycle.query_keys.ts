// RESPONSIBILITY: Owns the canonical TanStack Query key registry for the Manager plans module.
/**
 * @description Provides stable, module-namespaced query-key factories so cache entries cannot collide across resources or filters.
 * @dependencies None; consumed by module-owned query and mutation hooks.
 * @edge-case Resource-specific factories include resource identifiers whenever the query represents a specific entity.
 */
export const MANAGER_MEMBERSHIP_LIFECYCLE_QUERY_KEYS = {
  all: ['manager_plans'] as const,
  list: <T extends object>(params?: T) => [...MANAGER_MEMBERSHIP_LIFECYCLE_QUERY_KEYS.all, 'list', params] as const,
  membershipOverview: () => [...MANAGER_MEMBERSHIP_LIFECYCLE_QUERY_KEYS.all, 'membership-overview'] as const,
  detail: (id: string) => [...MANAGER_MEMBERSHIP_LIFECYCLE_QUERY_KEYS.all, 'detail', id] as const,
} as const;

/** Canonical PascalCase alias consumed by module query/mutation hooks. */
export const ManagerMembershipLifecycleQueryKeys = MANAGER_MEMBERSHIP_LIFECYCLE_QUERY_KEYS;
