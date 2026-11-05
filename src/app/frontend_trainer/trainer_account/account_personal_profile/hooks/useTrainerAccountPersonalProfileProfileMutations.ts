"use client";
// DATA FLOW: Profile form intent → useTrainerProfileMutations → module API → query reconciliation → profile UI
// RESPONSIBILITY: Owns Trainer Profile server-state write operations and targeted cache reconciliation.
import { useCallback } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TrainerProfileApi } from '@/app/frontend_trainer/trainer_account/account_personal_profile/api/TrainerAccountPersonalProfileProfileApi';

import { TRAINER_PROFILE_QUERY_KEYS } from '@/app/frontend_trainer/trainer_account/account_personal_profile/utils/TrainerAccountPersonalProfileProfileQueryKeys';

import type { TrainerProfileSaveMutationVariables } from '@/app/frontend_trainer/trainer_account/account_personal_profile/types/TrainerAccountPersonalProfileProfileMutationTypes';

import type { TrainerProfileData } from '@/app/frontend_trainer/trainer_account/account_personal_profile/types/TrainerAccountPersonalProfileProfileTypes';








/**
 * @description Owns personal-profile mutation commands and precise Query cache reconciliation.
 * @dependencies TrainerProfileApi and the canonical profile query-key registry.
 * @edge-case Profile updates replace the canonical profile payload after success. Password changes are owned by account_security.
 */
/**
 * @description Manages TrainerProfileMutations state and data flow for the profile feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented profile module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerProfileMutations() {
  const queryClient = useQueryClient();
  const profileMutation = useMutation({
    mutationFn: ({ values, idempotencyKey }: TrainerProfileSaveMutationVariables) => TrainerProfileApi.updateProfile(values, idempotencyKey),
    onSuccess: (response) => {
      if (response.success && response.data) {
        queryClient.setQueryData<TrainerProfileData>(TRAINER_PROFILE_QUERY_KEYS.profile(), response.data);
      }
      void queryClient.invalidateQueries({ queryKey: TRAINER_PROFILE_QUERY_KEYS.profile() });
    },
  });
  return {
    updateProfile: useCallback((variables: TrainerProfileSaveMutationVariables) => profileMutation.mutateAsync(variables), [profileMutation]),
    updateProfilePending: profileMutation.isPending,
  };
}
