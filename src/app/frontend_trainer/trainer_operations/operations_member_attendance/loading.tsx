// RESPONSIBILITY: Renders the owning Trainer route loading state using the module design-system patterns.
import TrainerAttendanceLoadingSkeleton from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/components/TrainerOperationsMemberAttendanceAttendanceLoadingSkeleton';
/**
 * @description Provides the attendance route loading state while preserving the global shell geometry and accessibility expectations.
 * @dependencies Uses only documented attendance module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerAttendanceLoading() { return <div data-testid="trainer_attendance-route-loading"><TrainerAttendanceLoadingSkeleton /></div>; }
