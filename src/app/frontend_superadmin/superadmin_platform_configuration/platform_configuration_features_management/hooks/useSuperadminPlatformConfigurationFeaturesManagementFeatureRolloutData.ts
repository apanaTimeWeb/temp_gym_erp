'use client';
// DATA FLOW: Inputs enter useSuperadminPlatformConfigurationFeaturesManagementFeatureRolloutData, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
// RESPONSIBILITY: Owns tenant-list server state for the Feature Flag canary rollout modal.


import { useQuery } from '@tanstack/react-query';

import { featuresApi } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/api/superadmin_platform_configuration_features_management.api';
import { SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/api/superadmin_platform_configuration_features_management.query_keys';
import { createSuperadminPlatformConfigurationFeaturesManagementFormApiError } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/utils/SuperadminPlatformConfigurationFeaturesManagementFormApiErrors';

import type { SuperadminPlatformConfigurationFeaturesTenant } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/types/superadmin_platform_configuration_features_management.types';

/**
 * Purpose: Provides tenant data for canary rollout selection.
 * Inputs: modal open state.
 * Output: tenant list, loading and error state.
 * Side effects: TanStack Query cache only.
 * Invariant: rollout UI never calls the feature API directly.
 
 * @description Provides tenant data for canary rollout selection.
 * @dependencies modal open state.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
/**
 * @description Owns the useSuperadminPlatformConfigurationFeaturesManagementFeatureRolloutData responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export function useSuperadminPlatformConfigurationFeaturesManagementFeatureRolloutData(isOpen: boolean) {
  const query = useQuery({
    queryKey: SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_QUERY_KEYS.tenants,
    queryFn: async () => {
      const response = await featuresApi.fetchTenants();
      if (!response.success) throw createSuperadminPlatformConfigurationFeaturesManagementFormApiError(response);
      return response;
    },
    enabled: isOpen,
  });
  return {
    tenants: (query.data?.data as SuperadminPlatformConfigurationFeaturesTenant[] | undefined) ?? [],
    isPending: query.isPending,
    error: query.error,
    isError: query.isError,
    refetch: query.refetch,
  };
}
