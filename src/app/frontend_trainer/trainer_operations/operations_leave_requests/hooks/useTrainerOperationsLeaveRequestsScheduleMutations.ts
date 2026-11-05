"use client";
// RESPONSIBILITY: Owns Trainer Schedule write orchestration; UI consumes command functions and pending state only.
// DATA FLOW: Schedule UI intent → command function → TanStack mutation → TrainerScheduleApi → precise schedule cache update.
import { useCallback } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TrainerScheduleApi } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/api/TrainerOperationsLeaveRequestsScheduleApi';

import { TRAINER_SCHEDULE_QUERY_KEYS } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/utils/TrainerOperationsLeaveRequestsScheduleQueryKeys';

import type { TrainerScheduleUpdateAvailabilityMutationVariables, TrainerScheduleRequestLeaveMutationVariables } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/types/TrainerOperationsLeaveRequestsScheduleMutationTypes';







/**
 * @description Encapsulates Schedule mutations so presentation components never access TanStack mutation objects directly.
 * @dependencies Trainer Schedule API and canonical schedule query key registry.
 * @edge-cases Preserves pending state, canonical backend messages/errors, and targeted schedule cache invalidation.
 */
/**
 * @description Manages TrainerScheduleMutations state and data flow for the schedule feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented schedule module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerScheduleMutations() {
  const queryClient = useQueryClient();
  const invalidateSchedule = useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: TRAINER_SCHEDULE_QUERY_KEYS.schedule() });
  }, [queryClient]);
  const updateAvailabilityMutation = useMutation({
    mutationFn: ({ data, idempotencyKey }: TrainerScheduleUpdateAvailabilityMutationVariables) => TrainerScheduleApi.updateAvailability(data, idempotencyKey),
    onSuccess: invalidateSchedule,
  });
  const requestLeaveMutation = useMutation({
    mutationFn: ({ data, idempotencyKey }: TrainerScheduleRequestLeaveMutationVariables) => TrainerScheduleApi.requestLeave(data, idempotencyKey),
    onSuccess: invalidateSchedule,
  });
  return {
    updateAvailability: useCallback((variables: TrainerScheduleUpdateAvailabilityMutationVariables) => updateAvailabilityMutation.mutateAsync(variables), [updateAvailabilityMutation]),
    updateAvailabilityPending: updateAvailabilityMutation.isPending,
    requestLeave: useCallback((variables: TrainerScheduleRequestLeaveMutationVariables) => requestLeaveMutation.mutateAsync(variables), [requestLeaveMutation]),
    requestLeavePending: requestLeaveMutation.isPending,
  };
}
