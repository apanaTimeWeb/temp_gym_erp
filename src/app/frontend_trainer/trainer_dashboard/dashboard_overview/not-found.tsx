import TrainerDashboardNotFoundView from "@/app/frontend_trainer/trainer_dashboard/dashboard_overview/components/TrainerDashboardOverviewNotFoundView";

/**
 * @description Provides the dashboard route not-found presentation and recovery/navigation affordances.
 * @dependencies Uses only documented dashboard module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerDashboardOverviewNotFound() {
  return <div data-testid="trainer_dashboard-route-not_found"><TrainerDashboardNotFoundView /></div>;
}
