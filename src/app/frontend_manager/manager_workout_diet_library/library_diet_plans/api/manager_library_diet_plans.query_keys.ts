// RESPONSIBILITY: Owns the canonical TanStack Query key registry for the Manager library module.
/**
 * @description Provides stable, module-namespaced query-key factories so cache entries cannot collide across resources or filters.
 * @dependencies None; consumed by module-owned query and mutation hooks.
 * @edge-case Resource-specific factories include resource identifiers whenever the query represents a specific entity.
 */
export const MANAGER_LIBRARY_DIET_PLANS_QUERY_KEYS = {
  all: ['manager_library'] as const,
  dietPlans: <T extends object>(params: T) => [...MANAGER_LIBRARY_DIET_PLANS_QUERY_KEYS.all, 'diet-plans', params] as const,
  exercises: <T extends object>(params: T) => [...MANAGER_LIBRARY_DIET_PLANS_QUERY_KEYS.all, 'exercises', params] as const,
  dietPlanDetail: (id: string) => [...MANAGER_LIBRARY_DIET_PLANS_QUERY_KEYS.all, 'diet-plan-detail', id] as const,
  exerciseDetail: (id: string) => [...MANAGER_LIBRARY_DIET_PLANS_QUERY_KEYS.all, 'exercise-detail', id] as const,
} as const;

/** Canonical PascalCase alias consumed by module query/mutation hooks. */
export const ManagerLibraryDietPlansQueryKeys = MANAGER_LIBRARY_DIET_PLANS_QUERY_KEYS;
