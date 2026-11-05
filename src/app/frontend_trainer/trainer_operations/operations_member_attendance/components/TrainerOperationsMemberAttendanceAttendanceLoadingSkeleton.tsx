"use client";
// RESPONSIBILITY: Structural loading skeleton matching the attendance page geometry.
import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/components/TrainerOperationsMemberAttendanceTrainerInfrastructureSkeletonBlock';
/**
 * @description Structural loading skeleton matching the attendance page geometry.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders the attendance feature's structural loading skeleton without introducing fake business data.
 * @dependencies Uses only documented attendance module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Does not expose fake business records while data is unavailable.
 */
export default function TrainerAttendanceLoadingSkeleton() { return <div data-testid="trainer_attendance-loading-skeleton" className="contents"> <div className="p-6 space-y-5"><div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">{Array.from({ length: 4 }).map((_, i) => <TrainerInfrastructureSkeletonBlock key={`skeleton-card-${i}`} className="h-28 rounded-xl" />)}</div><TrainerInfrastructureSkeletonBlock className="h-12 rounded-xl" /><TrainerInfrastructureSkeletonBlock className="h-80 rounded-xl" /></div> </div>; }
