"use client";
// RESPONSIBILITY: Reads the selected member entity from TanStack Query using the URL-synchronized record identity.
// DATA FLOW: URL `id` → Zustand identity mirror → TrainerMembersApi.fetchMemberById → TanStack Query → profile UI.
import { useQuery } from '@tanstack/react-query';

import { TrainerMembersApi } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/api/TrainerMembersDirectoryAndProfileApi';

import { TRAINER_MEMBERS_QUERY_KEYS } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/config/TrainerMembersDirectoryAndProfileQueryKeys';

import { useTrainerMembersStore } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/state/useTrainerMembersDirectoryAndProfileStore';






/**
 * @description Reads the selected member entity from TanStack Query using the URL-synchronized selected member ID.
 * @dependencies URL `id` → selectedMemberId (Zustand mirror) → TrainerMembersApi.fetchMemberById → TanStack Query → profile UI.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerMembersSelectedMember state and data flow for the members feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented members module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerMembersSelectedMember() {
  const memberId = useTrainerMembersStore((state) => state.selectedMemberId);
  const query = useQuery({
    queryKey: TRAINER_MEMBERS_QUERY_KEYS.detail(memberId ?? ''),
    queryFn: async () => {
      if (!memberId) throw new Error('A member must be selected before loading the profile.');
      return TrainerMembersApi.fetchMemberById(memberId);
    },
    enabled: Boolean(memberId),
    staleTime: 5 * 60 * 1000,
  });
  return { memberId, member: query.data?.data ?? null, ...query };
}
