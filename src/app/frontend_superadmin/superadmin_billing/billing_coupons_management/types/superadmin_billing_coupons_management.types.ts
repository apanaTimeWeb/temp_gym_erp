/**
 * RESPONSIBILITY: Defines TypeScript domain contracts for the feature.
 * AI BOUNDARY: Types/interfaces only; runtime validation schemas live in the owning _schemas folder.
 */
import { z } from 'zod';

import { CouponStatusSchema, RedemptionRecordSchema, CouponRecordSchema, createSuperadminBillingCouponsFormSchema } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/schemas/superadmin_billing_coupons_management_contract.schemas';
import type { SUPERADMIN_BILLING_COUPONS_KPI_TYPES } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/constants/superadmin_billing_coupons_management.constants';

/** KPI filter tabs on the Coupons page — controls which subset of coupons is displayed. */
export type CouponStatus = z.infer<typeof CouponStatusSchema>;
export type CouponKpiFilter = typeof SUPERADMIN_BILLING_COUPONS_KPI_TYPES[number];
export type RedemptionRecord = z.infer<typeof RedemptionRecordSchema>;
export type Coupon = z.infer<typeof CouponRecordSchema>;
export type CouponFormData = z.infer<ReturnType<typeof createSuperadminBillingCouponsFormSchema>>;
