// RESPONSIBILITY: Renders/orchestrates SuperadminAnalyticsDashboardMainLoadingState within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the analytics route skeleton while the primary query is pending.
/**
 * @description Provides layout-matching skeletons for the analytics header, KPI cards, and charts.
 * @dependencies Uses only semantic skeleton theme tokens.
 * @edge-case Keeps deterministic dimensions to avoid layout shift during hydration.
 */
export function SuperadminAnalyticsDashboardMainLoadingState() {
  return (
    <section className="space-y-6" aria-busy="true" data-testid="superadmin_analytics-superadmin-analytics-main-loading-state-superadmin_analytics-main-loading-state">
      <div className="space-y-2" data-testid="superadmin_analytics-analyticsmainloadingstate-state">
        <div className="h-7 w-64 rounded bg-skeleton-base motion-safe:animate-pulse" aria-hidden="true" />
        <div className="h-4 w-96 max-w-full rounded bg-skeleton-base motion-safe:animate-pulse" aria-hidden="true" />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => <div key={`analytics-kpi-${index}`} className="h-32 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse" aria-hidden="true" />)}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => <div key={`analytics-chart-${index}`} className="h-80 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse" aria-hidden="true" />)}
      </div>
    </section>
  );
}
