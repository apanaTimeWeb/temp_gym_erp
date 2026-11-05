'use client';
// DATA FLOW: Profile form state → details hook → Profile API client → TanStack Query cache/invalidation → Profile view.
// RESPONSIBILITY: Personal-profile form and server state, excluding the Security/password workflow.
import { useCallback, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { TrainerProfileApi } from '../api/TrainerAccountPersonalProfileProfileApi';
import { TrainerProfileFormSchema } from '../schemas/TrainerAccountPersonalProfileProfileSchema';
import { TRAINER_PROFILE_QUERY_KEYS } from '../utils/TrainerAccountPersonalProfileProfileQueryKeys';
import { useTrainerInfrastructureFeedback } from '@/app/frontend_trainer/trainer_account/account_personal_profile/hooks/TrainerAccountPersonalProfileuseTrainerInfrastructureFeedback';
import { useTrainerInfrastructureIdempotencyKey } from '@/app/frontend_trainer/trainer_account/account_personal_profile/hooks/TrainerAccountPersonalProfileuseTrainerInfrastructureIdempotencyKey';
import type { TrainerProfileFormValues } from '../types/TrainerAccountPersonalProfileProfileTypes';

export function useTrainerAccountPersonalProfileDetails() {
  const { showSuccess, showError } = useTrainerInfrastructureFeedback();
  const keys = useTrainerInfrastructureIdempotencyKey();
  const queryClient = useQueryClient();
  const profileQuery = useQuery({
    queryKey: TRAINER_PROFILE_QUERY_KEYS.profile(),
    queryFn: async () => {
      const response = await TrainerProfileApi.fetchProfile();
      if (!response.success || !response.data) throw new Error(response.message);
      return response.data;
    },
  });
  const form = useForm<TrainerProfileFormValues>({
    resolver: zodResolver(TrainerProfileFormSchema),
    defaultValues: { name: '', phone: '', specialization: [] },
    mode: 'onTouched',
  });
  const { reset } = form;
  const isDirty = form.formState.isDirty;
  const name = profileQuery.data?.name;
  const phone = profileQuery.data?.phone;
  const specialization = profileQuery.data?.specialization;
  // Do not overwrite unsubmitted edits when a background refetch arrives.
  useEffect(() => {
    if (isDirty || name === undefined || phone === undefined || specialization === undefined) return;
    reset({ name, phone, specialization });
  }, [isDirty, name, phone, specialization, reset]);
  const mutation = useMutation({
    mutationFn: ({ values, idempotencyKey }: { values: TrainerProfileFormValues; idempotencyKey: string }) =>
      TrainerProfileApi.updateProfile(values, idempotencyKey),
    onSuccess: (response) => {
      if (response.success && response.data) queryClient.setQueryData(TRAINER_PROFILE_QUERY_KEYS.profile(), response.data);
      void queryClient.invalidateQueries({ queryKey: TRAINER_PROFILE_QUERY_KEYS.profile() });
    },
  });
  const saveProfile = useCallback(async (values: TrainerProfileFormValues) => {
    const actionId = 'profile-update';
    try {
      const response = await mutation.mutateAsync({ values, idempotencyKey: keys.begin(actionId) });
      if (!response.success || !response.data) throw new Error(response.message);
      reset({ name: response.data.name, phone: response.data.phone, specialization: response.data.specialization });
      keys.clear(actionId);
      showSuccess(response.message, actionId);
      return response;
    } catch (error) {
      showError(error, `${actionId}-error`);
      throw error;
    }
  }, [keys, mutation, reset, showError, showSuccess]);
  return {
    profileForm: form, isDirty, user: profileQuery.data ?? null,
    isPending: profileQuery.isPending, isError: profileQuery.isError,
    refetchProfile: profileQuery.refetch, saveProfile, saveProfilePending: mutation.isPending,
  };
}
