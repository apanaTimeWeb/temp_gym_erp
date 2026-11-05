// RESPONSIBILITY: Validates this autonomous finance leaf's mock pagination boundary.
import { describe, expect, it } from 'vitest';
import { readAdminFinanceMockPageParam } from '@/app/frontend_admin/admin_finance/finance_payroll_management/mocks/handlers/AdminFinancePayrollManagementMockHandlers';
describe('finance_payroll_management pagination safety', () => {
  it('normalizes malformed and unsafe URL pagination fields', () => {
    for (const invalid of [null, '', '0', '-4', '2.5', 'NaN', 'Infinity', '9007199254740992']) {
      expect(readAdminFinanceMockPageParam(invalid, 10)).toBe(10);
    }
    expect(readAdminFinanceMockPageParam('3', 10)).toBe(3);
  });
});
