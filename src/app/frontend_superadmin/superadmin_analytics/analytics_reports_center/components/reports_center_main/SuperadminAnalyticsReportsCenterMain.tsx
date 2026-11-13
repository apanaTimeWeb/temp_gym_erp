// RESPONSIBILITY: Renders and orchestrates SuperadminAnalyticsReportsMain for the owning Superadmin feature module; presentation stays free of direct API calls.
'use client';
import { useEffect } from 'react';

import { Search } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

import { SuperadminAnalyticsReportsCenterSummaryCards } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/components/reports_center_dashboard_widgets/SuperadminAnalyticsReportsCenterSummaryCards';
import { SuperadminAnalyticsReportsCenterDatePresetDropdown } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/components/reports_center_forms_and_filters/SuperadminAnalyticsReportsCenterDatePresetDropdown';
import { SuperadminAnalyticsReportsCenterExportButton } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/components/reports_center_forms_and_filters/SuperadminAnalyticsReportsCenterExportButton';
import { SuperadminAnalyticsReportsCenterRevenueTab } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/components/reports_center_tabs/SuperadminAnalyticsReportsCenterRevenueTab';
import SuperadminAnalyticsReportsCenterSectionError from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/components/SuperadminAnalyticsReportsCenterSectionError';
import SuperadminAnalyticsReportsCenterSectionLoading from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/components/SuperadminAnalyticsReportsCenterSectionLoading';
import { SUPERADMIN_ANALYTICS_REPORTS_CENTER_ROUTES } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/config/superadmin_analytics_reports_center.url_config';
import { SUPERADMIN_REPORT_PLAN_OPTIONS } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/constants/superadmin_analytics_reports_center.constants';
import { useSuperadminAnalyticsReportsCenterMain } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/hooks/useSuperadminAnalyticsReportsCenterMain';

import type { DatePreset } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/types/superadmin_analytics_reports_center_date_preset_dropdown.types';


/**
 * RESPONSIBILITY: React component SuperadminAnalyticsReportsMain owned by the superadmin_analytics_reports feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useLocale, useSuperadminAnalyticsReportsCenterMain, useTranslations.
 * MODULE DEPENDENCIES: lucide-react, next-intl, @/components/ui/SearchableDropdown, @/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/components/reports_center_tabs/SuperadminAnalyticsReportsCenterCancellationsTab, @/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/components/reports_center_forms_and_filters/SuperadminAnalyticsReportsCenterDatePresetDropdown, @/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/components/reports_center_forms_and_filters/SuperadminAnalyticsReportsCenterExportButton, @/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/components/reports_center_tabs/SuperadminAnalyticsReportsCenterHealthTab, @/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/components/reports_center_tabs/SuperadminAnalyticsReportsCenterRevenueTab, @/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/components/reports_center_dashboard_widgets/SuperadminAnalyticsReportsCenterSummaryCards, @/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/constants/superadmin_analytics_reports_center.constants, @/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/hooks/useSuperadminAnalyticsReportsCenterMain, @/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/types/superadmin_analytics_reports_center_date_preset_dropdown.types, @/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/types/superadmin_analytics_reports_center_tab.types, react
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Composes the Reports page view from hook-owned state, derived data, and feature actions. No direct API calls or business calculations.


/**
 * @description Owns the SuperadminAnalyticsReportsMain responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminAnalyticsReportsCenterMain() {
  const t = useTranslations('superadmin_analytics_reports');
  const locale = useLocale();
  const router=useRouter();const searchParams=useSearchParams();
  useEffect(()=>{const tab=searchParams.get('tab');if(tab==='health'||tab==='cancellations')router.replace(`${SUPERADMIN_ANALYTICS_REPORTS_CENTER_ROUTES.REPORT(tab)}?${searchParams.toString()}`);},[router,searchParams]);
  const vm = useSuperadminAnalyticsReportsCenterMain();
  const dateLabel = (() => { if (vm.datePreset === 'CUSTOM') { if (vm.dateFrom && vm.dateTo) { return (`${new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(`${vm.dateFrom}T00:00:00`))} – ${new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(`${vm.dateTo}T00:00:00`))}`); } return (t('ui.custom_range')); } return (t(`ui.date_preset_${vm.datePreset.toLowerCase()}`)); })();
  return (<div className="space-y-6" data-testid="superadmin_analytics_reports-superadmin-reports-main-page-ready">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h1 className="text-2xl font-bold text-primary">{t('ui.reports_amp_exports_63fb7a20')}</h1><p className="mt-1 text-sm text-secondary">{t('ui.revenue_reports_tenant_cancellations_analysi_5769b3de')}</p></div><SuperadminAnalyticsReportsCenterExportButton onExportCSV={vm.handleExportCSV} onExportPDF={vm.handleExportPDF} isExporting={vm.isExporting}/></div>
    <SuperadminAnalyticsReportsCenterSummaryCards totalMRR={vm.totalMRR} totalCancelledRevenue={vm.totalCancelledRevenue} cancellationsCount={vm.cancellationsData.length} avgHealthScore={vm.avgHealthScore} healthDataLength={vm.healthData.length} incomeChangePercent={vm.incomeChangePercent} dateSuffix={dateLabel} />
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex flex-wrap items-center gap-3">
        <SuperadminAnalyticsReportsCenterDatePresetDropdown value={vm.datePreset as DatePreset} onChange={vm.handlePresetChange} />
        <input aria-label={t('ui.report_start_date_fd8ba7d4')} type="date" value={vm.dateFrom} max={vm.dateTo || undefined} onChange={vm.handleDateChange('startDate')} className="min-h-11 rounded-lg border border-border bg-input px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="superadmin_analytics_reports-superadmin-reports-main-main-report-start-date"/>
        <span className="text-sm text-secondary">{t('ui.to_01b6e203')}</span>
        <input aria-label={t('ui.report_end_date_a98a1800')} type="date" value={vm.dateTo} min={vm.dateFrom || undefined} onChange={vm.handleDateChange('endDate')} className="min-h-11 rounded-lg border border-border bg-input px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="superadmin_analytics_reports-superadmin-reports-main-main-report-end-date"/>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-secondary" aria-hidden="true"/>
          <input aria-label={t('ui.search_reports_by_gym_fe6c60bd')} value={vm.searchQuery} onChange={(event)=>vm.setSearch(event.target.value)} placeholder={t('ui.search_by_gym_name_ccb58215')} className="min-h-11 rounded-lg border border-border bg-input py-2 ps-10 pe-3 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="superadmin_analytics_reports-superadmin-reports-main-search-reports-by-gym"/>
        </div>
        <SearchableDropdown data-testid="superadmin_analytics_reports-superadmin-reports-main-plan-filter" value={vm.planFilter} onChange={(value)=>vm.setPlanFilter(String(value))} options={SUPERADMIN_REPORT_PLAN_OPTIONS.map(option=>({label:t(`ui.plan_${option.value.toLowerCase()}`),value:option.value}))}/>
      </div>
    </div>
    <nav className="flex flex-wrap gap-2 border-b border-border pb-4" aria-label={t('ui.reports_amp_exports_63fb7a20')}>
      <Link href={SUPERADMIN_ANALYTICS_REPORTS_CENTER_ROUTES.DESTINATION_1} className="inline-flex min-h-11 items-center border-b-2 border-focus px-4 text-primary focus-visible:ring-2 focus-visible:ring-primary">{t('ui.reports_tab_revenue')}</Link>
      <Link href={`${SUPERADMIN_ANALYTICS_REPORTS_CENTER_ROUTES.CANCELLATIONS}?${new URLSearchParams({preset:vm.datePreset,startDate:vm.dateFrom,endDate:vm.dateTo,search:vm.searchQuery,planFilter:vm.planFilter}).toString()}`} className="inline-flex min-h-11 items-center px-4 text-secondary focus-visible:ring-2 focus-visible:ring-primary">{t('ui.reports_tab_cancellations')}</Link>
      <Link href={`${SUPERADMIN_ANALYTICS_REPORTS_CENTER_ROUTES.HEALTH}?${new URLSearchParams({preset:vm.datePreset,startDate:vm.dateFrom,endDate:vm.dateTo,search:vm.searchQuery,planFilter:vm.planFilter}).toString()}`} className="inline-flex min-h-11 items-center px-4 text-secondary focus-visible:ring-2 focus-visible:ring-primary">{t('ui.reports_tab_health')}</Link>
    </nav>
    {(() => { if (vm.revenueQuery.isPending) { return (<SuperadminAnalyticsReportsCenterSectionLoading/>); } if (vm.revenueQuery.isError) { return (<SuperadminAnalyticsReportsCenterSectionError onRetry={vm.retryRevenue}/>); } return (<SuperadminAnalyticsReportsCenterRevenueTab revenueData={vm.revenueData}/>); })()}

  </div>);
}
