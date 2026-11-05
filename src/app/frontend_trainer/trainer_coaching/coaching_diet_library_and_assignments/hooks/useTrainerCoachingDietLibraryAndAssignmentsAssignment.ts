"use client";
// DATA FLOW: Selected library item/member → useTrainerLibraryAssignment → mutation API → invalidation → assignment UI
// RESPONSIBILITY: Owns Trainer Library assigned-member server state and assignment mutation.
import { useQuery } from '@tanstack/react-query';

import { TrainerLibraryApi } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/api/TrainerCoachingDietLibraryAndAssignmentsApi';

import { TRAINER_LIBRARY_QUERY_KEYS } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/config/TrainerCoachingDietLibraryAndAssignmentsQueryKeys';

import { useTrainerLibraryMutations } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/hooks/useTrainerCoachingDietLibraryAndAssignmentsMutations';






/**
 * @description Provides assigned-member data and a view-safe diet-plan assignment command.
 * @dependencies Trainer Library API and canonical Library query-key registry.
 * @edge-cases Exposes pending/error state separately and invalidates assignment and diet-plan caches after a confirmed mutation.
 */
/**
 * @description Manages TrainerLibraryAssignment state and data flow for the library feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented library module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerLibraryAssignment() {
  const membersQuery = useQuery({ queryKey: TRAINER_LIBRARY_QUERY_KEYS.assignedMembers(), queryFn: TrainerLibraryApi.fetchAssignedMembers });
  const { assignDietPlan, assignDietPlanPending, assignDietPlanError, assignDietPlanIsError } = useTrainerLibraryMutations();
  return {
    members: membersQuery.data ?? [],
    membersQuery,
    isLoadingMembers: membersQuery.isPending,
    assignDietPlan,
    isSaving: assignDietPlanPending,
    error: assignDietPlanError,
    isError: assignDietPlanIsError,
  };
}
