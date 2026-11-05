"use client";
// RESPONSIBILITY: Renders the owning Trainer route error state using the module design-system patterns.
import TrainerInfrastructureRouteErrorFallback from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/components/TrainerCoachingIndividualProgressTrainerInfrastructureRouteErrorFallback';

import { TRAINER_PROGRESS_TRACKING_URLS } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/config/trainer_coaching_individual_progress.url_config';




/**
 * @description Provides the progress tracking route-level recovery boundary and exposes a safe retry path without leaking implementation diagnostics.
 * @dependencies Uses only documented progress tracking module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Provides reset() recovery without exposing technical error details to the user.
 */
export default function TrainerProgressTrackingRouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div data-testid="trainer_progress_tracking-route-error_boundary">
    <TrainerInfrastructureRouteErrorFallback moduleName="progress-tracking" route={TRAINER_PROGRESS_TRACKING_URLS.ROUTES.LIST} errorDigest={error.digest} reset={reset} />
  </div>;
}
