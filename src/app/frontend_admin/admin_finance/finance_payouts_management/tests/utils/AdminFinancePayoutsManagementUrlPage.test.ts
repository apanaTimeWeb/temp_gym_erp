import { describe, expect, it } from 'vitest';
import { normalizeAdminFinancePayoutsManagementUrlPage } from '@/app/frontend_admin/admin_finance/finance_payouts_management/utils/AdminFinancePayoutsManagementUrlPage';

describe('AdminFinancePayoutsManagement URL-sync pagination', () => {
  it('accepts only canonical positive safe integer pages', () => {
    expect(normalizeAdminFinancePayoutsManagementUrlPage('9')).toBe(9);
    expect(normalizeAdminFinancePayoutsManagementUrlPage(2)).toBe(2);
    for (const raw of [undefined, null, '', '0', '1.5', '1e5', '-3', 'Infinity', 'NaN', '9007199254740992', ' 2 ', Number.POSITIVE_INFINITY]) {
      expect(normalizeAdminFinancePayoutsManagementUrlPage(raw)).toBe(1);
    }
  });
});
