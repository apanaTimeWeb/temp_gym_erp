import { describe, expect, it } from 'vitest';

import { SuperadminBillingCouponsFormatCurrency } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/utils/SuperadminBillingCouponsManagementFormatCurrency';



describe('SuperadminBillingCouponsFormatCurrency', () => {
  it('formats coupon monetary values from minor units', () => {
    expect(SuperadminBillingCouponsFormatCurrency(1000, 'INR', 'en-IN')).toContain('10.00');
  });
});
