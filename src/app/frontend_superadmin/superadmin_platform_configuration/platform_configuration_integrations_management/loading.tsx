// RESPONSIBILITY: Renders the structural loading state for this Superadmin page.
/**
 * @description Renders the structural loading state for this Superadmin page.
 * @dependencies Consumes the owning feature contract and approved global zero-business UI/infrastructure only.
 * @edge-case Preserves documented loading, empty, error, retry, keyboard, responsive, and repeated-action behavior where applicable.
 */
export default function Loading() {
    return (<div data-testid="superadmin_platform_configuration_integrations-loading-superadmin_platform_configuration_integrations-loading-state" className="space-y-6">
      <div className="h-10 w-72 rounded bg-skeleton-base motion-safe:animate-pulse"/>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="h-28 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
        <div className="h-28 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
        <div className="h-28 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
        <div className="h-28 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
      </div>
      <div className="h-96 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
    </div>);
}
