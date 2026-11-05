// RESPONSIBILITY: Defines mutation variable contracts for Trainer Attendance server-state writes.
import type { TrainerAttendanceCreateDto } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/types/TrainerOperationsMemberAttendanceAttendanceTypes';
export interface TrainerAttendanceCreateMutationVariables { dto: TrainerAttendanceCreateDto; idempotencyKey: string; }
export interface TrainerAttendanceSelfMutationVariables { idempotencyKey: string; }
