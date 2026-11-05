// RESPONSIBILITY: Verify stable mutation retries without key collisions on changed payloads.
import { describe, expect, it } from 'vitest';
import { adminBillingCouponsManagementWriteIntent } from '@/app/frontend_admin/admin_billing/billing_coupons_management/utils/AdminBillingCouponsManagementWriteIntent';
const payload = { code:'CODE20', description:'Sample coupon', type:'flat' as const, value:200, minOrderAmount:0, maxDiscount:0, usageLimit:10, assignedGyms:['all'], validFrom:'2026-01-01', validUntil:'2026-12-31' };
describe('Coupon mutation intent identity', () => {
 it('is stable for same operation, id, and payload', () => {
  expect(adminBillingCouponsManagementWriteIntent('create',payload)).toBe(adminBillingCouponsManagementWriteIntent('create',payload));
 });
 it('separates a changed normalized amount or expiry', () => {
  expect(adminBillingCouponsManagementWriteIntent('create',payload)).not.toBe(adminBillingCouponsManagementWriteIntent('create',{...payload,value:201}));
  expect(adminBillingCouponsManagementWriteIntent('create',payload)).not.toBe(adminBillingCouponsManagementWriteIntent('create',{...payload,validUntil:'2026-11-30'}));
 });
 it('separates update entities and create/update operations', () => {
  expect(adminBillingCouponsManagementWriteIntent('update',payload,'c1')).not.toBe(adminBillingCouponsManagementWriteIntent('update',payload,'c2'));
  expect(adminBillingCouponsManagementWriteIntent('update',payload,'c1')).not.toBe(adminBillingCouponsManagementWriteIntent('create',payload));
 });
});
