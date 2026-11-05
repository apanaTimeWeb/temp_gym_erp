"use client";
// RESPONSIBILITY: Fetches only the pnl report owned by this leaf.
import { useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ADMIN_FINANCE_PROFIT_AND_LOSS_REPORT_QUERY_KEYS } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/constants/AdminFinanceProfitAndLossReportQueryKeys';
import { AdminFinanceProfitAndLossReportApi } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/api/admin_finance_profit_and_loss_report_api';
import { useAdminFinanceProfitAndLossReportMutations } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/hooks/useAdminFinanceProfitAndLossReportMutations';
import { useAdminFinanceProfitAndLossReportStore } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/state/useAdminFinanceProfitAndLossReportStore';
import { getAdminFinanceProfitAndLossReportPresetDateRange, isValidAdminFinanceProfitAndLossReportDateRange } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/utils/AdminFinanceProfitAndLossReportDateRangeUtils';
import type { AdminFinanceProfitAndLossReportExportFormat, ReportDateRange, PnLReportData } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/types/AdminFinanceProfitAndLossReportTypes';

const DATE_RANGES: readonly ReportDateRange[] = ['this_month', 'last_month', 'last_3_months', 'last_6_months', 'this_year', 'custom'];

export function useAdminFinanceProfitAndLossReportLogic() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const rawRange = searchParams.get('range');
  const dateRange: ReportDateRange = DATE_RANGES.includes(rawRange as ReportDateRange) ? rawRange as ReportDateRange : 'this_month';
  const queryStartDate = searchParams.get('startDate') ?? '';
  const queryEndDate = searchParams.get('endDate') ?? '';
  const presetRange = useMemo(() => getAdminFinanceProfitAndLossReportPresetDateRange(dateRange === 'custom' ? 'this_month' : dateRange), [dateRange]);
  const dateBounds = useMemo(() => dateRange === 'custom'
    ? { startDate: queryStartDate, endDate: queryEndDate }
    : { startDate: presetRange.startDate, endDate: presetRange.endDate },
    [dateRange, presetRange.endDate, presetRange.startDate, queryEndDate, queryStartDate]);
  const isDateRangeValid = isValidAdminFinanceProfitAndLossReportDateRange(dateBounds.startDate, dateBounds.endDate);
  const { selectedGymId } = useAdminFinanceProfitAndLossReportStore();
  const params = useMemo(() => ({ from: dateBounds.startDate, to: dateBounds.endDate, branchId: selectedGymId === 'all' ? undefined : selectedGymId }), [dateBounds.endDate, dateBounds.startDate, selectedGymId]);
  const query = useQuery< PnLReportData >({
    queryKey: ADMIN_FINANCE_PROFIT_AND_LOSS_REPORT_QUERY_KEYS.key('report', 'pnl', dateRange, dateBounds.startDate, dateBounds.endDate, selectedGymId),
    queryFn: async () => { const response = await AdminFinanceProfitAndLossReportApi.fetchPnLReport(params); if (!response.data) throw new Error('pnl report response contained no data'); return response.data; },
    enabled: isDateRangeValid,
    staleTime: 300_000,
  });
  const { exportMutation, exportReport } = useAdminFinanceProfitAndLossReportMutations();
  const handleExport = useCallback(async (format: AdminFinanceProfitAndLossReportExportFormat) => {
    if (!isDateRangeValid) return;
    await exportReport({ type: 'pnl', format, from: dateBounds.startDate, to: dateBounds.endDate, branchId: selectedGymId === 'all' ? undefined : selectedGymId });
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
