'use client';
// DATA FLOW: Inputs enter useSuperadminPlatformConfigurationFeaturesManagementFeatureHistory, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
// RESPONSIBILITY: Owns server-state loading for feature-flag change history and exposes query state to the history view.
import { useQuery } from '@tanstack/react-query';

import { featuresApi } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/api/superadmin_platform_configuration_features_management.api';
import { SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/api/superadmin_platform_configuration_features_management.query_keys';



/**
 * Purpose: Load one feature flag's audit history from the owning feature API boundary.
 * Inputs: feature flag identifier.
 * Output: TanStack Query state containing history entries.
 * Side effects: network/cache activity only; no fixture access in the component.
 * Invariant: the requested flag id is the only resource key used for the history query.
 
 * @description Load one feature flag's audit history from the owning feature API boundary.
 * @dependencies feature flag identifier.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
/**
 * @description Owns the useSuperadminPlatformConfigurationFeaturesManagementFeatureHistory responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export function useSuperadminPlatformConfigurationFeaturesManagementFeatureHistory(flagId: string | null) {
  return useQuery({
    queryKey: SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_QUERY_KEYS.history(flagId ?? ''),
    queryFn: async () => {
      const response = await featuresApi.fetchFeatureFlagHistory(flagId as string);
      if (!response.success) throw new Error(response.message || 'Failed to load feature history');
      return response;
    },
    enabled: Boolean(flagId),
  });
}
