// DATA FLOW: Module API → TanStack Query or typed query result → consuming module-owned UI.
'use client';
import { useQuery } from '@tanstack/react-query';

import { ManagerReportsOverviewApi } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/api/manager_reports_overview.api';
import { ManagerReportsOverviewQueryKeys } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/api/manager_reports_overview.query_keys';

/**
 * @description Owns the Manager Reports summary server-state query for a selected date range.
 * @dependencies Uses ManagerReportsOverviewApi and ManagerReportsOverviewQueryKeys only.
 * @edge-case Query identity changes with the date range so switching ranges cannot reuse stale summary data.
 */
export function useManagerReportsOverviewSummaryQuery(dateRange: string) {
  return useQuery({
    queryKey: ManagerReportsOverviewQueryKeys.summary({ range: dateRange }),
    queryFn: async () => {
      const response = await ManagerReportsOverviewApi.fetchReportsSummary({ range: dateRange });
      if (!response.success) throw new Error(response.message || 'Unable to load report summary');
      return response.data;
    },
  });
}
