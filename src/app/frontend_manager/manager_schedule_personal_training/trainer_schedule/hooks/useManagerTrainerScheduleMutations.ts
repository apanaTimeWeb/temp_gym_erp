// DATA FLOW: Schedule create/update/delete intent → dedicated mutation hook → ManagerTrainerScheduleApi → query invalidation → schedule UI.
'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ManagerTrainerScheduleApi } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/api/manager_trainer_schedule.api';
import { ManagerTrainerScheduleQueryKeys } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/api/manager_trainer_schedule.query_keys';
import type { CreateShiftDto } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/types/manager_trainer_schedule.types';

/**
 * @description Owns schedule create, update, and delete mutations and invalidates authoritative schedule server state after successful responses.
 * @dependencies Uses ManagerTrainerScheduleApi, ManagerTrainerScheduleQueryKeys, and caller-provided idempotency keys.
 * @edge-case Does not retain API response data locally; failed mutations leave the current server cache intact.
 */
export function useManagerTrainerScheduleMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ManagerTrainerScheduleQueryKeys.all });
  const create = useMutation({ mutationFn: ({ body, idempotencyKey }: { body: CreateShiftDto; idempotencyKey: string }) => ManagerTrainerScheduleApi.createShift(body, idempotencyKey), onSuccess: invalidate });
  const update = useMutation({ mutationFn: ({ id, body, idempotencyKey }: { id: string; body: CreateShiftDto; idempotencyKey: string }) => ManagerTrainerScheduleApi.updateShift(id, body, idempotencyKey), onSuccess: invalidate });
  const remove = useMutation({ mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => ManagerTrainerScheduleApi.deleteShift(id, idempotencyKey), onSuccess: invalidate });
  return { create, update, remove };
}
