// RESPONSIBILITY: Next.js loading skeleton for /manager/settings.
/** @description Route-level ManagerBusinessSettingsLoading for the Manager frontend module. */
export default function ManagerBusinessSettingsLoading() {
  return (
    <div className="w-full max-w-5xl space-y-6">
      <div className="h-8 w-36 bg-skeleton-base bg-skeleton-highlight motion-safe:animate-pulse rounded" />
      {[...Array(2)].map((_, i) => (
        <div key={`skeleton-${i}`} className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="h-5 w-48 bg-skeleton-base motion-safe:animate-pulse rounded" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[...Array(2)].map((_, j) => (
              <div key={`field-${j}`} className="space-y-2">
                <div className="h-4 w-20 bg-skeleton-base motion-safe:animate-pulse rounded" />
                <div className="h-10 w-full bg-skeleton-base motion-safe:animate-pulse rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
