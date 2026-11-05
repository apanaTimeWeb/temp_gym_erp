// RESPONSIBILITY: Assigns different idempotency intents to distinct normalized coupon writes.
// DATA FLOW: form-normalized payload + operation + optional ID -> deterministic local intent token.
import type { Coupon, CouponWritePayload } from '@/app/frontend_admin/admin_billing/billing_coupons_management/types/AdminBillingCouponsManagementTypes';

export function adminBillingCouponsManagementWriteIntent(
  operation: 'create' | 'update',
  payload: CouponWritePayload | Partial<Coupon>,
  id?: string,
): string {
  return JSON.stringify([operation, id ?? null, payload]);
}
