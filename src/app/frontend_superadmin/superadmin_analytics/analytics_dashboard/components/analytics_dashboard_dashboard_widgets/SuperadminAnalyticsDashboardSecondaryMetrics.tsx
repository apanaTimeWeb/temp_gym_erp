// RESPONSIBILITY: Renders/orchestrates SuperadminAnalyticsDashboardSecondaryMetrics within its owning Superadmin feature module; no direct backend implementation.
'use client';
import { Activity, IndianRupee } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { SuperadminAnalyticsSecondaryMetricsProps } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/types/superadmin_analytics_dashboard_secondary_metrics.types';

export function SuperadminAnalyticsDashboardSecondaryMetrics({ metrics }: SuperadminAnalyticsSecondaryMetricsProps) {
  const t = useTranslations('superadmin_analytics');
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2" aria-label={t('ui.secondary_analytics_metrics')}>
      {metrics.map((metric) => {
        const Icon = metric.icon === 'activity' ? Activity : IndianRupee;
        const label = t(metric.labelKey);
        const isSuccess = metric.tone === 'success';
        return (
          <article
            key={metric.key}
            className={`relative overflow-hidden rounded-2xl border p-5 sm:p-6 shadow-card bg-card dark:bg-gradient-to-br ${
              isSuccess
                ? 'border-border dark:border-emerald-500/35 dark:from-[#0C2722] dark:via-[#121E2D] dark:to-[#0C1220]'
                : 'border-border dark:border-amber-500/35 dark:from-[#281E10] dark:via-[#151B2C] dark:to-[#0C1220]'
            }`}
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${
                isSuccess ? 'from-[#10B981] via-[#34D399] to-transparent' : 'from-[#F59E0B] via-[#FACC15] to-transparent'
              }`}
            />
            <div className="mb-2 flex items-center gap-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl border ${isSuccess ? 'bg-success-bg border-emerald-500/35' : 'bg-warning-bg border-amber-500/35'}`} aria-hidden="true">
                <Icon size={18} className={isSuccess ? 'text-success' : 'text-warning'} strokeWidth={2.2} />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary">{label}</span>
            </div>
            <p className="mt-3 text-2xl sm:text-3xl font-extrabold text-primary tabular-nums">{metric.value}</p>
            <p className="mt-2 pt-2.5 border-t border-border/60 dark:border-white/10 text-xs font-medium text-secondary">
              {metric.helperValue ? `${t(metric.helperKey)} ${metric.helperValue}${t('ui.x_cedfd68')}` : t(metric.helperKey)}
            </p>
          </article>
        );
      })}
    </section>
  );
}
