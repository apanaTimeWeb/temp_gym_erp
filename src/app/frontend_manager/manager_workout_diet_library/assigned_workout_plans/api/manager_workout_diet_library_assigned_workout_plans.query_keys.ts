// RESPONSIBILITY: Owns the canonical TanStack Query key registry for the Manager workout module.
/**
 * @description Provides stable, module-namespaced query-key factories so cache entries cannot collide across resources or filters.
 * @dependencies None; consumed by module-owned query and mutation hooks.
 * @edge-case Resource-specific factories include resource identifiers whenever the query represents a specific entity.
 */
export const MANAGER_WORKOUT_PLANS_QUERY_KEYS = {
  all: ['manager_workout'] as const,
  plans: <T extends object>(params: T) => [...MANAGER_WORKOUT_PLANS_QUERY_KEYS.all, 'plans', params] as const,
  exercises: <T extends object>(params: T) => [...MANAGER_WORKOUT_PLANS_QUERY_KEYS.all, 'exercises', params] as const,
  assignments: () => [...MANAGER_WORKOUT_PLANS_QUERY_KEYS.all, 'assignments'] as const,
  detail: (id: string) => [...MANAGER_WORKOUT_PLANS_QUERY_KEYS.all, 'detail', id] as const,
  exerciseDetail: (id: string) => [...MANAGER_WORKOUT_PLANS_QUERY_KEYS.all, 'exercise-detail', id] as const,
} as const;

/** Canonical PascalCase alias consumed by module query/mutation hooks. */
export const ManagerWorkoutPlansQueryKeys = MANAGER_WORKOUT_PLANS_QUERY_KEYS;
