// AUTONOMOUS COPY: Module-local, WET-isolated copy of original trainer-infrastructure primitive.
// RESPONSIBILITY: Renders the shared skeleton surface and shimmer required by the global design system.
import type { TrainerInfrastructureSkeletonBlockProps } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/types/TrainerOperationsMemberAttendanceTrainerInfrastructureSkeletonBlockProps';

/**
 * @description Provides a structural skeleton block with an explicit base and highlight surface for loading states.
 * @dependencies Consumes only global semantic skeleton tokens and caller-provided geometry.
 * @edge-case Keeps the shimmer motion-safe and preserves caller dimensions without owning feature data.
 */
/**
 * @description Owns the infrastructure feature UI responsibility represented by TrainerInfrastructureSkeletonBlock, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented infrastructure module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerInfrastructureSkeletonBlock({ className = '', testId }: TrainerInfrastructureSkeletonBlockProps) {
  return (
    <div
      className={`relative overflow-hidden bg-skeleton-base ${className}`.trim()}
      aria-hidden="true"
      data-testid={testId}
    >
      <span className="absolute inset-0 bg-skeleton-highlight motion-safe:animate-pulse" aria-hidden="true" />
    </div>
  );
}
