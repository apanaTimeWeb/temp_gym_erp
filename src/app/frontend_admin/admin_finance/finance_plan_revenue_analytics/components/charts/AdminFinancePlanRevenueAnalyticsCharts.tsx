"use client";
// RESPONSIBILITY: Renders the revenue distribution donut chart for Plans.
// DATA FLOW: feature data/state and user input → AdminFinancePlanRevenueAnalyticsCharts → accessible UI/events routed to owning hooks (admin_finance/finance_plan_revenue_analytics/components/charts/AdminFinancePlanRevenueAnalyticsCharts.tsx)

import { useLocale, useTranslations } from 'next-intl';
import { AdminPlansFormatCurrency } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/utils/AdminFinancePlanRevenueAnalyticsFormatCurrency';

import dynamic from 'next/dynamic';
import type { PlanRevenueRecord } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/types/AdminFinancePlanRevenueAnalyticsTypes';
import type { AdminPlansRevenueChartsProps } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/types/AdminFinancePlanRevenueAnalyticsChartsPropsTypes';

import { ADMIN_CHART_THEME } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/utils/AdminFinancePlanRevenueAnalyticsChartThemeTokens';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

/**
 * AdminFinancePlanRevenueAnalyticsCharts renders the admin plans revenue charts UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinancePlanRevenueAnalyticsCharts: Renders the revenue distribution donut chart for Plans.
 * @dependencies Consumes AdminPlansFormatCurrency, AdminPlansRevenueTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinancePlanRevenueAnalyticsCharts({ data }: AdminPlansRevenueChartsProps) {
  const locale = useLocale();
  const t = useTranslations();

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut',
      fontFamily: 'inherit',
      background: 'transparent',
    },
    labels: data.map((d) => d.planName),
    dataLabels: { enabled: false },
    stroke: { show: false },
    colors: [ADMIN_CHART_THEME.primary, ADMIN_CHART_THEME.info, ADMIN_CHART_THEME.success, ADMIN_CHART_THEME.warning, ADMIN_CHART_THEME.danger],
    legend: { position: 'right' },
    tooltip: {
      y: {
        formatter: (val) => AdminPlansFormatCurrency(val, undefined, locale),
      },
    },
  };

  const chartSeries = data.map((d) => d.totalRevenue);

  if (data.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="text-sm font-bold text-secondary uppercase tracking-wider mb-4">
        {t('plans.AdminPlansRevenueCharts.text_3be612e2eb')}</h3>
      <div className="h-64 w-full flex justify-center">
        <Chart options={chartOptions} series={chartSeries} type="donut" height="100%" />
      </div>
    </div>
  );
}
