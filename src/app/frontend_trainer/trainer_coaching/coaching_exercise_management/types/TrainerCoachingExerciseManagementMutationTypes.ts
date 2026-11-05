import type { TrainerWorkoutCreateExerciseDto } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/types/TrainerCoachingExerciseManagementTypes';
export interface TrainerWorkoutCreateExerciseMutationVariables { dto: TrainerWorkoutCreateExerciseDto; idempotencyKey: string; }
export interface TrainerWorkoutUpdateExerciseMutationVariables { id: string; dto: TrainerWorkoutCreateExerciseDto; idempotencyKey: string; }
export interface TrainerWorkoutDeleteExerciseMutationVariables { id: string; idempotencyKey: string; }
