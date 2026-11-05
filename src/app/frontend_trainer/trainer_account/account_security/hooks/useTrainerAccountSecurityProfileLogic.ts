"use client";
// RESPONSIBILITY: Owns Trainer Profile query, React Hook Form state, validation, mutations, and dirty state.
// DATA FLOW: TrainerAccountSecurityApi → TanStack Query/useForm → TrainerAccountSecurityMain.
import { useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';

import { useQuery } from '@tanstack/react-query';

import { useForm } from 'react-hook-form';

import { useTrainerInfrastructureFeedback } from '@/app/frontend_trainer/trainer_account/account_security/hooks/TrainerAccountSecurityuseTrainerInfrastructureFeedback';

import { useTrainerInfrastructureIdempotencyKey } from '@/app/frontend_trainer/trainer_account/account_security/hooks/TrainerAccountSecurityuseTrainerInfrastructureIdempotencyKey';

import { TrainerAccountSecurityApi } from '@/app/frontend_trainer/trainer_account/account_security/api/TrainerAccountSecurityProfileApi';

import { TRAINER_ACCOUNT_SECURITY_QUERY_KEYS } from '@/app/frontend_trainer/trainer_account/account_security/utils/TrainerAccountSecurityProfileQueryKeys';


import { useTrainerAccountSecurityProfileMutations } from '@/app/frontend_trainer/trainer_account/account_security/hooks/useTrainerAccountSecurityProfileMutations';


import { TrainerAccountSecurityTrainerPasswordFormSchema } from '@/app/frontend_trainer/trainer_account/account_security/schemas/TrainerAccountSecurityProfileSchema';

import type { TrainerAccountSecurityTrainerPasswordFormValues } from '@/app/frontend_trainer/trainer_account/account_security/types/TrainerAccountSecurityProfileTypes';

/**
 * @description Owns useTrainerAccountSecurityProfileLogic behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerAccountSecurityLogic state and data flow for the profile feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented profile module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerAccountSecurityProfileLogic() {
  const { showSuccess, showError } = useTrainerInfrastructureFeedback();
  const actionKeys = useTrainerInfrastructureIdempotencyKey();
  const profileQuery = useQuery({
    queryKey: TRAINER_ACCOUNT_SECURITY_QUERY_KEYS.profile(),
    queryFn: async () => {
      const response = await TrainerAccountSecurityApi.fetchProfile();
      if (!response.success || !response.data) throw new Error(response.message);
      return response.data;
    },
  });
  const passwordForm = useForm<TrainerAccountSecurityTrainerPasswordFormValues>({
    resolver: zodResolver(TrainerAccountSecurityTrainerPasswordFormSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
    mode: 'onTouched',
  });
  const { updatePassword, updatePasswordPending } = useTrainerAccountSecurityProfileMutations();

  const changePassword = useCallback(async (values: TrainerAccountSecurityTrainerPasswordFormValues) => {
    const actionId = 'password-update';
    const idempotencyKey = actionKeys.begin(actionId);
    try {
      const response = await updatePassword({ values, idempotencyKey });
      if (!response.success) throw new Error(response.message);
      passwordForm.reset();
      showSuccess(response.message, actionId);
      actionKeys.clear(actionId);
      return response;
    } catch (error) {
      showError(error, `${actionId}-error`);
      throw error;
    }
  }, [actionKeys, passwordForm, showError, showSuccess, updatePassword]);
  const user = profileQuery.data ?? null;
  return {
    user,
    passwordForm,
    changePassword,
    changePasswordPending: updatePasswordPending,
    isDirty: passwordForm.formState.isDirty,
    isPending: profileQuery.isPending,
    isError: profileQuery.isError,
    refetchProfile: profileQuery.refetch,
  };
}
