"use client";
// RESPONSIBILITY: Owns Trainer Progress Tracking mutation orchestration; presentation components consume command functions only.
// DATA FLOW: Progress UI action → command function → TanStack mutation → Progress API → precise entry/summary invalidation → feedback.
import { useCallback } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createTrainerProgressTrackingProgressEntry, updateTrainerProgressTrackingProgressEntry, deleteTrainerProgressTrackingProgressEntry } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/api/TrainerCoachingIndividualProgressProgressTrackingApi';

import { TRAINER_PROGRESS_TRACKING_QUERY_KEYS } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/utils/TrainerCoachingIndividualProgressProgressTrackingQueryKeys';

import type { TrainerProgressTrackingCreateMutationVariables, TrainerProgressTrackingUpdateMutationVariables, TrainerProgressTrackingDeleteMutationVariables } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/types/TrainerCoachingIndividualProgressProgressTrackingMutationTypes';







/**
 * @description Provides view-safe Progress Tracking commands and pending state while keeping TanStack mutation methods private to the hook.
 * @dependencies Trainer Progress Tracking API and canonical query-key registry.
 * @edge-cases Preserves member-specific cache identity, mutation retries/idempotency values, and targeted list/summary invalidation.
 */
/**
 * @description Manages TrainerProgressTrackingMutations state and data flow for the progress tracking feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented progress tracking module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerProgressTrackingMutations() {
  const queryClient = useQueryClient();
  const invalidate = useCallback((memberId: string) => {
    void queryClient.invalidateQueries({ queryKey: TRAINER_PROGRESS_TRACKING_QUERY_KEYS.entriesAll() });
    void queryClient.invalidateQueries({ queryKey: TRAINER_PROGRESS_TRACKING_QUERY_KEYS.summary(memberId) });
  }, [queryClient]);
  const createMutation = useMutation({ mutationFn: ({ memberId, dto, idempotencyKey }: TrainerProgressTrackingCreateMutationVariables) => createTrainerProgressTrackingProgressEntry(memberId, dto, idempotencyKey), onSuccess: (_, variables) => invalidate(variables.memberId) });
  const updateMutation = useMutation({ mutationFn: ({ memberId, entryId, dto, idempotencyKey }: TrainerProgressTrackingUpdateMutationVariables) => updateTrainerProgressTrackingProgressEntry(memberId, entryId, dto, idempotencyKey), onSuccess: (_, variables) => invalidate(variables.memberId) });
  const deleteMutation = useMutation({ mutationFn: ({ memberId, entryId, idempotencyKey }: TrainerProgressTrackingDeleteMutationVariables) => deleteTrainerProgressTrackingProgressEntry(memberId, entryId, idempotencyKey), onSuccess: (_, variables) => invalidate(variables.memberId) });
  return {
    createEntry: useCallback((variables: TrainerProgressTrackingCreateMutationVariables) => createMutation.mutateAsync(variables), [createMutation]),
    createEntryPending: createMutation.isPending,
    updateEntry: useCallback((variables: TrainerProgressTrackingUpdateMutationVariables) => updateMutation.mutateAsync(variables), [updateMutation]),
    updateEntryPending: updateMutation.isPending,
    deleteEntry: useCallback((variables: TrainerProgressTrackingDeleteMutationVariables) => deleteMutation.mutateAsync(variables), [deleteMutation]),
    deleteEntryPending: deleteMutation.isPending,
  };
}
