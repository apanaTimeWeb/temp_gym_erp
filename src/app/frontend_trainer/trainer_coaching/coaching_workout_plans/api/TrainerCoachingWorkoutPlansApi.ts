// RESPONSIBILITY: Provides strongly typed request/response handling for the Trainer TrainerWorkoutWorkout feature.
// DATA FLOW: TrainerWorkoutWorkout URL contract → apiFetch → canonical ApiResponse validation → feature query/mutation.
import { z } from 'zod';

import { apiFetch } from '@/lib/api';

import { TrainerInfrastructureApiResponseSchema } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/schemas/TrainerCoachingWorkoutPlansTrainerInfrastructureApiResponseSchema';

import { TrainerWorkoutWorkoutSchema, TrainerWorkoutExerciseSchema } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/schemas/TrainerCoachingWorkoutPlansDomainSchemas';

import { TRAINER_WORKOUT_URLS } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/config/trainer_coaching_workout_plans.url_config';

import type { TrainerWorkoutCreateWorkoutPlanDto, TrainerWorkoutCreateExerciseDto } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/types/TrainerCoachingWorkoutPlansTypes';

import type { ApiResponse } from '@/lib/api';

class TrainerWorkoutApiError extends Error {
  constructor(message: string, readonly errorCode: string, readonly statusCode: number) {
    super(message);
    this.name = 'TrainerWorkoutApiError';
  }
}

const parseTrainerWorkoutResponse = <T extends z.ZodTypeAny>(raw: ApiResponse<unknown>, dataSchema: T) => {
  const response = TrainerInfrastructureApiResponseSchema(dataSchema).parse(raw);
  if (!response.success) {
    const err = response as { message: string; errorCode?: string; statusCode?: number };
    throw new TrainerWorkoutApiError(err.message, err.errorCode ?? 'UNKNOWN', err.statusCode ?? 500);
  }
  return response;
};

const TrainerWorkoutCollectionSchema = z.object({
  workouts: z.array(TrainerWorkoutWorkoutSchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().optional(),
  sortBy: z.string().optional(),
  sortDirection: z.string().optional(),
});

const ExerciseCollectionSchema = z.object({
  exercises: z.array(TrainerWorkoutExerciseSchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().optional(),
  sortBy: z.string().optional(),
  sortDirection: z.string().optional(),
});

const fetchCollection = async <T extends z.ZodTypeAny>(url: string, schema: T, params?: Record<string, string>) => {
  const query = params ? new URLSearchParams(params).toString() : '';
  const requestUrl = query ? `${url}?${query}` : url;
  const raw = await apiFetch<ApiResponse<unknown>>(requestUrl);
  return parseTrainerWorkoutResponse(raw, schema);
};

export const TrainerWorkoutApi = {
  fetchWorkouts: async (params?: Record<string, string>) => {
    const response = await fetchCollection(TRAINER_WORKOUT_URLS.API.WORKOUTS, TrainerWorkoutCollectionSchema, params);
    if (!response.data) throw new Error(response.message);
    return { data: response.data, message: response.message };
  },
  createWorkout: async (body: TrainerWorkoutCreateWorkoutPlanDto, idempotencyKey: string) => {
    const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_WORKOUT_URLS.API.WORKOUTS, {
      method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey },
    });
    const response = parseTrainerWorkoutResponse(raw, TrainerWorkoutWorkoutSchema);
    return { data: response.data, message: response.message };
  },
  updateWorkout: async (id: string, body: Partial<TrainerWorkoutCreateWorkoutPlanDto>, idempotencyKey: string) => {
    const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_WORKOUT_URLS.API.WORKOUT(id), {
      method: 'PATCH', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey },
    });
    const response = parseTrainerWorkoutResponse(raw, TrainerWorkoutWorkoutSchema);
    return { data: response.data, message: response.message };
  },
  deleteWorkout: async (id: string, idempotencyKey: string) => {
    const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_WORKOUT_URLS.API.WORKOUT(id), {
      method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey },
    });
    const response = parseTrainerWorkoutResponse(raw, z.null());
    return { data: { id }, message: response.message };
  },
  fetchExercises: async (params?: Record<string, string>) => {
    const response = await fetchCollection(TRAINER_WORKOUT_URLS.API.EXERCISES, ExerciseCollectionSchema, params);
    if (!response.data) throw new Error(response.message);
    return { data: response.data, message: response.message };
  },
  createExercise: async (body: TrainerWorkoutCreateExerciseDto, idempotencyKey: string) => {
    const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_WORKOUT_URLS.API.EXERCISES, {
      method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey },
    });
    const response = parseTrainerWorkoutResponse(raw, TrainerWorkoutExerciseSchema);
    return { data: response.data, message: response.message };
  },
  updateExercise: async (id: string, body: Partial<TrainerWorkoutCreateExerciseDto>, idempotencyKey: string) => {
    const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_WORKOUT_URLS.API.EXERCISE(id), {
      method: 'PATCH', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey },
    });
    const response = parseTrainerWorkoutResponse(raw, TrainerWorkoutExerciseSchema);
    return { data: response.data, message: response.message };
  },
  deleteExercise: async (id: string, idempotencyKey: string) => {
    const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_WORKOUT_URLS.API.EXERCISE(id), {
      method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey },
    });
    const response = parseTrainerWorkoutResponse(raw, z.null());
    return { data: { id }, message: response.message };
  },
};
