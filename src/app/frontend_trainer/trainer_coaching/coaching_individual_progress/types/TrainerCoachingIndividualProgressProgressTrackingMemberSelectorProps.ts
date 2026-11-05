// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerProgressTrackingMemberSummary } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/types/TrainerCoachingIndividualProgressProgressTrackingMemberSummary';

export interface TrainerProgressTrackingMemberSelectorProps {
  allMembers: TrainerProgressTrackingMemberSummary[];
  selectedIds: string[];
  onToggle: (memberId: string) => void;
}
