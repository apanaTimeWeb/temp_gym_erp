// RESPONSIBILITY: Renders ManagerReportsOverviewRevenueChart's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import dynamic from 'next/dynamic';

import { useTranslations } from 'next-intl';

import { useManagerReportsOverviewLogic } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/hooks/useManagerReportsOverviewLogic';

/**
 * @description Renders/orchestrates the ManagerReportsOverviewRevenueChart user interface for the reports module without owning sibling business logic.
 * @dependencies @/app/frontend_manager/manager_reports_referrals/manager_reports_hooks/useManagerReportsOverviewLogic
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const CHART_BASE = {
  chart: { background: 'transparent', toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
  grid: { borderColor: 'var(--chart-grid)', strokeDashArray: 4 },
  tooltip: { theme: 'dark' as const },
  xaxis: { labels: { style: { colors: 'var(--text-secondary)', fontSize: 'var(--font-size-table-header)' } }, axisBorder: { show: false }, axisTicks: { show: false } },
  yaxis: { labels: { style: { colors: 'var(--text-secondary)', fontSize: 'var(--font-size-table-header)' } } },
  legend: { labels: { colors: 'var(--text-secondary)' } } };

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false, loading: () => (
  <div className="h-64 rounded-xl bg-card motion-safe:animate-pulse motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1" aria-hidden="true" />
)});

/** @description Renders the ManagerReportsOverviewRevenueChart component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves loading state. */
export function ManagerReportsOverviewRevenueChart() {
  const t = useTranslations('MANAGER_REPORTS_OVERVIEW');
  const { summary } = useManagerReportsOverviewLogic();
  const data = summary?.revenueData ?? [];

  const options = {
    ...CHART_BASE,
    chart: { ...CHART_BASE.chart, type: 'bar' as const, stacked: false },
    plotOptions: { bar: { borderRadius: 4, columnWidth: '55%' } },
    colors: ['var(--chart-primary)', 'var(--chart-danger)', 'var(--chart-success)'],
    xaxis: { ...CHART_BASE.xaxis, categories: data.map(d => d.month) },
    dataLabels: { enabled: false } };

  return (
    <Chart
      type="bar"
      height={300}
      options={options}
      series={[
        { name: t('COPY_REVENUE'),  data: data.map(d => d.revenue)  },
        { name: t('COPY_EXPENSES'), data: data.map(d => d.expenses) },
        { name: t('COPY_PROFIT'),   data: data.map(d => d.profit)   },
      ]}
    />
  );
}
