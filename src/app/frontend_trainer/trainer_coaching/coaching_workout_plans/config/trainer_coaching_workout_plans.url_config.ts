/** Verified from the existing Trainer Workout tab route; owned locally to preserve submodule isolation. */
export const TRAINER_WORKOUT_PAGE_EXERCISES_NAV = '/frontend_trainer/trainer_coaching/coaching_exercise_management' as const;
// trainer_workout_url_config.ts
// RESPONSIBILITY: Canonical navigation and API endpoint contract owned only by trainer_workout.
// DATA FLOW: feature navigation/API consumers -> named URL constants -> MODULE_URLS.

export const TRAINER_WORKOUT_PAGE_DASHBOARD = '/frontend_trainer/trainer_dashboard/dashboard_overview' as const;
export const TRAINER_WORKOUT_PAGE_LIST = '/frontend_trainer/trainer_coaching/coaching_workout_plans' as const;
export const TRAINER_WORKOUT_VIEW_QUERY_PARAM = 'view' as const;
export const TRAINER_WORKOUT_SCREEN_VIEW_VALUES = ['plans', 'exercises'] as const;

export const TRAINER_WORKOUT_API_BASE = '/trainer/workout' as const;
export const TRAINER_WORKOUT_API_WORKOUTS = '/trainer/trainer_workout/workouts' as const;
export const TRAINER_WORKOUT_API_WORKOUT = (id: string) => `/trainer/trainer_workout/workouts/${id}` as const;
export const TRAINER_WORKOUT_API_EXERCISES = '/trainer/trainer_workout/exercises' as const;
export const TRAINER_WORKOUT_API_EXERCISE = (id: string) => `/trainer/trainer_workout/exercises/${id}` as const;

export const TRAINER_WORKOUT_URLS = {
  ROUTES: {
    DASHBOARD: TRAINER_WORKOUT_PAGE_DASHBOARD,
    LIST: TRAINER_WORKOUT_PAGE_LIST,
  } as const,
  API: {
    BASE: TRAINER_WORKOUT_API_BASE,
    WORKOUTS: TRAINER_WORKOUT_API_WORKOUTS,
    WORKOUT: TRAINER_WORKOUT_API_WORKOUT,
    EXERCISES: TRAINER_WORKOUT_API_EXERCISES,
    EXERCISE: TRAINER_WORKOUT_API_EXERCISE,
  } as const,
} as const;
