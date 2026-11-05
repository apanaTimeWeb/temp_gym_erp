// RESPONSIBILITY: Framework route boundary for the Manager referrals module; renders the route-level shell, loading, error, or 404 state.
/** @description Route-level Loading for the Manager frontend module. */
/**
 * @description Renders the route-segment skeleton while the module data or route is loading. The skeleton mirrors the module layout without initiating data fetching. @dependencies Uses the module route shell or confirmation provider plus approved application infrastructure only. @edge-case Preserves safe fallback/recovery behavior and avoids exposing implementation details to the user. 
 */
export default function Loading() {
  return (
    <div className="min-h-full pb-10">
      <div className="px-6 pt-6 pb-0 flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-skeleton-base bg-skeleton-highlight rounded-md motion-safe:animate-pulse border border-border"></div>
          <div className="h-4 w-64 bg-card rounded-md motion-safe:animate-pulse border border-border"></div>
        </div>
        <div className="h-10 w-32 bg-card rounded-lg motion-safe:animate-pulse border border-border"></div>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={`skeleton-${i}`} className="h-28 bg-card rounded-xl border border-border motion-safe:animate-pulse"></div>
          ))}
        </div>
        <div className="min-h-96 bg-card rounded-xl border border-border motion-safe:animate-pulse"></div>
      </div>
    </div>
  );
}
