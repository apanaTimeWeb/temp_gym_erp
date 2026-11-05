// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
'use client';
import { useQuery } from '@tanstack/react-query';

import { ManagerTrainerScheduleApi } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/api/manager_trainer_schedule.api';
import { ManagerTrainerScheduleQueryKeys } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/api/manager_trainer_schedule.query_keys';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates schedule feature state and its documented UI/API boundary through useManagerTrainerScheduleQuery.
 * @dependencies Uses ManagerTrainerScheduleApi, ManagerTrainerScheduleTypes.
 * @edge-case reuses the caller-provided idempotency key for the same mutation intent; refreshes affected TanStack Query server state after successful mutations.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
/**
 * @description useManagerTrainerScheduleQuery owns the schedule feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerTrainerScheduleQuery(filters: Record<string, string>) {
  return useQuery({
    queryKey: ManagerTrainerScheduleQueryKeys.list(filters),
    queryFn: async () => {
      const response = await ManagerTrainerScheduleApi.fetchSchedule(filters);
      if (!response.success) throw new Error(response.message);
      return response.data;
    },
  });
}

