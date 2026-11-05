// RESPONSIBILITY: Renders the owning Trainer route loading state using the module design-system patterns.
import TrainerNotificationsLoadingSkeleton from '@/app/frontend_trainer/trainer_account/account_notifications/components/TrainerAccountNotificationsNotificationsLoadingSkeleton';
/**
 * @description Provides the notifications route loading state while preserving the global shell geometry and accessibility expectations.
 * @dependencies Uses only documented notifications module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerNotificationsLoading() { return <div data-testid="trainer_notifications-route-loading"><TrainerNotificationsLoadingSkeleton /></div>; }
