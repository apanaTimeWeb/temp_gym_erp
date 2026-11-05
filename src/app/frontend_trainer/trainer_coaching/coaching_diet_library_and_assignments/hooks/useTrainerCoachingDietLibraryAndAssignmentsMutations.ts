"use client";
// DATA FLOW: Library UI action → useTrainerLibraryMutations → module-owned API → TanStack Query invalidation → library UI
// RESPONSIBILITY: Owns Trainer Diet Library write operations and targeted server-state reconciliation.
import { useCallback } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TrainerLibraryApi } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/api/TrainerCoachingDietLibraryAndAssignmentsApi';

import { TRAINER_LIBRARY_QUERY_KEYS } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/config/TrainerCoachingDietLibraryAndAssignmentsQueryKeys';

import type { TrainerLibraryAssignDietPlanMutationVariables } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/types/TrainerCoachingDietLibraryAndAssignmentsMutationTypes';







/**
 * @description Owns diet-plan assignment mutation behavior for the Trainer Library feature.
 * @dependencies Trainer Library API and canonical Library query-key registry.
 * @edge-case Invalidates both assignment and list queries after success so the next read cannot retain stale assignment state.
 */
/**
 * @description Manages TrainerLibraryMutations state and data flow for the library feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented library module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerLibraryMutations() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ memberId, dietPlanId, idempotencyKey }: TrainerLibraryAssignDietPlanMutationVariables) => TrainerLibraryApi.assignDietPlan(memberId, dietPlanId, idempotencyKey),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: TRAINER_LIBRARY_QUERY_KEYS.assignedMembers() }),
        queryClient.invalidateQueries({ queryKey: TRAINER_LIBRARY_QUERY_KEYS.dietPlansAll() }),
      ]);
    },
  });
  return {
    assignDietPlan: useCallback((variables: TrainerLibraryAssignDietPlanMutationVariables) => mutation.mutateAsync(variables), [mutation]),
    assignDietPlanPending: mutation.isPending,
    assignDietPlanError: mutation.error,
    assignDietPlanIsError: mutation.isError,
  };
}
