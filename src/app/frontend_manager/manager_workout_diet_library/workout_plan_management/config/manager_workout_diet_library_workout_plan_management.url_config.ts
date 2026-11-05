// RESPONSIBILITY: Owns every route path used by the Manager workout module.
/**
 * @description Canonical Manager workout URL/path registry. All URL literals are declared once as named constants and composed into the two canonical typed contracts below.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
const MANAGER_WORKOUT_PLANS_UI_PAGE_HOME_URL = '/frontend_manager/manager_workout_diet_library/workout_plan_management';
const MANAGER_WORKOUT_PLANS_BACKEND_API_BASE_URL = '/api/v1/manager/workouts';
const MANAGER_WORKOUT_PLANS_BACKEND_API_WORKOUTS_BASE_URL = '/api/v1/manager/workouts';
const MANAGER_WORKOUT_PLANS_BACKEND_API_WORKOUT_URL = (id: string) => `/api/v1/manager/workouts/${encodeURIComponent(id)}`;
const MANAGER_WORKOUT_PLANS_BACKEND_API_WORKOUT_EXERCISES_URL = (query: string) => `/api/v1/manager/workouts/exercises${query ? `?${query.replace(/^\?/, '')}` : ''}`;
const MANAGER_WORKOUT_PLANS_BACKEND_API_EXERCISES_BASE_URL = '/api/v1/manager/workouts/exercises';
const MANAGER_WORKOUT_PLANS_BACKEND_API_EXERCISE_URL = (id: string) => `/api/v1/manager/workouts/exercises/${encodeURIComponent(id)}`;
const MANAGER_WORKOUT_PLANS_BACKEND_API_ASSIGNMENTS_URL = '/api/v1/manager/workout/assignments';

export const MANAGER_WORKOUT_PLANS_ROUTES = {
  UI: {
    HOME: MANAGER_WORKOUT_PLANS_UI_PAGE_HOME_URL
  },
  PATHS: { ROOT_COMPATIBILITY: '/frontend_manager/manager_workout_diet_library' as const, LEAF: '/frontend_manager/manager_workout_diet_library/workout_plan_management' as const }
} as const;

export const MANAGER_WORKOUT_PLANS_API = {
  BASE: MANAGER_WORKOUT_PLANS_BACKEND_API_BASE_URL,
    WORKOUTS_BASE: MANAGER_WORKOUT_PLANS_BACKEND_API_WORKOUTS_BASE_URL,
    WORKOUT: MANAGER_WORKOUT_PLANS_BACKEND_API_WORKOUT_URL,
    WORKOUT_EXERCISES: MANAGER_WORKOUT_PLANS_BACKEND_API_WORKOUT_EXERCISES_URL,
    EXERCISES_BASE: MANAGER_WORKOUT_PLANS_BACKEND_API_EXERCISES_BASE_URL,
    EXERCISE: MANAGER_WORKOUT_PLANS_BACKEND_API_EXERCISE_URL,
    ASSIGNMENTS: MANAGER_WORKOUT_PLANS_BACKEND_API_ASSIGNMENTS_URL
} as const;
