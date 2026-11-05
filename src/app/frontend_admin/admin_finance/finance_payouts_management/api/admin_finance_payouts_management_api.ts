// RESPONSIBILITY: Owns typed HTTP access for payout summaries, P&L rows, and KPI data.
// DATA FLOW: feature hook/view → feature API client → apiFetch host transport → typed ApiResponse/data validation → UI/cache (admin_finance/finance_payouts_management/api/admin_finance_payouts_management_api.ts)

import type { AdminPayoutsQueryParams } from '@/app/frontend_admin/admin_finance/finance_payouts_management/types/AdminFinancePayoutsManagementQueryTypes';
import { z } from 'zod';
import { adminPayoutsManagementApiFetch as apiFetch } from '@/app/frontend_admin/admin_finance/finance_payouts_management/utils/AdminFinancePayoutsManagementApiResponse';
import type { AdminPayoutsSortDirection } from '@/app/frontend_admin/admin_finance/finance_payouts_management/types/AdminFinancePayoutsManagementSortTypes';
import { ADMIN_PAYOUTS_API } from '@/app/frontend_admin/admin_finance/finance_payouts_management/config/admin_finance_payouts_management.url_config';
import { gymPayoutSchema, pnLEntrySchema, payoutsKpiDataSchema } from '@/app/frontend_admin/admin_finance/finance_payouts_management/schemas/AdminFinancePayoutsManagementSchemas';
import type { GymPayout, PnLEntry, PayoutsKPIData } from '@/app/frontend_admin/admin_finance/finance_payouts_management/types/AdminFinancePayoutsManagementTypes';


/** Builds stable query parameters for the payout list and report contracts. */
function buildQuery(params?: AdminPayoutsQueryParams): string {
  const query = new URLSearchParams();
  Object.entries(params ?? {}).forEach(([key, value]) => { if (value !== undefined && value !== 'all') query.set(key, String(value)); });
  const serialized = query.toString();
  return serialized ? `?${serialized}` : '';
}

export const AdminPayoutsApi = {
  fetchPayouts: async (params?: AdminPayoutsQueryParams) => apiFetch<GymPayout[]>(`${ADMIN_PAYOUTS_API.base}${buildQuery(params)}`, { method: 'GET', dataSchema: z.array(gymPayoutSchema) }),
  fetchPnL: async (params?: AdminPayoutsQueryParams) => apiFetch<PnLEntry[]>(`${ADMIN_PAYOUTS_API.pnl}${buildQuery(params)}`, { method: 'GET', dataSchema: z.array(pnLEntrySchema) }),
  fetchKPIs: async (params?: AdminPayoutsQueryParams) => apiFetch<PayoutsKPIData>(`${ADMIN_PAYOUTS_API.kpis}${buildQuery(params)}`, { method: 'GET', dataSchema: payoutsKpiDataSchema }),
  fetchPayoutById: async (id: string) => apiFetch<GymPayout>(ADMIN_PAYOUTS_API.detail(id), { method: 'GET', dataSchema: gymPayoutSchema }),
};
