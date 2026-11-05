// RESPONSIBILITY: Renders Superadmin Dashboard Overview Revenue Chart using its declared props and feature-local hooks.
'use client';
import { useLocale, useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

import SuperadminDashboardChartEmptyState from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/components/dashboard_overview_main/SuperadminDashboardOverviewChartEmptyState';
import { SUPERADMIN_DASHBOARD_CHART_COLORS, SUPERADMIN_DASHBOARD_CURRENCY_AXIS_DIVISOR } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/constants/superadmin_dashboard_overview.constants';
import { SuperadminDashboardFormatCurrency } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/utils/SuperadminDashboardOverviewFormatCurrency';

import type { RevenueChartData, SaaSDashboardMetrics } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/types/superadmin_dashboard_overview.types';


const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
/**
 * @description Renders the Superadmin dashboard revenue chart interface within its owning Superadmin feature using the declared typed props.
 * @dependencies Consumes the component props and local imports listed in this file; domain logic must remain in the owning feature module.
 * @edge-case Keep null/empty data safe, expose validation or error feedback where applicable, and preserve keyboard/focus and repeated-action behavior.
 */
export default function SuperadminDashboardOverviewRevenueChart({ data, metrics, multiplier, title }: { data: RevenueChartData[]; metrics: SaaSDashboardMetrics; multiplier: number; title: string }) {
 const t = useTranslations('superadmin_dashboard'); const locale = useLocale();
 const options = { chart: { type: 'area' as const, toolbar: { show: false }, background: 'transparent' }, colors: [SUPERADMIN_DASHBOARD_CHART_COLORS.PRIMARY], fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 90, 100] } }, dataLabels: { enabled: false }, stroke: { curve: 'smooth' as const, width: 2 }, xaxis: { categories: data.map((item) => item.month), axisBorder: { show: false }, axisTicks: { show: false }, labels: { style: { colors: SUPERADMIN_DASHBOARD_CHART_COLORS.TEXT_SECONDARY } } }, yaxis: { labels: { style: { colors: SUPERADMIN_DASHBOARD_CHART_COLORS.TEXT_SECONDARY }, formatter: (value: number) => `${SuperadminDashboardFormatCurrency(value / SUPERADMIN_DASHBOARD_CURRENCY_AXIS_DIVISOR, metrics.currency, locale)}k` } }, grid: { borderColor: SUPERADMIN_DASHBOARD_CHART_COLORS.GRID, strokeDashArray: 4 }, tooltip: { y: { formatter: (value: number) => SuperadminDashboardFormatCurrency(value, metrics.currency, locale) } } };
 const series = [{ name: title, data: data.map((item) => Math.round(item.mrr * multiplier)) }];
 return <section className="lg:col-span-2 rounded-xl border border-border bg-card p-6 shadow-card"><div className="mb-6 flex flex-wrap items-center justify-between gap-3"><h2 className="text-base font-semibold text-primary">{title} {t('ui.growth_d5cd63b')}</h2>{metrics.arrDeltaPercent !== undefined && <span className={`rounded-full border border-border px-2.5 py-1 text-xs font-medium ${metrics.arrDeltaPercent >= 0 ? 'bg-success-bg text-success' : 'bg-danger-bg text-danger'}`}>{t('ui.arr_trend_7aa832e')} {metrics.arrDeltaPercent > 0 ? '+' : ''}{metrics.arrDeltaPercent}{t('ui.text_0bcef9c4')}</span>}</div><div className="h-80 w-full">{data.length ? <Chart options={options} series={series} type="area" height="100%"/> : <SuperadminDashboardChartEmptyState/>}</div></section>;
}
