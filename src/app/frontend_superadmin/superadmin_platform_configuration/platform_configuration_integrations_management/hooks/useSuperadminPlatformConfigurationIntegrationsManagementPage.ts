'use client';
// DATA FLOW: API → useSuperadminPlatformConfigurationIntegrationsManagementPage.ts → SuperadminPlatformConfigurationIntegrationsMain.tsx
// RESPONSIBILITY: Owns TanStack Query state for this Superadmin page.
import { useQuery } from '@tanstack/react-query';

import { fetchIntegrations } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/api/superadmin_platform_configuration_integrations_management_api_crud.api';
import { SUPERADMIN_PLATFORM_CONFIGURATION_INTEGRATIONS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/api/superadmin_platform_configuration_integrations_management.query_keys';



/**
 * Purpose: Owns TanStack Query state for this Superadmin page.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 
 * @description Owns TanStack Query state for this Superadmin page.
 * @dependencies values defined by the exported hook signature.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
/**
 * @description Owns the useSuperadminPlatformConfigurationIntegrationsManagementPage responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export function useSuperadminPlatformConfigurationIntegrationsManagementPage() {
  const query = useQuery({
    queryKey: SUPERADMIN_PLATFORM_CONFIGURATION_INTEGRATIONS_QUERY_KEYS.overview,
    queryFn: async () => {
      const response = await fetchIntegrations();
      if (!response.success) throw new Error(response.message || 'Failed to load integrations');
      return response;
    },
  });
  return { data: query.data?.data ?? null, isPending: query.isPending, isError: query.isError, refetch: query.refetch };
}
