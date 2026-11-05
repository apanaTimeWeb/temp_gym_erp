import { renderHook } from '@testing-library/react';
import '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/tests/harness/bootstrap';
import { ManagerStaffPayrollAndAttendanceHarness } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/tests/harness/ManagerStaffPayrollAndAttendanceHarness';
import { describe, it, expect, vi } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/hooks/useManagerStaffPayrollAndAttendanceLogic';

const { queryConfigs, mutationConfigs } = vi.hoisted(() => ({ queryConfigs: [] as unknown[], mutationConfigs: [] as unknown[] }));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({ replace: vi.fn(), push: vi.fn(), back: vi.fn(), refresh: vi.fn() })),
  usePathname: vi.fn(() => '/manager'),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));


describe('useManagerStaffPayrollAndAttendanceLogic co-located hook contract', () => {
  it('exports the expected callable hook', () => {
    expect(typeof moduleUnderTest.useManagerStaffPayrollAndAttendanceLogic).toBe('function');
  });

  it('can initialize its public hook contract without executing a real backend request', () => {
    const hook = moduleUnderTest.useManagerStaffPayrollAndAttendanceLogic as (...args: never[]) => unknown;
    const { result } = renderHook(() => hook('' as never), { wrapper: ManagerStaffPayrollAndAttendanceHarness });
    expect(result.current).toBeDefined();
  });
});
