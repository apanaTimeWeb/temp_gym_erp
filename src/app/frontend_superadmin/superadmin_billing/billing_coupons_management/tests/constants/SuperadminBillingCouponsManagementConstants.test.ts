import { describe, expect, it } from 'vitest';
import { SUPERADMIN_COUPON_STATUS_CODES, SUPERADMIN_COUPON_STATUS_OPTIONS, SUPERADMIN_BILLING_COUPONS_DATE_FILTER_OPTIONS, SUPERADMIN_BILLING_COUPONS_TABLE_PAGE_SIZE, SUPERADMIN_BILLING_COUPONS_TABLE_PAGE_SIZE_OPTIONS } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/constants/superadmin_billing_coupons_management.constants';

describe('Superadmin Coupons constants', () => {
  it('keeps the canonical status values and their display labels', () => {
    expect(SUPERADMIN_COUPON_STATUS_CODES).toMatchObject({ ALL: 'ALL', ACTIVE: 'ACTIVE', INACTIVE: 'INACTIVE', EXPIRED: 'EXPIRED', DEPLETED: 'DEPLETED' });
    expect(SUPERADMIN_COUPON_STATUS_OPTIONS.map((option) => option.value)).toEqual(['ALL', 'ACTIVE', 'INACTIVE', 'DELETED']);
    expect(SUPERADMIN_COUPON_STATUS_OPTIONS.every((option) => option.labelKey.startsWith('ui.'))).toBe(true);
  });
  it('keeps date-filter presets and translation keys stable', () => {
    expect(SUPERADMIN_BILLING_COUPONS_DATE_FILTER_OPTIONS.map((option) => option.value)).toEqual(['this_month', 'last_month', 'last_3_months', 'last_6_months', 'this_year', 'monthly', 'yearly', 'custom']);
    expect(SUPERADMIN_BILLING_COUPONS_DATE_FILTER_OPTIONS.every((option) => option.labelKey.startsWith('ui.'))).toBe(true);
  });
  it('keeps the table page size and supported options explicit', () => {
    expect(SUPERADMIN_BILLING_COUPONS_TABLE_PAGE_SIZE).toBe(10);
    expect(SUPERADMIN_BILLING_COUPONS_TABLE_PAGE_SIZE_OPTIONS).toEqual([10, 25, 50]);
  });
});
