import { describe, expect, it } from 'vitest';
import { normalizeAdminBillingCouponsManagementUrlPage } from '@/app/frontend_admin/admin_billing/billing_coupons_management/utils/AdminBillingCouponsManagementUrlPage';

describe('AdminBillingCouponsManagement URL-sync pagination', () => {
  it('accepts only canonical positive safe integer pages', () => {
    expect(normalizeAdminBillingCouponsManagementUrlPage('9')).toBe(9);
    expect(normalizeAdminBillingCouponsManagementUrlPage(2)).toBe(2);
    for (const raw of [undefined, null, '', '0', '1.5', '1e5', '-3', 'Infinity', 'NaN', '9007199254740992', ' 2 ', Number.POSITIVE_INFINITY]) {
      expect(normalizeAdminBillingCouponsManagementUrlPage(raw)).toBe(1);
    }
  });
});
