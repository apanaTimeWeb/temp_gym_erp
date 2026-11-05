// RESPONSIBILITY: Renders ManagerDashboardOverviewRevenueChart's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import dynamic from 'next/dynamic';

import { useTranslations, useLocale } from 'next-intl';
import ManagerDashboardOverviewEmptyState from '@/app/frontend_manager/manager_dashboard/dashboard_overview/components/ManagerDashboardOverviewEmptyState';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig';

import { useDashboardStatsQuery } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/hooks/useManagerDashboardOverviewQueries';
import { useManagerDashboardOverviewUrlState } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/hooks/useManagerDashboardOverviewUrlState';
import { ManagerDashboardOverviewFormatCurrency, ManagerDashboardOverviewFormatKpi } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/utils/ManagerDashboardOverviewFormatters';
import type { ManagerDashboardOverviewRevenueChartData } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/types/manager_dashboard_overview.types';


/**
 * @description Renders/orchestrates the ManagerDashboardOverviewRevenueChart user interface for the dashboard module without owning sibling business logic.
 * @dependencies @/app/frontend_manager/manager_dashboard/dashboard_overview/utils/ManagerDashboardOverviewFormatters; @/app/frontend_manager/manager_dashboard/dashboard_overview/hooks/useManagerDashboardOverviewQueries; @/app/frontend_manager/manager_dashboard/dashboard_overview/hooks/useManagerDashboardOverviewUrlState; @/app/frontend_manager/manager_infrastructure/manager_infrastructure_constants/ManagerEnvConfig; @/app/frontend_manager/manager_dashboard/dashboard_overview/types/manager_dashboard_overview.types
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <div className="h-64 rounded-xl bg-card motion-safe:animate-pulse motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1" aria-hidden="true" /> });

/** @description Renders the ManagerDashboardOverviewRevenueChart component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (5 documented module/import dependencies).. @edge-case Preserves loading state. */
export default function ManagerDashboardOverviewRevenueChart() {
  const t = useTranslations('MANAGER_DASHBOARD');
  const locale = useLocale();

  const { range, setRange } = useManagerDashboardOverviewUrlState();
  const { data: stats } = useDashboardStatsQuery({ range });
  
  if (!stats?.revenueChart || stats.revenueChart.length === 0) {
    return (
      <ManagerDashboardOverviewEmptyState
        title={t("COPY_REVENUE_TRENDS")}
        message={t("COPY_NO_REVENUE_DATA_AVAILABLE")}
        actionLabel={t('COPY_SHOW_THIS_MONTH')}
        onAction={() => setRange('monthly')}
      />
    );
  }

  const options = {
    chart: { background: 'transparent', toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
    colors: ['var(--chart-success)'],
    stroke: { curve: 'smooth' as const, width: 3 },
    fill: {
      type: 'solid',
      opacity: 0.22
    },
    grid: { borderColor: 'var(--chart-grid)', strokeDashArray: 4 },
    tooltip: { theme: 'dark' as const, y: { formatter: (v: number) => ManagerDashboardOverviewFormatCurrency(v, ManagerEnvConfig.currencyCode, locale) } },
    xaxis: {
      categories: stats.revenueChart.map((d: ManagerDashboardOverviewRevenueChartData) => d.month),
      labels: { style: { colors: 'var(--text-secondary)', fontSize: 'var(--font-size-table-header)' } },
      axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { style: { colors: 'var(--text-secondary)', fontSize: 'var(--font-size-table-header)' }, formatter: (v: number) => ManagerDashboardOverviewFormatKpi(v) } },
    dataLabels: { enabled: false } };

  return (
    <div className="min-w-0 bg-card rounded-xl shadow-card border border-border p-5 flex flex-col h-full min-h-72 motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
      <h3 className="text-base font-bold text-text-primary mb-4">{t("COPY_REVENUE_TRENDS")}</h3>
      <div className="min-w-0 flex-1 w-full h-56">
        <Chart
          type="area"
          height={220}
          options={options}
          series={[
            { name: t('COPY_REVENUE'), data: stats.revenueChart.map((d: ManagerDashboardOverviewRevenueChartData) => d.revenue || 0) },
          ]}
        />
      </div>
    </div>
  );
}
