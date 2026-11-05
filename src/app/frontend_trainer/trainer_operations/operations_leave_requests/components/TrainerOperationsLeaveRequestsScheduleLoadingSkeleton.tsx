"use client";
// RESPONSIBILITY: Structural loading skeleton matching the schedule page geometry.
import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/components/TrainerOperationsLeaveRequestsTrainerInfrastructureSkeletonBlock';
/**
 * @description Structural loading skeleton matching the schedule page geometry.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders the schedule feature's structural loading skeleton without introducing fake business data.
 * @dependencies Uses only documented schedule module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Does not expose fake business records while data is unavailable.
 */
export default function TrainerScheduleLoadingSkeleton() { return <div data-testid="trainer_schedule-loading-skeleton" className="contents"> <div className="p-6 space-y-5"><TrainerInfrastructureSkeletonBlock className="h-12 rounded-xl" /><TrainerInfrastructureSkeletonBlock className="h-14 rounded-xl" /><TrainerInfrastructureSkeletonBlock className="h-96 rounded-xl" /></div> </div>; }
