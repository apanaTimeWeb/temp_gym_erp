"use client";
// RESPONSIBILITY: Renders the Revenue & Profit Trend area chart using ApexCharts (Recharts is forbidden per Rule 62).
// DATA FLOW: feature data/state and user input → AdminDashboardOverviewRevenueTrend → accessible UI/events routed to owning hooks (admin_dashboard/dashboard_overview/components/revenue_trend/AdminDashboardOverviewRevenueTrend.tsx)

import { useLocale, useTranslations } from 'next-intl';
import { AdminDashboardFormatCurrency } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/utils/AdminDashboardOverviewFormatCurrency';
import { formatAdminDashboardMonthLabel, formatKPI } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/utils/AdminDashboardOverviewFormatters';

import dynamic from 'next/dynamic';
import { ADMIN_CHART_THEME } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/utils/AdminDashboardOverviewChartThemeTokens';
import { BarChart3 } from 'lucide-react';
import { useAdminDashboardLogic } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/hooks/useAdminDashboardOverviewLogic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

/**
 * AdminDashboardOverviewRevenueTrend renders the admin dashboard revenue trend UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminDashboardOverviewRevenueTrend: Renders the Revenue & Profit Trend area chart using ApexCharts (Recharts is forbidden per Rule 62).
 * @dependencies Consumes AdminDashboardFormatCurrency, AdminDashboardFormatters, AdminNavigationLayoutChartThemeTokens, useAdminDashboardLogic.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminDashboardOverviewRevenueTrend() {
  const locale = useLocale();
  const t = useTranslations();

  const { stats } = useAdminDashboardLogic();
  if (!stats?.revenueTrend) return null;

  const months = stats.revenueTrend.map((d) => formatAdminDashboardMonthLabel(d.month, locale));
  const revenues = stats.revenueTrend.map((d) => d.revenue);
  const profits = stats.revenueTrend.map((d) => d.profit);

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'area',
      background: 'transparent',
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: [ADMIN_CHART_THEME.primary, ADMIN_CHART_THEME.success],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.25,
        opacityTo: 0.02,
        stops: [0, 95],
      },
    },
    stroke: { curve: 'smooth', width: 2.5 },
    dataLabels: { enabled: false },
    xaxis: {
      categories: months,
      labels: { style: { colors: ADMIN_CHART_THEME.textSecondary, fontSize: '12px' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: ADMIN_CHART_THEME.textSecondary, fontSize: '12px' },
        formatter: (v) => formatKPI(v, locale),
      },
    },
    grid: {
      borderColor: ADMIN_CHART_THEME.grid,
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (v) =>
          AdminDashboardFormatCurrency(v ?? 0, stats.currency, locale),
      },
    },
    legend: {
      labels: { colors: ADMIN_CHART_THEME.textSecondary },
      position: 'top',
      horizontalAlign: 'right',
    },
  };

  const series = [
    { name: t('dashboard.admin_dashboard_revenue_trend.series_totalRevenue'), data: revenues },
    { name: t('dashboard.admin_dashboard_revenue_trend.series_netProfit'), data: profits },
  ];

  return (
    <div className="bg-card backdrop-blur-xl border border-border rounded-2xl shadow-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 bg-success text-on-success rounded-xl">
          <BarChart3 size={18} strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-base font-bold text-primary">{t('dashboard.admin_dashboard_revenue_trend.text_cc3465852a')}</h2>
          <p className="text-xs text-secondary">{t('dashboard.admin_dashboard_revenue_trend.text_75caecb7dc')}</p>
        </div>
      </div>
      {stats.revenueTrend.length === 0 ? (
        <div role="status" className="flex min-h-44 items-center justify-center text-sm text-secondary" data-testid="dashboard-overview-dashboard-overview-revenue-trend-status-region">{t('dashboard.admin_dashboard_revenue_trend.noData')}</div>
      ) : <ReactApexChart options={options} series={series} type="area" height={300} />}
    </div>
  );
}
