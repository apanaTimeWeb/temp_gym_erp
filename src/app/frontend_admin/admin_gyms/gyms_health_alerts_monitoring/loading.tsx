// RESPONSIBILITY: Skeleton loading UI for the Gym Health Alerts page.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_gym_health_alerts/gym_health_alerts_monitoring/loading.tsx)

/**
 * GymHealthAlertsLoading is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export default function GymHealthAlertsLoading() {
  return (
    <div className="p-6 space-y-6" data-testid="admin_gym_health_alerts-loading-state">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {["row-1", "row-2", "row-3", "row-4"].map(i => <div key={`gym-health-alerts-skeleton-${i}`} className="h-28 bg-skeleton-base rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />)}
      </div>
      <div className="flex gap-3 flex-wrap">
        {["row-1", "row-2", "row-3", "row-4"].map(i => <div key={`gym-health-alerts-skeleton-${i}`} className="h-10 w-40 bg-skeleton-base rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />)}
      </div>
      <div className="h-96 bg-skeleton-base rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />
    </div>
  );
}
