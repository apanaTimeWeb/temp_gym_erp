import { describe, expect, it } from 'vitest';
import { adminCouponToggleIntent } from '@/app/frontend_admin/admin_billing/billing_coupons_management/utils/AdminBillingCouponsManagementToggleIntent';
describe('coupon toggle retry intent', () => {
  it('reuses the exact action intent for retries', () => {
    expect(adminCouponToggleIntent('c-1', true)).toBe(adminCouponToggleIntent('c-1', true));
    expect(adminCouponToggleIntent('c-1', false)).toBe(adminCouponToggleIntent('c-1', false));
  });
  it('distinguishes activation, deactivation and ambiguous IDs', () => {
    expect(adminCouponToggleIntent('c-1', true)).not.toBe(adminCouponToggleIntent('c-1', false));
    expect(adminCouponToggleIntent('x:y', true)).not.toBe(adminCouponToggleIntent('x', true));
  });
});
