"use client";
// RESPONSIBILITY: Structural loading skeleton matching the dashboard page geometry.
import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/components/TrainerDashboardOverviewTrainerInfrastructureSkeletonBlock';
/**
 * @description Structural loading skeleton matching the dashboard page geometry.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders the dashboard feature's structural loading skeleton without introducing fake business data.
 * @dependencies Uses only documented dashboard module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Does not expose fake business records while data is unavailable.
 */
export default function TrainerDashboardLoadingSkeleton() { return <div data-testid="trainer_dashboard-loading-skeleton" className="contents"> <div className="p-6 space-y-5"><div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">{Array.from({ length: 8 }).map((_, i) => <TrainerInfrastructureSkeletonBlock key={`skeleton-card-${i}`} className="h-28 rounded-xl" />)}</div><div className="grid grid-cols-1 lg:grid-cols-2 gap-5"><TrainerInfrastructureSkeletonBlock className="h-64 rounded-xl" /><TrainerInfrastructureSkeletonBlock className="h-64 rounded-xl" /></div></div> </div>; }
