// RESPONSIBILITY: Renders the owning Trainer route loading state using the module design-system patterns.
import TrainerProfileLoadingSkeleton from '@/app/frontend_trainer/trainer_account/account_personal_profile/components/TrainerAccountPersonalProfileProfileLoadingSkeleton';
/**
 * @description Provides the profile route loading state while preserving the global shell geometry and accessibility expectations.
 * @dependencies Uses only documented profile module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerProfileLoading() { return <div data-testid="trainer_profile-route-loading" className="p-6"><TrainerProfileLoadingSkeleton /></div>; }
