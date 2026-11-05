"use client";
// RESPONSIBILITY: Owns Trainer TrainerWorkoutWorkout mutation orchestration; UI consumes feature command functions and pending state only.
// DATA FLOW: TrainerWorkoutWorkout UI intent → command function → TanStack mutation → TrainerWorkoutApi → targeted cache invalidation → feedback.
import { useCallback } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TrainerWorkoutApi } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/api/TrainerCoachingWorkoutPlansApi';

import { TRAINER_WORKOUT_QUERY_KEYS } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/config/TrainerCoachingWorkoutPlansQueryKeys';

import type { TrainerWorkoutCreateMutationVariables, TrainerWorkoutUpdateMutationVariables, TrainerWorkoutDeleteMutationVariables, TrainerWorkoutCreateExerciseMutationVariables, TrainerWorkoutUpdateExerciseMutationVariables, TrainerWorkoutDeleteExerciseMutationVariables } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/types/TrainerCoachingWorkoutPlansMutationTypes';







/**
 * @description Encapsulates all Trainer TrainerWorkoutWorkout write operations behind feature-local commands.
 * @dependencies Trainer TrainerWorkoutWorkout API, canonical query key registry, and idempotency-aware mutation variables.
 * @edge-cases Preserves backend response contracts, pending state, destructive flow ownership, and targeted plan/exercise cache invalidation.
 */
/**
 * @description Manages TrainerWorkoutMutations state and data flow for the workout feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented workout module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerWorkoutMutations() {
  const queryClient = useQueryClient();
  const invalidatePlans = useCallback(() => { void queryClient.invalidateQueries({ queryKey: TRAINER_WORKOUT_QUERY_KEYS.plansAll() }); }, [queryClient]);
  const invalidateExercises = useCallback(() => { void queryClient.invalidateQueries({ queryKey: TRAINER_WORKOUT_QUERY_KEYS.exercisesAll() }); }, [queryClient]);
  const createWorkoutMutation = useMutation({ mutationFn: ({ dto, idempotencyKey }: TrainerWorkoutCreateMutationVariables) => TrainerWorkoutApi.createWorkout(dto, idempotencyKey), onSuccess: invalidatePlans });
  const updateWorkoutMutation = useMutation({ mutationFn: ({ id, dto, idempotencyKey }: TrainerWorkoutUpdateMutationVariables) => TrainerWorkoutApi.updateWorkout(id, dto, idempotencyKey), onSuccess: invalidatePlans });
  const deleteWorkoutMutation = useMutation({ mutationFn: ({ id, idempotencyKey }: TrainerWorkoutDeleteMutationVariables) => TrainerWorkoutApi.deleteWorkout(id, idempotencyKey), onSuccess: invalidatePlans });
  const createExerciseMutation = useMutation({ mutationFn: ({ dto, idempotencyKey }: TrainerWorkoutCreateExerciseMutationVariables) => TrainerWorkoutApi.createExercise(dto, idempotencyKey), onSuccess: invalidateExercises });
  const updateExerciseMutation = useMutation({ mutationFn: ({ id, dto, idempotencyKey }: TrainerWorkoutUpdateExerciseMutationVariables) => TrainerWorkoutApi.updateExercise(id, dto, idempotencyKey), onSuccess: invalidateExercises });
  const deleteExerciseMutation = useMutation({ mutationFn: ({ id, idempotencyKey }: TrainerWorkoutDeleteExerciseMutationVariables) => TrainerWorkoutApi.deleteExercise(id, idempotencyKey), onSuccess: invalidateExercises });
  return {
    createWorkout: useCallback((variables: TrainerWorkoutCreateMutationVariables) => createWorkoutMutation.mutateAsync(variables), [createWorkoutMutation]),
    createWorkoutPending: createWorkoutMutation.isPending,
    updateWorkout: useCallback((variables: TrainerWorkoutUpdateMutationVariables) => updateWorkoutMutation.mutateAsync(variables), [updateWorkoutMutation]),
    updateWorkoutPending: updateWorkoutMutation.isPending,
    deleteWorkout: useCallback((variables: TrainerWorkoutDeleteMutationVariables) => deleteWorkoutMutation.mutateAsync(variables), [deleteWorkoutMutation]),
    deleteWorkoutPending: deleteWorkoutMutation.isPending,
    createExercise: useCallback((variables: TrainerWorkoutCreateExerciseMutationVariables) => createExerciseMutation.mutateAsync(variables), [createExerciseMutation]),
    createExercisePending: createExerciseMutation.isPending,
    updateExercise: useCallback((variables: TrainerWorkoutUpdateExerciseMutationVariables) => updateExerciseMutation.mutateAsync(variables), [updateExerciseMutation]),
    updateExercisePending: updateExerciseMutation.isPending,
    deleteExercise: useCallback((variables: TrainerWorkoutDeleteExerciseMutationVariables) => deleteExerciseMutation.mutateAsync(variables), [deleteExerciseMutation]),
    deleteExercisePending: deleteExerciseMutation.isPending,
  };
}
