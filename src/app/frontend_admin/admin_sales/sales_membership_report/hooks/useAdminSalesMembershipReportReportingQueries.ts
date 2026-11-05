"use client";
// RESPONSIBILITY: Queries the one Sales membership-report endpoint with an isolated cache key.
import { useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import { ADMIN_SALES_QUERY_KEYS } from '@/app/frontend_admin/admin_sales/sales_membership_report/constants/AdminSalesMembershipReportQueryKeys';
import { AdminSalesApi } from '@/app/frontend_admin/admin_sales/sales_membership_report/api/admin_sales_membership_report_api';
import type { UseAdminSalesReportingQueriesParams } from '@/app/frontend_admin/admin_sales/sales_membership_report/types/AdminSalesMembershipReportReportingQueryTypes';

export function useAdminSalesReportingQueries({ selectedBranchId, range, dateParams, search, enabled }: UseAdminSalesReportingQueriesParams) {
  const t = useTranslations();
  const membershipReport = useQuery({
    queryKey: ADMIN_SALES_QUERY_KEYS.key('membership-report', { search }, range, selectedBranchId, dateParams),
    queryFn: () => AdminSalesApi.fetchMembershipReport(
      selectedBranchId,
      range,
      search || undefined,
      dateParams.startDate,
      dateParams.endDate,
    ),
    enabled,
  });

  return {
    membershipReport: membershipReport.data?.data?.report ?? [],
    membershipTotals: membershipReport.data?.data?.totals ?? { activeCount: 0, revenue: 0 },
    membershipReportStatus: membershipReport.status,
    membershipReportError: (membershipReport.error ? t('sales.AdminRepair.requestFailed') : ''),
    retryMembershipReport: membershipReport.refetch,
  };
}
