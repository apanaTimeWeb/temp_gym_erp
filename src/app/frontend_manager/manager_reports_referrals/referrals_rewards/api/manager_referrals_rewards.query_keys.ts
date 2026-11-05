// RESPONSIBILITY: Owns the canonical TanStack Query key registry for the Manager referrals module.
/**
 * @description Provides stable, module-namespaced query-key factories so cache entries cannot collide across resources or filters.
 * @dependencies None; consumed by module-owned query and mutation hooks.
 * @edge-case Resource-specific factories include resource identifiers whenever the query represents a specific entity.
 */
export const MANAGER_REFERRALS_REWARDS_QUERY_KEYS = {
  all: ['manager_referrals'] as const,
  kpis: () => [...MANAGER_REFERRALS_REWARDS_QUERY_KEYS.all, 'kpis'] as const,
  list: <T extends object>(params?: T) => [...MANAGER_REFERRALS_REWARDS_QUERY_KEYS.all, 'list', params] as const,
  stats: () => [...MANAGER_REFERRALS_REWARDS_QUERY_KEYS.all, 'stats'] as const,
} as const;

/** Canonical PascalCase alias consumed by module query/mutation hooks. */
export const ManagerReferralsRewardsQueryKeys = MANAGER_REFERRALS_REWARDS_QUERY_KEYS;
