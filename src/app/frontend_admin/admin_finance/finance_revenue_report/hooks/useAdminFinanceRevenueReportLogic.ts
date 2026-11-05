"use client";
// RESPONSIBILITY: Fetches only the revenue report owned by this leaf.
import { useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ADMIN_FINANCE_REVENUE_REPORT_QUERY_KEYS } from '@/app/frontend_admin/admin_finance/finance_revenue_report/constants/AdminFinanceRevenueReportQueryKeys';
import { AdminFinanceRevenueReportApi } from '@/app/frontend_admin/admin_finance/finance_revenue_report/api/admin_finance_revenue_report_api';
import { useAdminFinanceRevenueReportMutations } from '@/app/frontend_admin/admin_finance/finance_revenue_report/hooks/useAdminFinanceRevenueReportMutations';
import { useAdminFinanceRevenueReportStore } from '@/app/frontend_admin/admin_finance/finance_revenue_report/state/useAdminFinanceRevenueReportStore';
import { getAdminFinanceRevenueReportPresetDateRange, isValidAdminFinanceRevenueReportDateRange } from '@/app/frontend_admin/admin_finance/finance_revenue_report/utils/AdminFinanceRevenueReportDateRangeUtils';
import type { AdminFinanceRevenueReportExportFormat, ReportDateRange, RevenueReportData } from '@/app/frontend_admin/admin_finance/finance_revenue_report/types/AdminFinanceRevenueReportTypes';

const DATE_RANGES: readonly ReportDateRange[] = ['this_month', 'last_month', 'last_3_months', 'last_6_months', 'this_year', 'custom'];

export function useAdminFinanceRevenueReportLogic() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const rawRange = searchParams.get('range');
  const dateRange: ReportDateRange = DATE_RANGES.includes(rawRange as ReportDateRange) ? rawRange as ReportDateRange : 'this_month';
  const queryStartDate = searchParams.get('startDate') ?? '';
  const queryEndDate = searchParams.get('endDate') ?? '';
  const presetRange = useMemo(() => getAdminFinanceRevenueReportPresetDateRange(dateRange === 'custom' ? 'this_month' : dateRange), [dateRange]);
  const dateBounds = useMemo(() => dateRange === 'custom'
    ? { startDate: queryStartDate, endDate: queryEndDate }
    : { startDate: presetRange.startDate, endDate: presetRange.endDate },
    [dateRange, presetRange.endDate, presetRange.startDate, queryEndDate, queryStartDate]);
  const isDateRangeValid = isValidAdminFinanceRevenueReportDateRange(dateBounds.startDate, dateBounds.endDate);
  const { selectedGymId } = useAdminFinanceRevenueReportStore();
  const params = useMemo(() => ({ from: dateBounds.startDate, to: dateBounds.endDate, branchId: selectedGymId === 'all' ? undefined : selectedGymId }), [dateBounds.endDate, dateBounds.startDate, selectedGymId]);
  const query = useQuery< RevenueReportData >({
    queryKey: ADMIN_FINANCE_REVENUE_REPORT_QUERY_KEYS.key('report', 'revenue', dateRange, dateBounds.startDate, dateBounds.endDate, selectedGymId),
    queryFn: async () => { const response = await AdminFinanceRevenueReportApi.fetchRevenueReport(params); if (!response.data) throw new Error('revenue report response contained no data'); return response.data; },
    enabled: isDateRangeValid,
    staleTime: 300_000,
  });
  const { exportMutation, exportReport } = useAdminFinanceRevenueReportMutations();
  const handleExport = useCallback(async (format: AdminFinanceRevenueReportExportFormat) => {
    if (!isDateRangeValid) return;
    await exportReport({ type: 'revenue', format, from: dateBounds.startDate, to: dateBounds.endDate, branchId: selectedGymId === 'all' ? undefined : selectedGymId });
  }, [dateBounds.endDate, dateBounds.startDate, exportReport, isDateRangeValid, selectedGymId]);
  const retryReport = useCallback(async () => {
    if (!isDateRangeValid) {
      // The query is disabled for an invalid custom range; recover via a known valid
      // preset while retaining unrelated URL filters instead of returning silently.
      const next = new URLSearchParams(searchParams.toString());
      next.set('range', 'this_month');
      next.delete('startDate');
      next.delete('endDate');
      const queryString = next.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
      return;
    }
    await query.refetch();
  }, [isDateRangeValid, pathname, query, router, searchParams]);
  return { reportData: query.data ?? null, status: isDateRangeValid ? query.status : 'error', queryError: query.error, retryReport, isDateRangeValid, dateRange, startDate: dateBounds.startDate, endDate: dateBounds.endDate, exportStatus: exportMutation.status, handleExport };
}
