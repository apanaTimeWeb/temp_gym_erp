'use client';
// DATA FLOW: Exercise form events → mutation hook → Exercise API client → query-cache invalidation → Exercise table and summary.
import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TrainerWorkoutApi } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/api/TrainerCoachingExerciseManagementApi';
import { TRAINER_WORKOUT_QUERY_KEYS } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/config/TrainerCoachingExerciseManagementQueryKeys';
import type { TrainerWorkoutCreateExerciseMutationVariables, TrainerWorkoutUpdateExerciseMutationVariables, TrainerWorkoutDeleteExerciseMutationVariables } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/types/TrainerCoachingExerciseManagementMutationTypes';
export function useTrainerWorkoutMutations() {
 const client = useQueryClient();
 const invalidate = useCallback(() => { void client.invalidateQueries({ queryKey: TRAINER_WORKOUT_QUERY_KEYS.exercisesAll() }); }, [client]);
 const create = useMutation({ mutationFn: (v: TrainerWorkoutCreateExerciseMutationVariables) => TrainerWorkoutApi.createExercise(v.dto,v.idempotencyKey), onSuccess: invalidate });
 const update = useMutation({ mutationFn: (v: TrainerWorkoutUpdateExerciseMutationVariables) => TrainerWorkoutApi.updateExercise(v.id,v.dto,v.idempotencyKey), onSuccess: invalidate });
 const remove = useMutation({ mutationFn: (v: TrainerWorkoutDeleteExerciseMutationVariables) => TrainerWorkoutApi.deleteExercise(v.id,v.idempotencyKey), onSuccess: invalidate });
 return {
  createExercise: useCallback((v: TrainerWorkoutCreateExerciseMutationVariables) => create.mutateAsync(v), [create]), createExercisePending: create.isPending,
  updateExercise: useCallback((v: TrainerWorkoutUpdateExerciseMutationVariables) => update.mutateAsync(v), [update]), updateExercisePending: update.isPending,
  deleteExercise: useCallback((v: TrainerWorkoutDeleteExerciseMutationVariables) => remove.mutateAsync(v), [remove]), deleteExercisePending: remove.isPending,
 };
}
