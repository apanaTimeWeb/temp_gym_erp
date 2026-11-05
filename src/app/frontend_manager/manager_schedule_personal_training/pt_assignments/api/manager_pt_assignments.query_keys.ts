// RESPONSIBILITY: Owns the canonical TanStack Query key registry for the Manager pt module.
/**
 * @description Provides stable, module-namespaced query-key factories so cache entries cannot collide across resources or filters.
 * @dependencies None; consumed by module-owned query and mutation hooks.
 * @edge-case Resource-specific factories include resource identifiers whenever the query represents a specific entity.
 */
export const MANAGER_PT_ASSIGNMENTS_QUERY_KEYS = {
  all: ['manager_pt'] as const,
  kpis: () => [...MANAGER_PT_ASSIGNMENTS_QUERY_KEYS.all, 'kpis'] as const,
  workload: () => [...MANAGER_PT_ASSIGNMENTS_QUERY_KEYS.all, 'workload'] as const,
  packages: () => [...MANAGER_PT_ASSIGNMENTS_QUERY_KEYS.all, 'packages'] as const,
  assignments: <T extends object>(params?: T) => [...MANAGER_PT_ASSIGNMENTS_QUERY_KEYS.all, 'assignments', params] as const,
} as const;

/** Canonical PascalCase alias consumed by module query/mutation hooks. */
export const ManagerPtAssignmentsQueryKeys = MANAGER_PT_ASSIGNMENTS_QUERY_KEYS;
