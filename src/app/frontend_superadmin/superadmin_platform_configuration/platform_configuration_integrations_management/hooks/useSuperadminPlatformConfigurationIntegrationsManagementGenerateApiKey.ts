'use client';



import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { generateSuperadminApiKey } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/api/superadmin_platform_configuration_integrations_management_api_crud.api';
import { SUPERADMIN_PLATFORM_CONFIGURATION_INTEGRATIONS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/api/superadmin_platform_configuration_integrations_management.query_keys';
import { createSuperadminPlatformConfigurationIntegrationsFormApiError } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/utils/SuperadminPlatformConfigurationIntegrationsManagementFormApiErrors';

import type { SuperadminGenerateApiKeyMutationInput } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/types/superadmin_platform_configuration_integrations_management_generate_api_key.types';

// DATA FLOW: Generate API Key form → mutation input → module API client/MSW → TanStack Query invalidation + one-time secret result.
// RESPONSIBILITY: Owns API-key generation mutation state, idempotency, and integrations-query reconciliation. No JSX.

/**
 * Purpose: Executes one API-key creation intent and reuses its idempotency key across manual retries.
 * Inputs: validated form values plus a key created once at user confirmation.
 * Output: typed mutation response and mutation lifecycle state.
 * Side effects: invalidates the integrations overview cache and emits deduplicated backend-result toasts.
 
 * @description Executes one API-key creation intent and reuses its idempotency key across manual retries.
 * @dependencies validated form values plus a key created once at user confirmation.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
export function useSuperadminPlatformConfigurationIntegrationsManagementGenerateApiKey() {
  const t = useTranslations('superadmin_platform_configuration_integrations');
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ payload, idempotencyKey }: SuperadminGenerateApiKeyMutationInput) => {
      const response = await generateSuperadminApiKey(payload, idempotencyKey);
      if (!response.success) throw createSuperadminPlatformConfigurationIntegrationsFormApiError(response);
      return response;
    },
    retry: false,
    onSuccess: (response) => {
      toast.success(response.message, { id: 'superadmin-integrations-api-key-success' });
      void queryClient.invalidateQueries({ queryKey: SUPERADMIN_PLATFORM_CONFIGURATION_INTEGRATIONS_QUERY_KEYS.overview });
    },
    onError: (error: unknown) => {
      const message = t('ui.action_failed_retry');
      toast.error(message, { id: 'superadmin-integrations-api-key-error' });
    },
  });
}

