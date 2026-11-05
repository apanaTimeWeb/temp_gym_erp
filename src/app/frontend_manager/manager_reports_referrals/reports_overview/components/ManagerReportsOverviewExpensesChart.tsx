"use client";
// RESPONSIBILITY: Renders ManagerReportsOverviewExpensesChart's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
import dynamic from 'next/dynamic';

import { useManagerReportsOverviewLogic } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/hooks/useManagerReportsOverviewLogic';

/**
 * @description Renders/orchestrates the ManagerReportsOverviewExpensesChart user interface for the reports module without owning sibling business logic.
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

/** @description Renders the ManagerReportsOverviewExpensesChart component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves loading state. */
export function ManagerReportsOverviewExpensesChart() {
  const { summary } = useManagerReportsOverviewLogic();
  const data = summary?.expenseBreakdown ?? [];

  const options = {
    ...CHART_BASE,
    chart: { ...CHART_BASE.chart, type: 'donut' as const },
    colors: ['var(--chart-danger)', 'var(--chart-warning)', 'var(--chart-info)', 'var(--chart-primary)', 'var(--chart-success)', 'var(--chart-secondary)'],
    labels: data.map(d => d.category),
    legend: { position: 'bottom' as const, labels: { colors: 'var(--text-secondary)' } },
    dataLabels: { style: { fontSize: 'var(--font-size-table-header)' } },
    plotOptions: { pie: { donut: { size: '65%' } } } };

  return (
    <Chart
      type="donut"
      height={320}
      options={options}
      series={data.map(d => d.amount)}
    />
  );
}
