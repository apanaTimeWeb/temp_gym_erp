"use client";
// RESPONSIBILITY: Renders two ApexCharts — grouped bar (Revenue vs Expenses per branch)
// DATA FLOW: feature data/state and user input → AdminFinanceBranchProfitAndLossCharts → accessible UI/events routed to owning hooks (admin_finance/finance_branch_profit_and_loss/components/charts/AdminFinanceBranchProfitAndLossCharts.tsx)

import { useLocale, useTranslations } from 'next-intl';
import { AdminFinanceFormatCurrency } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/utils/AdminFinanceBranchProfitAndLossFormatCurrency';
import { formatCompactMinorUnitKPI } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/utils/AdminFinanceBranchProfitAndLossFormatters';
// and donut (profit share by branch). Code-split via next/dynamic to avoid SSR issues.

import dynamic from 'next/dynamic';
import { ADMIN_CHART_THEME } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/utils/AdminFinanceBranchProfitAndLossChartThemeTokens';
import type { BranchPnlRecord } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/types/AdminFinanceBranchProfitAndLossTypes';

// Lazy-load ApexCharts to prevent SSR window-is-not-defined error (Rule 15 — Lazy Loading)
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

import type { AdminFinancePnlChartsProps } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/types/AdminFinanceBranchProfitAndLossChartsPropsTypes';


const CHART_FONT = 'Inter, system-ui, sans-serif';

/**
 * AdminFinanceBranchProfitAndLossCharts renders the admin finance pnl charts UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinanceBranchProfitAndLossCharts: Renders two ApexCharts — grouped bar (Revenue vs Expenses per branch)
 * @dependencies Consumes AdminFinanceFormatCurrency, AdminFinanceFormatters, AdminNavigationLayoutChartThemeTokens, AdminFinanceTypes, AdminFinancePnlChartsPropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinanceBranchProfitAndLossCharts({ data }: AdminFinancePnlChartsProps) {
  const locale = useLocale();
  const t = useTranslations();

  if (data.length === 0) return null;

  const branchNames = data.map((b) => b.branchName);
  const revenues = data.map((branch) => branch.revenue);
  const expenses = data.map((branch) => branch.expenses);
  const profits     = data.filter((b) => b.netProfit > 0).map((b) => b.netProfit);
  const profitLabels = data.filter((b) => b.netProfit > 0).map((b) => b.branchName);

  const barOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      background: 'transparent',
      toolbar: { show: false },
      fontFamily: CHART_FONT,
    },
    plotOptions: {
      bar: { columnWidth: '55%', borderRadius: 4 },
    },
    colors: [ADMIN_CHART_THEME.success, ADMIN_CHART_THEME.danger],
    dataLabels: { enabled: false },
    xaxis: {
      categories: branchNames,
      labels: {
        style: { colors: ADMIN_CHART_THEME.textSecondary, fontSize: '11px' },
        rotate: -20,
      },
      axisBorder: { color: ADMIN_CHART_THEME.border },
      axisTicks: { color: ADMIN_CHART_THEME.border },
    },
    yaxis: {
      labels: {
        style: { colors: ADMIN_CHART_THEME.textSecondary, fontSize: '11px' },
        formatter: (val: number) => formatCompactMinorUnitKPI(val, locale),
      },
    },
    grid: {
      borderColor: ADMIN_CHART_THEME.grid,
      strokeDashArray: 4,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: { colors: ADMIN_CHART_THEME.textSecondary },
      fontSize: '12px',
      fontFamily: CHART_FONT,
    },
    tooltip: {
      theme: 'dark',
      y: { formatter: (val: number) => AdminFinanceFormatCurrency(val, undefined, locale) },
    },
  };

  const barSeries = [
    { name: t('finance.AdminFinancePnlCharts.series_revenue'), data: revenues },
    { name: t('finance.AdminFinancePnlCharts.series_expenses'), data: expenses },
  ];

  const donutOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut',
      background: 'transparent',
      fontFamily: CHART_FONT,
    },
    colors: [ADMIN_CHART_THEME.primary, ADMIN_CHART_THEME.success, ADMIN_CHART_THEME.info, ADMIN_CHART_THEME.warning, ADMIN_CHART_THEME.warning],
    labels: profitLabels,
    dataLabels: {
      enabled: true,
      style: { colors: [ADMIN_CHART_THEME.textPrimary], fontSize: '11px', fontWeight: 600 },
      dropShadow: { enabled: false },
    },
    legend: {
      position: 'bottom',
      labels: { colors: ADMIN_CHART_THEME.textSecondary },
      fontSize: '12px',
      fontFamily: CHART_FONT,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            total: {
              show: true,
              label: t('finance.AdminAuditRepair.totalProfit'),
              color: ADMIN_CHART_THEME.textSecondary,
              fontSize: '12px',
              fontFamily: CHART_FONT,
              formatter: (w: { globals: { seriesTotals: number[] } }) => {
                const total = w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
                return total >= 10000000 ? formatCompactMinorUnitKPI(total, locale) : AdminFinanceFormatCurrency(total, undefined, locale);
              },
            },
          },
        },
      },
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (val: number) =>
          AdminFinanceFormatCurrency(val, undefined, locale),
      },
    },
    stroke: { colors: ['transparent'] },
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
      {/* Grouped Bar Chart — Revenue vs Expenses */}
      <div className="xl:col-span-3 bg-card border border-border rounded-xl p-5">
        <p className="text-sm font-semibold text-primary mb-4">{t('finance.AdminFinancePnlCharts.text_c7ebaca60f')}</p>
        <ReactApexChart
          type="bar"
          series={barSeries}
          options={barOptions}
          height={280}
        />
      </div>

      {/* Donut — Profit Share */}
      <div className="xl:col-span-2 bg-card border border-border rounded-xl p-5">
        <p className="text-sm font-semibold text-primary mb-4">{t('finance.AdminFinancePnlCharts.text_f2fc0d3c2b')}</p>
        {profits.length === 0 ? (
          <div className="h-64 flex items-center justify-center text-sm text-secondary">
            {t('finance.AdminFinancePnlCharts.text_7c2d057fd5')}</div>
        ) : (
          <ReactApexChart
            type="donut"
            series={profits}
            options={donutOptions}
            height={280}
          />
        )}
      </div>
    </div>
  );
}
