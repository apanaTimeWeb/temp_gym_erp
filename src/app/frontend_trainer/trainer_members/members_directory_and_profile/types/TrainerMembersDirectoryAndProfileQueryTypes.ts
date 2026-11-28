import type { TrainerMembersSortDirection, TrainerMembersSortField } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/types/TrainerMembersDirectoryAndProfileTypes';

// RESPONSIBILITY: Query-key parameter contract for Trainer Members server-state lists.
export interface TrainerMembersQueryParams {
  search: string;
  status: string;
  progressStatus: string;
  page: number;
  pageSize: number;
  sortBy?: TrainerMembersSortField;
  sortDirection?: TrainerMembersSortDirection;
}
