// RESPONSIBILITY: Typed props contract for the Attendance toolbar controls.
import type { TrainerAttendanceTab } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/types/TrainerOperationsMemberAttendanceAttendanceInteractionTypes';

import type { TrainerAttendanceViewMode } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/types/TrainerOperationsMemberAttendanceAttendanceInteractionTypes';




export interface TrainerAttendanceToolbarProps {
  tab: TrainerAttendanceTab;
  setTab: (tab: TrainerAttendanceTab) => void;
  viewMode: TrainerAttendanceViewMode;
  setViewMode?: (viewMode: TrainerAttendanceViewMode) => void;
  search: string;
  setSearch: (search: string) => void;
  filterDate: string;
  setFilterDate: (date: string) => void;
  onAddRecord: () => void;
  onRefresh: () => void | Promise<void>;
  onSelfCheckIn: () => void | Promise<void>;
  onSelfCheckOut: () => void | Promise<void>;
  selfCheckInPending: boolean;
  selfCheckOutPending: boolean;
  isRefreshing: boolean;
}
