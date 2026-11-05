"use client";
// RESPONSIBILITY: TanStack Query hooks for the Trainer Schedule module server state.
// DATA FLOW: TrainerScheduleApi → useQuery → components
import { useQuery } from '@tanstack/react-query';

import { TrainerScheduleApi } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/api/TrainerOperationsLeaveRequestsScheduleApi';

import { TRAINER_SCHEDULE_QUERY_KEYS } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/utils/TrainerOperationsLeaveRequestsScheduleQueryKeys';





/**
 * @description TanStack Query hooks for the Trainer Schedule module server state.
 * @dependencies TrainerScheduleApi → useQuery → components
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerScheduleQuery state and data flow for the schedule feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented schedule module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerScheduleQuery() {
  return useQuery({
    queryKey: TRAINER_SCHEDULE_QUERY_KEYS.schedule(),
    queryFn: TrainerScheduleApi.fetchSchedule,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
