import { describe, expect, it } from 'vitest';
import { MOCK_REPORTS_BRANCH_REFERENCES } from '@/app/frontend_admin/admin_attendance/attendance_reports/mocks/fixtures/AdminAttendanceReportsBranchReferenceMockFixtures';
import { ADMIN_ATTENDANCE_REPORTS_QUERY_KEYS } from '@/app/frontend_admin/admin_attendance/attendance_reports/constants/AdminAttendanceReportsQueryKeys';
import { getAdminAttendanceReportsFixture } from '@/app/frontend_admin/admin_attendance/attendance_reports/mocks/fixtures/AdminAttendanceReportsMockFixtures';

describe('attendance report mock fixture date scope', () => {
  it('matches every selectable mock branch to nonempty scoped report rows, without inventing production IDs', () => {
    for (const branch of MOCK_REPORTS_BRANCH_REFERENCES) {
      const scoped = getAdminAttendanceReportsFixture({ from: '2026-10-01', to: '2026-10-03', gymId: branch.id });
      expect(scoped.attendanceSummary.length).toBeGreaterThan(0);
      expect(scoped.attendanceSummary.every((row) => row.gymId === branch.id && row.gymName === branch.name)).toBe(true);
      expect(scoped.attendanceHeatmap.every((row) => row.gymId === branch.id)).toBe(true);
    }
  });

  it('isolates the reports query prefix from the generic parent key', () => {
    expect(ADMIN_ATTENDANCE_REPORTS_QUERY_KEYS.all).toEqual(['admin_attendance', 'attendance_reports']);
    expect(ADMIN_ATTENDANCE_REPORTS_QUERY_KEYS.key('branch-reference')).toEqual(['admin_attendance', 'attendance_reports', 'branch-reference']);
  });
  it('derives inclusive check-in totals from the selected date range', () => {
    const oneDay = getAdminAttendanceReportsFixture({ from: '2026-10-01', to: '2026-10-01', gymId: 'g1' });
    const threeDays = getAdminAttendanceReportsFixture({ from: '2026-10-01', to: '2026-10-03', gymId: 'g1' });

    expect(oneDay.attendanceSummary[0]?.totalCheckIns).toBe(850);
    expect(threeDays.attendanceSummary[0]?.totalCheckIns).toBe(2550);
    expect(oneDay.attendanceSummary[0]?.avgDailyAttendance).toBe(threeDays.attendanceSummary[0]?.avgDailyAttendance);
  });

  it('returns empty scoped data for invalid or reversed bounds', () => {
    expect(getAdminAttendanceReportsFixture({ from: 'invalid', to: '2026-10-03' })).toEqual({ attendanceSummary: [], attendanceHeatmap: [] });
    expect(getAdminAttendanceReportsFixture({ from: '2026-02-30', to: '2026-03-03' })).toEqual({ attendanceSummary: [], attendanceHeatmap: [] });
    expect(getAdminAttendanceReportsFixture({ from: '2026-10-04', to: '2026-10-03' })).toEqual({ attendanceSummary: [], attendanceHeatmap: [] });
  });
});
