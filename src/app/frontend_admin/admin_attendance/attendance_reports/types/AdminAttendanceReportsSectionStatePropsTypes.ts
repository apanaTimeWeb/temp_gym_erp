// RESPONSIBILITY: Defines feature-local TypeScript contracts for attendance_reports; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_attendance/attendance_reports/types/AdminAttendanceReportsSectionStatePropsTypes.ts)

/** Retryable per-section reporting state props. */
export interface AdminAttendanceReportsSectionStateProps {
  status: 'pending' | 'success' | 'error';
  onRetry: () => void | Promise<unknown>;
}
