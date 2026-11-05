import type { ManagerLibraryDietPlansExerciseFormSchemaValues } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/schemas/manager_library_diet_plans_exercise_form.schemas';

// RESPONSIBILITY: Defines React Hook Form values and defaults for Manager Library exercise create/edit flows.
export type ManagerLibraryDietPlansExerciseFormValues = ManagerLibraryDietPlansExerciseFormSchemaValues;

/**
 * @description Provides the ManagerLibraryDietPlansExerciseFormTypes implementation for the library module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
