// RESPONSIBILITY: Renders Superadmin Dashboard Overview Growth Chart using its declared props and feature-local hooks.
'use client';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

import SuperadminDashboardChartEmptyState from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/components/dashboard_overview_main/SuperadminDashboardOverviewChartEmptyState';
import { SUPERADMIN_DASHBOARD_CHART_COLORS } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/constants/superadmin_dashboard_overview.constants';
import { formatNumber } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/utils/SuperadminDashboardOverviewFormatters';

import type { GrowthChartData } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/types/superadmin_dashboard_overview.types';


const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
/**
 * @description Renders the Superadmin dashboard growth chart interface within its owning Superadmin feature using the declared typed props.
 * @dependencies Consumes the component props and local imports listed in this file; domain logic must remain in the owning feature module.
 * @edge-case Keep null/empty data safe, expose validation or error feedback where applicable, and preserve keyboard/focus and repeated-action behavior.
 */
export default function SuperadminDashboardOverviewGrowthChart({ data }: { data: GrowthChartData[] }) {
 const t = useTranslations('superadmin_dashboard');
 const options = { chart: { type: 'bar' as const, toolbar: { show: false }, background: 'transparent' }, colors: [SUPERADMIN_DASHBOARD_CHART_COLORS.INFO], dataLabels: { enabled: false }, xaxis: { categories: data.map((item) => item.month), labels: { style: { colors: SUPERADMIN_DASHBOARD_CHART_COLORS.TEXT_SECONDARY } }, axisBorder: { show: false }, axisTicks: { show: false } }, yaxis: { labels: { style: { colors: SUPERADMIN_DASHBOARD_CHART_COLORS.TEXT_SECONDARY }, formatter: (value: number) => formatNumber(Math.round(value)) } }, grid: { borderColor: SUPERADMIN_DASHBOARD_CHART_COLORS.GRID, strokeDashArray: 4 }, tooltip: { y: { formatter: (value: number) => formatNumber(Math.round(value)) } } };
 const series = [{ name: t('ui.new_gyms'), data: data.map((item) => item.gyms) }];
 return <section className="lg:col-span-2 rounded-xl border border-border bg-card p-6 shadow-card"><h2 className="mb-6 text-base font-semibold text-primary">{t('ui.gym_growth_new_signups_c9698e9')}</h2><div className="h-80 w-full">{data.length ? <Chart options={options} series={series} type="bar" height="100%"/> : <SuperadminDashboardChartEmptyState/>}</div></section>;
}
