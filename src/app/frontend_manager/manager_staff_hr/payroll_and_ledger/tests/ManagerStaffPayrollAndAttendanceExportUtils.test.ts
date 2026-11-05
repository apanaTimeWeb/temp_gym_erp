import { describe, expect, it } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/utils/ManagerStaffPayrollAndAttendanceExportUtils';

describe('ManagerStaffPayrollAndAttendanceExportUtils behavioral contract', () => {
  it('downloadManagerStaffPayrollAndAttendanceStaffCsv is callable', () => {
    expect(typeof moduleUnderTest.downloadManagerStaffPayrollAndAttendanceStaffCsv).toBe('function');
  });
  it('printManagerStaffPayrollAndAttendancePayslip is callable', () => {
    expect(typeof moduleUnderTest.printManagerStaffPayrollAndAttendancePayslip).toBe('function');
  });
});
