// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerLibraryDietPlan, TrainerLibraryAssignedMember } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/types/TrainerCoachingDietLibraryAndAssignmentsTypes';

export interface TrainerLibraryAssignModalProps {
  isOpen: boolean;
  plan: TrainerLibraryDietPlan | null;
  members: TrainerLibraryAssignedMember[];
  membersLoading?: boolean;
  membersError?: boolean;
  onRetryMembers?: () => void;
  isSaving: boolean;
  errorMessage?: string;
  onClose: () => void;
  onSubmit: (memberIds: string[], idempotencyKey: string) => Promise<void>;
  testId?: string;
}
