"use client";
// RESPONSIBILITY: Structural loading skeleton matching the workout page geometry.
import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/components/TrainerCoachingWorkoutPlansTrainerInfrastructureSkeletonBlock';
/**
 * @description Structural loading skeleton matching the workout page geometry.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders the workout feature's structural loading skeleton without introducing fake business data.
 * @dependencies Uses only documented workout module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Does not expose fake business records while data is unavailable.
 */
export default function TrainerWorkoutLoadingSkeleton() { return <div data-testid="trainer_workout-loading-skeleton" className="contents"> <div className="p-6 space-y-5"><TrainerInfrastructureSkeletonBlock className="h-24 rounded-xl" /><TrainerInfrastructureSkeletonBlock className="h-14 rounded-xl" /><TrainerInfrastructureSkeletonBlock className="h-96 rounded-xl" /></div> </div>; }
