"use client";
// RESPONSIBILITY: Structural loading skeleton matching the members page geometry.
import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileTrainerInfrastructureSkeletonBlock';
/**
 * @description Structural loading skeleton matching the members page geometry.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders the members feature's structural loading skeleton without introducing fake business data.
 * @dependencies Uses only documented members module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Does not expose fake business records while data is unavailable.
 */
export default function TrainerMembersLoadingSkeleton() { return <div data-testid="trainer_members-loading-skeleton" className="contents"> <div className="p-6 space-y-5"><div className="grid grid-cols-1 sm:grid-cols-3 gap-4">{Array.from({ length: 3 }).map((_, i) => <TrainerInfrastructureSkeletonBlock key={`skeleton-card-${i}`} className="h-28 rounded-xl" />)}</div><TrainerInfrastructureSkeletonBlock className="h-16 rounded-xl" /><TrainerInfrastructureSkeletonBlock className="h-96 rounded-xl" /></div> </div>; }
