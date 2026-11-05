// RESPONSIBILITY: Renders the skeleton loading fallback for the branches module.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_branches/branches_directory/loading.tsx)

/**
 * BranchesLoading is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export default function BranchesLoading() {
  return (
    <div className="min-h-full p-6 space-y-6 bg-page" data-testid="admin_branches-loading-state">
      {/* Header skeleton */}
      <div className="h-16 bg-skeleton-base rounded-xl motion-safe:animate-pulse motion-safe:duration-base" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {["row-1", "row-2", "row-3", "row-4"].map(i => (
          <div key={`branches-skeleton-${i}`} className="h-64 bg-skeleton-base rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />
        ))}
      </div>
    </div>
  );
}
