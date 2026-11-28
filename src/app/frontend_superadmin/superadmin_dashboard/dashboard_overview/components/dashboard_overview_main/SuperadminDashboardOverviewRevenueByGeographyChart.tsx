// RESPONSIBILITY: Renders Superadmin Dashboard Overview Revenue By Geography Chart using its declared props and feature-local hooks.
'use client';
import { useLocale, useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

import SuperadminDashboardChartEmptyState from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/components/dashboard_overview_main/SuperadminDashboardOverviewChartEmptyState';
import { SUPERADMIN_DASHBOARD_CHART_COLORS, SUPERADMIN_DASHBOARD_CURRENCY_AXIS_DIVISOR } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/constants/superadmin_dashboard_overview.constants';
import { SuperadminDashboardFormatCurrency } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/utils/SuperadminDashboardOverviewFormatCurrency';

import type { SaaSDashboardMetrics } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/types/superadmin_dashboard_overview.types';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function SuperadminDashboardOverviewRevenueByGeographyChart({ metrics, multiplier }: { metrics: SaaSDashboardMetrics; multiplier: number }) {
  const t = useTranslations('superadmin_dashboard');
  const locale = useLocale();
  const regions = metrics.revenueByGeography ?? [];
  const options = { chart: { type: 'bar' as const, toolbar: { show: false }, background: 'transparent' }, colors: [SUPERADMIN_DASHBOARD_CHART_COLORS.WARNING], plotOptions: { bar: { horizontal: true, borderRadius: 4, dataLabels: { position: 'top' } } }, dataLabels: { enabled: true, offsetX: 20, style: { fontSize: '12px', colors: [SUPERADMIN_DASHBOARD_CHART_COLORS.TEXT_SECONDARY] }, formatter: (value: number) => `${SuperadminDashboardFormatCurrency(value / SUPERADMIN_DASHBOARD_CURRENCY_AXIS_DIVISOR, metrics.currency, locale)}k` }, stroke: { show: true, width: 1, colors: ['transparent'] }, xaxis: { categories: regions.map((item) => item.region), labels: { style: { colors: SUPERADMIN_DASHBOARD_CHART_COLORS.TEXT_SECONDARY }, formatter: (value: number) => `${SuperadminDashboardFormatCurrency(value / SUPERADMIN_DASHBOARD_CURRENCY_AXIS_DIVISOR, metrics.currency, locale)}k` }, axisBorder: { show: false }, axisTicks: { show: false } }, yaxis: { labels: { style: { colors: SUPERADMIN_DASHBOARD_CHART_COLORS.TEXT_SECONDARY } } }, grid: { borderColor: SUPERADMIN_DASHBOARD_CHART_COLORS.GRID, strokeDashArray: 4, xaxis: { lines: { show: true } }, yaxis: { lines: { show: false } } }, tooltip: { y: { formatter: (value: number) => SuperadminDashboardFormatCurrency(value, metrics.currency, locale) } } };
  const series = [{ name: t('ui.revenue'), data: regions.map((item) => Math.round(item.revenue * multiplier)) }];

  return (
    <section className="relative overflow-hidden lg:col-span-3 min-w-0 rounded-2xl border border-border dark:border-white/10 bg-card dark:bg-gradient-to-b dark:from-[#121B2F] dark:to-[#0C1220] p-5 sm:p-6 shadow-card">
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#F59E0B] via-[#10B981] to-transparent" />
      <h2 className="mb-5 text-base font-bold text-primary">{t('ui.revenue_by_geography_412387c')}</h2>
      <div className="h-80 w-full min-w-0">{regions.length ? <Chart options={options} series={series} type="bar" height="100%" /> : <SuperadminDashboardChartEmptyState />}</div>
    </section>
  );
}
