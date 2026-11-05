import { TrainerMembersAttendanceMockHandlers } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/mocks/handlers/TrainerMembersDirectoryAndProfileAttendanceMockHandlers';
import { TrainerMembersBrowseMockHandlers } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/mocks/handlers/TrainerMembersDirectoryAndProfileBrowseMockHandlers';
import { TrainerMembersProfileMockHandlers } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/mocks/handlers/TrainerMembersDirectoryAndProfileProfileMockHandlers';

/**
 * @description Composes every module-owned MSW handler group for the Trainer Members feature.
 * @dependencies Browse, profile/mutation, and attendance handler groups only.
 */
export const TrainerMembersMockHandlers = [
  ...TrainerMembersBrowseMockHandlers,
  ...TrainerMembersProfileMockHandlers,
  ...TrainerMembersAttendanceMockHandlers,
];
