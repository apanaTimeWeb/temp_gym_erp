// DATA FLOW: User intent → this module mutation hook → module API → query invalidation → consuming module UI.
'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ManagerLibraryDietPlansApi } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/api/manager_library_diet_plans.api';
import { ManagerLibraryDietPlansQueryKeys } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/api/manager_library_diet_plans.query_keys';
import type { DietPlan, Exercise } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/types/manager_library_diet_plans.types';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates library feature state and its documented UI/API boundary through useManagerLibraryDietPlansMutations.
 * @dependencies Uses ManagerIdempotency, ManagerLibraryDietPlansApi, useManagerLibraryDietPlansQueries, ManagerLibraryDietPlansTypes.
 * @edge-case reuses the caller-provided idempotency key for the same mutation intent; refreshes affected TanStack Query server state after successful mutations.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerLibraryDietPlansMutations owns the library feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerLibraryDietPlansMutations() {
  const queryClient = useQueryClient();
  const invalidateDiet = () => queryClient.invalidateQueries({ queryKey: ManagerLibraryDietPlansQueryKeys.all });
  const invalidateExercise = () => queryClient.invalidateQueries({ queryKey: ManagerLibraryDietPlansQueryKeys.all });
  const saveDiet = useMutation({
    mutationFn: (input: { id: string | null; data: Partial<DietPlan>; idempotencyKey: string }) => input.id ? ManagerLibraryDietPlansApi.updateDietPlan(input.id, input.data, input.idempotencyKey) : ManagerLibraryDietPlansApi.createDietPlan(input.data, input.idempotencyKey),
    onSuccess: invalidateDiet,
  });
  const removeDiet = useMutation({ mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => ManagerLibraryDietPlansApi.deleteDietPlan(id, idempotencyKey), onSuccess: invalidateDiet });
  const saveExercise = useMutation({
    mutationFn: (input: { id: string | null; data: Partial<Exercise>; idempotencyKey: string }) => input.id ? ManagerLibraryDietPlansApi.updateExercise(input.id, input.data, input.idempotencyKey) : ManagerLibraryDietPlansApi.createExercise(input.data, input.idempotencyKey),
    onSuccess: invalidateExercise,
  });
  const removeExercise = useMutation({ mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => ManagerLibraryDietPlansApi.deleteExercise(id, idempotencyKey), onSuccess: invalidateExercise });
  return { saveDiet, removeDiet, saveExercise, removeExercise };
}
