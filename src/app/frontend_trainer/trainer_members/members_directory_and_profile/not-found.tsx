import TrainerMembersNotFoundView from "@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileNotFoundView";

/**
 * @description Provides the members route not-found presentation and recovery/navigation affordances.
 * @dependencies Uses only documented members module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerMembersNotFound() {
  return <div data-testid="trainer_members-route-not_found"><TrainerMembersNotFoundView /></div>;
}
