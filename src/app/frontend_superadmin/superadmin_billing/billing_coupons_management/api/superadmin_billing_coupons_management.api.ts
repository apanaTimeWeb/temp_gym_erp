import { z } from 'zod';

import { superadminCouponsManagementApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/api/superadmin_billing_coupons_management_api_fetch.api';
import { SUPERADMIN_BILLING_COUPONS_MANAGEMENT_API } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/config/superadmin_billing_coupons_management.url_config';
import { RedemptionRecordSchema, CouponRecordSchema } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/schemas/superadmin_billing_coupons_management_contract.schemas';
import { toSuperadminBillingCouponsMinorUnits } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/utils/SuperadminBillingCouponsManagementDiscountValueUtils';

import type { CouponStatus, Coupon, CouponFormData, RedemptionRecord } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/types/superadmin_billing_coupons_management.types';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminBillingCouponsApi owned by the superadmin_coupons feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/schemas/superadmin_billing_coupons_management_contract.schemas, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/utils/SuperadminBillingCouponsManagementDiscountValueUtils, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/api/superadmin_billing_coupons_management_api_fetch.api, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/config/superadmin_billing_coupons_management.url_config, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/types/superadmin_billing_coupons_management.types, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns the API boundary for Superadmin Coupons and validates every response at the boundary.


export const couponsApi = {
  fetchCoupons: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<Coupon[]>(`${SUPERADMIN_BILLING_COUPONS_MANAGEMENT_API.LIST}${q}`, { dataSchema: z.array(CouponRecordSchema) });
  },
  createCoupon: (body: CouponFormData, idempotencyKey: string) => {
    const currency = 'INR';
    const payload = {
      ...body,
      currency,
      discountValue: body.discountType === 'EXACT' ? toSuperadminBillingCouponsMinorUnits(body.discountValue, currency) : body.discountValue,
    };
    return apiFetch<Coupon>(SUPERADMIN_BILLING_COUPONS_MANAGEMENT_API.CREATE, {
      method: 'POST',
      headers: { 'Idempotency-Key': idempotencyKey },
      body: JSON.stringify(payload),
      dataSchema: CouponRecordSchema,
    });
  },
  updateCoupon: (id: string, body: Partial<CouponFormData>, idempotencyKey: string) => {
    const currency = 'INR';
    const payload = {
      ...body,
      ...(body.discountType === 'EXACT' && typeof body.discountValue === 'number'
        ? { discountValue: toSuperadminBillingCouponsMinorUnits(body.discountValue, currency), currency }
        : {}),
    };
    return apiFetch<Coupon>(SUPERADMIN_BILLING_COUPONS_MANAGEMENT_API.UPDATE(id), {
      method: 'PATCH',
      headers: { 'Idempotency-Key': idempotencyKey },
      body: JSON.stringify(payload),
      dataSchema: CouponRecordSchema,
    });
  },
  deleteCoupon: (id: string, idempotencyKey: string) => apiFetch<null>(SUPERADMIN_BILLING_COUPONS_MANAGEMENT_API.DELETE(id), {
    method: 'DELETE',
    headers: { 'Idempotency-Key': idempotencyKey },
    dataSchema: z.null(),
  }),
  restoreCoupon: (id: string, idempotencyKey: string) => apiFetch<Coupon>(SUPERADMIN_BILLING_COUPONS_MANAGEMENT_API.RESTORE(id), {
    method: 'POST',
    headers: { 'Idempotency-Key': idempotencyKey },
    dataSchema: CouponRecordSchema,
  }),
  updateCouponStatus: (id: string, status: CouponStatus, idempotencyKey: string) => apiFetch<Coupon>(SUPERADMIN_BILLING_COUPONS_MANAGEMENT_API.STATUS(id), {
    method: 'PATCH',
    headers: { 'Idempotency-Key': idempotencyKey },
    body: JSON.stringify({ status }),
    dataSchema: CouponRecordSchema,
  }),
  fetchRedemptions: (id: string) => apiFetch<RedemptionRecord[]>(SUPERADMIN_BILLING_COUPONS_MANAGEMENT_API.REDEMPTIONS(id), {
    dataSchema: z.array(RedemptionRecordSchema)
  }),
};
