// RESPONSIBILITY: Stores Workout Library display/filter constants only; forms and mock data are owned by their dedicated module contracts.
/**
 * @description Provides the ManagerWorkoutPlansSharedConstants implementation for the workout module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MANAGER_WORKOUT_PLANS_MAX_DAYS = 365;
export const MANAGER_WORKOUT_PLANS_MAX_EXERCISES = 500;

export const WORKOUT_LEVEL_OPTIONS = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] as const;


export const MANAGER_WORKOUT_PLANS_LEVEL_LABEL_KEYS = {
  BEGINNER: 'COPY_BEGINNER',
  INTERMEDIATE: 'COPY_INTERMEDIATE',
  ADVANCED: 'COPY_ADVANCED',
} as const;


export const WORKOUT_LEVEL_FILTER_OPTIONS = [
  { value: 'ALL', labelKey: 'COPY_ALL_LEVELS' },
  { value: 'BEGINNER', labelKey: 'COPY_BEGINNER' },
  { value: 'INTERMEDIATE', labelKey: 'COPY_INTERMEDIATE' },
  { value: 'ADVANCED', labelKey: 'COPY_ADVANCED' },
] as const;
