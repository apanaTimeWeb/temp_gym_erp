// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerLibraryDietPlan } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/types/TrainerCoachingDietLibraryAndAssignmentsTypes';

export interface TrainerLibraryDietModalProps {
  isOpen: boolean;
  plan: TrainerLibraryDietPlan | null;
  onClose: () => void;
  onAssign?: () => void;
  onEdit?: () => void;
  onRequestDelete?: () => void;
}
