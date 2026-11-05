import { MANAGER_WORKOUT_PLANS_API } from '@/app/frontend_manager/manager_workout_diet_library/assigned_workout_plans/config/manager_workout_diet_library_assigned_workout_plans.url_config';
import { z } from 'zod';

import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';


import { workoutSchema, exerciseSnapshotSchema } from '@/app/frontend_manager/manager_workout_diet_library/assigned_workout_plans/schemas/manager_workout_diet_library_assigned_workout_plans.schemas';
import type { ManagerWorkoutPlansAssignment } from '@/app/frontend_manager/manager_workout_diet_library/assigned_workout_plans/types/manager_workout_plans_assignment.types';
import type { ExerciseSnapshot } from '@/app/frontend_manager/manager_workout_diet_library/assigned_workout_plans/types/manager_workout_plans_snapshot.types';
import type { Workout } from '@/app/frontend_manager/manager_workout_diet_library/assigned_workout_plans/types/manager_workout_diet_library_assigned_workout_plans.types';

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

  fetchExercises: async (params?: Record<string, string>): Promise<ApiResponse<{ exercises: ExerciseSnapshot[], total: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(MANAGER_WORKOUT_PLANS_API.WORKOUT_EXERCISES(query), { dataSchema: z.object({ exercises: z.array(exerciseSnapshotSchema), total: z.number().default(0) }) });
  },

  fetchAssignments: async (): Promise<ApiResponse<ManagerWorkoutPlansAssignment[]>> => apiFetch(MANAGER_WORKOUT_PLANS_API.ASSIGNMENTS, { dataSchema: z.array(z.object({ id: z.string(), memberName: z.string(), planName: z.string(), assignedBy: z.string(), startDate: z.string() })) })
};
