'use client';
// DATA FLOW: Inputs enter useSuperadminSystemOpsCacheManagementActions, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
// RESPONSIBILITY: Owns Infrastructure cache-flush mutations and Query reconciliation.
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { infrastructureApi } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/api/superadmin_system_ops_cache_management.api';
import { SUPERADMIN_CACHE_MANAGEMENT_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/api/superadmin_system_ops_cache_management.query_keys';

import type { SuperadminInfrastructureTenantFlushInput } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/types/superadmin_system_ops_cache_management_mutation.types';



/**
 * Purpose: Provides feature-owned global/tenant cache flush actions.
 * Inputs: selected tenant identifiers for tenant-specific flushes.
 * Output: mutateAsync actions and pending/error state.
 * Side effects: invalidates Infrastructure Query data after successful mutation.
 * Invariant: no cache mutation is triggered directly from JSX.
 
 * @description Provides feature-owned global/tenant cache flush actions.
 * @dependencies selected tenant identifiers for tenant-specific flushes.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
/**
 * @description Owns the useSuperadminSystemOpsCacheManagementActions responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export function useSuperadminSystemOpsCacheManagementActions() {
  const queryClient = useQueryClient();
  const reconcile = () => Promise.allSettled([queryClient.invalidateQueries({ queryKey: SUPERADMIN_CACHE_MANAGEMENT_QUERY_KEYS.all })]);
  const globalFlush = useMutation({
    mutationFn: async (idempotencyKey: string) => { const response = await infrastructureApi.flushGlobalCache(idempotencyKey); if (!response.success) throw new Error(response.message); return response; },
    onSuccess: async () => { await reconcile(); },
  });
  // Additional modal-specific reconciliation is owned by useSuperadminSystemOpsCacheManagementFlushTenantMutation.
  const tenantFlush = useMutation({
    mutationFn: async ({ tenantIds, idempotencyKey }: SuperadminInfrastructureTenantFlushInput) => { const response = await infrastructureApi.flushTenantCache(tenantIds, idempotencyKey); if (!response.success) throw new Error(response.message); return response; },
    onSuccess: async () => { await reconcile(); },
  });
  return {
    flushGlobalCache: globalFlush.mutateAsync,
    isFlushingGlobal: globalFlush.isPending,
    flushTenantCache: tenantFlush.mutateAsync,
    isFlushingTenant: tenantFlush.isPending,
  };
}
