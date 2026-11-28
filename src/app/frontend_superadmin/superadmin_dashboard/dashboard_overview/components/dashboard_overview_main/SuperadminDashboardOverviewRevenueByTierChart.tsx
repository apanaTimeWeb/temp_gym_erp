// RESPONSIBILITY: Renders Superadmin Dashboard Overview Revenue By Tier Chart using its declared props and feature-local hooks.
'use client';
import { useLocale, useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

import SuperadminDashboardChartEmptyState from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/components/dashboard_overview_main/SuperadminDashboardOverviewChartEmptyState';
import { SUPERADMIN_DASHBOARD_CHART_COLORS } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/constants/superadmin_dashboard_overview.constants';
import { SuperadminDashboardFormatCurrency } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/utils/SuperadminDashboardOverviewFormatCurrency';

import type { SaaSDashboardMetrics } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/types/superadmin_dashboard_overview.types';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function SuperadminDashboardOverviewRevenueByTierChart({ metrics, multiplier }: { metrics: SaaSDashboardMetrics; multiplier: number }) {
  const t = useTranslations('superadmin_dashboard');
  const locale = useLocale();
  const tiers = metrics.revenueByTier ?? [];
  const options = { chart: { type: 'donut' as const, background: 'transparent' }, labels: tiers.map((item) => item.plan.toUpperCase()), colors: [SUPERADMIN_DASHBOARD_CHART_COLORS.PRIMARY, SUPERADMIN_DASHBOARD_CHART_COLORS.INFO, SUPERADMIN_DASHBOARD_CHART_COLORS.WARNING, SUPERADMIN_DASHBOARD_CHART_COLORS.SUCCESS, SUPERADMIN_DASHBOARD_CHART_COLORS.DANGER, SUPERADMIN_DASHBOARD_CHART_COLORS.SECONDARY], stroke: { show: false }, dataLabels: { enabled: false }, tooltip: { y: { formatter: (value: number) => SuperadminDashboardFormatCurrency(value, metrics.currency, locale) } }, legend: { position: 'bottom' as const, labels: { colors: SUPERADMIN_DASHBOARD_CHART_COLORS.TEXT_SECONDARY } } };
  const series = tiers.map((item) => Math.round(item.amount * multiplier));

  return (
    <section className="relative overflow-hidden lg:col-span-1 min-w-0 rounded-2xl border border-border dark:border-white/10 bg-card dark:bg-gradient-to-b dark:from-[#121B2F] dark:to-[#0C1220] p-5 sm:p-6 shadow-card">
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#A855F7] via-[#EC4899] to-transparent" />
      <h2 className="mb-5 text-base font-bold text-primary">{t('ui.revenue_by_plan_0286239')}</h2>
      <div className="flex h-80 w-full min-w-0 items-center justify-center">{tiers.length ? <Chart options={options} series={series} type="donut" height="100%" /> : <SuperadminDashboardChartEmptyState />}</div>
    </section>
  );
}
