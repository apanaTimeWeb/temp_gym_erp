// RESPONSIBILITY: Renders ManagerFinancePaymentsAndSummaryRevenueExpenseChart's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import dynamic from 'next/dynamic';

import { useTranslations } from 'next-intl';

import { ManagerFinancePaymentsAndSummaryFormatKpi } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/utils/ManagerFinancePaymentsAndSummaryFormatters';
import type { ManagerFinancePaymentsAndSummaryRevenueExpenseChartProps } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/types/manager_finance_payments_and_summary_component_props.types';

/**
 * @description Renders/orchestrates the ManagerFinancePaymentsAndSummaryRevenueExpenseChart user interface for the finance module without owning sibling business logic.
 * @dependencies @/app/frontend_manager/manager_finance_expenses/manager_finance_utils/ManagerFinancePaymentsAndSummaryFormatters
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <div className="h-64 rounded-xl bg-card motion-safe:animate-pulse" aria-hidden="true" /> });

/** @description Renders the ManagerFinancePaymentsAndSummaryRevenueExpenseChart component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves loading state. */
export function ManagerFinancePaymentsAndSummaryRevenueExpenseChart({ data }: ManagerFinancePaymentsAndSummaryRevenueExpenseChartProps) {
  const t = useTranslations('MANAGER_FINANCE_PAYMENTS_AND_SUMMARY');

  const options = {
    chart: { background: 'transparent', toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
    plotOptions: { bar: { borderRadius: 4, columnWidth: '55%' } },
    colors: ['var(--chart-primary)'],
    grid: { borderColor: 'var(--chart-grid)', strokeDashArray: 4 },
    tooltip: { theme: 'dark' as const },
    xaxis: {
      categories: data.map(d => d.month),
      labels: { style: { colors: 'var(--text-secondary)', fontSize: 'var(--font-size-table-header)' } },
      axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { style: { colors: 'var(--text-secondary)', fontSize: 'var(--font-size-table-header)' }, formatter: (v: number) => ManagerFinancePaymentsAndSummaryFormatKpi(v) } },
    legend: { labels: { colors: 'var(--text-secondary)' } },
    dataLabels: { enabled: false } };
  
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <p className="text-sm font-semibold text-text-primary mb-2">{t("COPY_REVENUE_TREND")}</p>
      <Chart
        type="bar"
        height={280}
        options={options}
        series={[
          { name: t('COPY_REVENUE'),  data: data.map(d => d.revenue) },
        ]}
      />
    </div>
  );
}
