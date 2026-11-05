// RESPONSIBILITY: Defines regression tests for AdminBillingCouponsManagementCurrencyUnits.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_coupons/coupons_management/tests/utils/AdminBillingCouponsManagementCurrencyUnits.test.ts)

import { describe, expect, it } from 'vitest';
import { adminCouponsMajorToMinor, adminCouponsMinorToMajor } from '@/app/frontend_admin/admin_billing/billing_coupons_management/utils/AdminBillingCouponsManagementCurrencyUnits';

describe('coupon monetary units', () => {
  it('converts major units to integer paise and back without changing value', () => {
    expect(adminCouponsMajorToMinor(250.25)).toBe(25025);
    expect(adminCouponsMinorToMajor(25025)).toBe(250.25);
  });
  it('rejects fractional minor units and unsafe numbers', () => {
    expect(() => adminCouponsMajorToMinor(1.001)).toThrow(RangeError);
    expect(() => adminCouponsMinorToMajor(1.25)).toThrow(RangeError);
  });
});
