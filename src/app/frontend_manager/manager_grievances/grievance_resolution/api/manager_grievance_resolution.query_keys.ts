// RESPONSIBILITY: Owns the canonical TanStack Query key registry for the Manager grievance module.
/**
 * @description Provides stable, module-namespaced query-key factories so cache entries cannot collide across resources or filters.
 * @dependencies None; consumed by module-owned query and mutation hooks.
 * @edge-case Resource-specific factories include resource identifiers whenever the query represents a specific entity.
 */
export const MANAGER_GRIEVANCE_RESOLUTION_QUERY_KEYS = {
  all: ['manager_grievance'] as const,
  lists: () => [...MANAGER_GRIEVANCE_RESOLUTION_QUERY_KEYS.all, 'list'] as const,
  list: (params?: Record<string, string>) => [...MANAGER_GRIEVANCE_RESOLUTION_QUERY_KEYS.all, 'list', params] as const,
  detail: (id: string) => [...MANAGER_GRIEVANCE_RESOLUTION_QUERY_KEYS.all, 'detail', id] as const,
} as const;

/** Canonical PascalCase alias consumed by module query/mutation hooks. */
export const ManagerGrievanceResolutionQueryKeys = MANAGER_GRIEVANCE_RESOLUTION_QUERY_KEYS;
