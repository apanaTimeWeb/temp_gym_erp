// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerAttendanceStats } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/types/TrainerOperationsMemberAttendanceAttendanceTypes';

export interface TrainerAttendanceKPIsProps {
  stats?: TrainerAttendanceStats;
  isPending: boolean;
  isError: boolean;
  onRetry: () => void;
}
