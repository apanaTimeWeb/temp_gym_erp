// RESPONSIBILITY: Defines feature-local TypeScript contracts for attendance_reports; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_attendance/attendance_reports/types/AdminAttendanceReportsSortIconPropsTypes.ts)

import type { AttendanceSortKey, AttendanceSortDirection } from '@/app/frontend_admin/admin_attendance/attendance_reports/types/AdminAttendanceReportsTableTypes';
export interface AdminAttendanceReportsSortIconProps {
  column: AttendanceSortKey;
  sortKey: AttendanceSortKey;
  sortDir: AttendanceSortDirection;
}
