import { MANAGER_SALES_OVERVIEW_API } from '@/app/frontend_manager/manager_sales_billing/sales_overview/config/manager_sales_overview.url_config';
import { apiFetch } from '@/lib/api';
import { z } from 'zod';
import type { ApiResponse } from '@/lib/api';

import { managerSalesOverviewSchema, managerSalesMembershipReportSchema, managerSalesPendingPaymentsSchema, managerSalesAllMembershipsSchema } from '@/app/frontend_manager/manager_sales_billing/sales_overview/schemas/manager_sales_overview.schemas';
import type { SalesMemberSnapshot } from '@/app/frontend_manager/manager_sales_billing/sales_overview/types/manager_sales_overview_member_snapshot.types';
import type { OverviewDataPoint, MembershipReportItem, MembershipTotals, PendingPaymentMember } from '@/app/frontend_manager/manager_sales_billing/sales_overview/types/manager_sales_overview.types';

export interface ManagerSalesMembershipReportResponse {
  report: MembershipReportItem[];
  totals: MembershipTotals;
  total?: number;
  page?: number;
  limit?: number;
}

export interface ManagerSalesPendingPaymentsResponse {
  members: PendingPaymentMember[];
  total: number;
  totalCount?: number;
  page?: number;
  limit?: number;
}

export interface ManagerSalesAllMembershipsResponse {
  members: SalesMemberSnapshot[];
  total: number;
  page?: number;
  limit?: number;
}

const managerSalesMembershipReportResponseSchema = managerSalesMembershipReportSchema.extend({
  total: z.number().int().nonnegative().optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().optional(),
});
const managerSalesPendingPaymentsResponseSchema = managerSalesPendingPaymentsSchema.extend({
  totalCount: z.number().int().nonnegative().optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().optional(),
});
const managerSalesAllMembershipsResponseSchema = managerSalesAllMembershipsSchema.extend({
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().optional(),
});

/** @description Owns the sales overview HTTP boundary and preserves validated server pagination metadata. */
export const ManagerSalesOverviewApi = {
  fetchSalesOverview: async (params?: Record<string, string>): Promise<ApiResponse<{ monthlyRevenue: OverviewDataPoint[] }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${MANAGER_SALES_OVERVIEW_API.OVERVIEW}${query ? `?${query}` : ''}`, { dataSchema: managerSalesOverviewSchema });
  },

  fetchMembershipReport: async (params?: Record<string, string>): Promise<ApiResponse<ManagerSalesMembershipReportResponse>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${MANAGER_SALES_OVERVIEW_API.MEMBERSHIP_REPORT}${query ? `?${query}` : ''}`, { dataSchema: managerSalesMembershipReportResponseSchema });
  },

  fetchPendingPayments: async (params?: Record<string, string>): Promise<ApiResponse<ManagerSalesPendingPaymentsResponse>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${MANAGER_SALES_OVERVIEW_API.PENDING_PAYMENTS}${query ? `?${query}` : ''}`, { dataSchema: managerSalesPendingPaymentsResponseSchema });
  },

  fetchAllMemberships: async (params?: Record<string, string>): Promise<ApiResponse<ManagerSalesAllMembershipsResponse>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${MANAGER_SALES_OVERVIEW_API.ALL_MEMBERSHIPS}${query ? `?${query}` : ''}`, { dataSchema: managerSalesAllMembershipsResponseSchema });
  },
};
