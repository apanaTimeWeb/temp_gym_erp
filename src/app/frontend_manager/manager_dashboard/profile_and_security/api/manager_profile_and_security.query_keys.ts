// RESPONSIBILITY: Owns the canonical TanStack Query key registry for the Manager profile module.
/**
 * @description Provides stable, module-namespaced query-key factories so cache entries cannot collide across resources or filters.
 * @dependencies None; consumed by module-owned query and mutation hooks.
 * @edge-case Resource-specific factories include resource identifiers whenever the query represents a specific entity.
 */
export const MANAGER_PROFILE_AND_SECURITY_QUERY_KEYS = {
  all: ['manager_profile'] as const,
  current: () => [...MANAGER_PROFILE_AND_SECURITY_QUERY_KEYS.all, 'current'] as const,
} as const;

/** Canonical PascalCase alias consumed by module query/mutation hooks. */
export const ManagerProfileAndSecurityQueryKeys = MANAGER_PROFILE_AND_SECURITY_QUERY_KEYS;
