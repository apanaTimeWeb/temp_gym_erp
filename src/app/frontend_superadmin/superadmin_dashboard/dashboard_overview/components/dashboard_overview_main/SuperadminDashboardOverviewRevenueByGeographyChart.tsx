// RESPONSIBILITY: Renders Superadmin Dashboard Overview Revenue By Geography Chart using its declared props and feature-local hooks.
'use client';
import { useLocale, useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

import SuperadminDashboardChartEmptyState from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/components/dashboard_overview_main/SuperadminDashboardOverviewChartEmptyState';
import { SUPERADMIN_DASHBOARD_CHART_COLORS, SUPERADMIN_DASHBOARD_CURRENCY_AXIS_DIVISOR } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/constants/superadmin_dashboard_overview.constants';
import { SuperadminDashboardFormatCurrency } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/utils/SuperadminDashboardOverviewFormatCurrency';

import type { SaaSDashboardMetrics } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/types/superadmin_dashboard_overview.types';


const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
/**
 * @description Renders the Superadmin dashboard revenue by geography chart interface within its owning Superadmin feature using the declared typed props.
 * @dependencies Consumes the component props and local imports listed in this file; domain logic must remain in the owning feature module.
 * @edge-case Keep null/empty data safe, expose validation or error feedback where applicable, and preserve keyboard/focus and repeated-action behavior.
 */
export default function SuperadminDashboardOverviewRevenueByGeographyChart({ metrics, multiplier }: { metrics: SaaSDashboardMetrics; multiplier: number }) {
 const t = useTranslations('superadmin_dashboard'); const locale = useLocale(); const regions = metrics.revenueByGeography ?? [];
 const options = { chart: { type: 'bar' as const, toolbar: { show: false }, background: 'transparent' }, colors: [SUPERADMIN_DASHBOARD_CHART_COLORS.WARNING], plotOptions: { bar: { horizontal: true, borderRadius: 4, dataLabels: { position: 'top' } } }, dataLabels: { enabled: true, offsetX: 20, style: { fontSize: '12px', colors: [SUPERADMIN_DASHBOARD_CHART_COLORS.TEXT_SECONDARY] }, formatter: (value: number) => `${SuperadminDashboardFormatCurrency(value / SUPERADMIN_DASHBOARD_CURRENCY_AXIS_DIVISOR, metrics.currency, locale)}k` }, stroke: { show: true, width: 1, colors: ['transparent'] }, xaxis: { categories: regions.map((item) => item.region), labels: { style: { colors: SUPERADMIN_DASHBOARD_CHART_COLORS.TEXT_SECONDARY }, formatter: (value: number) => `${SuperadminDashboardFormatCurrency(value / SUPERADMIN_DASHBOARD_CURRENCY_AXIS_DIVISOR, metrics.currency, locale)}k` }, axisBorder: { show: false }, axisTicks: { show: false } }, yaxis: { labels: { style: { colors: SUPERADMIN_DASHBOARD_CHART_COLORS.TEXT_SECONDARY } } }, grid: { borderColor: SUPERADMIN_DASHBOARD_CHART_COLORS.GRID, strokeDashArray: 4, xaxis: { lines: { show: true } }, yaxis: { lines: { show: false } } }, tooltip: { y: { formatter: (value: number) => SuperadminDashboardFormatCurrency(value, metrics.currency, locale) } } };
 const series = [{ name: t('ui.revenue'), data: regions.map((item) => Math.round(item.revenue * multiplier)) }];
 return <section className="lg:col-span-3 rounded-xl border border-border bg-card p-6 shadow-card"><h2 className="mb-6 text-base font-semibold text-primary">{t('ui.revenue_by_geography_412387c')}</h2><div className="h-80 w-full">{regions.length ? <Chart options={options} series={series} type="bar" height="100%"/> : <SuperadminDashboardChartEmptyState/>}</div></section>;
}
