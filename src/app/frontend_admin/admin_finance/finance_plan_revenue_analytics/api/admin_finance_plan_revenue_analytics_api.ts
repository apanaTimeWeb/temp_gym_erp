// RESPONSIBILITY: Owns typed API operations for finance_plan_revenue_analytics; it does not implement the global HTTP transport or backend authorization.
// DATA FLOW: feature hook/view → feature API client → apiFetch host transport → typed ApiResponse/data validation → UI/cache (admin_finance/finance_plan_revenue_analytics/api/admin_finance_plan_revenue_analytics_api.ts)

import { z } from 'zod';
import { adminPlansRevenueAnalyticsApiFetch as apiFetch } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/utils/AdminFinancePlanRevenueAnalyticsApiResponse';
import { ADMIN_PLANS_REVENUE_API_URL } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/config/admin_finance_plan_revenue_analytics.url_config';
import { planRevenueRecordSchema } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/schemas/AdminFinancePlanRevenueAnalyticsSchemas';
import type { PlanRevenueRecord, RevenuePeriod, RevenueSortKey, RevenueSortDirection } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/types/AdminFinancePlanRevenueAnalyticsTypes';
export const AdminPlansRevenueApi = {
  fetchPlanRevenue: async (period: RevenuePeriod, params?: { search?: string; sortKey?: RevenueSortKey; sortDir?: RevenueSortDirection; page?: number; limit?: number }) => {
    const query = new URLSearchParams({ period });
    Object.entries(params ?? {}).forEach(([key, value]) => { if (value !== undefined && value !== '') query.set(key, String(value)); });
    return apiFetch<PlanRevenueRecord[]>(`${ADMIN_PLANS_REVENUE_API_URL}?${query.toString()}`, { method: 'GET', dataSchema: z.array(planRevenueRecordSchema) });
  },
};
