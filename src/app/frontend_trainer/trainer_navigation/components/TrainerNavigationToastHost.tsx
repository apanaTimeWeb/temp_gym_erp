"use client";
// RESPONSIBILITY: Mounts the single Trainer-wide sonner renderer with Smart Gym 360 semantic token styling.
import { Toaster } from 'sonner';

/**
 * @description Mounts the single Trainer-wide sonner renderer with Smart Gym 360 semantic token styling.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Hosts Trainer feedback toasts using stable, deduplicated notification behavior defined by the infrastructure contract.
 * @dependencies Uses only documented infrastructure module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerNavigationToastHost() {
  return <Toaster position="bottom-right" duration={4000} toastOptions={{ className: 'w-80 p-4 rounded-lg bg-card text-primary border border-border shadow-toast' }} />;
}
