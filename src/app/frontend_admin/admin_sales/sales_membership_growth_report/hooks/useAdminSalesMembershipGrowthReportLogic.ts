"use client";
// RESPONSIBILITY: Fetches only the membership report owned by this leaf.
import { useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { ADMIN_SALES_MEMBERSHIP_GROWTH_REPORT_QUERY_KEYS } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/constants/AdminSalesMembershipGrowthReportQueryKeys';
import { AdminSalesMembershipGrowthReportApi } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/api/admin_sales_membership_growth_report_api';
import { useAdminSalesMembershipGrowthReportMutations } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/hooks/useAdminSalesMembershipGrowthReportMutations';
import { useAdminSalesMembershipGrowthReportStore } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/state/useAdminSalesMembershipGrowthReportStore';
import { getAdminSalesMembershipGrowthReportPresetDateRange, isValidAdminSalesMembershipGrowthReportDateRange } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/utils/AdminSalesMembershipGrowthReportDateRangeUtils';
import type { AdminSalesMembershipGrowthReportExportFormat, ReportDateRange, MembershipReportData } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/types/AdminSalesMembershipGrowthReportTypes';

const DATE_RANGES: readonly ReportDateRange[] = ['this_month', 'last_month', 'last_3_months', 'last_6_months', 'this_year', 'custom'];

export function useAdminSalesMembershipGrowthReportLogic() {
  const searchParams = useSearchParams();
  const rawRange = searchParams.get('range');
  const dateRange: ReportDateRange = DATE_RANGES.includes(rawRange as ReportDateRange) ? rawRange as ReportDateRange : 'this_month';
  const queryStartDate = searchParams.get('startDate') ?? '';
  const queryEndDate = searchParams.get('endDate') ?? '';
  const presetRange = useMemo(() => getAdminSalesMembershipGrowthReportPresetDateRange(dateRange === 'custom' ? 'this_month' : dateRange), [dateRange]);
  const dateBounds = useMemo(() => dateRange === 'custom'
    ? { startDate: queryStartDate, endDate: queryEndDate }
    : { startDate: presetRange.startDate, endDate: presetRange.endDate },
    [dateRange, presetRange.endDate, presetRange.startDate, queryEndDate, queryStartDate]);
  const isDateRangeValid = isValidAdminSalesMembershipGrowthReportDateRange(dateBounds.startDate, dateBounds.endDate);
  const { selectedGymId } = useAdminSalesMembershipGrowthReportStore();
  const params = useMemo(() => ({ from: dateBounds.startDate, to: dateBounds.endDate, branchId: selectedGymId === 'all' ? undefined : selectedGymId }), [dateBounds.endDate, dateBounds.startDate, selectedGymId]);
  const query = useQuery< MembershipReportData >({
    queryKey: ADMIN_SALES_MEMBERSHIP_GROWTH_REPORT_QUERY_KEYS.key('report', 'membership', dateRange, dateBounds.startDate, dateBounds.endDate, selectedGymId),
    queryFn: async () => { const response = await AdminSalesMembershipGrowthReportApi.fetchMembershipReport(params); if (!response.data) throw new Error('membership report response contained no data'); return response.data; },
    enabled: isDateRangeValid,
    staleTime: 300_000,
  });
  const { exportMutation, exportReport } = useAdminSalesMembershipGrowthReportMutations();
  const handleExport = useCallback(async (format: AdminSalesMembershipGrowthReportExportFormat) => {
    if (!isDateRangeValid) return;
    await exportReport({ type: 'membership', format, from: dateBounds.startDate, to: dateBounds.endDate, branchId: selectedGymId === 'all' ? undefined : selectedGymId });
  }, [dateBounds.endDate, dateBounds.startDate, exportReport, isDateRangeValid, selectedGymId]);
  const retryReport = useCallback(async () => { if (isDateRangeValid) await query.refetch(); }, [isDateRangeValid, query]);
  return { reportData: query.data ?? null, status: isDateRangeValid ? query.status : 'error', queryError: query.error, retryReport, isDateRangeValid, dateRange, startDate: dateBounds.startDate, endDate: dateBounds.endDate, exportStatus: exportMutation.status, handleExport };
}
