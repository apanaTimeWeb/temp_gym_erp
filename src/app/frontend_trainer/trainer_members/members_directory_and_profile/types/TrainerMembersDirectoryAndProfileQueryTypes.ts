// RESPONSIBILITY: Query-key parameter contract for Trainer Members server-state lists.
export interface TrainerMembersQueryParams {
  search: string;
  status: string;
  progressStatus: string;
  page: number;
  pageSize: number;
}
