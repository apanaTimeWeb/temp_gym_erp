// RESPONSIBILITY: Presents the dashboard overview’s empty-data explanation and caller-provided action; it does not fetch dashboard metrics or decide which dashboard datasets are available.
'use client';

import { useId } from 'react';
import { BarChart3 } from 'lucide-react';

type ManagerDashboardOverviewEmptyStateProps = {
  title: string;
  message: string;
  actionLabel: string;
  onAction: () => void;
};

/** Feature-local empty state for dashboard chart panels. */
export default function ManagerDashboardOverviewEmptyState({ title, message, actionLabel, onAction }: ManagerDashboardOverviewEmptyStateProps) {
  const titleId = useId();

  return (
    <section className="flex min-w-0 min-h-72 flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-5 text-center" aria-labelledby={titleId} data-testid="manager-dashboard-chart-empty-state">
      <BarChart3 size={24} aria-hidden="true" className="text-text-secondary" />
      <h3 id={titleId} className="text-base font-semibold text-text-primary">{title}</h3>
      <p className="max-w-prose text-sm text-text-secondary">{message}</p>
      <button type="button" onClick={onAction} className="min-h-11 rounded-lg px-4 py-2 text-sm font-medium text-on-primary bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-colors motion-safe:duration-200" data-testid="manager_dashboard-dashboard-overview-empty-state-button-action">
        {actionLabel}
      </button>
    </section>
  );
}
