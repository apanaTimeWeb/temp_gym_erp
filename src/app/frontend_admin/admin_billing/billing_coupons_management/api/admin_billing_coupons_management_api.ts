// RESPONSIBILITY: Owns typed HTTP access for Admin coupon queries and mutations.
// DATA FLOW: feature hook/view → feature API client → apiFetch host transport → typed ApiResponse/data validation → UI/cache (admin_coupons/coupons_management/api/admin_billing_coupons_management_api.ts)

import { z } from 'zod';
import { adminCouponsManagementApiFetch as apiFetch } from '@/app/frontend_admin/admin_billing/billing_coupons_management/utils/AdminBillingCouponsManagementApiResponse';
import { ADMIN_COUPONS_API } from '@/app/frontend_admin/admin_billing/billing_coupons_management/config/admin_billing_coupons_management.url_config';
import type { AdminCouponsQueryParams, Coupon, CouponWritePayload, CouponsKPIData } from '@/app/frontend_admin/admin_billing/billing_coupons_management/types/AdminBillingCouponsManagementTypes';
import { couponSchema, couponsKpiDataSchema } from '@/app/frontend_admin/admin_billing/billing_coupons_management/schemas/AdminBillingCouponsManagementSchemas';

/** Builds stable query parameters for the coupon list contract. */
function buildQuery(params?: AdminCouponsQueryParams): string {
  const query = new URLSearchParams();
  Object.entries(params ?? {}).forEach(([key, value]) => { if (value !== undefined && value !== '') query.set(key, String(value)); });
  return query.toString() ? `?${query.toString()}` : '';
}

export const AdminCouponsApi = {
  fetchCoupons: async (params?: AdminCouponsQueryParams) => apiFetch<Coupon[]>(`${ADMIN_COUPONS_API.base}${buildQuery(params)}`, { method: 'GET', dataSchema: z.array(couponSchema) }),
  fetchKPIs: async () => apiFetch<CouponsKPIData>(ADMIN_COUPONS_API.kpis, { method: 'GET', dataSchema: couponsKpiDataSchema }),
  createCoupon: async (payload: CouponWritePayload, idempotencyKey: string) => apiFetch<Coupon>(ADMIN_COUPONS_API.base, { method: 'POST', body: JSON.stringify(payload), dataSchema: couponSchema, headers: { 'Idempotency-Key': idempotencyKey } }),
  updateCoupon: async (id: string, payload: Partial<Coupon>, idempotencyKey: string) => apiFetch<Coupon>(ADMIN_COUPONS_API.detail(id), { method: 'PATCH', body: JSON.stringify(payload), dataSchema: couponSchema, headers: { 'Idempotency-Key': idempotencyKey } }),
  deleteCoupon: async (id: string, idempotencyKey: string) => apiFetch<null>(ADMIN_COUPONS_API.detail(id), { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() }),
  toggleCoupon: async (id: string, idempotencyKey: string) => apiFetch<Coupon>(ADMIN_COUPONS_API.toggle(id), { method: 'PATCH', dataSchema: couponSchema, headers: { 'Idempotency-Key': idempotencyKey } }),
};
