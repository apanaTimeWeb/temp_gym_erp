import { describe, expect, it } from 'vitest';
import { normalizeAdminAttendanceDashboardMockPagination } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/utils/AdminAttendanceDashboardMockPagination';

describe('AdminAttendanceDashboard mock HTTP pagination', () => {
  it('retains valid positive integer pagination and existing default values', () => {
    expect(normalizeAdminAttendanceDashboardMockPagination(null, 10)).toBe(10);
    expect(normalizeAdminAttendanceDashboardMockPagination('2', 1)).toBe(2);
    expect(normalizeAdminAttendanceDashboardMockPagination('3', 8)).toBe(3);
  });
  it('rejects malformed values without unsafe offsets or infinite metadata', () => {
    for (const raw of ['0', '-1', '1.5', '1e5', 'Infinity', 'NaN', '', ' 2 ', '9007199254740992']) {
      expect(normalizeAdminAttendanceDashboardMockPagination(raw, 8)).toBe(8);
    }
  });
});
