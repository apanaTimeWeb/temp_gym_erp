// RESPONSIBILITY: Renders the owning Trainer route loading state using the module design-system patterns.
import TrainerDashboardLoadingSkeleton from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/components/TrainerDashboardOverviewLoadingSkeleton';
/**
 * @description Provides the dashboard route loading state while preserving the global shell geometry and accessibility expectations.
 * @dependencies Uses only documented dashboard module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerDashboardOverviewLoading() { return <div data-testid="trainer_dashboard-route-loading"><TrainerDashboardLoadingSkeleton /></div>; }
