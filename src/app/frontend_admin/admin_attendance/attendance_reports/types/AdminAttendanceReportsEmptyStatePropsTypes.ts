// RESPONSIBILITY: Defines feature-local TypeScript contracts for attendance_reports; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_attendance/attendance_reports/types/AdminAttendanceReportsEmptyStatePropsTypes.ts)

export interface AdminAttendanceReportsEmptyStateProps {
  title: string;
  description: string;
}
