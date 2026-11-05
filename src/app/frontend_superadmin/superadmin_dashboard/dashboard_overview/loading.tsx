// RESPONSIBILITY: Skeleton loader for the Dashboard page. Mimics the actual layout: header, 10 KPI cards, chart panels, recent onboards.
/**
 * @description Skeleton loader for the Dashboard page. Mimics the actual layout: header, 10 KPI cards, chart panels, recent onboards.
 * @dependencies Consumes the owning feature contract and approved global zero-business UI/infrastructure only.
 * @edge-case Preserves documented loading, empty, error, retry, keyboard, responsive, and repeated-action behavior where applicable.
 */
export default function Loading() {
    return (<div data-testid="superadmin_dashboard-loading-superadmin_dashboard-loading-state" className="space-y-6">
      {/* Header skeleton */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <div className="h-8 w-48 bg-skeleton-base motion-safe:animate-pulse rounded mb-2"/>
          <div className="h-4 w-80 bg-skeleton-base motion-safe:animate-pulse rounded"/>
        </div>
        <div className="h-10 w-48 bg-skeleton-base motion-safe:animate-pulse rounded-lg"/>
      </div>

      {/* 10 KPI card skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {Array.from({ length: 10 }, (_, i) => (<div key={`kpi-skeleton-${i}`} className="bg-skeleton-base border border-border rounded-xl p-6 h-32 motion-safe:animate-pulse"/>))}
      </div>

      {/* Chart panel skeletons: revenue area + gym growth bar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-skeleton-base border border-border rounded-xl p-6 h-80 motion-safe:animate-pulse"/>
        <div className="bg-skeleton-base border border-border rounded-xl p-6 h-80 motion-safe:animate-pulse"/>
      </div>

      {/* Chart panel skeletons: plan donut + geo bar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-skeleton-base border border-border rounded-xl p-6 h-80 motion-safe:animate-pulse"/>
        <div className="lg:col-span-2 bg-skeleton-base border border-border rounded-xl p-6 h-80 motion-safe:animate-pulse"/>
      </div>

      {/* Recent onboards skeleton */}
      <div className="bg-skeleton-base border border-border rounded-xl p-6 motion-safe:animate-pulse">
        <div className="h-5 w-40 bg-skeleton-highlight rounded mb-6"/>
        <div className="space-y-4">
          {Array.from({ length: 5 }, (_, i) => (<div key={`onboard-skeleton-${i}`} className="flex items-center justify-between p-4 bg-skeleton-highlight rounded-lg">
              <div className="space-y-2 flex-1">
                <div className="h-4 w-40 bg-skeleton-base rounded"/>
                <div className="h-3 w-28 bg-skeleton-base rounded"/>
              </div>
              <div className="ms-3 flex flex-col items-end gap-2">
                <div className="h-5 w-16 bg-skeleton-base rounded-full"/>
                <div className="h-3 w-20 bg-skeleton-base rounded"/>
              </div>
            </div>))}
        </div>
      </div>
    </div>);
}
