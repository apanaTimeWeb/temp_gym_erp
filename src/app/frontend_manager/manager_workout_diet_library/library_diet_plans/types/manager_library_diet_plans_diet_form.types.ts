import type { ManagerLibraryDietPlansDietFormInput, ManagerLibraryDietPlansDietFormValues } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/schemas/manager_library_diet_plans_diet_form.schemas';

export type DietFormInput = ManagerLibraryDietPlansDietFormInput;
export type DietFormValues = ManagerLibraryDietPlansDietFormValues;

/**
 * @description Provides the ManagerLibraryDietPlansDietFormTypes implementation for the library module.
 * @dependencies @/app/frontend_manager/manager_workout_diet_library/manager_library_schemas/ManagerLibraryDietPlansDietFormSchema
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
