'use client';

// Owns release-note deletion and feature-query cache reconciliation.


import { useMutation, useQueryClient } from '@tanstack/react-query';

import { featuresApi } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/api/superadmin_platform_configuration_features_management.api';
import { SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/api/superadmin_platform_configuration_features_management.query_keys';
import { createSuperadminPlatformConfigurationFeaturesManagementFormApiError } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/utils/SuperadminPlatformConfigurationFeaturesManagementFormApiErrors';

import type { SuperadminReleaseNoteDeleteMutationInput } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/types/superadmin_platform_configuration_features_management_mutation.types';

/** Delete one release note; a failed request leaves the authoritative list unchanged. */
export function useSuperadminPlatformConfigurationFeaturesManagementReleaseNoteDeleteMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, idempotencyKey }: SuperadminReleaseNoteDeleteMutationInput) => {
      const response = await featuresApi.deleteReleaseNote(id, idempotencyKey);
      if (!response.success) throw createSuperadminPlatformConfigurationFeaturesManagementFormApiError(response);
      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_QUERY_KEYS.all });
    },
  });
}
