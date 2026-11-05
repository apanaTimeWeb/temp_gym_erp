// RESPONSIBILITY: Typed API client for the Sales Overview and referral-source endpoints only.
import { z } from 'zod';
import { ADMIN_SALES_API } from '@/app/frontend_admin/admin_sales/sales_overview/config/admin_sales_overview.url_config';
import { overviewDataPointSchema, referralDataPointSchema } from '@/app/frontend_admin/admin_sales/sales_overview/schemas/AdminSalesOverviewSchemas';
import { adminSalesOverviewApiFetch as apiFetch } from '@/app/frontend_admin/admin_sales/sales_overview/utils/AdminSalesOverviewApiResponse';
import type { OverviewDataPoint, ReferralDataPoint } from '@/app/frontend_admin/admin_sales/sales_overview/types/AdminSalesOverviewTypes';
function buildQuery(params: Record<string, string | undefined>): string { const query = new URLSearchParams(); Object.entries(params).forEach(([key, value]) => { if (value !== undefined && value !== '') query.set(key, value); }); const encoded = query.toString(); return encoded ? `?${encoded}` : ''; }
export const AdminSalesApi = {
  fetchOverview: async (branchId?: string, range?: string, startDate?: string, endDate?: string) => apiFetch<{ monthlyRevenue: OverviewDataPoint[] }>(`${ADMIN_SALES_API.overview}${buildQuery({ branchId: branchId && branchId !== 'all' ? branchId : undefined, range, startDate, endDate })}`, { method: 'GET', dataSchema: z.object({ monthlyRevenue: z.array(overviewDataPointSchema) }) }),
  fetchReferralSources: async (branchId?: string, range?: string, startDate?: string, endDate?: string) => apiFetch<ReferralDataPoint[]>(`${ADMIN_SALES_API.referralSources}${buildQuery({ branchId: branchId && branchId !== 'all' ? branchId : undefined, range, startDate, endDate })}`, { method: 'GET', dataSchema: z.array(referralDataPointSchema) }),
};
