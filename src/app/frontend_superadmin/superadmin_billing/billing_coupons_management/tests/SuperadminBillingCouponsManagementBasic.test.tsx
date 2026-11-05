import {describe, expect, it, beforeEach} from 'vitest';

import { MOCK_SUPERADMIN_BILLING_COUPONS } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/mocks/fixtures/SuperadminBillingCouponsManagementMockFixtures';
import { resetSuperadminBillingCouponsMockState } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/mocks/handlers/SuperadminBillingCouponsManagementMockHandlers';



beforeEach(() => {
  resetSuperadminBillingCouponsMockState();
});

describe('Superadmin Coupons module fixture contract', () => {
  it('provides valid coupon records required by the list and status UI', () => {
    expect(Array.isArray(MOCK_SUPERADMIN_BILLING_COUPONS)).toBe(true);
    expect(MOCK_SUPERADMIN_BILLING_COUPONS.length).toBeGreaterThan(0);
    expect(MOCK_SUPERADMIN_BILLING_COUPONS.every((coupon) => Boolean(coupon.id && coupon.code && coupon.status))).toBe(true);
    expect(new Set(MOCK_SUPERADMIN_BILLING_COUPONS.map((coupon) => coupon.status)).size).toBeGreaterThan(1);
  });

});
