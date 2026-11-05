import { apiFetch } from '@/lib/api';

import { TrainerInfrastructureApiResponseSchema } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/schemas/TrainerOperationsWeeklyAvailabilityTrainerInfrastructureApiResponseSchema';

import { TrainerScheduleScheduleResponseSchema } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/schemas/TrainerOperationsWeeklyAvailabilityScheduleDomainSchemas';

import { TrainerScheduleWeeklyAvailabilityArraySchema } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/schemas/TrainerOperationsWeeklyAvailabilityScheduleDomainSchemas';

import { TRAINER_SCHEDULE_URLS } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/config/trainer_operations_weekly_availability.url_config';

import type { TrainerScheduleWeeklyAvailability, TrainerScheduleScheduleResponse } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/types/TrainerOperationsWeeklyAvailabilityScheduleTypes';

import type { ApiResponse } from '@/lib/api';

;






export const TrainerScheduleApi = {
  fetchSchedule: async (): Promise<TrainerScheduleScheduleResponse> => {
    const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_SCHEDULE_URLS.API.SCHEDULE);
    const response = TrainerInfrastructureApiResponseSchema(TrainerScheduleScheduleResponseSchema).parse(raw);
    if (!response.data) throw new Error(response.message);
    return response.data;
  },

  updateAvailability: async (data: TrainerScheduleWeeklyAvailability[], idempotencyKey: string): Promise<{ success: boolean; message: string; data: TrainerScheduleWeeklyAvailability[] }> => {
    const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_SCHEDULE_URLS.API.AVAILABILITY, {
      method: 'PATCH',
      body: JSON.stringify(data),
        headers: { 'Idempotency-Key': idempotencyKey }
    });
    const response = TrainerInfrastructureApiResponseSchema(TrainerScheduleWeeklyAvailabilityArraySchema).parse(raw);
    if (!response.data) throw new Error(response.message);
    return { success: response.success, message: response.message, data: response.data };
  },

};
