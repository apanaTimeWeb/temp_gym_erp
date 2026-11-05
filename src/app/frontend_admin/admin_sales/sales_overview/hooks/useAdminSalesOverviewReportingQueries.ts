"use client";
// RESPONSIBILITY: Fetches the Sales Overview and referral-source datasets only.
import { useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import { ADMIN_SALES_QUERY_KEYS } from '@/app/frontend_admin/admin_sales/sales_overview/constants/AdminSalesOverviewQueryKeys';
import { AdminSalesApi } from '@/app/frontend_admin/admin_sales/sales_overview/api/admin_sales_overview_api';
import type { UseAdminSalesReportingQueriesParams } from '@/app/frontend_admin/admin_sales/sales_overview/types/AdminSalesOverviewReportingQueryTypes';
export function useAdminSalesReportingQueries({ selectedBranchId, range, dateParams, enabled }: UseAdminSalesReportingQueriesParams) {
  const t = useTranslations();
  const overview = useQuery({ queryKey: ADMIN_SALES_QUERY_KEYS.key('overview', range, selectedBranchId, dateParams), queryFn: () => AdminSalesApi.fetchOverview(selectedBranchId, range, dateParams.startDate, dateParams.endDate), enabled });
  const referrals = useQuery({ queryKey: ADMIN_SALES_QUERY_KEYS.key('referrals', range, selectedBranchId, dateParams), queryFn: () => AdminSalesApi.fetchReferralSources(selectedBranchId, range, dateParams.startDate, dateParams.endDate), enabled });
  return { overviewData: overview.data?.data?.monthlyRevenue ?? [], overviewStatus: overview.status, overviewError: (overview.error ? t('sales.AdminRepair.requestFailed') : ''), retryOverview: overview.refetch, referralData: referrals.data?.data ?? [], referralStatus: referrals.status, referralError: (referrals.error ? t('sales.AdminRepair.requestFailed') : ''), retryReferrals: referrals.refetch };
}
