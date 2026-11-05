import { describe, expect, it } from 'vitest';
import { ManagerStaffPayrollAndAttendanceApi } from '@/app/frontend_manager/manager_staff_hr/staff_directory/api/manager_staff_hr_staff_directory.api';

describe('staff_directory API ownership', () => {
  it('exposes only the methods owned by this autonomous leaf', () => {
    expect(Object.keys(ManagerStaffPayrollAndAttendanceApi).sort()).toEqual(['createStaff', 'deleteStaff', 'fetchStaff', 'fetchStaffById', 'updateStaff']);
  });
});
