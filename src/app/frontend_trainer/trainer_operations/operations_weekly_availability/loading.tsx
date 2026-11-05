// RESPONSIBILITY: Renders the owning Trainer route loading state using the module design-system patterns.
import TrainerScheduleLoadingSkeleton from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/components/TrainerOperationsWeeklyAvailabilityScheduleLoadingSkeleton';
/**
 * @description Provides the schedule route loading state while preserving the global shell geometry and accessibility expectations.
 * @dependencies Uses only documented schedule module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerScheduleLoading() { return <div data-testid="trainer_schedule-route-loading"><TrainerScheduleLoadingSkeleton /></div>; }
