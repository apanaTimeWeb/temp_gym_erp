import { MANAGER_WORKOUT_PLANS_API } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/config/manager_workout_diet_library_exercise_library.url_config';
import { z } from 'zod';

import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';


import { exerciseSnapshotSchema } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/schemas/manager_workout_diet_library_exercise_library.schemas';
import type { ExerciseSnapshot } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/types/manager_workout_plans_snapshot.types';

/**
 * @description Provides the ManagerWorkoutPlansApi implementation for the workout module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_workout_diet_library/manager_workout_schemas/ManagerWorkoutPlansSchema; @/app/frontend_manager/manager_workout_diet_library/manager_workout_url_config; @/app/frontend_manager/manager_workout_diet_library/manager_workout_types/ManagerWorkoutPlansAssignmentTypes; @/app/frontend_manager/manager_workout_diet_library/manager_workout_types/ManagerWorkoutPlansSnapshotTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerWorkoutPlansApi = {
  fetchExercises: async (params?: Record<string, string>): Promise<ApiResponse<{ exercises: ExerciseSnapshot[], total: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(MANAGER_WORKOUT_PLANS_API.WORKOUT_EXERCISES(query), { dataSchema: z.object({ exercises: z.array(exerciseSnapshotSchema), total: z.number().default(0) }) });
  },

  createExercise: async (body: Partial<ExerciseSnapshot>, idempotencyKey: string): Promise<ApiResponse<ExerciseSnapshot>> => {
    return apiFetch(`${MANAGER_WORKOUT_PLANS_API.EXERCISES_BASE}`, { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: exerciseSnapshotSchema });
  },

  updateExercise: async (id: string, body: Partial<ExerciseSnapshot>, idempotencyKey: string): Promise<ApiResponse<ExerciseSnapshot>> => {
    return apiFetch(MANAGER_WORKOUT_PLANS_API.EXERCISE(id), { method: 'PATCH', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: exerciseSnapshotSchema });
  },

  deleteExercise: async (id: string, idempotencyKey: string): Promise<ApiResponse<{ id: string }>> => {
    return apiFetch(MANAGER_WORKOUT_PLANS_API.EXERCISE(id), {
      method: 'DELETE',
      headers: { 'Idempotency-Key': idempotencyKey },
      dataSchema: z.object({ id: z.string() })
    });
  }
};
