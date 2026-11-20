// RESPONSIBILITY: Renders the skeleton loading fallback for gyms comparison.
// DATA FLOW: Next.js route/lifecycle → gyms_comparison/loading.tsx

export default function AdminGymsComparisonLoading() {
  return (
    <div className="min-h-full p-6 space-y-6 bg-page" data-testid="admin_gyms_comparison-loading-state">
      <div className="h-16 bg-skeleton-base rounded-xl motion-safe:animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {['kpi-1', 'kpi-2', 'kpi-3', 'kpi-4'].map((k) => (
          <div key={k} className="h-28 bg-skeleton-base rounded-xl motion-safe:animate-pulse border border-border" />
        ))}
      </div>
      <div className="h-96 bg-skeleton-base rounded-xl motion-safe:animate-pulse border border-border" />
    </div>
  );
}
