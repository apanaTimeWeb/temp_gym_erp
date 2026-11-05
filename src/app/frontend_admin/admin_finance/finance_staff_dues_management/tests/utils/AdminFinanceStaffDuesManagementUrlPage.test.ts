import { describe, expect, it } from 'vitest';
import { normalizeAdminFinanceStaffDuesManagementUrlPage } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/utils/AdminFinanceStaffDuesManagementUrlPage';

describe('AdminFinanceStaffDuesManagement URL page guard', () => {
  it('accepts positive integer inbound and outgoing pages', () => {
    expect(normalizeAdminFinanceStaffDuesManagementUrlPage('2')).toBe(2);
    expect(normalizeAdminFinanceStaffDuesManagementUrlPage(3)).toBe(3);
    expect(normalizeAdminFinanceStaffDuesManagementUrlPage('100001')).toBe(100000);
  });
  it('rejects malformed inputs instead of parsing a numeric prefix', () => {
    for (const raw of [null, '', '0', '-1', '1.5', '2abc', '1e3', 'Infinity', ' 2 ', '9007199254740992']) {
      expect(normalizeAdminFinanceStaffDuesManagementUrlPage(raw)).toBe(1);
    }
    expect(normalizeAdminFinanceStaffDuesManagementUrlPage(Number.POSITIVE_INFINITY)).toBe(1);
    expect(normalizeAdminFinanceStaffDuesManagementUrlPage(2.5)).toBe(1);
  });
});
