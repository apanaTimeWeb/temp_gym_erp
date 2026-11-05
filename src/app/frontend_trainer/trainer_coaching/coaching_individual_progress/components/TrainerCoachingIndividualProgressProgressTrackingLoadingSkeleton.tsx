"use client";
// RESPONSIBILITY: Structural loading skeleton matching the progress-tracking page geometry.
import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/components/TrainerCoachingIndividualProgressTrainerInfrastructureSkeletonBlock';
/**
 * @description Structural loading skeleton matching the progress-tracking page geometry.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders the progress tracking feature's structural loading skeleton without introducing fake business data.
 * @dependencies Uses only documented progress tracking module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Does not expose fake business records while data is unavailable.
 */
export default function TrainerProgressTrackingLoadingSkeleton() { return <div data-testid="trainer_progress_tracking-progress-tracking_loading_skeleton" className="contents"> <div className="p-6 space-y-5"><TrainerInfrastructureSkeletonBlock className="h-12 rounded-xl" /><TrainerInfrastructureSkeletonBlock className="h-14 rounded-xl" /><TrainerInfrastructureSkeletonBlock className="h-80 rounded-xl" /></div> </div>; }
