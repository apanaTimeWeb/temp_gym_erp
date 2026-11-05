// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerProgressTrackingComparisonMemberSnapshot } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/types/TrainerCoachingProgressComparisonProgressTrackingTypes';

export interface TrainerProgressTrackingComparisonTableProps {
  snapshots: TrainerProgressTrackingComparisonMemberSnapshot[];
}
