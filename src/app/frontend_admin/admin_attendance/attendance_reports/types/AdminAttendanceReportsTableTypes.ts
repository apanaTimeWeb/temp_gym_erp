// RESPONSIBILITY: Attendance report table-only view types; no finance, membership, payroll, or P&L fields.
import type { AttendanceHeatmapCell, AttendanceSummaryRow } from '@/app/frontend_admin/admin_attendance/attendance_reports/types/AdminAttendanceReportsTypes';
export type AttendanceSortDirection = 'asc' | 'desc';
export type AttendanceSortKey = keyof AttendanceSummaryRow;
export type AdminAttendanceReportsReportData = { attendanceSummary: AttendanceSummaryRow[]; attendanceHeatmap: AttendanceHeatmapCell[] };
