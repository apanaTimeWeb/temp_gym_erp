"use client";
// RESPONSIBILITY: Minimal Notifications route composition boundary. It delegates the interaction surface to the feature-owned content component.
import TrainerNotificationsContent from '@/app/frontend_trainer/trainer_account/account_notifications/components/TrainerAccountNotificationsNotificationsContent';

/**
 * @description Minimal Notifications route composition boundary. It delegates the interaction surface to the feature-owned content component.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Owns the notifications feature UI responsibility represented by TrainerNotificationsMain, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented notifications module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerNotificationsMain() {
  return <TrainerNotificationsContent />;
}
