// RESPONSIBILITY: Canonical TanStack Query key registry for the AdminGymHealthAlerts Admin feature.
// DATA FLOW: feature hook/API/component → stable feature constants → requests, cache keys, and UI behavior (admin_gym_health_alerts/gym_health_alerts_monitoring/constants/AdminGymsHealthAlertsMonitoringQueryKeys.ts)

/**
 * Provides one stable cache-key construction surface with explicit list/detail/resource identity boundaries.
 * @remarks Every server-state consumer in this feature must import this registry rather than inventing literals.
 */
export const ADMIN_GYM_HEALTH_ALERTS_QUERY_KEYS = {
  all: ['admin_gym_health_alerts'] as const,
  lists: () => [...ADMIN_GYM_HEALTH_ALERTS_QUERY_KEYS.all, 'list'] as const,
  list: (filters?: unknown) => filters === undefined ? ADMIN_GYM_HEALTH_ALERTS_QUERY_KEYS.lists() : [...ADMIN_GYM_HEALTH_ALERTS_QUERY_KEYS.lists(), filters] as const,
  details: () => [...ADMIN_GYM_HEALTH_ALERTS_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...ADMIN_GYM_HEALTH_ALERTS_QUERY_KEYS.details(), id] as const,
  key: (...segments: readonly unknown[]) => [...ADMIN_GYM_HEALTH_ALERTS_QUERY_KEYS.all, ...segments] as const,
};
