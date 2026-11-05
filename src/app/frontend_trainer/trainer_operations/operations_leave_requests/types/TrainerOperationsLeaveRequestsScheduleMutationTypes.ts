// RESPONSIBILITY: Defines mutation variable contracts for Trainer Schedule server-state writes.
import type { TrainerScheduleWeeklyAvailability, TrainerScheduleCreateLeaveDto } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/types/TrainerOperationsLeaveRequestsScheduleTypes';
export interface TrainerScheduleUpdateAvailabilityMutationVariables { data: TrainerScheduleWeeklyAvailability[]; idempotencyKey: string; }
export interface TrainerScheduleRequestLeaveMutationVariables { data: TrainerScheduleCreateLeaveDto; idempotencyKey: string; }
