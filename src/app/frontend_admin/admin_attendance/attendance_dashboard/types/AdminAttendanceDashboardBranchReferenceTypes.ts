// RESPONSIBILITY: Defines the minimal branch reference contract owned by the Admin attendance module.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_attendance/attendance_dashboard/types/AdminAttendanceDashboardBranchReferenceTypes.ts)

export interface AdminAttendanceBranchReference { id: string; name: string; }
