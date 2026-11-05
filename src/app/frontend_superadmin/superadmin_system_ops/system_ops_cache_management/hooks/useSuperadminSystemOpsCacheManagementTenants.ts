'use client';
// DATA FLOW: Infrastructure tenant API → TanStack Query → Flush Tenant modal.
// RESPONSIBILITY: Owns the tenant list used only by the cache-flush selector; avoids unrelated node/Redis queries.
import { useQuery } from '@tanstack/react-query';

import { infrastructureApi } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/api/superadmin_system_ops_cache_management.api';
import { SUPERADMIN_CACHE_MANAGEMENT_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/api/superadmin_system_ops_cache_management.query_keys';



/** Loads the tenant identities required by the Infrastructure cache flush selector. */
/** Purpose: Owns the useSuperadminSystemOpsCacheManagementTenants data/state orchestration for this Superadmin feature and exposes its typed UI-facing contract. 
 * @description Owns the hook behavior for this Superadmin feature.
 * @dependencies Consumes feature-local state/API/query contracts and approved global infrastructure only.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
export function useSuperadminSystemOpsCacheManagementTenants(isOpen: boolean) {
  return useQuery({
    queryKey: SUPERADMIN_CACHE_MANAGEMENT_QUERY_KEYS.tenants,
    queryFn: async () => {
      const response = await infrastructureApi.fetchTenants();
      if (!response.success) throw new Error(response.message || 'Failed to load tenants');
      return response;
    },
    enabled: isOpen,
  });
}
