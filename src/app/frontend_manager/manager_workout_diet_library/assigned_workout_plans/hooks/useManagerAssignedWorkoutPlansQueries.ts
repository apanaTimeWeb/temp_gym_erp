// DATA FLOW: Assignment screen → assignment records plus workout/exercise reference data.
'use client';
import { useQuery } from '@tanstack/react-query';
import { ManagerWorkoutPlansApi } from '@/app/frontend_manager/manager_workout_diet_library/assigned_workout_plans/api/manager_workout_diet_library_assigned_workout_plans.api';
import { ManagerWorkoutPlansQueryKeys } from '@/app/frontend_manager/manager_workout_diet_library/assigned_workout_plans/api/manager_workout_diet_library_assigned_workout_plans.query_keys';

/** Loads read-only workout references used by assignment history. */
export function useWorkoutPlansQuery(params: Record<string, string>) {
  return useQuery({
    queryKey: ManagerWorkoutPlansQueryKeys.plans(params),
    queryFn: async () => {
      const response = await ManagerWorkoutPlansApi.fetchWorkouts(params);
      if (!response.success) throw new Error(response.message);
      return response.data;
    },
  });
}

/** Loads read-only exercise references owned by the assignment leaf. */
export function useExercisesQuery(params: Record<string, string>) {
  return useQuery({
    queryKey: ManagerWorkoutPlansQueryKeys.exercises(params),
    queryFn: async () => {
      const response = await ManagerWorkoutPlansApi.fetchExercises(params);
      if (!response.success) throw new Error(response.message);
      return response.data;
    },
  });
}

/** Loads assignment rows; resolved API failures enter the query error/retry state. */
export function useWorkoutAssignmentsQuery() {
  return useQuery({
    queryKey: ManagerWorkoutPlansQueryKeys.assignments(),
    queryFn: async () => {
      const response = await ManagerWorkoutPlansApi.fetchAssignments();
      if (!response.success) throw new Error(response.message);
      return response.data;
    },
  });
}
