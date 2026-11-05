// RESPONSIBILITY: Stores Diet Library display constants only. Form schemas/defaults are feature-owned by the Diet form contract.
/**
 * @description Provides the ManagerLibraryDietPlansSharedConstants implementation for the library module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MANAGER_LIBRARY_DIET_PLANS_MAX_NUTRIENT_VALUE = 1_000_000;

export const GOALS = ['Weight Loss', 'Muscle Gain', 'Maintenance', 'Endurance', 'Flexibility'] as const;
