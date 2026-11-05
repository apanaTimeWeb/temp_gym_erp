// RESPONSIBILITY: Typed props contract for one sortable Attendance table header.
import type { TrainerAttendanceSortDirection, TrainerAttendanceSortField } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/types/TrainerOperationsTrainerAttendanceAttendanceInteractionTypes';

export interface TrainerAttendanceSortableHeaderProps {
  label: string;
  field: TrainerAttendanceSortField;
  sortBy: TrainerAttendanceSortField;
  sortDirection: TrainerAttendanceSortDirection;
  onSort: (field: TrainerAttendanceSortField) => void;
  sortLabel: string;
}
