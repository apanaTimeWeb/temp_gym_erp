import { describe, expect, it } from 'vitest';
import { normalizeAdminAttendanceDashboardUrlPage } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/utils/AdminAttendanceDashboardUrlPage';

describe('AdminAttendanceDashboardUrlPage: strict pagination boundary', () => {
  it.each(['', '0', '-2', '1.5', '2abc', '1e3', '0x10', '01', 'Infinity', 'NaN', ' 4', '9007199254740992', '', null, undefined])(
    'rejects untrusted value %s', (value) => expect(normalizeAdminAttendanceDashboardUrlPage(value)).toBe(1),
  );
  it('accepts canonical integers and bounds even safe large pages', () => {
    expect(normalizeAdminAttendanceDashboardUrlPage('12')).toBe(12);
    expect(normalizeAdminAttendanceDashboardUrlPage(12)).toBe(12);
    expect(normalizeAdminAttendanceDashboardUrlPage('99999')).toBe(99999);
    expect(normalizeAdminAttendanceDashboardUrlPage('100001')).toBe(100000);
    expect(normalizeAdminAttendanceDashboardUrlPage(0.5)).toBe(1);
  });
});
