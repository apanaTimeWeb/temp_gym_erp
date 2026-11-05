"use client";
// RESPONSIBILITY: Structural loading skeleton matching the profile page geometry.
import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_account/account_personal_profile/components/TrainerAccountPersonalProfileTrainerInfrastructureSkeletonBlock';
/**
 * @description Structural loading skeleton matching the profile page geometry.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders the profile feature's structural loading skeleton without introducing fake business data.
 * @dependencies Uses only documented profile module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Does not expose fake business records while data is unavailable.
 */
export default function TrainerProfileLoadingSkeleton() { return <div data-testid="trainer_profile-loading-skeleton" className="contents"> <div className="p-6 space-y-5"><TrainerInfrastructureSkeletonBlock className="h-24 rounded-xl" /><TrainerInfrastructureSkeletonBlock className="h-12 rounded-xl" /><TrainerInfrastructureSkeletonBlock className="h-80 rounded-xl" /></div> </div>; }
