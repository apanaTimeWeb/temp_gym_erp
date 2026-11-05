"use client";
// RESPONSIBILITY: Renders the owning Trainer route error state using the module design-system patterns.
import TrainerInfrastructureRouteErrorFallback from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsTrainerInfrastructureRouteErrorFallback';

import { TRAINER_SESSIONS_URLS } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/config/trainer_coaching_sessions.url_config';




/**
 * @description Provides the sessions route-level recovery boundary and exposes a safe retry path without leaking implementation diagnostics.
 * @dependencies Uses only documented sessions module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Provides reset() recovery without exposing technical error details to the user.
 */
export default function TrainerSessionsRouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div data-testid="trainer_sessions-route-error_boundary">
    <TrainerInfrastructureRouteErrorFallback moduleName="sessions" route={TRAINER_SESSIONS_URLS.ROUTES.LIST} errorDigest={error.digest} reset={reset} />
  </div>;
}
