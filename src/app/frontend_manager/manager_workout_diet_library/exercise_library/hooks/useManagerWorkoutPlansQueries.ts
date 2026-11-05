// DATA FLOW: Exercise-library filters → exercise catalogue query → exercise table.
'use client';
import { useQuery } from '@tanstack/react-query';
import { ManagerWorkoutPlansApi } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/api/manager_workout_diet_library_exercise_library.api';
import { ManagerWorkoutPlansQueryKeys } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/api/manager_workout_diet_library_exercise_library.query_keys';

/** Fetches the filtered exercise catalogue and promotes API failure envelopes to query errors. */
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
