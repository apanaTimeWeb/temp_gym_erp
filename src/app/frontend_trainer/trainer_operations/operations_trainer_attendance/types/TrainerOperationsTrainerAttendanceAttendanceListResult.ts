// RESPONSIBILITY: Owns the paginated Trainer Attendance record list result shape returned by the feature API.
import type { TrainerAttendanceRecord } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/types/TrainerOperationsTrainerAttendanceAttendanceTypes';

export interface TrainerAttendanceListResult {
  records: TrainerAttendanceRecord[];
  total: number;
  page: number;
  limit: number;
}
