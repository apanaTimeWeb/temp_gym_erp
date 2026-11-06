// RESPONSIBILITY: Renders/orchestrates loading for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_profile/profile_overview/loading.tsx)

/**
 * AdminProfileLoading renders the admin profile loading UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminProfileLoading() {
  return (
    <div className="p-6 max-w-4xl space-y-6 w-full" data-testid="admin_profile-loading-state">
      <div className="h-8 w-48 bg-skeleton-base motion-safe:animate-pulse rounded motion-safe:duration-base" />
      <div className="h-28 bg-skeleton-base motion-safe:animate-pulse rounded-xl border border-border motion-safe:duration-base" />
      <div className="h-10 w-64 bg-skeleton-base motion-safe:animate-pulse rounded-xl motion-safe:duration-base" />
      <div className="h-64 bg-skeleton-base motion-safe:animate-pulse rounded-xl border border-border motion-safe:duration-base" />
    </div>
  );
}
