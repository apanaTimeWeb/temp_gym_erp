"use client";
// RESPONSIBILITY: Owns Trainer Sessions mutation orchestration; UI consumes command functions and explicit pending state.
// DATA FLOW: Session UI intent → command function → TanStack mutation → module API → list cache invalidation → feedback.
import { useCallback } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createTrainerSessionsTrainerSession, updateTrainerSessionsTrainerSession, cancelTrainerSessionsTrainerSession, markTrainerSessionsTrainerSessionNoShow, markTrainerSessionsTrainerSessionAttendance } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/api/TrainerCoachingSessionsApi';

import { TRAINER_SESSIONS_QUERY_KEYS } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/config/TrainerCoachingSessionsQueryKeys';

import type { TrainerSessionsCreateMutationVariables, TrainerSessionsUpdateMutationVariables, TrainerSessionsCancelMutationVariables, TrainerSessionsNoShowMutationVariables, TrainerSessionsAttendanceMutationVariables } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsMutationTypes';







/**
 * @description Encapsulates Trainer Sessions mutations behind feature-local command functions.
 * @dependencies Trainer Sessions API, canonical query-key registry, and idempotency-aware mutation variables.
 * @edge-cases Maintains targeted list invalidation and exposes pending state without exposing TanStack mutation controls to views.
 */
/**
 * @description Manages TrainerSessionsMutations state and data flow for the sessions feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented sessions module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerSessionsMutations() {
  const queryClient = useQueryClient();
  const invalidateLists = useCallback(() => { void queryClient.invalidateQueries({ queryKey: TRAINER_SESSIONS_QUERY_KEYS.lists() }); }, [queryClient]);
  const createMutation = useMutation({ mutationFn: ({ dto, idempotencyKey }: TrainerSessionsCreateMutationVariables) => createTrainerSessionsTrainerSession(dto, idempotencyKey), onSuccess: invalidateLists });
  const updateMutation = useMutation({ mutationFn: ({ id, dto, idempotencyKey }: TrainerSessionsUpdateMutationVariables) => updateTrainerSessionsTrainerSession(id, dto, idempotencyKey), onSuccess: invalidateLists });
  const cancelMutation = useMutation({ mutationFn: ({ id, idempotencyKey }: TrainerSessionsCancelMutationVariables) => cancelTrainerSessionsTrainerSession(id, idempotencyKey), onSuccess: invalidateLists });
  const noShowMutation = useMutation({ mutationFn: ({ id, idempotencyKey }: TrainerSessionsNoShowMutationVariables) => markTrainerSessionsTrainerSessionNoShow(id, idempotencyKey), onSuccess: invalidateLists });
  const attendanceMutation = useMutation({ mutationFn: ({ id, memberIds, idempotencyKey }: TrainerSessionsAttendanceMutationVariables) => markTrainerSessionsTrainerSessionAttendance(id, memberIds, idempotencyKey), onSuccess: invalidateLists });
  return {
    createSession: useCallback((variables: TrainerSessionsCreateMutationVariables) => createMutation.mutateAsync(variables), [createMutation]),
    createSessionPending: createMutation.isPending,
    updateSession: useCallback((variables: TrainerSessionsUpdateMutationVariables) => updateMutation.mutateAsync(variables), [updateMutation]),
    updateSessionPending: updateMutation.isPending,
    cancelSession: useCallback((variables: TrainerSessionsCancelMutationVariables) => cancelMutation.mutateAsync(variables), [cancelMutation]),
    cancelSessionPending: cancelMutation.isPending,
    markNoShowSession: useCallback((variables: TrainerSessionsNoShowMutationVariables) => noShowMutation.mutateAsync(variables), [noShowMutation]),
    markNoShowSessionPending: noShowMutation.isPending,
    markAttendance: useCallback((variables: TrainerSessionsAttendanceMutationVariables) => attendanceMutation.mutateAsync(variables), [attendanceMutation]),
    markAttendancePending: attendanceMutation.isPending,
  };
}
