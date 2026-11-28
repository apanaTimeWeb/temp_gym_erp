// RESPONSIBILITY: Renders/orchestrates SuperadminAnalyticsDashboardPrimaryCharts within its owning Superadmin feature module; no direct backend implementation.
'use client';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

import { SuperadminAnalyticsDashboardChartEmptyState } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/components/analytics_dashboard_states_and_feedback/SuperadminAnalyticsDashboardChartEmptyState';

import type { SuperadminAnalyticsPrimaryChartsProps } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/types/superadmin_analytics_dashboard_primary_charts.types';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function SuperadminAnalyticsDashboardPrimaryCharts({ charts }: SuperadminAnalyticsPrimaryChartsProps) {
  const t = useTranslations('superadmin_analytics');
  return (
    <section className="grid grid-cols-1 gap-5 lg:grid-cols-2" aria-label={t('ui.analytics_charts')}>
      <article className="relative overflow-hidden rounded-2xl border border-border dark:border-white/10 bg-card dark:bg-gradient-to-b dark:from-[#121B2F] dark:to-[#0C1220] p-5 sm:p-6 shadow-card min-w-0">
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#FF5A1F] via-[#38BDF8] to-transparent" />
        <h2 className="mb-5 text-base font-bold text-primary">{t('ui.monthly_income_growth_trend_f50c47f')}</h2>
        {charts.mrrAreaSeries[0]?.data.length ? <div className="h-72 min-w-0"><Chart options={charts.mrrAreaOptions} series={charts.mrrAreaSeries} type="area" height="100%" /></div> : <SuperadminAnalyticsDashboardChartEmptyState />}
      </article>
      <article className="relative overflow-hidden rounded-2xl border border-border dark:border-white/10 bg-card dark:bg-gradient-to-b dark:from-[#121B2F] dark:to-[#0C1220] p-5 sm:p-6 shadow-card min-w-0">
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#38BDF8] via-[#10B981] to-transparent" />
        <h2 className="mb-5 text-base font-bold text-primary">{t('ui.gym_growth_vs_members_lost_a78d866')}</h2>
        {charts.tenantBarSeries[0]?.data.length ? <div className="h-72 min-w-0"><Chart options={charts.tenantBarOptions} series={charts.tenantBarSeries} type="bar" height="100%" /></div> : <SuperadminAnalyticsDashboardChartEmptyState />}
      </article>
    </section>
  );
}
