"use client";
// RESPONSIBILITY: Renders the owning Trainer route error state using the module design-system patterns.
import TrainerInfrastructureRouteErrorFallback from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/components/TrainerOperationsWeeklyAvailabilityTrainerInfrastructureRouteErrorFallback';

import { TRAINER_SCHEDULE_URLS } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/config/trainer_operations_weekly_availability.url_config';




/**
 * @description Provides the schedule route-level recovery boundary and exposes a safe retry path without leaking implementation diagnostics.
 * @dependencies Uses only documented schedule module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Provides reset() recovery without exposing technical error details to the user.
 */
export default function TrainerScheduleRouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div data-testid="trainer_schedule-route-error_boundary">
    <TrainerInfrastructureRouteErrorFallback moduleName="schedule" route={TRAINER_SCHEDULE_URLS.ROUTES.LIST} errorDigest={error.digest} reset={reset} />
  </div>;
}
