import { describe, expect, it } from 'vitest';
import { normalizeAdminFinancePayoutsManagementMockPagination } from '@/app/frontend_admin/admin_finance/finance_payouts_management/utils/AdminFinancePayoutsManagementMockPagination';

describe('AdminFinancePayoutsManagement mock HTTP pagination', () => {
  it('retains valid positive integer pagination and existing default values', () => {
    expect(normalizeAdminFinancePayoutsManagementMockPagination(null, 10)).toBe(10);
    expect(normalizeAdminFinancePayoutsManagementMockPagination('2', 1)).toBe(2);
    expect(normalizeAdminFinancePayoutsManagementMockPagination('3', 8)).toBe(3);
  });
  it('rejects malformed values without unsafe offsets or infinite metadata', () => {
    for (const raw of ['0', '-1', '1.5', '1e5', 'Infinity', 'NaN', '', ' 2 ', '9007199254740992']) {
      expect(normalizeAdminFinancePayoutsManagementMockPagination(raw, 8)).toBe(8);
    }
  });
});
