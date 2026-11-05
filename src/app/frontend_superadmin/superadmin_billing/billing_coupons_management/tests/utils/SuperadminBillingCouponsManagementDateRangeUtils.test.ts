import { describe, expect, it } from 'vitest';

import { SuperadminBillingCouponsDateRangeUtils } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/utils/SuperadminBillingCouponsManagementDateRangeUtils';

describe('SuperadminBillingCouponsDateRangeUtils', () => {
  it('uses month-to-date and rolling date windows', () => {
    const now = new Date(2026, 8, 20);
    expect(SuperadminBillingCouponsDateRangeUtils('this_month', now)).toEqual({ from: '2026-09-01', to: '2026-09-20' });
    expect(SuperadminBillingCouponsDateRangeUtils('last_3_months', now)).toEqual({ from: '2026-06-20', to: '2026-09-20' });
    expect(SuperadminBillingCouponsDateRangeUtils('last_6_months', now)).toEqual({ from: '2026-03-20', to: '2026-09-20' });
  });
  it('clamps the day when rolling back into a shorter month', () => {
    expect(SuperadminBillingCouponsDateRangeUtils('last_3_months', new Date(2026, 4, 31))).toEqual({ from: '2026-02-28', to: '2026-05-31' });
  });
});
