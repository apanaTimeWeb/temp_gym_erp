// RESPONSIBILITY: Renders the reports section sectionloading state.
'use client';
export default function SuperadminAnalyticsReportsCenterSectionLoading() {
  return <div className="space-y-3 rounded-xl border border-border bg-card p-6" aria-busy="true" role="status"><div className="h-5 w-40 rounded bg-skeleton-base motion-safe:animate-pulse"/><div className="h-48 w-full rounded bg-skeleton-base motion-safe:animate-pulse"/></div>;
}
