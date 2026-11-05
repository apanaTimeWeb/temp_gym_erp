// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerProgressTrackingProgressEntry, TrainerProgressTrackingCreateProgressEntryDto } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/types/TrainerCoachingIndividualProgressProgressTrackingTypes';

export interface TrainerProgressTrackingModalProps {
  editingEntry: TrainerProgressTrackingProgressEntry | null;
  onSave: (data: TrainerProgressTrackingCreateProgressEntryDto) => Promise<boolean>;
  onClose: () => void;
  testId?: string;
}
