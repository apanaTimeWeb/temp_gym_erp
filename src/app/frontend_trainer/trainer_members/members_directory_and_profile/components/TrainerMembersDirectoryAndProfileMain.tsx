"use client";
// RESPONSIBILITY: Minimal Members route composition boundary. It delegates the complete view to the feature-owned content component.
import TrainerMembersContent from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileContent';

/**
 * @description Minimal Members route composition boundary. It delegates the complete view to the feature-owned content component.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Owns the members feature UI responsibility represented by TrainerMembersMain, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented members module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerMembersMain() {
  return <TrainerMembersContent />;
}
