import { describe, expect, it } from 'vitest';

import { GENDER_OPTIONS, HR_TABS, PAYROLL_TABLE_HEADERS, STAFF_ROLE_OPTIONS, STAFF_TABLE_HEADERS } from '@/app/frontend_manager/manager_staff_hr/staff_directory/constants/manager_staff_payroll_and_attendance_shared.constants';


describe('ManagerStaffPayrollAndAttendanceSharedConstants', () => {
  it('keeps HR tabs and table columns aligned with the Manager UI', () => {
    expect(HR_TABS).toHaveLength(6);
    expect(STAFF_TABLE_HEADERS).toContain('Salary');
    expect(PAYROLL_TABLE_HEADERS).toContain('Net Payable');
  });

  it('contains stable staff selection options', () => {
    expect(GENDER_OPTIONS.map((option) => option.value)).toEqual(['MALE', 'FEMALE', 'OTHER']);
    expect(STAFF_ROLE_OPTIONS.length).toBeGreaterThan(5);
  });
});
