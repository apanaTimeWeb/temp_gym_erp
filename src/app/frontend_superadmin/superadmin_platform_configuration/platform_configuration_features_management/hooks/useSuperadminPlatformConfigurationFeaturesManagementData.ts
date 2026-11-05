'use client';

// DATA FLOW: Superadmin Features route → feature query + dedicated mutation hooks → UI.
// RESPONSIBILITY: Owns feature flag/release-note server-state query and composes isolated mutation contracts.


import { useQuery } from '@tanstack/react-query';

import { featuresApi } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/api/superadmin_platform_configuration_features_management.api';
import { SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/api/superadmin_platform_configuration_features_management.query_keys';
import { useSuperadminPlatformConfigurationFeaturesManagementFeatureFlagStatusMutation } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/hooks/useSuperadminPlatformConfigurationFeaturesManagementFeatureFlagStatusMutation';
import { useSuperadminPlatformConfigurationFeaturesManagementFeatureFlagUpdateMutation } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/hooks/useSuperadminPlatformConfigurationFeaturesManagementFeatureFlagUpdateMutation';
import { createSuperadminPlatformConfigurationFeaturesManagementFormApiError } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/utils/SuperadminPlatformConfigurationFeaturesManagementFormApiErrors';

/**
 * Purpose: Centralizes Features server-state fetching and exposes dedicated mutation contracts.
 * Inputs: none.
 * Output: typed feature/release-note query state plus mutation actions.
 * Side effects: query fetches and mutation cache reconciliation owned by dedicated hooks.
 * Invariant: this data hook never instantiates TanStack mutations directly.
 */
/**
 * @description Owns feature-flag, release-note, tenant, and history server-state queries plus their mutation contracts.
 * @dependencies Uses TanStack Query, the feature API facade, query-key registry, and Zod-validated API responses.
 * @edge-case Keeps cache identity aligned with feature IDs and leaves mutation confirmation to the owning action hook.
 */

export function useSuperadminPlatformConfigurationFeaturesManagementData() {
  const query = useQuery({
    queryKey: SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_QUERY_KEYS.all,
    queryFn: async () => {
      const response = await featuresApi.fetchFeatures();
      if (!response.success) throw createSuperadminPlatformConfigurationFeaturesManagementFormApiError(response);
      return response.data;
    },
  });
  const statusMutation = useSuperadminPlatformConfigurationFeaturesManagementFeatureFlagStatusMutation();
  const updateMutation = useSuperadminPlatformConfigurationFeaturesManagementFeatureFlagUpdateMutation();

  return {
    data: query.data,
    isPending: query.isPending,
    isError: query.isError,
    error: query.error,
    updateFeatureFlagStatus: statusMutation.mutateAsync,
    isUpdatingFeatureFlagStatus: statusMutation.isPending,
    updateFlag: updateMutation.mutateAsync,
    isUpdatingFeatureFlagMetadata: updateMutation.isPending,
    refetch: query.refetch,
  };
}
