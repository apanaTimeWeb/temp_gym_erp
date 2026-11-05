// RESPONSIBILITY: Owns static Manager Library exercise editor configuration only.
/**
 * @description Provides the ManagerLibraryDietPlansExerciseConstants implementation for the library module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MANAGER_LIBRARY_DIET_PLANS_EXERCISE_DIFFICULTIES = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] as const;
export const MANAGER_LIBRARY_DIET_PLANS_EXERCISE_CATEGORIES = ['Barbell', 'Dumbbells', 'Bodyweight', 'Machine', 'Cardio', 'Mobility'] as const;
