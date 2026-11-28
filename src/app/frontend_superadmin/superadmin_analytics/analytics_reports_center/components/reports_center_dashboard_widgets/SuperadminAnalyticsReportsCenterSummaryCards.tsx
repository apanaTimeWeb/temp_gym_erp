// RESPONSIBILITY: Renders/orchestrates SuperadminAnalyticsReportsCenterSummaryCards within its owning Superadmin feature module; no direct backend implementation.
'use client';
import { TrendingDown, HeartPulse, IndianRupee } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import { formatCurrency as SuperadminAnalyticsReportsFormatCurrency } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/utils/SuperadminAnalyticsReportsCenterFormatCurrency';

import type { SuperadminAnalyticsReportsSummaryCardsProps } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/types/superadmin_analytics_reports_center_tab.types';

export function SuperadminAnalyticsReportsCenterSummaryCards({ totalMRR, totalCancelledRevenue, cancellationsCount, avgHealthScore, healthDataLength, dateSuffix, incomeChangePercent, currency = 'INR' }: SuperadminAnalyticsReportsSummaryCardsProps) {
  const t = useTranslations('superadmin_analytics_reports');
  const locale = useLocale();
  const suffix = dateSuffix ? ` · ${dateSuffix}` : '';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="relative overflow-hidden bg-card dark:bg-gradient-to-br dark:from-[#2B1513] dark:via-[#141B2D] dark:to-[#0C1220] border border-border dark:border-orange-500/35 rounded-2xl p-5 shadow-card motion-safe:hover:-translate-y-0.5 motion-safe:transition-all motion-safe:duration-base">
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#FF5A1F] via-[#FB923C] to-transparent" />
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-semibold text-secondary uppercase tracking-wider truncate">{t('ui.current_monthly_income_f5480af1')}{suffix}</span>
          <span className="p-2 rounded-xl bg-orange-500/15 border border-orange-500/35 text-primary shrink-0"><IndianRupee size={16} strokeWidth={2.2} /></span>
        </div>
        <p className="text-2xl sm:text-[26px] font-extrabold text-primary tabular-nums">{SuperadminAnalyticsReportsFormatCurrency(totalMRR, currency, locale)}</p>
        <p className="mt-2.5 pt-2 border-t border-border/60 dark:border-white/10 text-xs font-medium text-success-text">{incomeChangePercent === null ? t('ui.no_prior_period_comparison_7c3a1d5e') : t('ui.vs_prior_month_2a7c9e1d', { percent: `${incomeChangePercent > 0 ? '+' : ''}${incomeChangePercent}` })}</p>
      </div>
      <div className="relative overflow-hidden bg-card dark:bg-gradient-to-br dark:from-[#2B121B] dark:via-[#141B2D] dark:to-[#0C1220] border border-border dark:border-rose-500/35 rounded-2xl p-5 shadow-card motion-safe:hover:-translate-y-0.5 motion-safe:transition-all motion-safe:duration-base">
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#F43F5E] via-[#FB7185] to-transparent" />
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-semibold text-secondary uppercase tracking-wider truncate">{t('ui.lost_income_4be3f735')}{suffix}</span>
          <span className="p-2 rounded-xl bg-rose-500/15 border border-rose-500/35 text-danger shrink-0"><TrendingDown size={16} strokeWidth={2.2} /></span>
        </div>
        <p className="text-2xl sm:text-[26px] font-extrabold text-primary tabular-nums">{SuperadminAnalyticsReportsFormatCurrency(totalCancelledRevenue, currency, locale)}</p>
        <p className="mt-2.5 pt-2 border-t border-border/60 dark:border-white/10 text-xs font-medium text-danger-text">{cancellationsCount} {t('ui.tenants_cancelled_1754f602')}</p>
      </div>
      <div className="relative overflow-hidden bg-card dark:bg-gradient-to-br dark:from-[#0C2722] dark:via-[#121E2D] dark:to-[#0C1220] border border-border dark:border-emerald-500/35 rounded-2xl p-5 shadow-card motion-safe:hover:-translate-y-0.5 motion-safe:transition-all motion-safe:duration-base">
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#10B981] via-[#34D399] to-transparent" />
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-semibold text-secondary uppercase tracking-wider truncate">{t('ui.avg_health_score_368517c1')}{suffix}</span>
          <span className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/35 text-success shrink-0"><HeartPulse size={16} strokeWidth={2.2} /></span>
        </div>
        <p className="text-2xl sm:text-[26px] font-extrabold text-primary tabular-nums">{avgHealthScore}{t('ui.100_36d3d20a')}</p>
        <p className="mt-2.5 pt-2 border-t border-border/60 dark:border-white/10 text-xs font-medium text-secondary">{t('ui.across_810f43f3')}{healthDataLength} {t('ui.active_tenants_cf945827')}</p>
      </div>
    </div>
  );
}
