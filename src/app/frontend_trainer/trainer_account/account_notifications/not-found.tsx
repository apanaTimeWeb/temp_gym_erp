import TrainerNotificationsNotFoundView from "@/app/frontend_trainer/trainer_account/account_notifications/components/TrainerAccountNotificationsNotificationsNotFoundView";

/**
 * @description Provides the notifications route not-found presentation and recovery/navigation affordances.
 * @dependencies Uses only documented notifications module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerNotificationsNotFound() {
  return <div data-testid="trainer_notifications-route-not_found"><TrainerNotificationsNotFoundView /></div>;
}
