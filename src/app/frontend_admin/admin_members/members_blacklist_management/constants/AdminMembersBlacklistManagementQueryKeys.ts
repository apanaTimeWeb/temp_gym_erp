// RESPONSIBILITY: Canonical TanStack Query key registry for the AdminBlacklist Admin feature.
// DATA FLOW: feature hook/API/component → stable feature constants → requests, cache keys, and UI behavior (admin_blacklist/blacklist_management/constants/AdminMembersBlacklistManagementQueryKeys.ts)

/**
 * Provides one stable cache-key construction surface with explicit list/detail/resource identity boundaries.
 * @remarks Every server-state consumer in this feature must import this registry rather than inventing literals.
 */
export const ADMIN_BLACKLIST_QUERY_KEYS = {
  all: ['admin_blacklist'] as const,
  lists: () => [...ADMIN_BLACKLIST_QUERY_KEYS.all, 'list'] as const,
  list: (filters?: unknown) => filters === undefined ? ADMIN_BLACKLIST_QUERY_KEYS.lists() : [...ADMIN_BLACKLIST_QUERY_KEYS.lists(), filters] as const,
  details: () => [...ADMIN_BLACKLIST_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...ADMIN_BLACKLIST_QUERY_KEYS.details(), id] as const,
  key: (...segments: readonly unknown[]) => [...ADMIN_BLACKLIST_QUERY_KEYS.all, ...segments] as const,
};
