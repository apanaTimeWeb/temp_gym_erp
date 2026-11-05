// RESPONSIBILITY: Canonical TanStack Query key registry for Trainer TrainerWorkoutWorkout server state.
import type { TrainerWorkoutBrowseQueryParams } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/types/TrainerCoachingWorkoutPlansQueryTypes';
export const TRAINER_WORKOUT_QUERY_KEYS = {
  all: ['trainer_workout'] as const,
  plansAll: () => [...TRAINER_WORKOUT_QUERY_KEYS.all, 'plans'] as const,
  plans: (params: TrainerWorkoutBrowseQueryParams) => [...TRAINER_WORKOUT_QUERY_KEYS.plansAll(), params] as const,
  exercisesAll: () => [...TRAINER_WORKOUT_QUERY_KEYS.all, 'exercises'] as const,
  exercises: (params: TrainerWorkoutBrowseQueryParams) => [...TRAINER_WORKOUT_QUERY_KEYS.exercisesAll(), params] as const,
} as const;
