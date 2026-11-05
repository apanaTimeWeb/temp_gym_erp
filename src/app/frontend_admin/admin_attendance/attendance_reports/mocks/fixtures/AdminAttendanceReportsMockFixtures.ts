// RESPONSIBILITY: Owns only the attendance report's source-backed mock response and deterministic branch/date filtering.
import type { AttendanceReportData } from '@/app/frontend_admin/admin_attendance/attendance_reports/types/AdminAttendanceReportsTypes';

export const MOCK_ADMIN_ATTENDANCE_REPORTS: AttendanceReportData = {
  attendanceSummary: [
    { gymId: 'g1', gymName: 'Downtown Main', avgDailyAttendance: 850, peakDay: 'Monday', attendanceRate: 75.5, totalCheckIns: 25500 },
    { gymId: 'g2', gymName: 'Westside Gym', avgDailyAttendance: 620, peakDay: 'Tuesday', attendanceRate: 68.2, totalCheckIns: 18600 },
    { gymId: 'g3', gymName: 'Northside Arena', avgDailyAttendance: 410, peakDay: 'Wednesday', attendanceRate: 61.4, totalCheckIns: 12300 },
  ],
  attendanceHeatmap: [
    ...[
      ['g1', 'Downtown Main', 850, 75.5],
      ['g2', 'Westside Gym', 620, 68.2],
      ['g3', 'Northside Arena', 410, 61.4],
    ].flatMap(([gymId, gymName, base, rate]) => ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((day, index) => ({
      gymId: String(gymId), gymName: String(gymName), day,
      count: Number(base) + (index - 3) * 24,
      rate: Math.max(35, Math.min(92, Number(rate) + (index % 3 - 1) * 7)),
    }))),
  ],
};

/**
 * Uses inclusive date bounds, matching the report's explicit date-range UI contract.
 * Mock totals are derived from each fixture row's average daily attendance, not invented backend records.
 */
export function getAdminAttendanceReportsFixture({ gymId = 'all', from, to }: { gymId?: string; from: string; to: string }): AttendanceReportData {
  const isDateOnly = (value: string) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const parsed = new Date(`${value}T00:00:00.000Z`);
    return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
  };
  if (!isDateOnly(from) || !isDateOnly(to)) {
    return { attendanceSummary: [], attendanceHeatmap: [] };
  }
  const start = Date.parse(`${from}T00:00:00.000Z`);
  const end = Date.parse(`${to}T00:00:00.000Z`);
  if (start > end) return { attendanceSummary: [], attendanceHeatmap: [] };
  const inclusiveDays = Math.floor((end - start) / 86_400_000) + 1;
  const scopedRows = gymId === 'all' ? MOCK_ADMIN_ATTENDANCE_REPORTS.attendanceSummary : MOCK_ADMIN_ATTENDANCE_REPORTS.attendanceSummary.filter((row) => row.gymId === gymId);
  const attendanceSummary = scopedRows.map((row) => ({
    ...row,
    totalCheckIns: row.avgDailyAttendance * inclusiveDays,
  }));
  const attendanceHeatmap = gymId === 'all' ? MOCK_ADMIN_ATTENDANCE_REPORTS.attendanceHeatmap : MOCK_ADMIN_ATTENDANCE_REPORTS.attendanceHeatmap.filter((row) => row.gymId === gymId);
  return { attendanceSummary, attendanceHeatmap };
}
