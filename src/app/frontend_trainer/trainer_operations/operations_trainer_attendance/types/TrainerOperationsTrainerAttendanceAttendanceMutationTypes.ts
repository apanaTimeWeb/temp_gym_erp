// RESPONSIBILITY: Defines mutation variable contracts for Trainer Attendance server-state writes.
import type { TrainerAttendanceCreateDto } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/types/TrainerOperationsTrainerAttendanceAttendanceTypes';
export interface TrainerAttendanceCreateMutationVariables { dto: TrainerAttendanceCreateDto; idempotencyKey: string; }
export interface TrainerAttendanceSelfMutationVariables { idempotencyKey: string; }
