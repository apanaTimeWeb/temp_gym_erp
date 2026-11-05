import { TRAINER_MEMBERS_MOCK_MEMBERS } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/mocks/handlers/TrainerMembersDirectoryAndProfileMockData';

let trainerMembersMockMembersDb = [...TRAINER_MEMBERS_MOCK_MEMBERS];

export function getTrainerMembersMockMembers(): typeof trainerMembersMockMembersDb {
  return trainerMembersMockMembersDb;
}

export function replaceTrainerMembersMockMembers(nextMembers: typeof trainerMembersMockMembersDb): void {
  trainerMembersMockMembersDb = nextMembers;
}
