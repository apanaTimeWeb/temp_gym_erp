// RESPONSIBILITY: Renders/orchestrates SuperadminDashboardMain within its owning Superadmin feature module; no direct backend implementation.
'use client';
import { useTranslations } from 'next-intl';

import { SuperadminDashboardOverviewCharts } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/components/dashboard_overview_main/SuperadminDashboardOverviewCharts';
import { SuperadminDashboardOverviewHeader } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/components/dashboard_overview_main/SuperadminDashboardOverviewHeader';
import { SuperadminDashboardOverviewKpiGrid } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/components/dashboard_overview_main/SuperadminDashboardOverviewKpiGrid';
import { SuperadminDashboardOverviewRecentOnboards } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/components/dashboard_overview_main/SuperadminDashboardOverviewRecentOnboards';
import { SuperadminDashboardOverviewErrorBoundary } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/components/SuperadminDashboardOverviewErrorBoundary';
import { SUPERADMIN_DASHBOARD_DEFAULT_TIME_MULTIPLIER } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/constants/superadmin_dashboard_overview.constants';
import { useSuperadminDashboardOverviewMain } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/hooks/useSuperadminDashboardOverviewMain';

export default function SuperadminDashboardOverviewMain() {
  const t = useTranslations('superadmin_dashboard');
  const { isPending, isError: error, retryDashboard, apiData } = useSuperadminDashboardOverviewMain();

  if (isPending) {
    return (
      <div className="space-y-5" data-testid="superadmin_dashboard-superadmin-dashboard-main-page">
        <div className="rounded-2xl border border-border bg-card p-6 space-y-2">
          <div className="h-7 w-48 bg-skeleton-base motion-safe:animate-pulse rounded" />
          <div className="h-4 w-80 max-w-full bg-skeleton-base motion-safe:animate-pulse rounded" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div key={`kpi-skeleton-${i}`} className="bg-skeleton-base border border-border rounded-2xl p-6 h-32 motion-safe:animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
          <div className="h-80 rounded-2xl border border-border bg-skeleton-base p-6 motion-safe:animate-pulse lg:col-span-2" />
          <div className="h-80 rounded-2xl border border-border bg-skeleton-base p-6 motion-safe:animate-pulse lg:col-span-2" />
          <div className="h-80 rounded-2xl border border-border bg-skeleton-base p-6 motion-safe:animate-pulse lg:col-span-1" />
          <div className="h-80 rounded-2xl border border-border bg-skeleton-base p-6 motion-safe:animate-pulse lg:col-span-3" />
        </div>
        <div className="h-64 rounded-2xl border border-border bg-skeleton-base p-6 motion-safe:animate-pulse" />
      </div>
    );
  }

  if (error || !apiData) {
    return (
      <div className="p-4 sm:p-8 text-center text-danger font-medium">
        <div className="flex flex-col items-center justify-center p-10 bg-danger-bg border border-border rounded-2xl">
          <div className="w-12 h-12 rounded-full bg-danger-bg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-primary mb-2">{t('ui.failed_to_load_dashboard_ba720cf')}</h3>
          <p className="text-secondary text-center max-w-md">
            {t('ui.we_couldn_t_fetch_the_latest_dashboard_metrics_p_ee11511')}
          </p>
          <button
            type="button"
            onClick={retryDashboard}
            className="mt-4 min-h-11 rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-on-primary hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page cursor-pointer"
          >
            {t('actions.retry')}
          </button>
        </div>
      </div>
    );
  }

  const { metrics, revenue: revenueChartData, growth: growthChartData = [] } = apiData;
  const timeMultiplier = SUPERADMIN_DASHBOARD_DEFAULT_TIME_MULTIPLIER;
  const mrrLabel = t('ui.monthly_recurring_revenue');

  return (
    <div className="space-y-5" data-testid="superadmin_dashboard-superadmin-dashboard-main-page-ready">
      <SuperadminDashboardOverviewHeader />

      <SuperadminDashboardOverviewErrorBoundary variant="inline">
        <SuperadminDashboardOverviewKpiGrid metrics={metrics} revenueChartData={revenueChartData} timeMultiplier={timeMultiplier} mrrLabel={mrrLabel} />
      </SuperadminDashboardOverviewErrorBoundary>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 items-stretch">
        <SuperadminDashboardOverviewErrorBoundary variant="inline">
          <SuperadminDashboardOverviewCharts metrics={metrics} revenueChartData={revenueChartData} growthChartData={growthChartData} timeMultiplier={timeMultiplier} mrrLabel={mrrLabel} />
        </SuperadminDashboardOverviewErrorBoundary>
        <div className="lg:col-span-4 min-w-0">
          <SuperadminDashboardOverviewErrorBoundary variant="inline">
            <SuperadminDashboardOverviewRecentOnboards recentOnboards={metrics.recentOnboards} />
          </SuperadminDashboardOverviewErrorBoundary>
        </div>
      </div>
    </div>
  );
}
