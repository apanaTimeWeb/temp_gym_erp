// RESPONSIBILITY: Next.js loading.tsx — renders skeleton loader fallback while Diet Library module data loads.
import ManagerTableSkeleton from '@/components/ui/manager_table_skeleton/ManagerTableSkeleton';
/** @description Route-level Loading for the Manager frontend module. */
/**
 * @description Renders the route-segment skeleton while the module data or route is loading. The skeleton mirrors the module layout without initiating data fetching. @dependencies Uses the module route shell or confirmation provider plus approved application infrastructure only. @edge-case Preserves safe fallback/recovery behavior and avoids exposing implementation details to the user. 
 */
export default function Loading() {
 return (
 <div className="min-h-screen flex flex-col p-6 space-y-5 bg-page">
 <div className="h-20 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse"><div className="m-5 h-5 w-48 rounded bg-skeleton-highlight" /></div>
 <ManagerTableSkeleton rows={8} />
 </div>
 );
}
