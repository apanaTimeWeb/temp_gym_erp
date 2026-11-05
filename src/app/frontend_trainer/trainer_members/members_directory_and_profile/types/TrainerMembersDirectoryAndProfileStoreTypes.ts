// RESPONSIBILITY: UI-only Zustand state contract for the Trainer Members feature.
import type { TrainerMembersMemberMessageType, TrainerMembersTrainerMemberMessageRecipient } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/types/TrainerMembersDirectoryAndProfileMessagingTypes';

import type { TrainerMembersProfileTab } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/types/TrainerMembersDirectoryAndProfileProfileTypes';

import type { TrainerMembersFormValues } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/types/TrainerMembersDirectoryAndProfileTypes';





export interface TrainerMembersTrainerMemberMessageModalState {
  open: boolean;
  recipient: TrainerMembersTrainerMemberMessageRecipient;
  type: TrainerMembersMemberMessageType;
  message: string;
  subject?: string;
}

export interface TrainerMembersState {
  selectedMemberId: string | null;
  setSelectedMemberId: (id: string | null) => void;
  setSelectedMember: (memberId: string | null) => void;
  profileTab: TrainerMembersProfileTab;
  setProfileTab: (tab: TrainerMembersProfileTab) => void;
  editId: string | null;
  editData: TrainerMembersFormValues | null;
  setEditState: (id: string | null, data: TrainerMembersFormValues | null) => void;
  msgModal: TrainerMembersTrainerMemberMessageModalState | null;
  openMsg: (recipient: TrainerMembersTrainerMemberMessageRecipient, type: TrainerMembersMemberMessageType, message: string) => void;
  closeMsg: () => void;
}
