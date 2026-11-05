// RESPONSIBILITY: Renders Superadmin Audit Compliance Dashboard Loading Skeleton using its declared props and feature-local hooks.
/**
 * @description Renders the Superadmin compliance loading skeleton interface within its owning Superadmin feature using the declared typed props.
 * @dependencies Consumes the component props and local imports listed in this file; domain logic must remain in the owning feature module.
 * @edge-case Keep null/empty data safe, expose validation or error feedback where applicable, and preserve keyboard/focus and repeated-action behavior.
 */
export default function SuperadminAuditComplianceDashboardLoadingSkeleton() {
  return <div className="space-y-6" aria-busy="true" data-testid="superadmin-compliance-loading">
    <div className="h-10 w-72 max-w-full rounded bg-skeleton-base motion-safe:animate-pulse" />
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">{[1, 2, 3, 4].map((item) => <div key={item} className="h-28 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse" />)}</div>
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2"><div className="h-80 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse"/><div className="h-80 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse"/></div>
    <div className="h-72 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse" />
  </div>;
}
