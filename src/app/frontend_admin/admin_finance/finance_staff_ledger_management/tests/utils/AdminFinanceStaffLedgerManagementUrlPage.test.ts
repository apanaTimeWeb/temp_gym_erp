import { describe, expect, it } from 'vitest';
import { normalizeAdminFinanceStaffLedgerManagementUrlPage } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/utils/AdminFinanceStaffLedgerManagementUrlPage';

describe('AdminFinanceStaffLedgerManagement URL page guard', () => {
  it('accepts positive integer inbound and outgoing pages', () => {
    expect(normalizeAdminFinanceStaffLedgerManagementUrlPage('2')).toBe(2);
    expect(normalizeAdminFinanceStaffLedgerManagementUrlPage(3)).toBe(3);
    expect(normalizeAdminFinanceStaffLedgerManagementUrlPage('100001')).toBe(100000);
  });
  it('rejects malformed inputs instead of parsing a numeric prefix', () => {
    for (const raw of [null, '', '0', '-1', '1.5', '2abc', '1e3', 'Infinity', ' 2 ', '9007199254740992']) {
      expect(normalizeAdminFinanceStaffLedgerManagementUrlPage(raw)).toBe(1);
    }
    expect(normalizeAdminFinanceStaffLedgerManagementUrlPage(Number.POSITIVE_INFINITY)).toBe(1);
    expect(normalizeAdminFinanceStaffLedgerManagementUrlPage(2.5)).toBe(1);
  });
});
