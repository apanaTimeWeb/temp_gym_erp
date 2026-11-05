import { describe, expect, it } from 'vitest';

import { getSuperadminBillingCouponsTodayISODate, formatSuperadminCouponDateForInput, formatSuperadminBillingCouponsDisplayDate } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/utils/SuperadminBillingCouponsManagementDateUtils';



describe('formatSuperadminCouponDateForInput', () => {
  it('preserves date-only API calendar values without timezone conversion', () => {
    expect(formatSuperadminCouponDateForInput('2026-10-14')).toBe('2026-10-14');
  });

  it('returns yyyy-MM-dd', () => {
    expect(formatSuperadminCouponDateForInput('2026-09-20T12:00:00.000Z')).toBe('2026-09-20');
  });
});

describe('formatSuperadminBillingCouponsDisplayDate', () => {
  it('preserves the calendar day from date-only API values', () => {
    const result = formatSuperadminBillingCouponsDisplayDate('2026-10-14', 'en-US');
    expect(result).not.toBe('—');
    expect(result).toContain('14');
    expect(result).toContain('2026');
  });

  it('formats ISO timestamps through the date-fns UTC-to-local display path', () => {
    const result = formatSuperadminBillingCouponsDisplayDate('2026-10-14T12:00:00.000Z', 'en-US');
    expect(result).toContain('2026');
    expect(result).not.toBe('—');
  });

  it('uses the requested locale for date display', () => {
    expect(formatSuperadminBillingCouponsDisplayDate('2026-10-14', 'hi-IN')).not.toBe(formatSuperadminBillingCouponsDisplayDate('2026-10-14', 'en-US'));
  });
});

describe('getSuperadminBillingCouponsTodayISODate', () => {
  it('uses the browser-local calendar day rather than UTC day', () => {
    const now = new Date();
    const expected = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    expect(getSuperadminBillingCouponsTodayISODate()).toBe(expected);
  });
});

