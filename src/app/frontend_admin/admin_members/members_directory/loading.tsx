// RESPONSIBILITY: Skeleton loading UI for Admin Members page matching the KPIs + table layout.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_members/members_directory/loading.tsx)

/**
 * AdminMembersLoading renders the admin members loading UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminMembersLoading() {
  return (
    <div className="p-6 space-y-5" data-testid="admin_members-loading-state">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={`members-skeleton-${i}`} className="h-24 bg-skeleton-base rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />
        ))}
      </div>
      <div className="bg-skeleton-base rounded-xl border border-border p-4 space-y-4">
        <div className="flex gap-3 flex-wrap">
          <div className="h-10 flex-1 min-w-48 bg-skeleton-base rounded-xl motion-safe:animate-pulse motion-safe:duration-base" />
          <div className="h-10 w-44 bg-skeleton-base rounded-xl motion-safe:animate-pulse motion-safe:duration-base" />
          <div className="h-10 w-48 bg-skeleton-base rounded-xl motion-safe:animate-pulse motion-safe:duration-base" />
        </div>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={`members-skeleton-${i}`} className="h-12 bg-skeleton-base rounded-lg motion-safe:animate-pulse motion-safe:duration-base" />
          ))}
        </div>
      </div>
    </div>
  );
}
