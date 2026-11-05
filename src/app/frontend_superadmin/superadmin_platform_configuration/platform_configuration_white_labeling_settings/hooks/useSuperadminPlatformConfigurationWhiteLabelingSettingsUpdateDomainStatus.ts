'use client';
import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations as useFeedbackTranslations } from 'next-intl';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { SuperadminPlatformConfigurationWhiteLabelingApi } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/api/superadmin_platform_configuration_white_labeling_settings.api';
import { SUPERADMIN_PLATFORM_CONFIGURATION_WHITE_LABELING_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/api/superadmin_platform_configuration_white_labeling_settings.query_keys';
import { resolveSuperadminPlatformConfigurationWhiteLabelingSettingsFeedback } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/utils/SuperadminPlatformConfigurationWhiteLabelingSettingsFeedback';

import type { UpdateDomainStatusDto } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/types/superadmin_platform_configuration_white_labeling_settings.types';


// DATA FLOW: Feature API/query state → custom hook → owning component/store → UI result.


/**
 * @description Manages white-label domain-status mutations with idempotency, cache invalidation, and stable toast feedback.
 * @dependencies Uses the feature API facade and TanStack Query cache for the owning module only.
 * @edge-case Reuses one idempotency key across retries of a single confirmed mutation intent and clears it only after success.
 */
export function useSuperadminPlatformConfigurationWhiteLabelingSettingsUpdateDomainStatus() {
 const feedback = useFeedbackTranslations('superadmin_platform_configuration_white_labeling');

  const t = useTranslations('superadmin_platform_configuration_white_labeling');
  const idempotencyKeysRef = useRef(new Map<string, string>());
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ id, dto, idempotencyKey }: { id: string; dto: UpdateDomainStatusDto; idempotencyKey: string }) => {
      const response = await SuperadminPlatformConfigurationWhiteLabelingApi.updateDomainStatus(id, dto, idempotencyKey);
      if (!response.success || !response.data) throw new Error(response.message || t('ui.domain_status_update_failed'));
      return response;
    },
    onSuccess: (response, variables) => {
      void queryClient.invalidateQueries({ queryKey: SUPERADMIN_PLATFORM_CONFIGURATION_WHITE_LABELING_QUERY_KEYS.all });
      idempotencyKeysRef.current.delete(`${variables.id}:${variables.dto.status}`);
      toast.success(response.message, { id: 'superadmin-white-labeling-status-success' });
    },
    onError: (error: unknown) => {
      // Retain this exact intent's key so a user retry does not create a new mutation identity.
      toast.error(resolveSuperadminPlatformConfigurationWhiteLabelingSettingsFeedback(error, feedback('errors.unexpected')), { id: 'superadmin-white-labeling-status-error' });
    },
  });
  const mutateAsync = (input: { id: string; dto: UpdateDomainStatusDto }) => {
    const intentKey = `${input.id}:${input.dto.status}`;
    const idempotencyKey = idempotencyKeysRef.current.get(intentKey) ?? crypto.randomUUID();
    idempotencyKeysRef.current.set(intentKey, idempotencyKey);
    return mutation.mutateAsync({ ...input, idempotencyKey });
  };
  return { ...mutation, mutateAsync };
}
