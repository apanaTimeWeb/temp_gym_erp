"use client";
// RESPONSIBILITY: Root client orchestrator for Staff Performance Dashboard.
// DATA FLOW: feature data/state and user input → AdminHrPerformanceAnalytics → accessible UI/events routed to owning hooks (admin_hr/hr_performance_analytics/components/main_view/AdminHrPerformanceAnalytics.tsx)

import { useTranslations } from 'next-intl';

import { useAdminHrPerformanceLogic } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/hooks/useAdminHrPerformanceAnalyticsLogic';
import AdminHrPerformancePeriodSelector from '@/app/frontend_admin/admin_hr/hr_performance_analytics/components/period_selector/AdminHrPerformanceAnalyticsPeriodSelector';
import AdminHrPerformanceKPIs from '@/app/frontend_admin/admin_hr/hr_performance_analytics/components/kpis/AdminHrPerformanceAnalyticsKPIs';
import AdminHrPerformanceTable from '@/app/frontend_admin/admin_hr/hr_performance_analytics/components/table/AdminHrPerformanceAnalyticsTable';
import AdminHrPerformanceCharts from '@/app/frontend_admin/admin_hr/hr_performance_analytics/components/charts/AdminHrPerformanceAnalyticsCharts';
import { Target, Search } from 'lucide-react';
import AdminNavigationLayoutTableSkeleton from '@/app/frontend_admin/admin_hr/hr_performance_analytics/components/AdminHrPerformanceAnalyticsTableSkeleton';

/**
 * AdminHrPerformanceAnalytics renders the admin hr performance main UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminHrPerformanceAnalytics: Root client orchestrator for Staff Performance Dashboard.
 * @dependencies Consumes useAdminHrPerformanceLogic, AdminHrPerformancePeriodSelector, AdminHrPerformanceKPIs, AdminHrPerformanceTable, AdminHrPerformanceCharts.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminHrPerformanceAnalytics() {
  const t = useTranslations();

  const {
    period,
    setPeriod,
    searchQuery,
    setSearchQuery,
    sortKey,
    sortDir,
    handleSort,
    sortedData,
    aggregates,
    isPending,
    isError,
    retry,
  } = useAdminHrPerformanceLogic();

  if (isError) {
    return (
      <div role="alert" className="p-6 text-center text-danger space-y-3">
        <p>{t('hr.admin_hr_performance.text_4a5e9a0392')}</p>
        <button type="button" className="min-h-11 min-w-11 rounded-lg border border-border px-4 py-2 text-primary focus-visible:ring-2 focus-visible:ring-primary" onClick={() => { void retry(); }}>
          {t('hr.HrError.text_042c862e44')}
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-primary tracking-tight flex items-center gap-2">
            <Target className="text-primary" size={18} strokeWidth={2} />
            {t('hr.admin_hr_performance.text_9c59cd5cca')}</h1>
          <p className="text-sm text-secondary mt-1">
            {t('hr.admin_hr_performance.text_899f0f1253')}</p>
        </div>

        <AdminHrPerformancePeriodSelector period={period} onPeriodChange={setPeriod} />
      </div>

      {isPending ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {['performance-1', 'performance-2', 'performance-3', 'performance-4'].map((id) => <div key={id} className="h-28 rounded-xl bg-skeleton-base motion-safe:animate-pulse motion-safe:duration-base" />)}
          </div>
          <div className="h-80 rounded-xl bg-skeleton-base motion-safe:animate-pulse motion-safe:duration-base" />
          <AdminNavigationLayoutTableSkeleton rows={8} cols={7} />
        </>
      ) : (
        <>
          {/* KPIs */}
          <AdminHrPerformanceKPIs aggregates={aggregates} />

          {/* Charts */}
          <AdminHrPerformanceCharts data={sortedData} />

          {/* Table Controls & Table */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <h2 className="text-lg font-bold text-primary w-full sm:w-auto">{t('hr.admin_hr_performance.text_4a6bceb3d4')}</h2>
              <div className="relative w-full sm:w-72">
                <span className="absolute inset-y-0 left-3 flex items-center"><Search size={18} className="text-disabled"  strokeWidth={2}/></span>
                <input
                  type="text"
                  aria-label={t('hr.admin_hr_performance.text_502d3e817b')}
                  placeholder={t('hr.admin_hr_performance.text_502d3e817b')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-xl text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base focus-visible:ring-offset-2 focus-visible:ring-offset-page ease-in-out min-h-11"
                 data-testid="admin_hr-admin_hr-performance-main-control"/>
              </div>
            </div>
            <AdminHrPerformanceTable
              data={sortedData}
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={handleSort}
            />
          </div>
        </>
      )}
    </div>
  );
}
