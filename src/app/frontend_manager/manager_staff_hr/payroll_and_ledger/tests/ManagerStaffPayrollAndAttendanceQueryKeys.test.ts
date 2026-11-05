import { describe, expect, it } from 'vitest';

import { ManagerStaffPayrollAndAttendanceQueryKeys } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/api/manager_staff_hr_payroll_and_ledger.query_keys';

describe('manager_hr query-key namespace', () => {
  it('uses a stable, feature-specific root for every cache entry', () => {
    expect(ManagerStaffPayrollAndAttendanceQueryKeys.all).toEqual(['manager_hr']);
  });
});
