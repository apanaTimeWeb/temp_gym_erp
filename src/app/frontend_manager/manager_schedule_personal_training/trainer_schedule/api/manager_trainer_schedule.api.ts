import { MANAGER_TRAINER_SCHEDULE_API } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/config/manager_trainer_schedule.url_config';
import { z } from 'zod';

import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';



import { managerScheduleShiftSchema, managerScheduleTrainerSchema, managerScheduleKpiSchema } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/schemas/manager_trainer_schedule.schemas';
import type { CreateShiftDto, ScheduleKPIData, TrainerScheduleSummary, TrainerShift } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/types/manager_trainer_schedule.types';


/**
 * @description Provides the ManagerTrainerScheduleApi implementation for the schedule module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_schedule_personal_training/manager_schedule_schemas/ManagerTrainerScheduleSchema; @/app/frontend_manager/manager_schedule_personal_training/manager_schedule_url_config; @/app/frontend_manager/manager_schedule_personal_training/manager_schedule_types/ManagerTrainerScheduleTypes; @/lib/api
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerTrainerScheduleApi = {
  fetchSchedule: async (params?: Record<string, string>): Promise<ApiResponse<{ trainers: TrainerScheduleSummary[]; kpis: ScheduleKPIData }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${MANAGER_TRAINER_SCHEDULE_API.BASE}${query ? `?${query}` : ''}`, {
      dataSchema: z.object({ trainers: z.array(managerScheduleTrainerSchema), kpis: managerScheduleKpiSchema }) });
  },
  createShift: async (body: CreateShiftDto, idempotencyKey: string): Promise<ApiResponse<TrainerShift>> => apiFetch(MANAGER_TRAINER_SCHEDULE_API.SHIFTS, { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: managerScheduleShiftSchema }),
  updateShift: async (id: string, body: CreateShiftDto, idempotencyKey: string): Promise<ApiResponse<TrainerShift>> => apiFetch(MANAGER_TRAINER_SCHEDULE_API.SHIFT(id), { method: 'PATCH', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: managerScheduleShiftSchema }),
  deleteShift: async (id: string, idempotencyKey: string): Promise<ApiResponse<{ id: string }>> => apiFetch(MANAGER_TRAINER_SCHEDULE_API.SHIFT(id), { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.object({ id: z.string() }) }) };
