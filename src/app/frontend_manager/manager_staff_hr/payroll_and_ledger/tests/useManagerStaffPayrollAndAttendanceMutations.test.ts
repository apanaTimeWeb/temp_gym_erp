import { renderHook } from '@testing-library/react';
import '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/tests/harness/bootstrap';
import { ManagerStaffPayrollAndAttendanceHarness } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/tests/harness/ManagerStaffPayrollAndAttendanceHarness';
import { describe, it, expect } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/hooks/useManagerStaffPayrollAndAttendanceMutations';




describe('useManagerStaffPayrollAndAttendanceMutations co-located hook contract', () => {
  it('exports the expected callable hook', () => {
    expect(typeof moduleUnderTest.useManagerStaffPayrollAndAttendanceMutations).toBe('function');
  });

  it('can initialize its public hook contract without executing a real backend request', () => {
    const hook = moduleUnderTest.useManagerStaffPayrollAndAttendanceMutations as (...args: never[]) => unknown;
    const { result } = renderHook(() => hook('' as never, '' as never, '' as never, '' as never, '' as never, '' as never, false), { wrapper: ManagerStaffPayrollAndAttendanceHarness });
    expect(result.current).toBeDefined();
  });
});
