import { describe, expect, it } from 'vitest';
import { normalizeAdminFinancePayrollManagementUrlPage } from '@/app/frontend_admin/admin_finance/finance_payroll_management/utils/AdminFinancePayrollManagementUrlPage';

describe('AdminFinancePayrollManagement URL page guard', () => {
  it('accepts positive integer inbound and outgoing pages', () => {
    expect(normalizeAdminFinancePayrollManagementUrlPage('2')).toBe(2);
    expect(normalizeAdminFinancePayrollManagementUrlPage(3)).toBe(3);
    expect(normalizeAdminFinancePayrollManagementUrlPage('100001')).toBe(100000);
  });
  it('rejects malformed inputs instead of parsing a numeric prefix', () => {
    for (const raw of [null, '', '0', '-1', '1.5', '2abc', '1e3', 'Infinity', ' 2 ', '9007199254740992']) {
      expect(normalizeAdminFinancePayrollManagementUrlPage(raw)).toBe(1);
    }
    expect(normalizeAdminFinancePayrollManagementUrlPage(Number.POSITIVE_INFINITY)).toBe(1);
    expect(normalizeAdminFinancePayrollManagementUrlPage(2.5)).toBe(1);
  });
});
