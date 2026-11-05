// RESPONSIBILITY: Owns every route path used by the Manager library module.
/**
 * @description Canonical Manager library URL/path registry. All URL literals are declared once as named constants and composed into the two canonical typed contracts below.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
const MANAGER_LIBRARY_DIET_PLANS_PAGES_LIBRARY_URL = '/frontend_manager/manager_workout_diet_library/library_diet_plans';
const MANAGER_LIBRARY_DIET_PLANS_BACKEND_API_BASE_URL = '/api/v1/manager/library';
const MANAGER_LIBRARY_DIET_PLANS_BACKEND_API_EXERCISES_BASE_URL = '/api/v1/manager/library/exercises';
const MANAGER_LIBRARY_DIET_PLANS_BACKEND_API_EXERCISE_UPDATE_URL = (id: string) => `/api/v1/manager/library/exercises/${id}`;
const MANAGER_LIBRARY_DIET_PLANS_BACKEND_API_EXERCISE_DELETE_URL = (id: string) => `/api/v1/manager/library/exercises/${id}`;
const MANAGER_LIBRARY_DIET_PLANS_BACKEND_API_DIET_PLANS_BASE_URL = '/api/v1/manager/library/diet-plans';
const MANAGER_LIBRARY_DIET_PLANS_BACKEND_API_DIET_PLAN_UPDATE_URL = (id: string) => `/api/v1/manager/library/diet-plans/${id}`;
const MANAGER_LIBRARY_DIET_PLANS_BACKEND_API_DIET_PLAN_DELETE_URL = (id: string) => `/api/v1/manager/library/diet-plans/${id}`;

export const MANAGER_LIBRARY_DIET_PLANS_ROUTES = {
  PAGES: {
    LIBRARY: MANAGER_LIBRARY_DIET_PLANS_PAGES_LIBRARY_URL
  },
  PATHS: { ROOT_COMPATIBILITY: '/frontend_manager/manager_workout_diet_library' as const, LEAF: '/frontend_manager/manager_workout_diet_library/library_diet_plans' as const }
} as const;

export const MANAGER_LIBRARY_DIET_PLANS_API = {
  BASE: MANAGER_LIBRARY_DIET_PLANS_BACKEND_API_BASE_URL,
    EXERCISES_BASE: MANAGER_LIBRARY_DIET_PLANS_BACKEND_API_EXERCISES_BASE_URL,
    EXERCISE_UPDATE: MANAGER_LIBRARY_DIET_PLANS_BACKEND_API_EXERCISE_UPDATE_URL,
    EXERCISE_DELETE: MANAGER_LIBRARY_DIET_PLANS_BACKEND_API_EXERCISE_DELETE_URL,
    DIET_PLANS_BASE: MANAGER_LIBRARY_DIET_PLANS_BACKEND_API_DIET_PLANS_BASE_URL,
    DIET_PLAN_UPDATE: MANAGER_LIBRARY_DIET_PLANS_BACKEND_API_DIET_PLAN_UPDATE_URL,
    DIET_PLAN_DELETE: MANAGER_LIBRARY_DIET_PLANS_BACKEND_API_DIET_PLAN_DELETE_URL
} as const;
