// RESPONSIBILITY: Owns typed HTTP access for Admin plan lifecycle and revenue queries.
// DATA FLOW: feature hook/view → feature API client → apiFetch host transport → typed ApiResponse/data validation → UI/cache (admin_plans/plans_catalog/api/admin_billing_plans_catalog_api.ts)

import { z } from 'zod';
import { adminPlansCatalogApiFetch as apiFetch } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/utils/AdminBillingPlansCatalogApiResponse';
import { ADMIN_PLANS_API } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/config/admin_billing_plans_catalog.url_config';
import type { Plan } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/types/AdminBillingPlansCatalogTypes';
import { planSchema } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/schemas/AdminBillingPlansCatalogSchemas';

export const AdminPlansApi = {
  fetchAllPlans: async (params?: { search?: string; tier?: string; page?: number; limit?: number }) => {
    const query = new URLSearchParams();
    Object.entries(params ?? {}).forEach(([key, value]) => { if (value !== undefined && value !== '') query.set(key, String(value)); });
    const suffix = query.toString() ? `?${query.toString()}` : '';
    return apiFetch<Plan[]>(`${ADMIN_PLANS_API.getAll}${suffix}`, { method: 'GET', dataSchema: z.array(planSchema) });
  },
  fetchPlanById: async (id: string) => apiFetch<Plan>(ADMIN_PLANS_API.getOne(id), { method: 'GET', dataSchema: planSchema }),
  createPlan: async (body: Partial<Plan>, idempotencyKey: string) => apiFetch<Plan>(ADMIN_PLANS_API.create, { method: 'POST', body: JSON.stringify(body), dataSchema: planSchema,
      headers: { 'Idempotency-Key': idempotencyKey }
}),
  updatePlan: async (id: string, body: Partial<Plan>, idempotencyKey: string) => apiFetch<Plan>(ADMIN_PLANS_API.updateContract, { method: 'POST', body: JSON.stringify({ id, ...body }), dataSchema: planSchema,
      headers: { 'Idempotency-Key': idempotencyKey }
}),
  deletePlan: async (id: string, idempotencyKey: string) => apiFetch<null>(ADMIN_PLANS_API.deleteContract, { method: 'DELETE', body: JSON.stringify({ id }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() }),
};
