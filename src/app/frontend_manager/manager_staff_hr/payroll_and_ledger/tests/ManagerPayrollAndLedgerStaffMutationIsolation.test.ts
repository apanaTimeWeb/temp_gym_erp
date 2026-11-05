// Guards the payroll leaf API boundary: staff CRUD is owned by staff_directory.
import { describe, expect, it } from 'vitest';
import { ManagerStaffPayrollAndAttendanceApi } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/api/manager_staff_hr_payroll_and_ledger.api';

describe('Payroll and Ledger API ownership', () => {
  it('does not expose staff-directory mutation methods', () => {
    expect(Object.keys(ManagerStaffPayrollAndAttendanceApi)).not.toContain('createStaff');
    expect(Object.keys(ManagerStaffPayrollAndAttendanceApi)).not.toContain('updateStaff');
    expect(Object.keys(ManagerStaffPayrollAndAttendanceApi)).not.toContain('deleteStaff');
  });
});
