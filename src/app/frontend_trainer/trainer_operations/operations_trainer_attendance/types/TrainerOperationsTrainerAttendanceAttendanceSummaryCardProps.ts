// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerAttendanceRecord } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/types/TrainerOperationsTrainerAttendanceAttendanceTypes';

export interface TrainerAttendanceSummaryCardProps {
  records: TrainerAttendanceRecord[];
}
