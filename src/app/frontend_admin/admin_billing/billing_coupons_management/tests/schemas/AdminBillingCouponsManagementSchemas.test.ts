// RESPONSIBILITY: Regression-checks date-only API and form boundaries across timezone offsets and price precision.
// DATA FLOW: Deterministic input fixtures -> Coupon Zod schemas -> accepted/rejected results.
import { describe, expect, it } from 'vitest';
import { couponCalendarDateSchema, couponFormSchema, couponSchema } from '@/app/frontend_admin/admin_billing/billing_coupons_management/schemas/AdminBillingCouponsManagementSchemas';

const validCoupon = {
  id: 'coupon-1', code: 'SAVE10', description: 'Ten percent discount', type: 'percentage' as const,
  value: 10, minOrderAmount: 0, maxDiscount: 500, usageLimit: 100, usedCount: 1,
  assignedGyms: ['all'], assignedGymNames: ['All Gyms'], validFrom: '2026-01-01',
  validUntil: '2026-12-31', status: 'active' as const, createdAt: '2026-01-01T12:00:00Z',
};
const validForm = {
  code: 'SAVE10', description: 'Ten percent discount', type: 'percentage' as const,
  value: '10', minOrderAmount: '1.15', maxDiscount: '2.55', usageLimit: '100',
  assignedGyms: ['all'], validFrom: '2026-01-01', validUntil: '2026-12-31',
};

describe('Coupons calendar and money schemas', () => {
  it.each(['UTC', 'Asia/Kolkata', 'America/New_York'])(
    'accepts date-only input without UTC date shifting under %s', (zone) => {
      const previous = process.env.TZ;
      try {
        process.env.TZ = zone;
        expect(couponCalendarDateSchema.safeParse('2026-01-01').success).toBe(true);
        expect(couponFormSchema.safeParse(validForm).success).toBe(true);
        expect(couponSchema.safeParse(validCoupon).success).toBe(true);
      } finally {
        if (previous === undefined) delete process.env.TZ; else process.env.TZ = previous;
      }
    },
  );
  it.each(['2026-02-30', '2025-02-29', '2026-13-01', '2026-01-00', 'not-a-date', '2026-1-01'])(
    'rejects impossible/malformed date %s in API and form values', (value) => {
      expect(couponCalendarDateSchema.safeParse(value).success).toBe(false);
      expect(couponSchema.safeParse({ ...validCoupon, validUntil: value }).success).toBe(false);
      expect(couponFormSchema.safeParse({ ...validForm, validFrom: value }).success).toBe(false);
    },
  );
  it.each(['1.15', '2.55', '0.29', '10.01', '0'])(
    'accepts decimal-safe money field %s', (amount) => {
      expect(couponFormSchema.safeParse({ ...validForm, minOrderAmount: amount }).success).toBe(true);
    },
  );
  it.each(['1.234', '-0.10', 'Infinity', 'NaN'])(
    'rejects invalid money input %s', (amount) => {
      expect(couponFormSchema.safeParse({ ...validForm, maxDiscount: amount }).success).toBe(false);
    },
  );
});
