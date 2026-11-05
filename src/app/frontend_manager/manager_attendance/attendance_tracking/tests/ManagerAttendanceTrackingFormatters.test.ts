import { describe, expect, it } from 'vitest';

import { ATTENDANCE_TABLE_HEADERS, ATTENDANCE_TABS } from '@/app/frontend_manager/manager_attendance/attendance_tracking/constants/manager_attendance_tracking_shared.constants';
import { ManagerAttendanceTrackingDisplayValue, ManagerAttendanceTrackingFormatMonthYear as formatAttendanceMonthYear, ManagerAttendanceTrackingFormatTime as formatTime } from '@/app/frontend_manager/manager_attendance/attendance_tracking/utils/ManagerAttendanceTrackingFormatters';


describe('ManagerAttendanceTrackingSharedConstants', () => {
  it('renders missing display values with an en dash without hiding valid falsy values', () => {
    expect(ManagerAttendanceTrackingDisplayValue(null)).toBe('—');
    expect(ManagerAttendanceTrackingDisplayValue(undefined)).toBe('—');
    expect(ManagerAttendanceTrackingDisplayValue('')).toBe('—');
    expect(ManagerAttendanceTrackingDisplayValue(0)).toBe('0');
  });


  it('keeps the documented attendance table contract aligned with nine columns', () => {
    expect(ATTENDANCE_TABLE_HEADERS).toHaveLength(9);
    expect(ATTENDANCE_TABLE_HEADERS).toContain('Check Out');
    expect(ATTENDANCE_TABLE_HEADERS).toContain('Method');
  });

  it('formats attendance time and month labels consistently', () => {
    expect(formatTime(undefined)).toBe('—');
    expect(formatAttendanceMonthYear('2026-01-15')).toMatch(/2026/);
    expect(formatAttendanceMonthYear('2026-01-15')).toMatch(/January/i);
  });

  it('exposes the complete documented attendance tab set', () => {
    expect(ATTENDANCE_TABS).toEqual(['Member Attendance', 'Trainer Attendance', 'Staff Attendance', 'Daily Attendance Report']);
  });
});
