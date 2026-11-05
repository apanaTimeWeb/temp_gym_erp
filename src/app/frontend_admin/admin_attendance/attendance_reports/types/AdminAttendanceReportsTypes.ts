// RESPONSIBILITY: Defines only the attendance report contracts owned by admin_attendance/attendance_reports.
// DATA FLOW: Verified response schema → scoped API → query hook → owning report view.

export type ReportDateRange = 'this_month' | 'last_month' | 'last_3_months' | 'last_6_months' | 'this_year' | 'custom';
export type AdminAttendanceReportsExportFormat = 'pdf' | 'csv';

export interface AttendanceSummaryRow {
gymId: string;
  gymName: string;
  avgDailyAttendance: number;
  peakDay: string;
  attendanceRate: number;
  totalCheckIns: number;
}

export interface AttendanceHeatmapCell {
gymId: string;
  gymName: string;
  day: string;
  count: number;
  rate: number;
}

export interface AdminAttendanceReportsQueryParams { from: string; to: string; branchId?: string; }
export interface AdminAttendanceReportsExportParams extends AdminAttendanceReportsQueryParams { type: 'attendance'; format: AdminAttendanceReportsExportFormat; }

export interface AttendanceReportData {
  attendanceSummary: AttendanceSummaryRow[];
  attendanceHeatmap: AttendanceHeatmapCell[];
}
