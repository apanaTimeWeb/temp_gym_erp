"use client";
// RESPONSIBILITY: Renders the owning Trainer route error state using the module design-system patterns.
import TrainerInfrastructureRouteErrorFallback from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileTrainerInfrastructureRouteErrorFallback';

import { TRAINER_MEMBERS_URLS } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/config/members_directory_and_profile.url_config';




/**
 * @description Provides the members route-level recovery boundary and exposes a safe retry path without leaking implementation diagnostics.
 * @dependencies Uses only documented members module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Provides reset() recovery without exposing technical error details to the user.
 */
export default function TrainerMembersRouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div data-testid="trainer_members-route-error_boundary">
    <TrainerInfrastructureRouteErrorFallback moduleName="members" route={TRAINER_MEMBERS_URLS.ROUTES.LIST} errorDigest={error.digest} reset={reset} />
  </div>;
}
