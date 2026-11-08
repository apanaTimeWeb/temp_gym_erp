// RESPONSIBILITY: Next.js loading skeleton for /manager/profile. Mimics avatar card + tabs + form layout.
/** @description Route-level ManagerProfileAndSecurityLoading for the Manager frontend module. */
export default function ManagerProfileAndSecurityLoading() {
  return (
    <div className="w-full max-w-4xl space-y-6">
      <div className="h-8 w-40 bg-skeleton-base bg-skeleton-highlight motion-safe:animate-pulse rounded" />
      <div className="bg-card border border-border rounded-xl p-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-skeleton-base motion-safe:animate-pulse shrink-0" />
        <div className="space-y-2 flex-1">
          <div className="h-5 w-36 bg-skeleton-base motion-safe:animate-pulse rounded" />
          <div className="h-4 w-48 bg-skeleton-base motion-safe:animate-pulse rounded" />
        </div>
      </div>
      <div className="h-10 w-64 bg-skeleton-base motion-safe:animate-pulse rounded-xl" />
      <div className="bg-card border border-border rounded-xl p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[...Array(4)].map((_, i) => (
            <div key={`skeleton-${i}`} className="space-y-2">
              <div className="h-4 w-24 bg-skeleton-base motion-safe:animate-pulse rounded" />
              <div className="h-10 w-full bg-skeleton-base motion-safe:animate-pulse rounded-lg" />
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <div className="h-10 w-32 bg-skeleton-base motion-safe:animate-pulse rounded-lg" />
        </div>
      </div>
    </div>
  );
}
