import { describe, expect, it } from 'vitest';
import { ManagerStaffPayrollAndAttendanceBuildAttendanceHistorySearchParams } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/utils/ManagerStaffAttendanceBuildAttendanceHistorySearchParams';

describe('Manager HR attendance history URL state', () => {
  it('preserves payroll month, view, search and pagination while updating attendance month', () => {
    const params = new URLSearchParams(ManagerStaffPayrollAndAttendanceBuildAttendanceHistorySearchParams('month=2026-09&view=attendance-history&search=Ravi&page=3', 'month', '2026-08'));
    expect(params.get('attendanceMonth')).toBe('2026-08');
    expect(params.get('month')).toBe('2026-09');
    expect(params.get('view')).toBe('attendance-history');
    expect(params.get('search')).toBe('Ravi');
    expect(params.get('page')).toBe('3');
  });
  it('removes only the selected staff key when cleared', () => {
    const params = new URLSearchParams(ManagerStaffPayrollAndAttendanceBuildAttendanceHistorySearchParams('attendanceStaffId=staff-7&search=Ravi', 'staffId', null));
    expect(params.get('attendanceStaffId')).toBeNull();
    expect(params.get('search')).toBe('Ravi');
  });
});
