import { describe, expect, it } from 'vitest';
import { ADMIN_COUPONS_DETAIL_URL } from '@/app/frontend_admin/admin_billing/billing_coupons_management/config/admin_billing_coupons_management.url_config';

describe('AdminBillingCouponsManagement URL path segment boundary', () => {
  it('preserves the existing endpoint for an ordinary identifier', () => {
    expect(ADMIN_COUPONS_DETAIL_URL('valid-1')).toBe("/admin/coupons/valid-1");
  });
  it('encodes separators, query and fragment delimiters in identifiers', () => {
    expect(ADMIN_COUPONS_DETAIL_URL('a/b?x#y')).toBe("/admin/coupons/a%2Fb%3Fx%23y");
  });
  it.each(['', ' ', '.', '..'])('rejects empty or reserved identifier %s', (id) => {
    expect(() => ADMIN_COUPONS_DETAIL_URL(id)).toThrow(TypeError);
  });
});
