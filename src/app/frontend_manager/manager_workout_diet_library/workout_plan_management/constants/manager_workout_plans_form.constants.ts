/**
 * @description Provides the ManagerWorkoutPlansFormConstants implementation for the workout module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MANAGER_WORKOUT_PLANS_LEVELS = [
  { value: 'BEGINNER', labelKey: 'COPY_BEGINNER' },
  { value: 'INTERMEDIATE', labelKey: 'COPY_INTERMEDIATE' },
  { value: 'ADVANCED', labelKey: 'COPY_ADVANCED' },
] as const;

export const MANAGER_WORKOUT_PLANS_MAX_DAYS = 7;
export const MANAGER_WORKOUT_PLANS_MAX_EXERCISES = 20;
