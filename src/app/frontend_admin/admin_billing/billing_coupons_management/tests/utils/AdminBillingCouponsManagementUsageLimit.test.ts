import { describe, expect, it } from 'vitest';
import { isAdminCouponUsageLimit, parseAdminCouponUsageLimit } from '@/app/frontend_admin/admin_billing/billing_coupons_management/utils/AdminBillingCouponsManagementUsageLimit';

describe('Coupon usage limit boundary', () => {
  it.each(['1', '7', '001', '9007199254740991'])('accepts safe positive decimal integer %s', (input) => {
    expect(isAdminCouponUsageLimit(input)).toBe(true);
    expect(parseAdminCouponUsageLimit(input)).toBe(Number(input));
  });
  it.each(['', ' ', '0', '-1', '+1', '1.5', '1e3', '0x10', 'Infinity', 'NaN', '9007199254740992', '1abc', ' 2'])('rejects malformed input %s', (input) => {
    expect(isAdminCouponUsageLimit(input)).toBe(false);
    expect(() => parseAdminCouponUsageLimit(input)).toThrow(RangeError);
  });
});
