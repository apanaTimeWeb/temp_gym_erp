"use client";
// RESPONSIBILITY: Renders the owning Trainer route error state using the module design-system patterns.
import TrainerInfrastructureRouteErrorFallback from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/components/TrainerCoachingDietLibraryAndAssignmentsTrainerInfrastructureRouteErrorFallback';

import { TRAINER_LIBRARY_URLS } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/config/trainer_coaching_diet_library_and_assignments.url_config';




/**
 * @description Provides the library route-level recovery boundary and exposes a safe retry path without leaking implementation diagnostics.
 * @dependencies Uses only documented library module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Provides reset() recovery without exposing technical error details to the user.
 */
export default function TrainerLibraryRouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div data-testid="trainer_library-route-error_boundary">
    <TrainerInfrastructureRouteErrorFallback moduleName="library" route={TRAINER_LIBRARY_URLS.ROUTES.LIST} errorDigest={error.digest} reset={reset} />
  </div>;
}
