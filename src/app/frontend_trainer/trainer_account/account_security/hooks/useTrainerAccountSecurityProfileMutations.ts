"use client";
// DATA FLOW: Profile form intent → useTrainerAccountSecurityProfileMutations → module API → query reconciliation → profile UI
// RESPONSIBILITY: Owns Trainer Profile server-state write operations and targeted cache reconciliation.
import { useCallback } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TrainerAccountSecurityApi } from '@/app/frontend_trainer/trainer_account/account_security/api/TrainerAccountSecurityProfileApi';

import { TRAINER_ACCOUNT_SECURITY_QUERY_KEYS } from '@/app/frontend_trainer/trainer_account/account_security/utils/TrainerAccountSecurityProfileQueryKeys';

import type { TrainerAccountSecurityPasswordMutationVariables } from '@/app/frontend_trainer/trainer_account/account_security/types/TrainerAccountSecurityProfileMutationTypes';









/**
 * @description Owns Trainer Profile and password mutation commands plus precise Query cache reconciliation.
 * @dependencies TrainerAccountSecurityApi and the canonical profile query-key registry.
 * @edge-case Password material is never stored in Query cache; profile updates replace the canonical profile payload after success.
 */
/**
 * @description Manages TrainerAccountSecurityMutations state and data flow for the profile feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented profile module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerAccountSecurityProfileMutations() {
  const queryClient = useQueryClient();
  const passwordMutation = useMutation({
    mutationFn: ({ values, idempotencyKey }: TrainerAccountSecurityPasswordMutationVariables) => TrainerAccountSecurityApi.updatePassword({ currentPassword: values.currentPassword, newPassword: values.newPassword }, idempotencyKey),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: TRAINER_ACCOUNT_SECURITY_QUERY_KEYS.profile() });
    },
  });
  return {
    updatePassword: useCallback((variables: TrainerAccountSecurityPasswordMutationVariables) => passwordMutation.mutateAsync(variables), [passwordMutation]),
    updatePasswordPending: passwordMutation.isPending,
  };
}
