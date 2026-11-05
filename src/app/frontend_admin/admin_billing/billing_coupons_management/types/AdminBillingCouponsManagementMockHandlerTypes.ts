// RESPONSIBILITY: Owns mock-handler input/output types for the Admin coupons feature.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_coupons/coupons_management/types/AdminBillingCouponsManagementMockHandlerTypes.ts)

import type { Coupon } from '@/app/frontend_admin/admin_billing/billing_coupons_management/types/AdminBillingCouponsManagementTypes';

export type AdminCouponsJsonObject = Record<string, unknown>;
export type CouponRecord = Coupon;
