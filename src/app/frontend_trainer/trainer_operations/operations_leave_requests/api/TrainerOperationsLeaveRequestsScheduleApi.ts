import { apiFetch } from '@/lib/api';

import { TrainerInfrastructureApiResponseSchema } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/schemas/TrainerOperationsLeaveRequestsTrainerInfrastructureApiResponseSchema';

import { TrainerScheduleLeaveRequestSchema } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/schemas/TrainerOperationsLeaveRequestsScheduleDomainSchemas';

import { TrainerScheduleScheduleResponseSchema } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/schemas/TrainerOperationsLeaveRequestsScheduleDomainSchemas';

import { TrainerScheduleWeeklyAvailabilityArraySchema } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/schemas/TrainerOperationsLeaveRequestsScheduleDomainSchemas';

import { TRAINER_SCHEDULE_URLS } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/config/trainer_operations_leave_requests.url_config';

import type { TrainerScheduleWeeklyAvailability, TrainerScheduleLeaveRequest, TrainerScheduleCreateLeaveDto, TrainerScheduleScheduleResponse } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/types/TrainerOperationsLeaveRequestsScheduleTypes';

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

  requestLeave: async (data: TrainerScheduleCreateLeaveDto, idempotencyKey: string): Promise<{ success: boolean; message: string; data: TrainerScheduleLeaveRequest }> => {
    const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_SCHEDULE_URLS.API.LEAVES, {
      method: 'POST',
      body: JSON.stringify(data),
        headers: { 'Idempotency-Key': idempotencyKey }
    });
    const response = TrainerInfrastructureApiResponseSchema(TrainerScheduleLeaveRequestSchema).parse(raw);
    if (!response.data) throw new Error(response.message);
    return { success: response.success, message: response.message, data: response.data };
  }
};
