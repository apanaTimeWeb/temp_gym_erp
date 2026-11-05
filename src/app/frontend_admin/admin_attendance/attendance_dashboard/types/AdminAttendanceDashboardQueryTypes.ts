// RESPONSIBILITY: Defines feature-local TypeScript contracts for attendance_dashboard; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_attendance/attendance_dashboard/types/AdminAttendanceDashboardQueryTypes.ts)

// Type contract owned by this module; kept outside implementation files for AI isolation.

import type { DateRangeFilter } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/types/AdminAttendanceDashboardTypes';
export interface AdminAttendanceQueryParams {
  page: number;
  limit: number;
  branchId?: string;
  search?: string;
  status?: string;
  dateRange?: DateRangeFilter;
}
