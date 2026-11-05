import { describe, expect, it } from 'vitest';
import { normalizeAdminFinanceSalaryAdvanceManagementUrlPage } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/utils/AdminFinanceSalaryAdvanceManagementUrlPage';

describe('AdminFinanceSalaryAdvanceManagement URL page guard', () => {
  it('accepts positive integer inbound and outgoing pages', () => {
    expect(normalizeAdminFinanceSalaryAdvanceManagementUrlPage('2')).toBe(2);
    expect(normalizeAdminFinanceSalaryAdvanceManagementUrlPage(3)).toBe(3);
    expect(normalizeAdminFinanceSalaryAdvanceManagementUrlPage('100001')).toBe(100000);
  });
  it('rejects malformed inputs instead of parsing a numeric prefix', () => {
    for (const raw of [null, '', '0', '-1', '1.5', '2abc', '1e3', 'Infinity', ' 2 ', '9007199254740992']) {
      expect(normalizeAdminFinanceSalaryAdvanceManagementUrlPage(raw)).toBe(1);
    }
    expect(normalizeAdminFinanceSalaryAdvanceManagementUrlPage(Number.POSITIVE_INFINITY)).toBe(1);
    expect(normalizeAdminFinanceSalaryAdvanceManagementUrlPage(2.5)).toBe(1);
  });
});
