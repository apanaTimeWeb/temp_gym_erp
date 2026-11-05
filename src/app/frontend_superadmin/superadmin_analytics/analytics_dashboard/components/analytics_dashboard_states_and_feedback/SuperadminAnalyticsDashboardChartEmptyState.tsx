// RESPONSIBILITY: Displays an explicit, localized empty state when the analytics API returns no monthly chart records.
'use client';
import { BarChart3 } from 'lucide-react';
import { useTranslations } from 'next-intl';

/** Displays an explicit, localized empty state when the analytics API returns no monthly chart records. */
export function SuperadminAnalyticsDashboardChartEmptyState() {
  const t = useTranslations('superadmin_analytics');
  return (
    <div className="flex h-72 flex-col items-center justify-center gap-3 rounded-lg border border-border bg-surface-highlight p-6 text-center" role="status" data-testid="superadmin_analytics-chart-empty-state">
      <BarChart3 size={28} className="text-secondary" aria-hidden="true" />
      <p className="text-sm text-secondary">{t('ui.analytics_chart_empty_state')}</p>
    </div>
  );
}
