// RESPONSIBILITY: Defines mutation variable contracts for Trainer TrainerWorkoutWorkout server-state writes.
import type { TrainerWorkoutCreateExerciseDto, TrainerWorkoutCreateWorkoutPlanDto } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/types/TrainerCoachingWorkoutPlansTypes';
export interface TrainerWorkoutCreateMutationVariables { dto: TrainerWorkoutCreateWorkoutPlanDto; idempotencyKey: string; }
export interface TrainerWorkoutUpdateMutationVariables { id: string; dto: TrainerWorkoutCreateWorkoutPlanDto; idempotencyKey: string; }
export interface TrainerWorkoutDeleteMutationVariables { id: string; idempotencyKey: string; }
export interface TrainerWorkoutCreateExerciseMutationVariables { dto: TrainerWorkoutCreateExerciseDto; idempotencyKey: string; }
export interface TrainerWorkoutUpdateExerciseMutationVariables { id: string; dto: TrainerWorkoutCreateExerciseDto; idempotencyKey: string; }
export interface TrainerWorkoutDeleteExerciseMutationVariables { id: string; idempotencyKey: string; }
