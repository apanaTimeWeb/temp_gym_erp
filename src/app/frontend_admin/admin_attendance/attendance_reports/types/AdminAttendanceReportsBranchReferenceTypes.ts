// RESPONSIBILITY: Defines the minimal branch reference contract owned by the Admin reports module.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_attendance/attendance_reports/types/AdminAttendanceReportsAnalyticsBranchReferenceTypes.ts)

export interface AdminAttendanceReportsBranchReference { id: string; name: string; }
