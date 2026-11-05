// RESPONSIBILITY: Owns the canonical TanStack Query key registry for the Manager settings module.
/**
 * @description Provides stable, module-namespaced query-key factories so cache entries cannot collide across resources or filters.
 * @dependencies None; consumed by module-owned query and mutation hooks.
 * @edge-case Resource-specific factories include resource identifiers whenever the query represents a specific entity.
 */
export const MANAGER_BUSINESS_SETTINGS_QUERY_KEYS = {
  all: ['manager_settings'] as const,
  current: () => [...MANAGER_BUSINESS_SETTINGS_QUERY_KEYS.all, 'current'] as const,
} as const;

/** Canonical PascalCase alias consumed by module query/mutation hooks. */
export const ManagerBusinessSettingsQueryKeys = MANAGER_BUSINESS_SETTINGS_QUERY_KEYS;
