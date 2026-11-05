// RESPONSIBILITY: Next.js loading.tsx — renders skeleton loader fallback while Attendance tracking module data loads.
import ManagerTableSkeleton from '@/components/ui/manager_table_skeleton/ManagerTableSkeleton';
/** @description Route-level Loading for the Manager frontend module. */
/**
 * @description Renders the route-segment skeleton while the module data or route is loading. The skeleton mirrors the module layout without initiating data fetching. @dependencies Uses the module route shell or confirmation provider plus approved application infrastructure only. @edge-case Preserves safe fallback/recovery behavior and avoids exposing implementation details to the user. 
 */
export default function Loading() {
 return (
 <div className="min-h-screen flex flex-col p-6 space-y-5 bg-page">
 <div className="h-20 bg-skeleton-base bg-skeleton-highlight rounded-xl motion-safe:animate-pulse"></div>
 
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
 {[1, 2, 3].map(i => (
 <div key={`skeleton-${i}`} className="h-24 bg-card rounded-xl motion-safe:animate-pulse"></div>
 ))}
 </div>
 
 <ManagerTableSkeleton rows={8} />
 </div>
 );
}
