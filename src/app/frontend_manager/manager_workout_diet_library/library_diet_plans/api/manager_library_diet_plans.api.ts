import { MANAGER_LIBRARY_DIET_PLANS_API } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/config/manager_library_diet_plans.url_config';
import { z } from 'zod';

import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';



import { dietPlanSchema, exerciseSchema } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/schemas/manager_library_diet_plans.schemas';
import type { DietPlan, Exercise } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/types/manager_library_diet_plans.types';


export type ManagerLibraryDietPlansListParams = Record<string, string>;

/**
 * @description Provides the ManagerLibraryDietPlansApi implementation for the library module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_workout_diet_library/manager_library_schemas/ManagerLibraryDietPlansSchema; @/app/frontend_manager/manager_workout_diet_library/manager_library_url_config; @/app/frontend_manager/manager_workout_diet_library/manager_library_types/ManagerLibraryDietPlansTypes; @/lib/api
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerLibraryDietPlansApi = {
  fetchExercises: async (params?: ManagerLibraryDietPlansListParams): Promise<ApiResponse<{ exercises: Exercise[]; total: number }>> => {
    const query = new URLSearchParams(params ?? {}).toString();
    return apiFetch(`${MANAGER_LIBRARY_DIET_PLANS_API.EXERCISES_BASE}${query ? `?${query}` : ''}`, {
      dataSchema: z.object({ exercises: z.array(exerciseSchema), total: z.number() }),
    });
  },
  createExercise: async (body: Partial<Exercise>, idempotencyKey: string): Promise<ApiResponse<Exercise>> => apiFetch(
    MANAGER_LIBRARY_DIET_PLANS_API.EXERCISES_BASE,
    { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: exerciseSchema },
  ),
  updateExercise: async (id: string, body: Partial<Exercise>, idempotencyKey: string): Promise<ApiResponse<Exercise>> => apiFetch(
    MANAGER_LIBRARY_DIET_PLANS_API.EXERCISE_UPDATE(id),
    { method: 'PATCH', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: exerciseSchema },
  ),
  deleteExercise: async (id: string, idempotencyKey: string): Promise<ApiResponse<{ id: string }>> => apiFetch(
    MANAGER_LIBRARY_DIET_PLANS_API.EXERCISE_DELETE(id),
    { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.object({ id: z.string() }) },
  ),
  fetchDietPlans: async (params?: ManagerLibraryDietPlansListParams): Promise<ApiResponse<{ dietPlans: DietPlan[]; total: number }>> => {
    const query = new URLSearchParams(params ?? {}).toString();
    return apiFetch(`${MANAGER_LIBRARY_DIET_PLANS_API.DIET_PLANS_BASE}${query ? `?${query}` : ''}`, {
      dataSchema: z.object({ dietPlans: z.array(dietPlanSchema), total: z.number() }),
    });
  },
  createDietPlan: async (body: Partial<DietPlan>, idempotencyKey: string): Promise<ApiResponse<DietPlan>> => apiFetch(
    MANAGER_LIBRARY_DIET_PLANS_API.DIET_PLANS_BASE,
    { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: dietPlanSchema },
  ),
  updateDietPlan: async (id: string, body: Partial<DietPlan>, idempotencyKey: string): Promise<ApiResponse<DietPlan>> => apiFetch(
    MANAGER_LIBRARY_DIET_PLANS_API.DIET_PLAN_UPDATE(id),
    { method: 'PATCH', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: dietPlanSchema },
  ),
  deleteDietPlan: async (id: string, idempotencyKey: string): Promise<ApiResponse<{ id: string }>> => apiFetch(
    MANAGER_LIBRARY_DIET_PLANS_API.DIET_PLAN_DELETE(id),
    { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.object({ id: z.string() }) },
  ),
};
