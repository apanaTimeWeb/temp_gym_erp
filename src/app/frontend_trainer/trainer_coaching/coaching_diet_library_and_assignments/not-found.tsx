import TrainerLibraryNotFoundView from "@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/components/TrainerCoachingDietLibraryAndAssignmentsNotFoundView";

/**
 * @description Provides the library route not-found presentation and recovery/navigation affordances.
 * @dependencies Uses only documented library module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerLibraryNotFound() {
  return <div data-testid="trainer_library-route-not_found"><TrainerLibraryNotFoundView /></div>;
}
