// RESPONSIBILITY: Renders the skeleton loading fallback for the dashboard layout.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_dashboard/dashboard_overview/loading.tsx)

/**
 * DashboardLoading is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export default function DashboardLoading() {
  return (
    <div className="min-h-full p-6 space-y-6 bg-page" data-testid="admin_dashboard-loading-state">
      {/* Header skeleton */}
      <div className="h-16 bg-skeleton-base rounded-xl motion-safe:animate-pulse motion-safe:duration-base" />

      {/* KPI row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {["row-1", "row-2", "row-3", "row-4"].map(i => (
          <div key={`dashboard-skeleton-${i}`} className="h-28 bg-skeleton-base rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />
        ))}
      </div>

      {/* KPI row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {["row-1", "row-2", "row-3", "row-4"].map(i => (
          <div key={`dashboard-skeleton-${i}`} className="h-28 bg-skeleton-base rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />
        ))}
      </div>

      {/* Main content area */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 h-80 bg-skeleton-base rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />
        <div className="space-y-4">
          <div className="h-48 bg-skeleton-base rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />
          <div className="h-28 bg-skeleton-base rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />
        </div>
      </div>

      {/* Distribution */}
      <div className="h-40 bg-skeleton-base rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />
    </div>
  );
}
