// RESPONSIBILITY: Defines regression tests for AdminAttendanceReportsAnalyticsSortAttendanceRows.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_attendance/attendance_reports/tests/utils/AdminAttendanceReportsAnalyticsSortAttendanceRows.test.ts)

import { describe, expect, it } from 'vitest';
import { sortAdminAttendanceRows } from '@/app/frontend_admin/admin_attendance/attendance_reports/utils/AdminAttendanceReportsSortAttendanceRows';
import type { AttendanceSummaryRow } from '@/app/frontend_admin/admin_attendance/attendance_reports/types/AdminAttendanceReportsTypes';

describe('sortAdminAttendanceRows', () => {
  const rows: AttendanceSummaryRow[] = [
    { gymId: 'g2', gymName: 'Beta', avgDailyAttendance: 90, peakDay: 'Monday', attendanceRate: 75, totalCheckIns: 900 },
    { gymId: 'g1', gymName: 'Alpha', avgDailyAttendance: 40, peakDay: 'Friday', attendanceRate: 85, totalCheckIns: 400 },
  ];

  it('sorts numeric attendance fields and preserves the source array', () => {
    expect(sortAdminAttendanceRows(rows, 'attendanceRate', 'asc').map((row) => row.gymId)).toEqual(['g2', 'g1']);
    expect(rows.map((row) => row.gymId)).toEqual(['g2', 'g1']);
  });

  it('sorts text columns in descending order', () => {
    expect(sortAdminAttendanceRows(rows, 'gymName', 'desc').map((row) => row.gymName)).toEqual(['Beta', 'Alpha']);
  });
});
