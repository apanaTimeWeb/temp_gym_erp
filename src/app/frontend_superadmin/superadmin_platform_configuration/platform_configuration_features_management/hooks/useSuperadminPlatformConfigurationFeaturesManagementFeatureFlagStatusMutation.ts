'use client';

// RESPONSIBILITY: Owns feature-flag enable/disable mutation and feature-list cache reconciliation.


import { useMutation, useQueryClient } from '@tanstack/react-query';

import { featuresApi } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/api/superadmin_platform_configuration_features_management.api';
import { SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/api/superadmin_platform_configuration_features_management.query_keys';
import { createSuperadminPlatformConfigurationFeaturesManagementFormApiError } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/utils/SuperadminPlatformConfigurationFeaturesManagementFormApiErrors';

import type { SuperadminFeatureFlagStatusMutationInput } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/types/superadmin_platform_configuration_features_management_mutation.types';

// DATA FLOW: API / URL state / module client state → useMutation → superadmin_platform_configuration_features view components.
/** Dedicated mutation boundary for toggling a global feature flag. */
/**
 * @description Wraps feature-flag enable/disable mutations with confirmation-safe query reconciliation.
 * @dependencies Uses the feature API facade, TanStack Query cache, and mutation contract supplied by the feature.
 * @edge-case Reuses a single idempotency key through retries and avoids clearing authoritative server state on failed requests.
 */
// DATA FLOW: Feature/API/query inputs → useSuperadminPlatformConfigurationFeaturesManagementFeatureFlagStatusMutation → owning feature view/components.
/**
 * @description Owns the feature-local superadmin features feature flag status mutation responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminPlatformConfigurationFeaturesManagementFeatureFlagStatusMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: SuperadminFeatureFlagStatusMutationInput) => {
      const response = await featuresApi.toggleFeatureFlag(input.id, input.idempotencyKey);
      if (!response.success) throw createSuperadminPlatformConfigurationFeaturesManagementFormApiError(response);
      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_QUERY_KEYS.all });
    },
  });
}
