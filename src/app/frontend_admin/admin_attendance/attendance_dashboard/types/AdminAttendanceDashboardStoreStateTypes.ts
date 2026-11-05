// RESPONSIBILITY: Defines feature-local TypeScript contracts for attendance_dashboard; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_attendance/attendance_dashboard/types/AdminAttendanceDashboardStoreStateTypes.ts)

// Type contract owned by this module; kept outside implementation files for AI isolation.

import type { AdminAttendanceStatusFilter, DateRangeFilter } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/types/AdminAttendanceDashboardTypes';
export interface AdminAttendanceStoreState {
  search: string;
  setSearch: (s: string) => void;
  statusFilter: AdminAttendanceStatusFilter;
  setStatusFilter: (s: AdminAttendanceStatusFilter) => void;
  branchFilter: string;
  setBranchFilter: (s: string) => void;
  dateRange: DateRangeFilter;
  setDateRange: (d: DateRangeFilter) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;
  visibleColumns: string[];
  setVisibleColumns: (cols: string[]) => void;
}
