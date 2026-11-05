"use client";
// RESPONSIBILITY: Owns the Admin Dashboard server-state query and keeps date/branch identity in the query key and request.
// DATA FLOW: URL range/date state + Admin branch selector -> Dashboard API -> TanStack Query -> dashboard views.

import { ADMIN_DASHBOARD_QUERY_KEYS } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/constants/AdminDashboardOverviewQueryKeys';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { AdminDashboardApi } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/api/admin_dashboard_overview_api';
import { isValidAdminDashboardDateRange } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/utils/AdminDashboardOverviewDateRangeUtils';
/** @description useAdminDashboardLogic: Owns the Admin Dashboard server-state query and keeps date/branch identity in the query key and request. @dependencies Consumes AdminDashboardQueryKeys, AdminNavigationLayoutBackendMessage, AdminDashboardApi. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminDashboardLogic() {
  const searchParams = useSearchParams();
  const t = useTranslations();
  const selectedBranchId = searchParams.get('branchId') || 'all';
  const range = searchParams.get('range') || 'this_month';
  const startDate = searchParams.get('startDate') || undefined;
  const endDate = searchParams.get('endDate') || undefined;
  const isDateRangeValid = range !== 'custom' || (!!startDate && !!endDate && isValidAdminDashboardDateRange(startDate, endDate));

  const query = useQuery({
    queryKey: ADMIN_DASHBOARD_QUERY_KEYS.key('stats', { range, startDate, endDate, branchId: selectedBranchId }),
    queryFn: () => AdminDashboardApi.fetchDashboardStats({ range, startDate, endDate, branchId: selectedBranchId === 'all' ? undefined : selectedBranchId }).then((response) => response.data),
    staleTime: 60 * 1000,
    enabled: isDateRangeValid,
  });

  return {
    stats: query.data ?? null,
    status: !isDateRangeValid ? 'error' as const : query.status,
    error: !isDateRangeValid ? t('dashboard.admin_dashboard_date_filter.invalidRange') : query.error ? t('dashboard.DashboardError.text_22b2c820bf') : '',
    isDateRangeValid,
    retry: query.refetch,
  };
}
