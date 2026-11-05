// RESPONSIBILITY: Renders/orchestrates SuperadminAnalyticsReportsCenterRevenueTab within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders and composes SuperadminAnalyticsReportsCenterRevenueTab for the owning feature module; business logic and API transport remain in module-owned hooks/services.


import { useTranslations, useLocale } from 'next-intl';
import dynamic from 'next/dynamic';

import { CHART_COLORS } from '@/components/ui/ChartConstants';

import { useSuperadminAnalyticsReportsCenterTheme } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/hooks/useSuperadminAnalyticsReportsCenterTheme';
import { formatCurrency as SuperadminAnalyticsReportsFormatCurrency } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/utils/SuperadminAnalyticsReportsCenterFormatCurrency';
import { formatKPI } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/utils/SuperadminAnalyticsReportsCenterNumberFormatter';

import type { SuperadminAnalyticsReportsRevenueTabProps } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/types/superadmin_analytics_reports_center_tab.types';


const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
/**
 * Responsibility: Renders the SuperadminAnalyticsReportsCenterRevenueTab UI boundary for the owning Superadmin feature.
 * Dependencies: Receives typed feature data/actions from the owning module; contains no cross-feature business ownership.
 * Accessibility: Preserves semantic controls, keyboard access, and feature-defined test selectors.
 * Invariants: Visual styling consumes approved semantic tokens and the component remains below the documented size ceiling.
 */
export function SuperadminAnalyticsReportsCenterRevenueTab({ revenueData, currency = 'INR' }: SuperadminAnalyticsReportsRevenueTabProps) {
  const t = useTranslations('superadmin_analytics_reports');
    const locale = useLocale();
    const { theme } = useSuperadminAnalyticsReportsCenterTheme();
    if (revenueData.length === 0) return <div className="rounded-xl border border-border bg-card p-8 text-center" role="status"><h2 className="font-semibold text-primary">{t('ui.no_report_data_title')}</h2><p className="mt-2 text-sm text-secondary">{t('ui.no_report_data_description')}</p></div>;

    const revenueChartOptions = {
        chart: { type: 'area' as const, toolbar: { show: false }, background: 'transparent' },
        colors: [CHART_COLORS.PRIMARY, CHART_COLORS.DANGER],
        fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.3, opacityTo: 0.02, stops: [0, 90, 100] } },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth' as const, width: 2 },
        xaxis: {
            categories: revenueData.map((d) => d.month),
            axisBorder: { show: false }, axisTicks: { show: false },
            labels: { style: { colors: CHART_COLORS.TEXT_SECONDARY } },
        },
        yaxis: {
            labels: {
                style: { colors: CHART_COLORS.TEXT_SECONDARY },
                formatter: (v: number) => formatKPI(v, locale),
            },
        },
        grid: { borderColor: CHART_COLORS.BORDER, strokeDashArray: 4 },
        legend: { labels: { colors: CHART_COLORS.TEXT_SECONDARY }, position: 'top' as const, horizontalAlign: 'left' as const },
        theme: { mode: theme },
        tooltip: { theme },
    };
    const revenueChartSeries = [
        { name: t('ui.table_monthly_income'), data: revenueData.map((d) => d.mrr) },
        { name: t('ui.lost_income_4be3f735'), data: revenueData.map((d) => d.cancelledRevenue) },
    ];
    return (<div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-6 shadow-card">
        <h2 className="text-base font-semibold text-primary mb-6">{t('ui.monthly_income_vs_lost_income_66e9d339')}</h2>
        <div className="h-72">
          <Chart options={revenueChartOptions} series={revenueChartSeries} type="area" height="100%"/>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-input">
                {[t('ui.table_month'), t('ui.table_monthly_income'), t('ui.table_new_revenue'), t('ui.table_lost_income'), t('ui.table_net_revenue'), t('ui.table_gyms')].map((h) => (<th key={h} className="text-start px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider">{h}</th>))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {revenueData.map((row) => (<tr key={row.month} className="hover:bg-input motion-safe:transition-colors">
                  <td className="px-4 py-3 font-medium text-primary">{row.month}</td>
                  <td className="px-4 py-3 text-primary">{SuperadminAnalyticsReportsFormatCurrency(row.mrr, currency, locale)}</td>
                  <td className="px-4 py-3 text-success">{t('ui.text_26b17225')}{SuperadminAnalyticsReportsFormatCurrency(row.newRevenue, currency, locale)}</td>
                  <td className="px-4 py-3 text-danger">{t('ui.text_336d5ebc')}{SuperadminAnalyticsReportsFormatCurrency(row.cancelledRevenue, currency, locale)}</td>
                  <td className="px-4 py-3 font-semibold text-primary">{SuperadminAnalyticsReportsFormatCurrency(row.netRevenue, currency, locale)}</td>
                  <td className="px-4 py-3 text-secondary">{row.tenantCount}</td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </div>
    </div>);
}

