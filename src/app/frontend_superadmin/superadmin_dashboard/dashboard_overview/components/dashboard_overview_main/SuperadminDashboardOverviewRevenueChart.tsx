// RESPONSIBILITY: Renders Superadmin Dashboard Overview Revenue Chart using its declared props and feature-local hooks.
'use client';
import { useLocale, useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

import SuperadminDashboardChartEmptyState from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/components/dashboard_overview_main/SuperadminDashboardOverviewChartEmptyState';
import { SUPERADMIN_DASHBOARD_CHART_COLORS, SUPERADMIN_DASHBOARD_CURRENCY_AXIS_DIVISOR } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/constants/superadmin_dashboard_overview.constants';
import { SuperadminDashboardFormatCurrency } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/utils/SuperadminDashboardOverviewFormatCurrency';

import type { RevenueChartData, SaaSDashboardMetrics } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/types/superadmin_dashboard_overview.types';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function SuperadminDashboardOverviewRevenueChart({ data, metrics, multiplier, title }: { data: RevenueChartData[]; metrics: SaaSDashboardMetrics; multiplier: number; title: string }) {
  const t = useTranslations('superadmin_dashboard');
  const locale = useLocale();
  const options = { chart: { type: 'area' as const, toolbar: { show: false }, background: 'transparent' }, colors: [SUPERADMIN_DASHBOARD_CHART_COLORS.PRIMARY], fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 90, 100] } }, dataLabels: { enabled: false }, stroke: { curve: 'smooth' as const, width: 2 }, xaxis: { categories: data.map((item) => item.month), axisBorder: { show: false }, axisTicks: { show: false }, labels: { style: { colors: SUPERADMIN_DASHBOARD_CHART_COLORS.TEXT_SECONDARY } } }, yaxis: { labels: { style: { colors: SUPERADMIN_DASHBOARD_CHART_COLORS.TEXT_SECONDARY }, formatter: (value: number) => `${SuperadminDashboardFormatCurrency(value / SUPERADMIN_DASHBOARD_CURRENCY_AXIS_DIVISOR, metrics.currency, locale)}k` } }, grid: { borderColor: SUPERADMIN_DASHBOARD_CHART_COLORS.GRID, strokeDashArray: 4 }, tooltip: { y: { formatter: (value: number) => SuperadminDashboardFormatCurrency(value, metrics.currency, locale) } } };
  const series = [{ name: title, data: data.map((item) => Math.round(item.mrr * multiplier)) }];

  return (
    <section className="relative overflow-hidden lg:col-span-2 min-w-0 rounded-2xl border border-border dark:border-white/10 bg-card dark:bg-gradient-to-b dark:from-[#121B2F] dark:to-[#0C1220] p-5 sm:p-6 shadow-card">
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#FF5A1F] via-[#EC4899] to-transparent" />
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-bold text-primary">{title} {t('ui.growth_d5cd63b')}</h2>
        {metrics.arrDeltaPercent !== undefined && (
          <span className={`rounded-full border border-border px-2.5 py-1 text-xs font-semibold ${metrics.arrDeltaPercent >= 0 ? 'bg-success-bg text-success' : 'bg-danger-bg text-danger'}`}>
            {t('ui.arr_trend_7aa832e')} {metrics.arrDeltaPercent > 0 ? '+' : ''}{metrics.arrDeltaPercent}{t('ui.text_0bcef9c4')}
          </span>
        )}
      </div>
      <div className="h-80 w-full min-w-0">{data.length ? <Chart options={options} series={series} type="area" height="100%" /> : <SuperadminDashboardChartEmptyState />}</div>
    </section>
  );
}
