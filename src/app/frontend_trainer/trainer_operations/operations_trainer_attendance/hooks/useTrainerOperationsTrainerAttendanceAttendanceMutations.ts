"use client";
// RESPONSIBILITY: Owns Attendance mutation orchestration; presentation files consume command functions and pending/error state only.
// DATA FLOW: UI intent → command function → TanStack mutation → module API → precise query invalidation → UI feedback.
import { useCallback } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getUser } from '@/lib/api';

import { createTrainerAttendanceRecord, checkOutTrainerAttendance, selfCheckInTrainerAttendance } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/api/TrainerOperationsTrainerAttendanceAttendanceApi';

import { TRAINER_ATTENDANCE_QUERY_KEYS } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/utils/TrainerOperationsTrainerAttendanceAttendanceQueryKeys';

import type { TrainerAttendanceCreateMutationVariables, TrainerAttendanceSelfMutationVariables } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/types/TrainerOperationsTrainerAttendanceAttendanceMutationTypes';








/**
 * @description Encapsulates all Attendance write operations so UI components never call TanStack mutation methods directly.
 * @dependencies Module-owned Attendance API, Query Key registry, global auth/session transport, and idempotency variables supplied by the caller.
 * @edge-cases Preserves backend response messages, missing current-user identity errors, mutation pending state, and targeted cache invalidation.
 */
/**
 * @description Manages TrainerAttendanceMutations state and data flow for the attendance feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented attendance module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerAttendanceMutations() {
  const queryClient = useQueryClient();
  const invalidateAttendance = useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: TRAINER_ATTENDANCE_QUERY_KEYS.recordsAll() });
    void queryClient.invalidateQueries({ queryKey: TRAINER_ATTENDANCE_QUERY_KEYS.stats() });
    void queryClient.invalidateQueries({ queryKey: TRAINER_ATTENDANCE_QUERY_KEYS.myHistoryAll() });
  }, [queryClient]);

  const markAttendanceMutation = useMutation({
    mutationFn: ({ dto, idempotencyKey }: TrainerAttendanceCreateMutationVariables) => createTrainerAttendanceRecord(dto, idempotencyKey),
    onSuccess: invalidateAttendance,
  });
  const selfCheckInMutation = useMutation({
    mutationFn: ({ idempotencyKey }: TrainerAttendanceSelfMutationVariables) => {
      const user = getUser();
      if (!user?.id) throw new Error('Trainer ID not found');
      return selfCheckInTrainerAttendance(String(user.id), idempotencyKey);
    },
    onSuccess: invalidateAttendance,
  });
  const selfCheckOutMutation = useMutation({
    mutationFn: ({ idempotencyKey }: TrainerAttendanceSelfMutationVariables) => {
      const user = getUser();
      if (!user?.id) throw new Error('Trainer ID not found');
      return checkOutTrainerAttendance(String(user.id), new Date().toISOString(), idempotencyKey);
    },
    onSuccess: invalidateAttendance,
  });

  const markAttendance = useCallback((variables: TrainerAttendanceCreateMutationVariables) => markAttendanceMutation.mutateAsync(variables), [markAttendanceMutation]);
  const selfCheckIn = useCallback((variables: TrainerAttendanceSelfMutationVariables) => selfCheckInMutation.mutateAsync(variables), [selfCheckInMutation]);
  const selfCheckOut = useCallback((variables: TrainerAttendanceSelfMutationVariables) => selfCheckOutMutation.mutateAsync(variables), [selfCheckOutMutation]);

  return {
    markAttendance,
    markAttendancePending: markAttendanceMutation.isPending,
    selfCheckIn,
    selfCheckInPending: selfCheckInMutation.isPending,
    selfCheckOut,
    selfCheckOutPending: selfCheckOutMutation.isPending,
  };
}
