// DATA FLOW: Exercise form/table actions → exercise API → exercise query invalidation.
'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ManagerWorkoutPlansApi } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/api/manager_workout_diet_library_exercise_library.api';
import { ManagerWorkoutPlansQueryKeys } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/api/manager_workout_diet_library_exercise_library.query_keys';
import type { ExerciseSnapshot } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/types/manager_workout_plans_snapshot.types';

export function useSaveExerciseMutation() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<ExerciseSnapshot> & { idempotencyKey: string }) => {
      const { id, idempotencyKey, ...businessDto } = data;
      const response = id
        ? await ManagerWorkoutPlansApi.updateExercise(id, businessDto, idempotencyKey)
        : await ManagerWorkoutPlansApi.createExercise(businessDto, idempotencyKey);
      if (!response.success) throw new Error(response.message);
      return response;
    },
    onSuccess: () => { void client.invalidateQueries({ queryKey: ManagerWorkoutPlansQueryKeys.exercises({}) }); },
  });
}

export function useDeleteExerciseMutation() {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => {
      const response = await ManagerWorkoutPlansApi.deleteExercise(id, idempotencyKey);
      if (!response.success) throw new Error(response.message);
      return response;
    },
    onSuccess: () => { void client.invalidateQueries({ queryKey: ManagerWorkoutPlansQueryKeys.exercises({}) }); },
  });
  return { ...mutation, deleteExercise: mutation.mutateAsync };
}
