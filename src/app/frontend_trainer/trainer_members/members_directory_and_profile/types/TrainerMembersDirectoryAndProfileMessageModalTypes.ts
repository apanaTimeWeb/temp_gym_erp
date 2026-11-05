// RESPONSIBILITY: View-prop contract for the Members-owned messaging modal.
import type { TrainerMembersMemberMessageType, TrainerMembersTrainerMemberMessageRecipient } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/types/TrainerMembersDirectoryAndProfileMessagingTypes';

export interface TrainerMembersMessageModalProps {
  isOpen?: boolean;
  open?: boolean;
  onClose: () => void;
  recipient: TrainerMembersTrainerMemberMessageRecipient;
  type: TrainerMembersMemberMessageType;
  defaultMessage?: string;
  message?: string;
  subject?: string;
  onSuccess?: () => void;
}
