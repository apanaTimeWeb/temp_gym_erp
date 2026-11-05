// AUTONOMOUS COPY: Module-local, WET-isolated copy of original trainer-infrastructure primitive.
// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerInfrastructureSearchableDropdownOption } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/types/TrainerMembersDirectoryAndProfileTrainerInfrastructureSearchableDropdownOption';

export interface TrainerInfrastructureSearchableDropdownProps {
  options: TrainerInfrastructureSearchableDropdownOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  /** Accessible name for the trigger when a visible external label is present. */
  ariaLabel?: string;
  /** Optional validation state exposed on the trigger control. */
  ariaInvalid?: boolean;
  /** Optional ID of the associated validation message. */
  ariaDescribedBy?: string;
  /** Optional deterministic AI-test identifier for the trigger control. */
  testId?: string;
  id?: string;
}
