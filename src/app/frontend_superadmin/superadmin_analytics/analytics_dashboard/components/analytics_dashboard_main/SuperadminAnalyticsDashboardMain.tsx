// RESPONSIBILITY: Renders/orchestrates SuperadminAnalyticsMain within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Orchestrates the analytics page sections and route-level loading/error states; owns no business calculations or API calls.
import { useTranslations } from 'next-intl';

import { SuperadminAnalyticsDashboardKpiGrid } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/components/analytics_dashboard_dashboard_widgets/SuperadminAnalyticsDashboardKpiGrid';
import { SuperadminAnalyticsDashboardPageHeader } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/components/analytics_dashboard_dashboard_widgets/SuperadminAnalyticsDashboardPageHeader';
import { SuperadminAnalyticsDashboardSecondaryMetrics } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/components/analytics_dashboard_dashboard_widgets/SuperadminAnalyticsDashboardSecondaryMetrics';
import { SuperadminAnalyticsDashboardMainErrorState } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/components/analytics_dashboard_states_and_feedback/SuperadminAnalyticsDashboardMainErrorState';
import { SuperadminAnalyticsDashboardMainLoadingState } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/components/analytics_dashboard_states_and_feedback/SuperadminAnalyticsDashboardMainLoadingState';
import { SuperadminAnalyticsDashboardPrimaryCharts } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/components/SuperadminAnalyticsDashboardPrimaryCharts';
import { useSuperadminAnalyticsDashboardPage } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/hooks/useSuperadminAnalyticsDashboardPage';
import { useSuperadminAnalyticsDashboardViewModel } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/hooks/useSuperadminAnalyticsDashboardViewModel';


/**
 * @description Composes analytics header, KPI, chart, and secondary metric sections.
 * @dependencies Uses only the feature analytics query hook, dashboard view-model, and feature-owned child components.
 * @edge-case Delegates loading and error recovery to dedicated feature components so the route never renders a blank failure state.
 */
export default function SuperadminAnalyticsDashboardMain() {
  const t = useTranslations('superadmin_analytics');
  const { metrics, monthlyData, isPending, isError, error, refetch } = useSuperadminAnalyticsDashboardPage();
  const viewModel = useSuperadminAnalyticsDashboardViewModel(metrics, monthlyData);

  if (isPending) return <div className="space-y-6"><SuperadminAnalyticsDashboardPageHeader /><SuperadminAnalyticsDashboardMainLoadingState/></div>;
  if (isError || !metrics) return <div className="space-y-6"><SuperadminAnalyticsDashboardPageHeader /><SuperadminAnalyticsDashboardMainErrorState onRetry={() => void refetch()} message={error ?? t('ui.action_failed_retry')} /></div>;

  return (
    <div className="space-y-6" data-testid="superadmin_analytics-superadmin-analytics-main-page-ready">
      <SuperadminAnalyticsDashboardPageHeader />
      <SuperadminAnalyticsDashboardKpiGrid cards={viewModel.kpiCards} />
      <SuperadminAnalyticsDashboardPrimaryCharts charts={viewModel.charts} />
      <SuperadminAnalyticsDashboardSecondaryMetrics metrics={viewModel.secondaryMetrics} />
    </div>
  );
}
