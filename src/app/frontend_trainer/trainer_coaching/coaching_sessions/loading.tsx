// RESPONSIBILITY: Renders the owning Trainer route loading state using the module design-system patterns.
import TrainerSessionsLoadingSkeleton from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsLoadingSkeleton';
/**
 * @description Provides the sessions route loading state while preserving the global shell geometry and accessibility expectations.
 * @dependencies Uses only documented sessions module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerSessionsLoading() { return <div data-testid="trainer_sessions-route-loading"><TrainerSessionsLoadingSkeleton /></div>; }
