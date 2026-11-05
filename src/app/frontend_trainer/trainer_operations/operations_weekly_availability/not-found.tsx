import TrainerScheduleNotFoundView from "@/app/frontend_trainer/trainer_operations/operations_weekly_availability/components/TrainerOperationsWeeklyAvailabilityScheduleNotFoundView";

/**
 * @description Provides the schedule route not-found presentation and recovery/navigation affordances.
 * @dependencies Uses only documented schedule module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerScheduleNotFound() {
  return <div data-testid="trainer_schedule-route-not_found"><TrainerScheduleNotFoundView /></div>;
}
