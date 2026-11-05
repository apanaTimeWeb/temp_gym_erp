// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
'use client';
import { useQuery } from '@tanstack/react-query';

import { ManagerSalesOverviewApi } from '@/app/frontend_manager/manager_sales_billing/sales_overview/api/manager_sales_overview.api';
import { ManagerSalesOverviewQueryKeys } from '@/app/frontend_manager/manager_sales_billing/sales_overview/api/manager_sales_overview.query_keys';

function requireSalesData<T>(response: { success: true; data: T } | { success: false; message: string }): T {
  if (!response.success) throw new Error(response.message || 'Unable to load sales data.');
  return response.data;
}

/** @description Queries the sales overview and rejects resolved API failure envelopes. */
export function useSalesOverviewQuery(params?: Record<string, string>) {
  return useQuery({
    queryKey: ManagerSalesOverviewQueryKeys.overview(params),
    queryFn: async () => requireSalesData(await ManagerSalesOverviewApi.fetchSalesOverview(params)).monthlyRevenue,
  });
}

/** @description Queries membership report data and preserves the server's total-count metadata. */
export function useMembershipReportQuery(params?: Record<string, string>) {
  return useQuery({
    queryKey: ManagerSalesOverviewQueryKeys.membershipReport(params),
    queryFn: async () => {
      const data = requireSalesData(await ManagerSalesOverviewApi.fetchMembershipReport(params));
      return {
        report: data.report,
        totals: data.totals,
        total: data.total ?? data.report.length,
      };
    },
  });
}

/** @description Queries pending payments and rejects resolved API failure envelopes. */
export function usePendingPaymentsQuery(params?: Record<string, string>) {
  return useQuery({
    queryKey: ManagerSalesOverviewQueryKeys.pendingPayments(params),
    queryFn: async () => {
      const data = requireSalesData(await ManagerSalesOverviewApi.fetchPendingPayments(params));
      return { members: data.members, total: data.total };
    },
  });
}

/** @description Queries all memberships and rejects resolved API failure envelopes. */
export function useAllMembershipsQuery(params?: Record<string, string>) {
  return useQuery({
    queryKey: ManagerSalesOverviewQueryKeys.allMemberships(params),
    queryFn: async () => {
      const data = requireSalesData(await ManagerSalesOverviewApi.fetchAllMemberships(params));
      return { members: data.members, total: data.total };
    },
  });
}
