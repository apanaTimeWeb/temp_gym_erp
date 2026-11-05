// RESPONSIBILITY: Type contracts for member-directed messaging owned by the Members feature.
import { TRAINER_MEMBERS_MEMBER_MESSAGE_TYPES } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/config/TrainerMembersDirectoryAndProfileConstants';
export type TrainerMembersMemberMessageType = (typeof TRAINER_MEMBERS_MEMBER_MESSAGE_TYPES)[number];

export interface TrainerMembersTrainerMemberMessageRecipient {
  name: string;
  phone?: string;
  email?: string;
}
