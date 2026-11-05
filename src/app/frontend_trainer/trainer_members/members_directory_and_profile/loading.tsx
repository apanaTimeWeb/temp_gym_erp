// RESPONSIBILITY: Renders the owning Trainer route loading state using the module design-system patterns.
import TrainerMembersLoadingSkeleton from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileLoadingSkeleton';
/**
 * @description Provides the members route loading state while preserving the global shell geometry and accessibility expectations.
 * @dependencies Uses only documented members module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerMembersLoading() { return <div data-testid="trainer_members-route-loading"><TrainerMembersLoadingSkeleton /></div>; }
