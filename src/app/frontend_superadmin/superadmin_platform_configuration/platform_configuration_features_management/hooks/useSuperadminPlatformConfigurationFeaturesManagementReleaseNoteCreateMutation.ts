'use client';

// RESPONSIBILITY: Owns release-note publication mutation and feature-list cache reconciliation.


import { useMutation, useQueryClient } from '@tanstack/react-query';

import { featuresApi } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/api/superadmin_platform_configuration_features_management.api';
import { SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/api/superadmin_platform_configuration_features_management.query_keys';
import { createSuperadminPlatformConfigurationFeaturesManagementFormApiError } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/utils/SuperadminPlatformConfigurationFeaturesManagementFormApiErrors';

import type { SuperadminReleaseNoteCreateMutationInput } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/types/superadmin_platform_configuration_features_management_mutation.types';

// DATA FLOW: API / URL state / module client state → useMutation → superadmin_platform_configuration_features view components.
/** Dedicated mutation boundary for publishing a release note. */
/**
 * @description Creates release-note records through the feature API and reconciles feature-local server state.
 * @dependencies Uses the release-note API contract, TanStack Query invalidation, and caller-provided idempotency key.
 * @edge-case Keeps failed submissions retryable without duplicating a successful release note.
 */
// DATA FLOW: Feature/API/query inputs → useSuperadminPlatformConfigurationFeaturesManagementReleaseNoteCreateMutation → owning feature view/components.
/**
 * @description Owns the feature-local superadmin features release note create mutation responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminPlatformConfigurationFeaturesManagementReleaseNoteCreateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: SuperadminReleaseNoteCreateMutationInput) => {
      const response = await featuresApi.createReleaseNote(input.data, input.idempotencyKey);
      if (!response.success) throw createSuperadminPlatformConfigurationFeaturesManagementFormApiError(response);
      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_QUERY_KEYS.all });
    },
  });
}
