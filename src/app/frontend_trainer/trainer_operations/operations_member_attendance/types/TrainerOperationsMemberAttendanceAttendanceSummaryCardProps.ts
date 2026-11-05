// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerAttendanceRecord } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/types/TrainerOperationsMemberAttendanceAttendanceTypes';

export interface TrainerAttendanceSummaryCardProps {
  records: TrainerAttendanceRecord[];
}
