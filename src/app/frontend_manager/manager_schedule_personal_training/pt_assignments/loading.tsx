// RESPONSIBILITY: Next.js loading skeleton for /manager/pt.
/** @description Route-level ManagerPtAssignmentsLoading for the Manager frontend module. */
export default function ManagerPtAssignmentsLoading() {
  return (
    <div className="max-w-5xl mx-auto space-y-6 p-6">
      <div className="h-8 w-48 bg-skeleton-base bg-skeleton-highlight motion-safe:animate-pulse rounded" />
      <div className="h-12 w-96 bg-skeleton-base motion-safe:animate-pulse rounded-xl" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={`skeleton-${i}`} className="bg-card border border-border rounded-xl p-5 space-y-3 motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
            <div className="h-5 w-32 bg-skeleton-base motion-safe:animate-pulse rounded" />
            <div className="h-8 w-20 bg-skeleton-base motion-safe:animate-pulse rounded" />
            <div className="h-4 w-full bg-skeleton-base motion-safe:animate-pulse rounded" />
            <div className="h-10 w-full bg-skeleton-base motion-safe:animate-pulse rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
