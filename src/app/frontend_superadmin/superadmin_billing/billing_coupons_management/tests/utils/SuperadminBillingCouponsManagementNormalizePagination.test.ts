import { describe, expect, it } from 'vitest';

import { SUPERADMIN_BILLING_COUPONS_TABLE_PAGE_SIZE, SUPERADMIN_BILLING_COUPONS_TABLE_PAGE_SIZE_OPTIONS } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/constants/superadmin_billing_coupons_management.constants';
import { normalizeSuperadminBillingCouponsPage, normalizeSuperadminBillingCouponsPageSize } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/utils/SuperadminBillingCouponsManagementNormalizePagination';


describe('Superadmin Coupons pagination URL parsing', () => {
  it.each([null, '', '0', '-1', '1.5', '12abc', '01', '9007199254740992'])('rejects malformed page values: %s', (value) => {
    expect(normalizeSuperadminBillingCouponsPage(value)).toBe(1);
  });
  it('accepts a positive safe integer page', () => {
    expect(normalizeSuperadminBillingCouponsPage('12')).toBe(12);
  });
  it.each([null, '', '0', '20abc', '51', '999999999999999999999'])('falls back for invalid page size: %s', (value) => {
    expect(normalizeSuperadminBillingCouponsPageSize(value, SUPERADMIN_BILLING_COUPONS_TABLE_PAGE_SIZE_OPTIONS, SUPERADMIN_BILLING_COUPONS_TABLE_PAGE_SIZE)).toBe(SUPERADMIN_BILLING_COUPONS_TABLE_PAGE_SIZE);
  });
  it.each(SUPERADMIN_BILLING_COUPONS_TABLE_PAGE_SIZE_OPTIONS)('accepts listed page size %s', (allowed) => {
    expect(normalizeSuperadminBillingCouponsPageSize(String(allowed), SUPERADMIN_BILLING_COUPONS_TABLE_PAGE_SIZE_OPTIONS, SUPERADMIN_BILLING_COUPONS_TABLE_PAGE_SIZE)).toBe(allowed);
  });
});
