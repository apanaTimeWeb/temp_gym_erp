import TrainerSessionsNotFoundView from "@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsNotFoundView";

/**
 * @description Provides the sessions route not-found presentation and recovery/navigation affordances.
 * @dependencies Uses only documented sessions module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerSessionsNotFound() {
  return <div data-testid="trainer_sessions-route-not_found"><TrainerSessionsNotFoundView /></div>;
}
