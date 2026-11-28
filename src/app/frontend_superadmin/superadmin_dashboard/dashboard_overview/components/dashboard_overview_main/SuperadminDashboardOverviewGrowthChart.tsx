// RESPONSIBILITY: Renders Superadmin Dashboard Overview Growth Chart using its declared props and feature-local hooks.
'use client';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

import SuperadminDashboardChartEmptyState from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/components/dashboard_overview_main/SuperadminDashboardOverviewChartEmptyState';
import { SUPERADMIN_DASHBOARD_CHART_COLORS } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/constants/superadmin_dashboard_overview.constants';
import { formatNumber } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/utils/SuperadminDashboardOverviewFormatters';

import type { GrowthChartData } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/types/superadmin_dashboard_overview.types';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function SuperadminDashboardOverviewGrowthChart({ data }: { data: GrowthChartData[] }) {
  const t = useTranslations('superadmin_dashboard');
  const options = { chart: { type: 'bar' as const, toolbar: { show: false }, background: 'transparent' }, colors: [SUPERADMIN_DASHBOARD_CHART_COLORS.INFO], dataLabels: { enabled: false }, xaxis: { categories: data.map((item) => item.month), labels: { style: { colors: SUPERADMIN_DASHBOARD_CHART_COLORS.TEXT_SECONDARY } }, axisBorder: { show: false }, axisTicks: { show: false } }, yaxis: { labels: { style: { colors: SUPERADMIN_DASHBOARD_CHART_COLORS.TEXT_SECONDARY }, formatter: (value: number) => formatNumber(Math.round(value)) } }, grid: { borderColor: SUPERADMIN_DASHBOARD_CHART_COLORS.GRID, strokeDashArray: 4 }, tooltip: { y: { formatter: (value: number) => formatNumber(Math.round(value)) } } };
  const series = [{ name: t('ui.new_gyms'), data: data.map((item) => item.gyms) }];

  return (
    <section className="relative overflow-hidden lg:col-span-2 min-w-0 rounded-2xl border border-border dark:border-white/10 bg-card dark:bg-gradient-to-b dark:from-[#121B2F] dark:to-[#0C1220] p-5 sm:p-6 shadow-card">
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#38BDF8] via-[#22D3EE] to-transparent" />
      <h2 className="mb-5 text-base font-bold text-primary">{t('ui.gym_growth_new_signups_c9698e9')}</h2>
      <div className="h-80 w-full min-w-0">{data.length ? <Chart options={options} series={series} type="bar" height="100%" /> : <SuperadminDashboardChartEmptyState />}</div>
    </section>
  );
}
