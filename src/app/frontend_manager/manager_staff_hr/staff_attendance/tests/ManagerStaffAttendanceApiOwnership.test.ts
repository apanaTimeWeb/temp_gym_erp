import { describe, expect, it } from 'vitest';
import { ManagerStaffPayrollAndAttendanceApi } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/api/manager_staff_hr_staff_attendance.api';

describe('staff_attendance API ownership', () => {
  it('exposes only the methods owned by this autonomous leaf', () => {
    expect(Object.keys(ManagerStaffPayrollAndAttendanceApi).sort()).toEqual(['fetchStaff', 'fetchStaffAttendance']);
  });
});
