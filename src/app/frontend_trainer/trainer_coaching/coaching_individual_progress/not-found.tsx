import TrainerProgressTrackingNotFoundView from "@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/components/TrainerCoachingIndividualProgressProgressTrackingNotFoundView";

/**
 * @description Provides the progress tracking route not-found presentation and recovery/navigation affordances.
 * @dependencies Uses only documented progress tracking module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerProgressTrackingNotFound() {
  return <div data-testid="trainer_progress_tracking-route-not_found"><TrainerProgressTrackingNotFoundView /></div>;
}
