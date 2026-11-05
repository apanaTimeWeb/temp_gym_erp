"use client";
// RESPONSIBILITY: Owns Trainer member list and KPI server-state queries.
// DATA FLOW: Members URL/query state → TanStack Query → TrainerMembersApi → validated records → list/profile UI.
import { useQuery } from '@tanstack/react-query';

import { TrainerMembersApi } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/api/TrainerMembersDirectoryAndProfileApi';

import { TRAINER_MEMBERS_QUERY_KEYS } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/config/TrainerMembersDirectoryAndProfileQueryKeys';

import type { TrainerMembersQueryParams } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/types/TrainerMembersDirectoryAndProfileQueryTypes';

/**
 * @description Fetches the paginated/filterable Trainer member list and keeps server data owned by TanStack Query.
 * @dependencies TrainerMembersApi, module query keys, and the URL-derived TrainerMembersQueryParams contract.
 * @edge-case Query identity includes all list parameters so search/filter/sort/page changes cannot reuse stale member data.
 */
export function useTrainerMembersQuery(params: TrainerMembersQueryParams) {
  return useQuery({
    queryKey: TRAINER_MEMBERS_QUERY_KEYS.list(params),
    queryFn: async () => {
      const stringParams = Object.fromEntries(
        Object.entries(params).filter(([, v]) => v !== undefined).map(([k, v]) => [k, String(v)])
      );
      const response = await TrainerMembersApi.fetchMembers(stringParams);
      if (!response.success) throw new Error(response.message);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * @description Fetches Trainer member KPI statistics through the module API boundary.
 * @dependencies TrainerMembersApi and the module-owned stats query key.
 * @edge-case Keeps API failure visible through TanStack Query rather than replacing failed data with hardcoded values.
 */
export function useTrainerMembersMemberStatsQuery() {
  return useQuery({
    queryKey: TRAINER_MEMBERS_QUERY_KEYS.stats(),
    queryFn: async () => {
      const response = await TrainerMembersApi.fetchMemberStats();
      if (!response.success) throw new Error(response.message);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}
