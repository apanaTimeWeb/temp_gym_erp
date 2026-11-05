"use client";
// DATA FLOW: Selected member ID and URL view state → profile query hook → Members API client → TanStack Query cache → profile tabs.
import { useQuery } from '@tanstack/react-query';

import { TrainerMembersApi } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/api/TrainerMembersDirectoryAndProfileApi';

import { TRAINER_MEMBERS_QUERY_KEYS } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/config/TrainerMembersDirectoryAndProfileQueryKeys';

/**
 * @description Owns member profile-support queries for the Trainer members feature while keeping all server state in TanStack Query.
 * @dependencies TrainerMembersApi and the module-owned query-key registry.
 * @edge-case Profile queries remain disabled until their required member or view state is present and preserve server errors for UI recovery.
 */
export function useTrainerMembersMemberAttendanceQuery(memberId: string) {
  return useQuery({
    queryKey: TRAINER_MEMBERS_QUERY_KEYS.attendance(memberId),
    queryFn: async () => {
      const response = await TrainerMembersApi.fetchMemberAttendance(memberId);
      if (!response.success) throw new Error(response.message);
      return response.data;
    },
    enabled: Boolean(memberId),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * @description Fetches diet-plan options needed by the Trainer member detail flow.
 * @dependencies TrainerMembersApi and the module-owned diet-plan query key.
 * @edge-case Does not query before the consumer explicitly enables the relationship data.
 */
export function useTrainerMembersMemberDietPlansQuery(enabled: boolean) {
  return useQuery({
    queryKey: TRAINER_MEMBERS_QUERY_KEYS.dietPlans(),
    queryFn: async () => {
      const response = await TrainerMembersApi.fetchDietPlans();
      if (!response.success || !response.data) throw new Error(response.message);
      return response.data.dietPlans;
    },
    enabled,
  });
}

/**
 * @description Fetches workout-plan options needed by the Trainer member detail flow.
 * @dependencies TrainerMembersApi and the module-owned workout-plan query key.
 * @edge-case Does not issue a request while the detail surface is closed.
 */
export function useTrainerMembersMemberWorkoutPlansQuery(enabled: boolean) {
  return useQuery({
    queryKey: TRAINER_MEMBERS_QUERY_KEYS.workoutPlans(),
    queryFn: async () => {
      const response = await TrainerMembersApi.fetchWorkoutPlans();
      if (!response.success || !response.data) throw new Error(response.message);
      return response.data.workouts;
    },
    enabled,
  });
}

/**
 * @description Fetches member progress history used by the Trainer member detail surface.
 * @dependencies TrainerMembersApi and the member-scoped progress query key.
 * @edge-case Preserves member identity in the cache and disables the query for an empty identifier.
 */
export function useTrainerMembersMemberProgressEntriesQuery(memberId: string) {
  return useQuery({
    queryKey: TRAINER_MEMBERS_QUERY_KEYS.progress(memberId),
    queryFn: async () => {
      const response = await TrainerMembersApi.fetchMemberProgressEntries(memberId);
      if (!response.success || !response.data) throw new Error(response.message);
      return response.data;
    },
    enabled: Boolean(memberId),
    staleTime: 5 * 60 * 1000,
  });
}
