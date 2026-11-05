// RESPONSIBILITY: Props contract for the Attendance table view.
import type { TrainerAttendanceSortDirection, TrainerAttendanceSortField } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/types/TrainerOperationsMemberAttendanceAttendanceInteractionTypes';

import type { TrainerAttendanceRecord, } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/types/TrainerOperationsMemberAttendanceAttendanceTypes';



export interface TrainerAttendanceTableProps {
  records: TrainerAttendanceRecord[];
  totalRecords: number;
  isPending: boolean;
  search: string;
  filterDate: string;
  currentPage: number;
  sortBy: TrainerAttendanceSortField;
  sortDirection: TrainerAttendanceSortDirection;
  onPageChange: (page: number) => void;
  onSort: (field: TrainerAttendanceSortField) => void;
}
