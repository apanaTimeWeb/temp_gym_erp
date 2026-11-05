"use client";
// RESPONSIBILITY: Renders the owning Trainer route error state using the module design-system patterns.
import { TRAINER_DASHBOARD_URLS } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/config/trainer_dashboard_overview.url_config';

import TrainerInfrastructureRouteErrorFallback from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/components/TrainerDashboardOverviewTrainerInfrastructureRouteErrorFallback';




/**
 * @description Provides the dashboard route-level recovery boundary and exposes a safe retry path without leaking implementation diagnostics.
 * @dependencies Uses only documented dashboard module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Provides reset() recovery without exposing technical error details to the user.
 */
export default function TrainerDashboardRouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div data-testid="trainer_dashboard-route-error_boundary">
    <TrainerInfrastructureRouteErrorFallback moduleName="dashboard" route={TRAINER_DASHBOARD_URLS.ROUTES.LIST} errorDigest={error.digest} reset={reset} />
  </div>;
}
