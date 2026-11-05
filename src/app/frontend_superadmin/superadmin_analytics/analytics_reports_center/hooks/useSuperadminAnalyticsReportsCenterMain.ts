'use client';
// DATA FLOW: URL state → report page query hooks → derived presentation data → Main view; export uses feature mutation hook.
// RESPONSIBILITY: Owns Reports route-level UI state, derived metrics, export lifecycle, and retry orchestration.


import { useUrlState } from '@/hooks/useUrlState';

import { SUPERADMIN_REPORT_FILTER_ALL, SUPERADMIN_ANALYTICS_REPORTS_DATE_PRESET_OPTIONS, SUPERADMIN_REPORT_PLAN_OPTIONS } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/constants/superadmin_analytics_reports_center.constants';
import { useSuperadminAnalyticsReportsCenterExportMutation } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/hooks/useSuperadminAnalyticsReportsCenterExportMutation';
import { useSuperadminAnalyticsReportsCenterPage } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/hooks/useSuperadminAnalyticsReportsCenterPage';
import { useSuperadminAnalyticsReportsCenterSearchDebounce } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/hooks/useSuperadminAnalyticsReportsCenterSearchDebounce';
import { getSuperadminAnalyticsReportsPresetRange, isValidSuperadminAnalyticsReportsDateParam } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/utils/SuperadminAnalyticsReportsCenterDateRangeUtils';

import type { SuperadminAnalyticsReportsTab } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/types/superadmin_analytics_reports_center_tab.types';
import type { SuperadminAnalyticsReportsDateField, CancellationsRecord, TenantHealthScore } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/types/superadmin_analytics_reports_center.types';
import type { ChangeEvent } from 'react';

/**
 * @description Coordinates report URL state, derived report presentation values, retry behavior, and export actions for the route.
 * @dependencies Composes feature query hooks, URL state, and the Reports export mutation.
 * @edge-case Invalid or missing URL values fall back to documented defaults instead of breaking report rendering.
 */
export function useSuperadminAnalyticsReportsCenterMain() {
  const { getParam, setParam } = useUrlState();
  const tab = (getParam('tab', 'revenue') === 'cancellations' || getParam('tab', 'revenue') === 'health' ? getParam('tab', 'revenue') : 'revenue') as SuperadminAnalyticsReportsTab;
  const requestedPreset = getParam('preset', 'THIS_MONTH');
  const datePreset = SUPERADMIN_ANALYTICS_REPORTS_DATE_PRESET_OPTIONS.some((option) => option.value === requestedPreset) ? requestedPreset : 'THIS_MONTH';
  const isValidDateParam = isValidSuperadminAnalyticsReportsDateParam;
  const rawDateFrom = getParam('startDate', '');
  const rawDateTo = getParam('endDate', '');
  let dateFrom = isValidDateParam(rawDateFrom) ? rawDateFrom : '';
  let dateTo = isValidDateParam(rawDateTo) ? rawDateTo : '';
  if (dateFrom && dateTo && dateFrom > dateTo) { dateFrom = ''; dateTo = ''; }
  const committedSearchQuery = getParam('search', '').trim().slice(0, 200);
  const { searchQuery, setSearch } = useSuperadminAnalyticsReportsCenterSearchDebounce(committedSearchQuery, setParam);
  const requestedPlanFilter = getParam('planFilter', SUPERADMIN_REPORT_FILTER_ALL);
  const planFilter = SUPERADMIN_REPORT_PLAN_OPTIONS.some((option) => option.value === requestedPlanFilter) ? requestedPlanFilter : SUPERADMIN_REPORT_FILTER_ALL;
  const presetRange = datePreset === 'CUSTOM' ? { from: '', to: '' } : getSuperadminAnalyticsReportsPresetRange(datePreset);
  const queryParams: Record<string, string> = { preset: datePreset };
  const effectiveFrom = dateFrom || presetRange.from;
  const effectiveTo = dateTo || presetRange.to;
  if (effectiveFrom) queryParams.startDate = effectiveFrom;
  if (effectiveTo) queryParams.endDate = effectiveTo;
  if (committedSearchQuery) queryParams.search = committedSearchQuery;
  if (planFilter !== SUPERADMIN_REPORT_FILTER_ALL) queryParams.plan = planFilter;
  const { revenue, cancellations, health } = useSuperadminAnalyticsReportsCenterPage(queryParams);
  const { requestExport, isRequesting: isExporting } = useSuperadminAnalyticsReportsCenterExportMutation();
  const revenueData = revenue.data?.data ?? [];
  const cancellationsData: CancellationsRecord[] = cancellations.data?.data ?? [];
  const healthData: TenantHealthScore[] = health.data?.data ?? [];
  const totalMRR = revenueData.at(-1)?.mrr ?? 0;
  const totalCancelledRevenue = cancellationsData.reduce((sum, row) => sum + row.mrr, 0);
  const avgHealthScore = healthData.length ? Math.round(healthData.reduce((sum, row) => sum + row.score, 0) / healthData.length) : 0;
  const previousMRR = revenueData.length > 1 ? revenueData.at(-2)?.mrr ?? null : null;
  const incomeChangePercent = previousMRR && previousMRR !== 0 ? Math.round((((totalMRR - previousMRR) / previousMRR) * 100) * 10) / 10 : null;
  const avgDaysActive = cancellationsData.length ? Math.round(cancellationsData.reduce((sum, row) => sum + row.daysActive, 0) / cancellationsData.length) : 0;
  const handleDateChange = (key: SuperadminAnalyticsReportsDateField) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (key === 'startDate' && effectiveTo && value > effectiveTo) return;
    if (key === 'endDate' && effectiveFrom && value < effectiveFrom) return;
    setParam('preset', 'CUSTOM');
    setParam(key, value);
  };
  const handlePresetChange = (preset: string, from?: string, to?: string) => {
    setParam('preset', preset);
    if (preset !== 'CUSTOM') { setParam('startDate', from ?? ''); setParam('endDate', to ?? ''); }
  };
  return {
    tab, setTab: (value: SuperadminAnalyticsReportsTab) => setParam('tab', value), datePreset, dateFrom: effectiveFrom, dateTo: effectiveTo, searchQuery, planFilter,
    setSearch, setPlanFilter: (value: string) => setParam('planFilter', value),
    handleDateChange, handlePresetChange, revenueData, cancellationsData, healthData, totalMRR, totalCancelledRevenue, avgHealthScore, incomeChangePercent, avgDaysActive,
    revenueQuery: revenue, cancellationsQuery: cancellations, healthQuery: health,
    isPending: revenue.isPending || cancellations.isPending || health.isPending, isError: revenue.isError || cancellations.isError || health.isError,
    retryRevenue: () => { void revenue.refetch(); }, retryCancellations: () => { void cancellations.refetch(); }, retryHealth: () => { void health.refetch(); },
    retryAll: () => { void revenue.refetch(); void cancellations.refetch(); void health.refetch(); },
    handleExportCSV: async () => { const response = await requestExport(); return response; }, handleExportPDF: () => window.print(), isExporting,
  };
}
