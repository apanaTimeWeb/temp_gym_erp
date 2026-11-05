// RESPONSIBILITY: Renders Superadmin Dashboard Overview Revenue By Tier Chart using its declared props and feature-local hooks.
'use client';
import { useLocale, useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

import SuperadminDashboardChartEmptyState from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/components/dashboard_overview_main/SuperadminDashboardOverviewChartEmptyState';
import { SUPERADMIN_DASHBOARD_CHART_COLORS } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/constants/superadmin_dashboard_overview.constants';
import { SuperadminDashboardFormatCurrency } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/utils/SuperadminDashboardOverviewFormatCurrency';

import type { SaaSDashboardMetrics } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/types/superadmin_dashboard_overview.types';


const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
/**
 * @description Renders the Superadmin dashboard revenue by tier chart interface within its owning Superadmin feature using the declared typed props.
 * @dependencies Consumes the component props and local imports listed in this file; domain logic must remain in the owning feature module.
 * @edge-case Keep null/empty data safe, expose validation or error feedback where applicable, and preserve keyboard/focus and repeated-action behavior.
 */
export default function SuperadminDashboardOverviewRevenueByTierChart({ metrics, multiplier }: { metrics: SaaSDashboardMetrics; multiplier: number }) {
 const t = useTranslations('superadmin_dashboard'); const locale = useLocale(); const tiers = metrics.revenueByTier ?? [];
 const options = { chart: { type: 'donut' as const, background: 'transparent' }, labels: tiers.map((item) => item.plan.toUpperCase()), colors: [SUPERADMIN_DASHBOARD_CHART_COLORS.PRIMARY, SUPERADMIN_DASHBOARD_CHART_COLORS.INFO, SUPERADMIN_DASHBOARD_CHART_COLORS.WARNING, SUPERADMIN_DASHBOARD_CHART_COLORS.SUCCESS, SUPERADMIN_DASHBOARD_CHART_COLORS.DANGER, SUPERADMIN_DASHBOARD_CHART_COLORS.SECONDARY], stroke: { show: false }, dataLabels: { enabled: false }, tooltip: { y: { formatter: (value: number) => SuperadminDashboardFormatCurrency(value, metrics.currency, locale) } }, legend: { position: 'bottom' as const, labels: { colors: SUPERADMIN_DASHBOARD_CHART_COLORS.TEXT_SECONDARY } } };
 const series = tiers.map((item) => Math.round(item.amount * multiplier));
 return <section className="lg:col-span-1 rounded-xl border border-border bg-card p-6 shadow-card"><h2 className="mb-6 text-base font-semibold text-primary">{t('ui.revenue_by_plan_0286239')}</h2><div className="flex h-80 w-full items-center justify-center">{tiers.length ? <Chart options={options} series={series} type="donut" height="100%"/> : <SuperadminDashboardChartEmptyState/>}</div></section>;
}
