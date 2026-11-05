// RESPONSIBILITY: Regression tests for positive, negative, zero and non-finite attendance trends.
import { describe, expect, it } from 'vitest';
import { getAdminAttendanceTrendDirection } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/utils/AdminAttendanceDashboardTrendDirection';

describe('getAdminAttendanceTrendDirection', () => {
  it('distinguishes a positive, negative, and unchanged comparison', () => {
    expect(getAdminAttendanceTrendDirection(8)).toBe('increased');
    expect(getAdminAttendanceTrendDirection(-4)).toBe('decreased');
    expect(getAdminAttendanceTrendDirection(0)).toBe('unchanged');
    expect(getAdminAttendanceTrendDirection(-0)).toBe('unchanged');
    expect(getAdminAttendanceTrendDirection(Number.NaN)).toBe('unchanged');
  });
});
