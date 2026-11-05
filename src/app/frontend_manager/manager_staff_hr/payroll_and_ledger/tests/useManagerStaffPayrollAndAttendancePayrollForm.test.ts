import { renderHook } from '@testing-library/react';
import '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/tests/harness/bootstrap';
import { ManagerStaffPayrollAndAttendanceHarness } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/tests/harness/ManagerStaffPayrollAndAttendanceHarness';
import { describe, it, expect, vi } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/hooks/useManagerStaffPayrollAndAttendancePayrollForm';

const { queryConfigs, mutationConfigs } = vi.hoisted(() => ({ queryConfigs: [] as unknown[], mutationConfigs: [] as unknown[] }));

vi.mock('@/components/ui/manager_confirm_provider/ManagerConfirmProvider', () => ({
  useConfirm: vi.fn(() => ({ confirm: vi.fn().mockResolvedValue(true) })),
  ManagerConfirmProvider: ({ children }: { children: unknown }) => children,
}));


describe('useManagerStaffPayrollAndAttendancePayrollForm co-located hook contract', () => {
  it('exports the expected callable hook', () => {
    expect(typeof moduleUnderTest.useManagerStaffPayrollAndAttendancePayrollForm).toBe('function');
  });

  it('can initialize its public hook contract without executing a real backend request', () => {
    const hook = moduleUnderTest.useManagerStaffPayrollAndAttendancePayrollForm as (...args: never[]) => unknown;
    const { result } = renderHook(() => hook(), { wrapper: ManagerStaffPayrollAndAttendanceHarness });
    expect(result.current).toBeDefined();
  });
});
