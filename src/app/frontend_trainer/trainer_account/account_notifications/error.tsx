"use client";
// RESPONSIBILITY: Renders the owning Trainer route error state using the module design-system patterns.
import TrainerInfrastructureRouteErrorFallback from '@/app/frontend_trainer/trainer_account/account_notifications/components/TrainerAccountNotificationsTrainerInfrastructureRouteErrorFallback';

import { TRAINER_NOTIFICATIONS_URLS } from '@/app/frontend_trainer/trainer_account/account_notifications/config/trainer_account_notifications.url_config';




/**
 * @description Provides the notifications route-level recovery boundary and exposes a safe retry path without leaking implementation diagnostics.
 * @dependencies Uses only documented notifications module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Provides reset() recovery without exposing technical error details to the user.
 */
export default function TrainerNotificationsRouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div data-testid="trainer_notifications-route-error_boundary">
    <TrainerInfrastructureRouteErrorFallback moduleName="notifications" route={TRAINER_NOTIFICATIONS_URLS.ROUTES.LIST} errorDigest={error.digest} reset={reset} />
  </div>;
}
