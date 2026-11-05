"use client";
// RESPONSIBILITY: Owns Trainer Members write operations behind command functions; presentation components do not access TanStack mutation methods.
// DATA FLOW: TrainerMembersMember UI action → command function → TanStack mutation → TrainerMembersApi → targeted member caches → feedback.
import { useCallback } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TrainerMembersApi } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/api/TrainerMembersDirectoryAndProfileApi';

import { TRAINER_MEMBERS_QUERY_KEYS } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/config/TrainerMembersDirectoryAndProfileQueryKeys';

import type { TrainerMembersAddNoteMutationVariables, TrainerMembersUpdateMutationVariables, TrainerMembersAssignDietMutationVariables, TrainerMembersAssignWorkoutMutationVariables, TrainerMembersUpdateAssessmentMutationVariables } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/types/TrainerMembersDirectoryAndProfileMutationTypes';







/**
 * @description Encapsulates Trainer Members mutations and returns view-safe command functions plus explicit pending/error state.
 * @dependencies Module-owned Members API, canonical query-key registry, and idempotency-aware mutation variables.
 * @edge-cases Preserves member identity, backend response messages, targeted list/detail invalidation, and retry-safe mutation boundaries.
 */
/**
 * @description Manages TrainerMembersMutations state and data flow for the members feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented members module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerMembersMutations() {
  const queryClient = useQueryClient();
  const invalidateMemberList = useCallback(() => { void queryClient.invalidateQueries({ queryKey: TRAINER_MEMBERS_QUERY_KEYS.lists() }); }, [queryClient]);
  const addNoteMutation = useMutation({
    mutationFn: ({ memberId, text, idempotencyKey }: TrainerMembersAddNoteMutationVariables) => TrainerMembersApi.addMemberNote(memberId, { text }, idempotencyKey),
    onSuccess: (_, variables) => { void queryClient.invalidateQueries({ queryKey: TRAINER_MEMBERS_QUERY_KEYS.detail(variables.memberId) }); invalidateMemberList(); },
  });
  const updateMemberMutation = useMutation({ mutationFn: ({ id, data, idempotencyKey }: TrainerMembersUpdateMutationVariables) => TrainerMembersApi.updateMember(id, data, idempotencyKey), onSuccess: (_, variables) => { void queryClient.invalidateQueries({ queryKey: TRAINER_MEMBERS_QUERY_KEYS.detail(variables.id) }); invalidateMemberList(); } });
  const assignDietMutation = useMutation({ mutationFn: ({ id, diet, idempotencyKey }: TrainerMembersAssignDietMutationVariables) => TrainerMembersApi.assignDiet(id, diet, idempotencyKey), onSuccess: (_, variables) => { void queryClient.invalidateQueries({ queryKey: TRAINER_MEMBERS_QUERY_KEYS.detail(variables.id) }); invalidateMemberList(); } });
  const assignWorkoutMutation = useMutation({ mutationFn: ({ id, workout, idempotencyKey }: TrainerMembersAssignWorkoutMutationVariables) => TrainerMembersApi.assignWorkout(id, workout, idempotencyKey), onSuccess: (_, variables) => { void queryClient.invalidateQueries({ queryKey: TRAINER_MEMBERS_QUERY_KEYS.detail(variables.id) }); invalidateMemberList(); } });
  const updateAssessmentMutation = useMutation({ mutationFn: ({ id, assessment, idempotencyKey }: TrainerMembersUpdateAssessmentMutationVariables) => TrainerMembersApi.updateMemberAssessment(id, assessment, idempotencyKey), onSuccess: (_, variables) => { void queryClient.invalidateQueries({ queryKey: TRAINER_MEMBERS_QUERY_KEYS.detail(variables.id) }); invalidateMemberList(); } });
  return {
    addNote: useCallback((variables: TrainerMembersAddNoteMutationVariables) => addNoteMutation.mutateAsync(variables), [addNoteMutation]),
    addNotePending: addNoteMutation.isPending, addNoteError: addNoteMutation.error, addNoteIsError: addNoteMutation.isError,
    updateMember: useCallback((variables: TrainerMembersUpdateMutationVariables) => updateMemberMutation.mutateAsync(variables), [updateMemberMutation]),
    updateMemberPending: updateMemberMutation.isPending,
    assignDiet: useCallback((variables: TrainerMembersAssignDietMutationVariables) => assignDietMutation.mutateAsync(variables), [assignDietMutation]),
    assignDietPending: assignDietMutation.isPending,
    assignWorkout: useCallback((variables: TrainerMembersAssignWorkoutMutationVariables) => assignWorkoutMutation.mutateAsync(variables), [assignWorkoutMutation]),
    assignWorkoutPending: assignWorkoutMutation.isPending,
    updateAssessment: useCallback((variables: TrainerMembersUpdateAssessmentMutationVariables) => updateAssessmentMutation.mutateAsync(variables), [updateAssessmentMutation]),
    updateAssessmentPending: updateAssessmentMutation.isPending,
  };
}
