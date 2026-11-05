"use client";
// RESPONSIBILITY: Structural loading skeleton matching the library page geometry.
import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/components/TrainerCoachingDietLibraryAndAssignmentsTrainerInfrastructureSkeletonBlock';
/**
 * @description Structural loading skeleton matching the library page geometry.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders the library feature's structural loading skeleton without introducing fake business data.
 * @dependencies Uses only documented library module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Does not expose fake business records while data is unavailable.
 */
export default function TrainerLibraryLoadingSkeleton() { return <div data-testid="trainer_library-loading-skeleton" className="contents"> <div className="p-6 space-y-5"><TrainerInfrastructureSkeletonBlock className="h-14 rounded-xl" /><div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">{Array.from({ length: 6 }).map((_, i) => <TrainerInfrastructureSkeletonBlock key={`skeleton-card-${i}`} className="h-48 rounded-xl" />)}</div></div> </div>; }
