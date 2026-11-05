import { MANAGER_WORKOUT_PLANS_API } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/config/manager_workout_diet_library_workout_plan_management.url_config';
import { z } from 'zod';

import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';


import { workoutSchema } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/schemas/manager_workout_diet_library_workout_plan_management.schemas';
import type { Workout } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/types/manager_workout_diet_library_workout_plan_management.types';

/**
 * @description Provides the ManagerWorkoutPlansApi implementation for the workout module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_workout_diet_library/manager_workout_schemas/ManagerWorkoutPlansSchema; @/app/frontend_manager/manager_workout_diet_library/manager_workout_url_config; @/app/frontend_manager/manager_workout_diet_library/manager_workout_types/ManagerWorkoutPlansAssignmentTypes; @/app/frontend_manager/manager_workout_diet_library/manager_workout_types/ManagerWorkoutPlansSnapshotTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerWorkoutPlansApi = {
  fetchWorkouts: async (params?: Record<string, string>): Promise<ApiResponse<{ workouts: Workout[], total: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${MANAGER_WORKOUT_PLANS_API.WORKOUTS_BASE}${query ? `?${query}` : ''}`, { dataSchema: z.object({ workouts: z.array(workoutSchema), total: z.number() }) });
  },

  createWorkout: async (body: Partial<Workout>, idempotencyKey: string): Promise<ApiResponse<Workout>> => {
    return apiFetch(`${MANAGER_WORKOUT_PLANS_API.WORKOUTS_BASE}`, { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: workoutSchema });
  },

  updateWorkout: async (id: string, body: Partial<Workout>, idempotencyKey: string): Promise<ApiResponse<Workout>> => {
    return apiFetch(MANAGER_WORKOUT_PLANS_API.WORKOUT(id), { method: 'PATCH', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: workoutSchema });
  },

  deleteWorkout: async (id: string, idempotencyKey: string): Promise<ApiResponse<{ id: string }>> => {
    return apiFetch(MANAGER_WORKOUT_PLANS_API.WORKOUT(id), {
      method: 'DELETE',
      headers: { 'Idempotency-Key': idempotencyKey },
      dataSchema: z.object({ id: z.string() })
    });
  }
};
