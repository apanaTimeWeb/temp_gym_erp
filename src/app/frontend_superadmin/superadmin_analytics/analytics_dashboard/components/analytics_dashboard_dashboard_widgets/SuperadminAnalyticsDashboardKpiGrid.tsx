// RESPONSIBILITY: Renders/orchestrates SuperadminAnalyticsDashboardKpiGrid within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the read-only analytics KPI cards from the feature view-model.
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { SuperadminAnalyticsKpiGridProps } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/types/superadmin_analytics_dashboard_kpi_grid.types';



/**
 * @description Displays analytics KPI cards without owning derivation, API, or mutation logic.
 * @dependencies Receives fully-derived feature view-model data from the analytics hook.
 * @edge-case Empty card arrays render an empty grid without inventing placeholder business values.
 */
export function SuperadminAnalyticsDashboardKpiGrid({ cards }: SuperadminAnalyticsKpiGridProps) {
  const t = useTranslations('superadmin_analytics');
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5" aria-label={t('ui.analytics_key_performance_indicators')}>
      {cards.map((card) => {
        const Icon = card.icon;
        const DeltaIcon = (() => { if (card.deltaDirection === 'up') { return (ArrowUp); } if (card.deltaDirection === 'down') { return (ArrowDown); } return (null); })();
        const deltaColor = (() => { if (card.deltaTone === 'success') { return ('text-success'); } if (card.deltaTone === 'danger') { return ('text-danger'); } return ('text-secondary'); })();
        return (
          <article key={card.label} className="rounded-xl border border-border bg-card p-6 shadow-card motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-1">
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="text-xs font-medium uppercase tracking-wider text-secondary">{card.label}</span>
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${card.iconBgClass}`} aria-hidden="true">
                <Icon size={18} className={card.iconColorClass} strokeWidth={2} />
              </div>
            </div>
            <p className="text-3xl font-bold text-primary">{card.value}</p>
            {card.delta ? (
              <p className={`mt-2 flex items-center gap-1 text-xs font-medium ${deltaColor}`}>
                {DeltaIcon ? <DeltaIcon size={18} strokeWidth={2} aria-hidden="true" /> : null}
                {card.delta}
              </p>
            ) : null}
          </article>
        );
      })}
    </section>
  );
}
