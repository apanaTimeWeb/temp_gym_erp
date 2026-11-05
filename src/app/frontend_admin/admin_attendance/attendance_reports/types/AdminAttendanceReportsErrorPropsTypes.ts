// RESPONSIBILITY: Defines feature-local TypeScript contracts for attendance_reports; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_attendance/attendance_reports/types/AdminAttendanceReportsAnalyticsErrorPropsTypes.ts)

// Type contract for the framework-owned error boundary of this feature.
export interface AdminAttendanceReportsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
