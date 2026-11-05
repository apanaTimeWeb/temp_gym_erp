// RESPONSIBILITY: Renders/orchestrates SuperadminAnalyticsDashboardSecondaryMetrics within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the LTV and CAC secondary analytics cards from the feature view-model.
import { Activity, IndianRupee } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { SuperadminAnalyticsSecondaryMetricsProps } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/types/superadmin_analytics_dashboard_secondary_metrics.types';



/**
 * @description Renders secondary financial KPI cards without calculating business metrics in JSX.
 * @dependencies Consumes only feature-derived secondary metric view-model data.
 * @edge-case Missing ratio values are rendered without inventing a fallback number.
 */
export function SuperadminAnalyticsDashboardSecondaryMetrics({ metrics }: SuperadminAnalyticsSecondaryMetricsProps) {
  const t = useTranslations('superadmin_analytics');
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2" aria-label={t('ui.secondary_analytics_metrics')}>
      {metrics.map((metric) => {
        const Icon = metric.icon === 'activity' ? Activity : IndianRupee;
        const label = t(metric.labelKey);
        return (
          <article key={metric.key} className="rounded-xl border border-border bg-card p-6 shadow-card">
            <div className="mb-2 flex items-center gap-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${metric.tone === 'success' ? 'bg-success-bg' : 'bg-warning-bg'}`} aria-hidden="true">
                <Icon size={18} className={metric.tone === 'success' ? 'text-success' : 'text-warning'} strokeWidth={2} />
              </div>
              <span className="text-xs font-medium uppercase tracking-wider text-secondary">{label}</span>
            </div>
            <p className="mt-3 text-3xl font-bold text-primary">{metric.value}</p>
            <p className="mt-2 text-xs text-secondary">
              {metric.helperValue ? `${t(metric.helperKey)} ${metric.helperValue}${t('ui.x_cedfd68')}` : t(metric.helperKey)}
            </p>
          </article>
        );
      })}
    </section>
  );
}
