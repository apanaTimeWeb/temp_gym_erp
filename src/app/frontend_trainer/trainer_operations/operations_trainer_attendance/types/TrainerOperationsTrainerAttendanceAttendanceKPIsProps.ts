// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerAttendanceStats } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/types/TrainerOperationsTrainerAttendanceAttendanceTypes';

export interface TrainerAttendanceKPIsProps {
  stats?: TrainerAttendanceStats;
  isPending: boolean;
  isError: boolean;
  onRetry: () => void;
}
