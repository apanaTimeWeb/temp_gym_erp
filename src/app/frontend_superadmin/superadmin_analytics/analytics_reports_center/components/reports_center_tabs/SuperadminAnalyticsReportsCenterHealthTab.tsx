// RESPONSIBILITY: Renders/orchestrates SuperadminAnalyticsReportsCenterHealthTab within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminAnalyticsReportsCenterHealthTab owned by the superadmin_analytics_reports feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useLocale, useTranslations.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/components/reports_center_states_and_feedback/SuperadminAnalyticsReportsCenterProgressBar, lucide-react, next-intl, @/lib/formatters, @/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/constants/superadmin_analytics_reports_center.constants, @/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/types/superadmin_analytics_reports_center_tab.types, @/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/types/superadmin_analytics_reports_center.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the Reports Health Tab component and its associated UI logic.


import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import SuperadminAnalyticsReportsProgressBar from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/components/reports_center_states_and_feedback/SuperadminAnalyticsReportsCenterProgressBar';
import { GRADE_STYLES, PAYMENT_HEALTH_STYLES, TICKET_DANGER_THRESHOLD, TICKET_WARNING_THRESHOLD, SUPERADMIN_REPORT_PAYMENT_HEALTH_CODES } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/constants/superadmin_analytics_reports_center.constants';
import { formatNumber } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/utils/SuperadminAnalyticsReportsCenterNumberFormatter';

import type { SuperadminAnalyticsReportsHealthTabProps } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/types/superadmin_analytics_reports_center_tab.types';


/**
 * Responsibility: Renders the SuperadminAnalyticsReportsCenterHealthTab UI boundary for the owning Superadmin feature.
 * Dependencies: Receives typed feature data/actions from the owning module; contains no cross-feature business ownership.
 * Accessibility: Preserves semantic controls, keyboard access, and feature-defined test selectors.
 * Invariants: Visual styling consumes approved semantic tokens and the component remains below the documented size ceiling.
 */
export function SuperadminAnalyticsReportsCenterHealthTab({ sortedHealthData }: SuperadminAnalyticsReportsHealthTabProps) {
  const t = useTranslations('superadmin_analytics_reports');
  const locale = useLocale();
  if (sortedHealthData.length === 0) return <div className="rounded-xl border border-border bg-card p-8 text-center" role="status"><h2 className="font-semibold text-primary">{t('ui.no_report_data_title')}</h2><p className="mt-2 text-sm text-secondary">{t('ui.no_report_data_description')}</p></div>;
  const formatDate = (value: string) => { const date = new Date(value); return Number.isNaN(date.getTime()) ? '—' : new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(date); };
  const paymentLabel = (value: string) => t(`ui.payment_${value.toLowerCase()}`);
    function renderTicketCount(count: number) {
        const color = (() => { if (count > TICKET_DANGER_THRESHOLD) { return ('text-danger'); } if (count > TICKET_WARNING_THRESHOLD) { return ('text-warning'); } return ('text-secondary'); })();
        return <span className={`text-xs font-medium ${color}`}>{count}</span>;
    }
    return (<div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-input">
              {[t('ui.health_gym'), t('ui.health_plan'), t('ui.health_score'), t('ui.health_grade'), t('ui.health_members'), t('ui.health_last_login'), t('ui.health_payment'), t('ui.health_feature_use'), t('ui.health_tickets')].map((h) => (<th key={h} className="text-start px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider">{h}</th>))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedHealthData.map((row) => (<tr key={row.id} className="hover:bg-input motion-safe:transition-colors">
                <td className="px-4 py-3 font-medium text-primary">{row.gymName}</td>
                <td className="px-4 py-3 text-secondary text-xs">{row.plan}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-input rounded-full overflow-hidden">
                      <SuperadminAnalyticsReportsProgressBar value={row.score} fillClassName={(() => { if (row.score >= 80) { return ('fill-success-bg'); } if (row.score >= 60) { return ('fill-primary-subtle'); } if (row.score >= 40) { return ('fill-warning-bg'); } return ('fill-danger-bg'); })()}/>
                    </div>
                    <span className="text-primary font-medium text-xs">{formatNumber(row.score, locale)}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold ${GRADE_STYLES[row.grade]}`}>
                    {row.grade}
                  </span>
                </td>
                <td className="px-4 py-3 text-secondary">{formatNumber(row.memberCount, locale)}</td>
                <td className="px-4 py-3 text-secondary text-xs">{formatDate(row.lastLogin)}</td>
                <td className="px-4 py-3">
                  <div className={`flex items-center gap-1 text-xs font-medium ${PAYMENT_HEALTH_STYLES[row.paymentHealth]}`}>
                    {row.paymentHealth === SUPERADMIN_REPORT_PAYMENT_HEALTH_CODES.GOOD && <CheckCircle2 size={18} strokeWidth={2}/>}
                    {row.paymentHealth === SUPERADMIN_REPORT_PAYMENT_HEALTH_CODES.AT_RISK && <AlertTriangle size={18} strokeWidth={2}/>}
                    {row.paymentHealth === SUPERADMIN_REPORT_PAYMENT_HEALTH_CODES.OVERDUE && <XCircle size={18} strokeWidth={2}/>}
                    {paymentLabel(row.paymentHealth)}
                  </div>
                </td>
                <td className="px-4 py-3 text-secondary">{row.featureUsage}{t('ui.text_0bcef9c4')}</td>
                <td className="px-4 py-3">{renderTicketCount(row.supportTickets)}</td>
              </tr>))}
          </tbody>
        </table>
      </div>
    </div>);
}
