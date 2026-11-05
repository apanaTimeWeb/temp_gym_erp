// RESPONSIBILITY: Defines regression tests for AdminAttendanceDashboardFormatters.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_attendance/attendance_dashboard/tests/utils/AdminAttendanceDashboardFormatters.test.ts)

import { describe, expect, it } from 'vitest';
import { computeDuration, formatAttendanceTime, formatNumber } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/utils/AdminAttendanceDashboardFormatters';

describe('AdminAttendanceFormatters', () => {
  it('computes duration from ISO timestamps used by the module fixtures', () => {
    expect(computeDuration('2026-10-06T06:30:00Z', '2026-10-06T08:00:00Z')).toBe('1h 30m');
    expect(computeDuration('2026-10-06T23:30:00Z', '2026-10-07T00:15:00Z')).toBe('45m');
  });

  it('retains compatibility with legacy AM/PM display times', () => {
    expect(computeDuration('9:00 AM', '5:30 PM')).toBe('8h 30m');
    expect(computeDuration('9:00 AM', '9:45 AM')).toBe('45m');
  });

  it('returns a safe placeholder for incomplete, invalid, or non-positive duration', () => {
    expect(computeDuration('9:00 AM', null)).toBe('—');
    expect(computeDuration('5:30 PM', '4:30 PM')).toBe('—');
    expect(computeDuration('not a time', 'also invalid')).toBe('—');
  });

  it('formats API ISO timestamps as localized display times and handles invalid values', () => {
    expect(formatAttendanceTime('2026-10-06T06:30:00Z', 'en')).not.toBe('2026-10-06T06:30:00Z');
    expect(formatAttendanceTime('not a time', 'en')).toBe('—');
    expect(formatAttendanceTime(null, 'en')).toBe('—');
  });

  it('formats numbers with the requested locale', () => {
    expect(formatNumber(1234567, 'en-IN')).toBe('12,34,567');
  });
});
