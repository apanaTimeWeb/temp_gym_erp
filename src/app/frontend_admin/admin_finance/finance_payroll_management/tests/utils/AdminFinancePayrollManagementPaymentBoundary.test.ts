import { describe, expect, it } from 'vitest';
import { canAdminFinancePayrollManagementPay } from '@/app/frontend_admin/admin_finance/finance_payroll_management/utils/AdminFinancePayrollManagementPaymentBoundary';

describe('Payroll payment minor-unit balance safety', () => {
  it('allows exact pending and partial disbursements', () => {
    expect(canAdminFinancePayrollManagementPay(20000, 5000, 20000)).toBe(true);
    expect(canAdminFinancePayrollManagementPay(1, 5000, 20000)).toBe(true);
  });
  it.each([0, -1, 20001, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1])(
    'rejects invalid/excess disbursement %s', (value) => expect(canAdminFinancePayrollManagementPay(value, 5000, 20000)).toBe(false),
  );
  it('rejects malformed server balances and unsafe sums', () => {
    expect(canAdminFinancePayrollManagementPay(100, NaN, 20000)).toBe(false);
    expect(canAdminFinancePayrollManagementPay(100, 5000, -1)).toBe(false);
    expect(canAdminFinancePayrollManagementPay(10, Number.MAX_SAFE_INTEGER, 10)).toBe(false);
  });
});
