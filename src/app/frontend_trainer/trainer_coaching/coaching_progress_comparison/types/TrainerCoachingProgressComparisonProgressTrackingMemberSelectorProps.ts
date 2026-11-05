// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerProgressTrackingMemberSummary } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/types/TrainerCoachingProgressComparisonProgressTrackingMemberSummary';

export interface TrainerProgressTrackingMemberSelectorProps {
  allMembers: TrainerProgressTrackingMemberSummary[];
  selectedIds: string[];
  onToggle: (memberId: string) => void;
}
