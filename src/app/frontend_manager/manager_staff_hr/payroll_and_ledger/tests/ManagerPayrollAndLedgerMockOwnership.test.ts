import { describe, expect, it } from 'vitest';
import { managerHrHandlers, resetManagerPayrollAndLedgerMockState } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/mocks/handlers/ManagerPayrollAndLedgerMockHandlers';

describe('payroll_and_ledger mock ownership', () => {
  it('exports a route-local handler collection and explicit state reset', () => {
    expect(Array.isArray(managerHrHandlers)).toBe(true);
    expect(typeof resetManagerPayrollAndLedgerMockState).toBe('function');
  });
});
