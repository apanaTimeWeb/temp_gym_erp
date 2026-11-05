import { describe, expect, it } from 'vitest';

import {
  fromSuperadminBillingCouponsMinorUnits,
  toSuperadminBillingCouponsMinorUnits,
} from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/utils/SuperadminBillingCouponsManagementDiscountValueUtils';

describe('SuperadminBillingCouponsDiscountValueUtils', () => {
  it('converts INR major units to minor units', () => {
    expect(toSuperadminBillingCouponsMinorUnits(500, 'INR')).toBe(50000);
    expect(toSuperadminBillingCouponsMinorUnits(99.99, 'INR')).toBe(9999);
  });

  it('converts minor units back to editable major units', () => {
    expect(fromSuperadminBillingCouponsMinorUnits(50000, 'INR')).toBe(500);
    expect(fromSuperadminBillingCouponsMinorUnits(9999, 'INR')).toBe(99.99);
  });

  it('respects zero- and three-decimal currency rules', () => {
    expect(toSuperadminBillingCouponsMinorUnits(500, 'JPY')).toBe(500);
    expect(toSuperadminBillingCouponsMinorUnits(1.25, 'KWD')).toBe(1250);
  });
});
