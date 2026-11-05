import type { TrainerWorkoutBrowseQueryParams } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/types/TrainerCoachingExerciseManagementQueryTypes';
export const TRAINER_WORKOUT_QUERY_KEYS = {
  all: ['trainer_workout'] as const,
  exercisesAll: () => [...TRAINER_WORKOUT_QUERY_KEYS.all, 'exercises'] as const,
  exercises: (params: TrainerWorkoutBrowseQueryParams) => [...TRAINER_WORKOUT_QUERY_KEYS.exercisesAll(), params] as const,
} as const;
