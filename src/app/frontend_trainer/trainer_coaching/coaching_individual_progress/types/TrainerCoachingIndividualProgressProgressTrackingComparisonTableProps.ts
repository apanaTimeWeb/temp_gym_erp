// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerProgressTrackingComparisonMemberSnapshot } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/types/TrainerCoachingIndividualProgressProgressTrackingTypes';

export interface TrainerProgressTrackingComparisonTableProps {
  snapshots: TrainerProgressTrackingComparisonMemberSnapshot[];
}
