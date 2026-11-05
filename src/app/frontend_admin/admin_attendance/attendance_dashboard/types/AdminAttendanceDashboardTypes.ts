// RESPONSIBILITY: TypeScript types and interfaces for the Admin Attendance module (read-only view).
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_attendance/attendance_dashboard/types/AdminAttendanceDashboardTypes.ts)

export type AttendanceStatus = 'present' | 'absent' | 'late';
export type AdminAttendanceStatusFilter = AttendanceStatus | 'all';
export type AdminAttendanceSessionType = 'General' | 'PT' | 'Class';
export type DateRangeFilter = 'today' | 'yesterday' | 'this_week' | 'this_month' | 'last_month';

export interface AdminAttendanceRecord {
  id: string;
  memberId: string;
  memberName: string;
  memberPhone: string;
  branchId: string;
  branchName: string;
  checkInTime: string;
  checkOutTime: string | null;
  date: string;
  status: AttendanceStatus;
  planName: string;
  trainerId?: string;
  trainerName?: string;
  sessionType?: AdminAttendanceSessionType;
}

export interface AdminAttendanceSummary {
  todayTotal: number;
  todayPresent: number;
  todayLate: number;
  weeklyAverage: number;
  peakHour: string;
  trendVsLastWeek: number;
  uniqueMembersThisMonth: number;
}

export interface AdminAttendanceTrendPoint {
  date: string;
  count: number;
}
