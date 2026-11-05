// RESPONSIBILITY: Skeleton loading UI for Admin Usage page.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_usage/usage_analytics/loading.tsx)

/**
 * AdminUsageLoading renders the admin usage loading UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminUsageLoading() {
  return (
    <div className="p-6 space-y-6" data-testid="admin_usage-loading-state">
      <div className="h-24 bg-skeleton-base rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={`usage-skeleton-${i}`} className="h-28 bg-skeleton-base rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />
        ))}
      </div>
      <div className="h-64 bg-skeleton-base rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />
    </div>
  );
}
