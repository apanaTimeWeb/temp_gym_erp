// RESPONSIBILITY: Renders/orchestrates SuperadminAnalyticsReportsCenterCancellationsTab within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders and composes SuperadminAnalyticsReportsCenterCancellationsTab for the owning feature module; business logic and API transport remain in module-owned hooks/services.


import { useTranslations, useLocale } from 'next-intl';
import dynamic from 'next/dynamic';

import { CHART_COLORS } from '@/components/ui/ChartConstants';

import { useSuperadminAnalyticsReportsCenterTheme } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/hooks/useSuperadminAnalyticsReportsCenterTheme';
import { formatCurrency as SuperadminAnalyticsReportsFormatCurrency } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/utils/SuperadminAnalyticsReportsCenterFormatCurrency';
import { formatSuperadminAnalyticsReportsCancellationDate } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/utils/SuperadminAnalyticsReportsCenterFormatDate';

import type { SuperadminAnalyticsReportsCancellationsTabProps } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/types/superadmin_analytics_reports_center_tab.types';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
/**
 * Responsibility: Renders the SuperadminAnalyticsReportsCenterCancellationsTab UI boundary for the owning Superadmin feature.
 * Dependencies: Receives typed feature data/actions from the owning module; contains no cross-feature business ownership.
 * Accessibility: Preserves semantic controls, keyboard access, and feature-defined test selectors.
 * Invariants: Visual styling consumes approved semantic tokens and the component remains below the documented size ceiling.
 */
export function SuperadminAnalyticsReportsCenterCancellationsTab({ cancellationsData, filteredCancellationsData, totalCancelledRevenue, avgDaysActive, currency = 'INR' }: SuperadminAnalyticsReportsCancellationsTabProps) {
  const t = useTranslations('superadmin_analytics_reports');
    const locale = useLocale();
    const formatDate = (value: string | null | undefined) => formatSuperadminAnalyticsReportsCancellationDate(value, locale);
    const { theme } = useSuperadminAnalyticsReportsCenterTheme();
    if (filteredCancellationsData.length === 0) return <div className="rounded-xl border border-border bg-card p-8 text-center" role="status"><h2 className="font-semibold text-primary">{t('ui.no_report_data_title')}</h2><p className="mt-2 text-sm text-secondary">{t('ui.no_report_data_description')}</p></div>;

    const cancellationsReasonCounts = cancellationsData.reduce<Record<string, number>>((acc, c) => {
        acc[c.reason] = (acc[c.reason] ?? 0) + 1;
        return acc;
    }, {});
    const cancellationsPieOptions = {
        chart: { type: 'donut' as const, background: 'transparent' },
        colors: [CHART_COLORS.DANGER, CHART_COLORS.WARNING, CHART_COLORS.PRIMARY, CHART_COLORS.INFO, CHART_COLORS.SUCCESS],
        labels: Object.keys(cancellationsReasonCounts),
        legend: { labels: { colors: CHART_COLORS.TEXT_SECONDARY }, position: 'bottom' as const },
        theme: { mode: theme },
        tooltip: { theme },
        dataLabels: { style: { colors: [CHART_COLORS.WHITE] } },
    };
    const cancellationsPieSeries = Object.values(cancellationsReasonCounts);
    return (<div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6 shadow-card">
          <h2 className="text-base font-semibold text-primary mb-6">{t('ui.reasons_for_leaving_b3adfab9')}</h2>
          <div className="h-64">
            <Chart options={cancellationsPieOptions} series={cancellationsPieSeries} type="donut" height="100%"/>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 shadow-card space-y-3">
          <h2 className="text-base font-semibold text-primary mb-2">{t('ui.lost_gyms_summary_d80c18f2')}</h2>
          <div className="flex justify-between text-sm"><span className="text-secondary">{t('ui.filtered_lost_gyms_20022ebf')}</span><span className="text-primary font-medium">{filteredCancellationsData.length}</span></div>
          <div className="flex justify-between text-sm"><span className="text-secondary">{t('ui.total_lost_monthly_income_9aacd4a7')}</span><span className="text-danger font-medium">{SuperadminAnalyticsReportsFormatCurrency(totalCancelledRevenue, currency, locale)}</span></div>
          <div className="flex justify-between text-sm"><span className="text-secondary">{t('ui.avg_days_active_before_leaving_e665cb48')}</span><span className="text-primary font-medium">{avgDaysActive} {t('ui.days_44fdec47')}</span></div>
          <div className="flex justify-between text-sm"><span className="text-secondary">{t('ui.top_reason_for_leaving_9fc1014e')}</span><span className="text-primary font-medium">{cancellationsData.length ? Object.entries(cancellationsData.reduce<Record<string,number>>((acc,row)=>{acc[row.reason]=(acc[row.reason]??0)+1;return acc},{})).sort((a,b)=>b[1]-a[1])[0]?.[0] ?? "—" : "—"}</span></div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-input">
                {[t('ui.table_gym'), t('ui.table_plan'), t('ui.table_left_on'), t('ui.table_reason'), t('ui.table_lost_monthly_income'), t('ui.table_days_active')].map((h) => (<th key={h} className="text-start px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider">{h}</th>))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCancellationsData.map((row) => (<tr key={row.id} className="hover:bg-input motion-safe:transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-primary">{row.gymName}</p>
                    <p className="text-xs text-secondary">{row.ownerName}</p>
                  </td>
                  <td className="px-4 py-3 text-secondary">{row.plan}</td>
                  <td className="px-4 py-3 text-secondary">{formatDate(row.cancelledAt)}</td>
                  <td className="px-4 py-3 text-secondary">{row.reason}</td>
                  <td className="px-4 py-3 text-danger font-medium">{SuperadminAnalyticsReportsFormatCurrency(row.mrr, currency, locale)}</td>
                  <td className="px-4 py-3 text-secondary">{row.daysActive}{t('ui.d_8277e091')}</td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </div>
    </div>);
}

