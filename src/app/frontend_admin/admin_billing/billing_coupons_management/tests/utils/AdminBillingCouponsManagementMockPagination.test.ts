// RESPONSIBILITY: Exercise finite, safe, integer, positive mock pagination boundaries.
import { describe, expect, it } from 'vitest';
import { adminBillingCouponsManagementSafeMockPage } from '@/app/frontend_admin/admin_billing/billing_coupons_management/utils/AdminBillingCouponsManagementMockPagination';
const cases: Array<readonly [string | null, number]> = [['1',1],['12',12],['0',1],['-5',1],['1.5',1],['NaN',1],['Infinity',1],['9007199254740992',1],[null,1]];
describe('Coupon mock pagination', () => {
 it.each(cases)('normalizes %s to %d', (input, expected) => {
  expect(adminBillingCouponsManagementSafeMockPage(input,1)).toBe(expected);
 });
});
