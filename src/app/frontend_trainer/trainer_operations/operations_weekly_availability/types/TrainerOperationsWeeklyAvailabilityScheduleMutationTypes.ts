// RESPONSIBILITY: Defines mutation variable contracts for Trainer Schedule server-state writes.
import type { TrainerScheduleWeeklyAvailability, TrainerScheduleCreateLeaveDto } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/types/TrainerOperationsWeeklyAvailabilityScheduleTypes';
export interface TrainerScheduleUpdateAvailabilityMutationVariables { data: TrainerScheduleWeeklyAvailability[]; idempotencyKey: string; }
export interface TrainerScheduleRequestLeaveMutationVariables { data: TrainerScheduleCreateLeaveDto; idempotencyKey: string; }
