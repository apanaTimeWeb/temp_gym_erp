// RESPONSIBILITY: Renders/orchestrates loading for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_blacklist/blacklist_management/loading.tsx)

/**
 * BlacklistLoading is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export default function BlacklistLoading() {
  return (
    <div className="p-6 space-y-6" data-testid="admin_blacklist-loading-state">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {["row-1", "row-2", "row-3", "row-4"].map(i => <div key={`blacklist-skeleton-${i}`} className="h-28 bg-skeleton-base rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />)}
      </div>
      <div className="h-12 bg-skeleton-base rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />
      <div className="h-80 bg-skeleton-base rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />
    </div>
  );
}
