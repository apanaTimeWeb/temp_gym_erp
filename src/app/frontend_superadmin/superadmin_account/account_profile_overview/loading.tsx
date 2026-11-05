// RESPONSIBILITY: Skeleton loader for the Superadmin Profile page.
/**
 * @description Skeleton loader for the Superadmin Profile page.
 * @dependencies Consumes the owning feature contract and approved global zero-business UI/infrastructure only.
 * @edge-case Preserves documented loading, empty, error, retry, keyboard, responsive, and repeated-action behavior where applicable.
 */
export default function SuperadminAccountProfileLoading() {
    return (<div data-testid="superadmin_account_profile-loading-superadmin_account_profile-loading-state" className="space-y-6">
      <div>
        <div className="h-8 w-40 bg-skeleton-base motion-safe:animate-pulse rounded mb-2"/>
        <div className="h-4 w-72 bg-skeleton-base motion-safe:animate-pulse rounded"/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Avatar card skeleton */}
        <div className="lg:col-span-1 bg-card border border-border rounded-xl p-6 flex flex-col items-center gap-4 shadow-card">
          <div className="w-20 h-20 rounded-full bg-skeleton-base motion-safe:animate-pulse"/>
          <div className="space-y-2 w-full text-center">
            <div className="h-5 w-32 bg-skeleton-base motion-safe:animate-pulse rounded mx-auto"/>
            <div className="h-4 w-44 bg-skeleton-base motion-safe:animate-pulse rounded mx-auto"/>
          </div>
          <div className="h-7 w-28 bg-skeleton-base motion-safe:animate-pulse rounded-full"/>
          <div className="w-full border-t border-border pt-4 space-y-3">
            {[1, 2, 3].map((i) => (<div key={`skeleton-${i}`} className="flex justify-between">
                <div className="h-4 w-20 bg-skeleton-base motion-safe:animate-pulse rounded"/>
                <div className="h-4 w-24 bg-skeleton-base motion-safe:animate-pulse rounded"/>
              </div>))}
          </div>
        </div>

        {/* Form card skeleton */}
        <div className="lg:col-span-3 bg-card border border-border rounded-xl shadow-card overflow-hidden">
          <div className="flex border-b border-border">
            <div className="h-12 w-28 bg-skeleton-base motion-safe:animate-pulse m-1 rounded"/>
            <div className="h-12 w-24 bg-skeleton-base motion-safe:animate-pulse m-1 rounded"/>
          </div>
          <div className="p-6 space-y-5">
            {[1, 2, 3].map((i) => (<div key={`skeleton-${i}`} className="space-y-1.5">
                <div className="h-4 w-28 bg-skeleton-base motion-safe:animate-pulse rounded"/>
                <div className="h-10 w-full bg-skeleton-base motion-safe:animate-pulse rounded-lg"/>
              </div>))}
            <div className="flex justify-end pt-2">
              <div className="h-10 w-32 bg-skeleton-base motion-safe:animate-pulse rounded-lg"/>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
