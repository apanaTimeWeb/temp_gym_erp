// RESPONSIBILITY: Defines regression tests for useAdminAttendanceReportsTable.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_attendance/attendance_reports/tests/hooks/useAdminAttendanceReportsTable.test.ts)

import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useAdminAttendanceReportsTable } from '@/app/frontend_admin/admin_attendance/attendance_reports/hooks/useAdminAttendanceReportsTable';

const rows = [
  { gymId: 'a', gymName: 'A', avgDailyAttendance: 10, totalCheckIns: 100, attendanceRate: 50, peakDay: 'Mon' },
  { gymId: 'b', gymName: 'B', avgDailyAttendance: 20, totalCheckIns: 200, attendanceRate: 80, peakDay: 'Tue' },
] as const;

describe('useAdminAttendanceReportsTable', () => {
  it('sorts server rows and toggles the selected column direction', () => {
    const { result } = renderHook(() => useAdminAttendanceReportsTable([...rows]));
    expect(result.current.rows[0].gymId).toBe('b');
    expect(result.current.sortDir).toBe('desc');

    act(() => result.current.handleSort('attendanceRate'));
    expect(result.current.rows[0].gymId).toBe('a');
    expect(result.current.sortDir).toBe('asc');
  });
});
