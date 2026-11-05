// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
'use client';
import { useQuery } from '@tanstack/react-query';

import { ManagerLibraryDietPlansApi } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/api/manager_library_diet_plans.api';
import { ManagerLibraryDietPlansQueryKeys } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/api/manager_library_diet_plans.query_keys';
import type { ManagerLibraryDietPlansListParams } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/api/manager_library_diet_plans.api';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates library feature state and its documented UI/API boundary through useManagerLibraryDietPlansQuery.
 * @dependencies Uses ManagerLibraryDietPlansApi.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
/**
 * @description useManagerLibraryDietPlansQuery owns the library feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerLibraryDietPlansQuery(params: ManagerLibraryDietPlansListParams) {
  return useQuery({ queryKey: ManagerLibraryDietPlansQueryKeys.dietPlans(params), queryFn: () => ManagerLibraryDietPlansApi.fetchDietPlans(params) });
}

/**
 * @description Loads library exercise records through the module API and canonical query-key registry.
 * @dependencies Uses ManagerLibraryDietPlansApi and ManagerLibraryDietPlansQueryKeys; server state remains owned by TanStack Query.
 * @edge-case Preserves empty result sets, request failures, and filter-specific cache identity.
 */
export function useManagerLibraryDietPlansExercisesQuery(params: ManagerLibraryDietPlansListParams) {
  return useQuery({ queryKey: ManagerLibraryDietPlansQueryKeys.exercises(params), queryFn: () => ManagerLibraryDietPlansApi.fetchExercises(params) });
}
