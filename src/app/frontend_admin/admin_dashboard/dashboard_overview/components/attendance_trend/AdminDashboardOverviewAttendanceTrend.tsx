"use client";
// RESPONSIBILITY: Renders the cross-branch daily attendance trend chart using ApexCharts.
// DATA FLOW: feature data/state and user input → AdminDashboardOverviewAttendanceTrend → accessible UI/events routed to owning hooks (admin_dashboard/dashboard_overview/components/attendance_trend/AdminDashboardOverviewAttendanceTrend.tsx)

import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { formatWeekday } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/utils/AdminDashboardOverviewFormatters';
import { formatNumber } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/utils/AdminDashboardOverviewFormatters';

import dynamic from 'next/dynamic';
import { ADMIN_CHART_THEME } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/utils/AdminDashboardOverviewChartThemeTokens';
import { CalendarCheck } from 'lucide-react';
import { useAdminDashboardLogic } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/hooks/useAdminDashboardOverviewLogic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

/**
 * AdminDashboardOverviewAttendanceTrend renders the admin dashboard attendance trend UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminDashboardOverviewAttendanceTrend: Renders the cross-branch daily attendance trend chart using ApexCharts.
 * @dependencies Consumes AdminDashboardFormatters, AdminDashboardFormatters, AdminNavigationLayoutChartThemeTokens, useAdminDashboardLogic.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminDashboardOverviewAttendanceTrend() {
  const locale = useLocale();
  const t = useTranslations();

  const { stats } = useAdminDashboardLogic();
  const attendance = stats?.attendanceTrend ?? [];
  const labels = attendance.map((item) => formatWeekday(item.date, locale));
  const values = attendance.map((item) => item.count);
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      background: 'transparent',
      toolbar: { show: false },
    },
    colors: [ADMIN_CHART_THEME.primary],
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: '55%',
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: labels,
      labels: { style: { colors: ADMIN_CHART_THEME.textSecondary, fontSize: '12px' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: ADMIN_CHART_THEME.textSecondary, fontSize: '12px' },
        formatter: (v) => String(Math.round(v)),
      },
    },
    grid: {
      borderColor: ADMIN_CHART_THEME.grid,
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
    },
    tooltip: {
      theme: 'dark',
      y: { formatter: (v) => t('dashboard.admin_dashboard_attendance_trend.tooltip_checkIns', { count: v ?? 0 }) },
    },
  };

  const series = [{ name: t('dashboard.admin_dashboard_attendance_trend.series_checkIns'), data: values }];
  const total = values.reduce((sum: number, value: number) => sum + value, 0);
  const avg = values.length ? Math.round(total / values.length) : 0;

  return (
    <div className="bg-card backdrop-blur-xl border border-border rounded-2xl shadow-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-info-bg rounded-xl">
            <CalendarCheck size={18} strokeWidth={2} className="text-info" />
          </div>
          <div>
            <h2 className="text-base font-bold text-primary">{t('dashboard.admin_dashboard_attendance_trend.text_0bf09b5516')}</h2>
            <p className="text-xs text-secondary">{t('dashboard.admin_dashboard_attendance_trend.text_393230b08a')}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-primary">{formatNumber(total, locale)}</p>
          <p className="text-xs text-secondary">{t('dashboard.admin_dashboard_attendance_trend.text_cdc93143c6')}{avg}{t('dashboard.admin_dashboard_attendance_trend.text_9613df14d6')}</p>
        </div>
      </div>
      {values.length > 0 ? <ReactApexChart options={options} series={series} type="bar" height={220} /> : <div className="h-56 flex items-center justify-center text-sm text-secondary">{t('dashboard.admin_dashboard_attendance_trend.text_a34f9d7e15')}</div>}
    </div>
  );
}
