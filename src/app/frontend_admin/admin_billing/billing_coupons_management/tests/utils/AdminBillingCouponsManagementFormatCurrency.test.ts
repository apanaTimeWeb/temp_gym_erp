// RESPONSIBILITY: Defines regression tests for AdminBillingCouponsManagementFormatCurrency.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_coupons/coupons_management/tests/utils/AdminBillingCouponsManagementFormatCurrency.test.ts)

import { describe, expect, it } from 'vitest';
import { AdminCouponsFormatCurrency } from '@/app/frontend_admin/admin_billing/billing_coupons_management/utils/AdminBillingCouponsManagementFormatCurrency';

describe('AdminCouponsFormatCurrency', () => {
  it('formats coupon amounts from minor units in INR', () => {
    expect(AdminCouponsFormatCurrency(2500, 'en-IN')).toBe('₹25.00');
  });
  it('returns the documented placeholder for non-finite amounts', () => {
    expect(AdminCouponsFormatCurrency(Number.NaN, 'en-IN')).toBe('—');
  });
});
