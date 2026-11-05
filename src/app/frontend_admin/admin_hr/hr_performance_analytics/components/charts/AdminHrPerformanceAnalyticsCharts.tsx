"use client";
// RESPONSIBILITY: Renders dynamic charts visualizing staff performance metrics (sessions, additions).
// DATA FLOW: feature data/state and user input → AdminHrPerformanceAnalyticsCharts → accessible UI/events routed to owning hooks (admin_hr/hr_performance_analytics/components/charts/AdminHrPerformanceAnalyticsCharts.tsx)

import { useTranslations } from 'next-intl';

import dynamic from 'next/dynamic';
import { ADMIN_CHART_THEME } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/utils/AdminHrPerformanceAnalyticsChartThemeTokens';
import type { StaffPerformanceRecord } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/types/AdminHrPerformanceAnalyticsTypes';

// Rule 15: Lazy loading heavy chart libraries
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

import type { AdminHrPerformanceChartsProps } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/types/AdminHrPerformanceAnalyticsChartsPropsTypes';


/**
 * AdminHrPerformanceAnalyticsCharts renders the admin hr performance charts UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminHrPerformanceAnalyticsCharts: Renders dynamic charts visualizing staff performance metrics (sessions, additions).
 * @dependencies Consumes AdminNavigationLayoutChartThemeTokens, AdminHrPerformanceTypes, AdminHrPerformanceChartsPropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminHrPerformanceAnalyticsCharts({ data }: AdminHrPerformanceChartsProps) {
  const t = useTranslations();

  // Aggregate Top 5 Trainers by Sessions
  const topTrainers = [...data]
    .filter((s) => s.role === 'Trainer')
    .sort((a, b) => b.sessionsTaken - a.sessionsTaken)
    .slice(0, 5);

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      fontFamily: 'inherit',
      background: 'transparent',
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: topTrainers.map((t) => t.name),
      labels: {
        style: { colors: ADMIN_CHART_THEME.textSecondary },
      },
    },
    yaxis: {
      labels: {
        style: { colors: ADMIN_CHART_THEME.textPrimary, fontWeight: 600 },
      },
    },
    colors: [ADMIN_CHART_THEME.primary],
    grid: {
      borderColor: ADMIN_CHART_THEME.grid,
      strokeDashArray: 4,
    },
    theme: { mode: 'dark' },
  };

  const chartSeries = [
    {
      name: t('hr.AdminHrPerformanceCharts.series_sessionsTaken'),
      data: topTrainers.map((t) => t.sessionsTaken),
    },
  ];

  if (topTrainers.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="text-sm font-bold text-secondary uppercase tracking-wider mb-4">
        {t('hr.AdminHrPerformanceCharts.text_fe7879d991')}</h3>
      <div className="h-64 w-full">
        <Chart options={chartOptions} series={chartSeries} type="bar" height="100%" />
      </div>
    </div>
  );
}
