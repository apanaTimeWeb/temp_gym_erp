// RESPONSIBILITY: Renders/orchestrates SuperadminAnalyticsReportsCenterSummaryCards within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders and composes SuperadminAnalyticsReportsCenterSummaryCards for the owning feature module; business logic and API transport remain in module-owned hooks/services.


import { TrendingDown, HeartPulse, IndianRupee } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import { formatCurrency as SuperadminAnalyticsReportsFormatCurrency } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/utils/SuperadminAnalyticsReportsCenterFormatCurrency';

import type { SuperadminAnalyticsReportsSummaryCardsProps } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/types/superadmin_analytics_reports_center_tab.types';

/**
 * Responsibility: Renders the SuperadminAnalyticsReportsCenterSummaryCards UI boundary for the owning Superadmin feature.
 * Dependencies: Receives typed feature data/actions from the owning module; contains no cross-feature business ownership.
 * Accessibility: Preserves semantic controls, keyboard access, and feature-defined test selectors.
 * Invariants: Visual styling consumes approved semantic tokens and the component remains below the documented size ceiling.
 */
export function SuperadminAnalyticsReportsCenterSummaryCards({ totalMRR, totalCancelledRevenue, cancellationsCount, avgHealthScore, healthDataLength, dateSuffix, incomeChangePercent, currency = 'INR' }: SuperadminAnalyticsReportsSummaryCardsProps) {
  const t = useTranslations('superadmin_analytics_reports');
    const locale = useLocale();

    const suffix = dateSuffix ? ` · ${dateSuffix}` : '';
    return (<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-card border border-border rounded-xl p-5 shadow-card motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-card motion-safe:transition-all motion-safe:duration-base">
        <div className="flex items-center gap-2 mb-2">
          <IndianRupee size={18} className="text-primary" strokeWidth={2}/>
          <span className="text-xs text-secondary uppercase tracking-wider">{t('ui.current_monthly_income_f5480af1')}{suffix}</span>
        </div>
        <p className="text-3xl font-bold text-primary">{SuperadminAnalyticsReportsFormatCurrency(totalMRR, currency, locale)}</p>
        <p className="mt-1 text-xs text-success">{incomeChangePercent === null ? t('ui.no_prior_period_comparison_7c3a1d5e') : t('ui.vs_prior_month_2a7c9e1d', { percent: `${incomeChangePercent > 0 ? '+' : ''}${incomeChangePercent}` })}</p>
      </div>
      <div className="bg-card border border-border rounded-xl p-5 shadow-card motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-card motion-safe:transition-all motion-safe:duration-base">
        <div className="flex items-center gap-2 mb-2">
          <TrendingDown size={18} className="text-danger" strokeWidth={2}/>
          <span className="text-xs text-secondary uppercase tracking-wider">{t('ui.lost_income_4be3f735')}{suffix}</span>
        </div>
        <p className="text-3xl font-bold text-primary">{SuperadminAnalyticsReportsFormatCurrency(totalCancelledRevenue, currency, locale)}</p>
        <p className="mt-1 text-xs text-danger">{cancellationsCount} {t('ui.tenants_cancelled_1754f602')}</p>
      </div>
      <div className="bg-card border border-border rounded-xl p-5 shadow-card motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-card motion-safe:transition-all motion-safe:duration-base">
        <div className="flex items-center gap-2 mb-2">
          <HeartPulse size={18} className="text-success" strokeWidth={2}/>
          <span className="text-xs text-secondary uppercase tracking-wider">{t('ui.avg_health_score_368517c1')}{suffix}</span>
        </div>
        <p className="text-3xl font-bold text-primary">{avgHealthScore}{t('ui.100_36d3d20a')}</p>
        <p className="mt-1 text-xs text-secondary">{t('ui.across_810f43f3')}{healthDataLength} {t('ui.active_tenants_cf945827')}</p>
      </div>
    </div>);
}

