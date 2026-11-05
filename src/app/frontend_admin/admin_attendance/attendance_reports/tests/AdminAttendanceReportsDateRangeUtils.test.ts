// RESPONSIBILITY: Defines regression tests for AdminAttendanceReportsAnalyticsDateRangeUtils.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_attendance/attendance_reports/tests/AdminAttendanceReportsAnalyticsDateRangeUtils.test.ts)

import { describe, expect, it } from 'vitest';
import { getAdminAttendanceReportsPresetDateRange, isValidAdminAttendanceReportsDateRange, toAdminAttendanceReportsDateKey } from '@/app/frontend_admin/admin_attendance/attendance_reports/utils/AdminAttendanceReportsDateRangeUtils';

describe('AdminAttendanceReportsDateRangeUtils', () => {
  it('uses local calendar keys without UTC conversion', () => {
    expect(toAdminAttendanceReportsDateKey(new Date(2026, 0, 2))).toBe('2026-01-02');
  });
  it('generates correct inclusive current and prior month windows', () => {
    const today = new Date(2026, 9, 13);
    expect(getAdminAttendanceReportsPresetDateRange('this_month', today)).toEqual({ startDate: '2026-10-01', endDate: '2026-10-31' });
    expect(getAdminAttendanceReportsPresetDateRange('last_3_months', today)).toEqual({ startDate: '2026-08-01', endDate: '2026-10-31' });
    expect(getAdminAttendanceReportsPresetDateRange('last_6_months', today)).toEqual({ startDate: '2026-05-01', endDate: '2026-10-31' });
  });
  it('rejects malformed, impossible, reversed, and empty ranges', () => {
    expect(isValidAdminAttendanceReportsDateRange('', '2026-01-31')).toBe(false);
    expect(isValidAdminAttendanceReportsDateRange('2026-02-30', '2026-03-01')).toBe(false);
    expect(isValidAdminAttendanceReportsDateRange('2026-02-02', '2026-02-01')).toBe(false);
    expect(isValidAdminAttendanceReportsDateRange('2026-02-01', '2026-02-28')).toBe(true);
  });
});
