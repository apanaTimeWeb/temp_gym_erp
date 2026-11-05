// RESPONSIBILITY: Owns the paginated Trainer Attendance record list result shape returned by the feature API.
import type { TrainerAttendanceRecord } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/types/TrainerOperationsMemberAttendanceAttendanceTypes';

export interface TrainerAttendanceListResult {
  records: TrainerAttendanceRecord[];
  total: number;
  page: number;
  limit: number;
}
