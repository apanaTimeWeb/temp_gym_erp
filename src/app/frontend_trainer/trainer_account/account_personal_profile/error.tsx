"use client";
// RESPONSIBILITY: Renders the owning Trainer route error state using the module design-system patterns.
import TrainerInfrastructureRouteErrorFallback from '@/app/frontend_trainer/trainer_account/account_personal_profile/components/TrainerAccountPersonalProfileTrainerInfrastructureRouteErrorFallback';

import { TRAINER_PROFILE_URLS } from '@/app/frontend_trainer/trainer_account/account_personal_profile/config/trainer_account_personal_profile.url_config';




/**
 * @description Provides the profile route-level recovery boundary and exposes a safe retry path without leaking implementation diagnostics.
 * @dependencies Uses only documented profile module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Provides reset() recovery without exposing technical error details to the user.
 */
export default function TrainerProfileRouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div data-testid="trainer_profile-route-error_boundary">
    <TrainerInfrastructureRouteErrorFallback moduleName="profile" route={TRAINER_PROFILE_URLS.ROUTES.LIST} errorDigest={error.digest} reset={reset} />
  </div>;
}
