import { z } from 'zod';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { TrainerInfrastructureApiResponseSchema } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/schemas/TrainerCoachingExerciseManagementTrainerInfrastructureApiResponseSchema';
import { TrainerWorkoutExerciseSchema } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/schemas/TrainerCoachingExerciseManagementDomainSchemas';
import { TRAINER_WORKOUT_URLS } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/config/trainer_coaching_exercise_management.url_config';
import type { TrainerWorkoutCreateExerciseDto } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/types/TrainerCoachingExerciseManagementTypes';

class TrainerWorkoutApiError extends Error {
  constructor(message: string, readonly errorCode: string, readonly statusCode: number) {
    super(message);
    this.name = 'TrainerWorkoutApiError';
  }
}
const ExerciseCollectionSchema = z.object({
 exercises: z.array(TrainerWorkoutExerciseSchema), total: z.number().int().nonnegative(),
 page: z.number().int().positive().optional(), limit: z.number().int().positive().optional(),
 sortBy: z.string().optional(), sortDirection: z.string().optional(),
});
export const TrainerWorkoutApi = {
  async fetchExercises(params?: Record<string, string>) {
    const query = params ? new URLSearchParams(params).toString() : '';
    const raw = await apiFetch<ApiResponse<unknown>>(`${TRAINER_WORKOUT_URLS.API.EXERCISES}${query ? `?${query}` : ''}`);
    const response = TrainerInfrastructureApiResponseSchema(ExerciseCollectionSchema).parse(raw);
    if (!response.data) throw new Error(response.message);
    return { data: response.data, message: response.message };
  },
  async createExercise(body: TrainerWorkoutCreateExerciseDto, idempotencyKey: string) {
    const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_WORKOUT_URLS.API.EXERCISES, { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey } });
    const response = TrainerInfrastructureApiResponseSchema(TrainerWorkoutExerciseSchema).parse(raw);
    if (!response.success) throw new TrainerWorkoutApiError(response.message, response.errorCode, response.statusCode);
    return { data: TrainerWorkoutExerciseSchema.parse(response.data), message: response.message };
  },
  async updateExercise(id: string, body: Partial<TrainerWorkoutCreateExerciseDto>, idempotencyKey: string) {
    const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_WORKOUT_URLS.API.EXERCISE(id), { method: 'PATCH', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey } });
    const response = TrainerInfrastructureApiResponseSchema(TrainerWorkoutExerciseSchema).parse(raw);
    if (!response.success) throw new TrainerWorkoutApiError(response.message, response.errorCode, response.statusCode);
    return { data: TrainerWorkoutExerciseSchema.parse(response.data), message: response.message };
  },
  async deleteExercise(id: string, idempotencyKey: string) {
    const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_WORKOUT_URLS.API.EXERCISE(id), { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey } });
    const response = TrainerInfrastructureApiResponseSchema(z.null()).parse(raw);
    if (!response.success) throw new TrainerWorkoutApiError(response.message, response.errorCode, response.statusCode);
    return { data: { id }, message: response.message };
  },
};
