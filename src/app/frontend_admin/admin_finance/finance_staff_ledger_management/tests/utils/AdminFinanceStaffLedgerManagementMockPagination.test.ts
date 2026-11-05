import { describe, expect, it } from 'vitest';
import { normalizeAdminFinanceStaffLedgerManagementMockPagination } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/utils/AdminFinanceStaffLedgerManagementMockPagination';

describe('AdminFinanceStaffLedgerManagement mock HTTP pagination', () => {
  it('retains valid positive integer pagination and existing default values', () => {
    expect(normalizeAdminFinanceStaffLedgerManagementMockPagination(null, 10)).toBe(10);
    expect(normalizeAdminFinanceStaffLedgerManagementMockPagination('2', 1)).toBe(2);
    expect(normalizeAdminFinanceStaffLedgerManagementMockPagination('3', 8)).toBe(3);
  });
  it('rejects malformed values without unsafe offsets or infinite metadata', () => {
    for (const raw of ['0', '-1', '1.5', '1e5', 'Infinity', 'NaN', '', ' 2 ', '9007199254740992']) {
      expect(normalizeAdminFinanceStaffLedgerManagementMockPagination(raw, 8)).toBe(8);
    }
  });
});
