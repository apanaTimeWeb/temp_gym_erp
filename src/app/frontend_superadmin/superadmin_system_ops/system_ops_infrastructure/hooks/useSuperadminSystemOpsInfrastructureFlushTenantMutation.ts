'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { SUPERADMIN_INFRASTRUCTURE_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/api/superadmin_system_ops_infrastructure.query_keys';

import type { SuperadminInfrastructureFlushIntent } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/types/superadmin_system_ops_infrastructure_mutation.types';
import type { MutableRefObject } from 'react';


/** Owns the confirmed infrastructure cache-flush mutation. */
/**
 * @description Coordinates confirmed tenant-cache flush mutations and authoritative query invalidation.
 * @dependencies Uses the infrastructure API facade, selected tenant IDs, idempotency-key ref, and caller-owned success callback.
 * @edge-case Reuses one key for retries of the same flush intent and never converts a failed mutation into a success state.
 */
// DATA FLOW: Feature/API/query inputs → useSuperadminSystemOpsInfrastructureFlushTenantMutation → owning feature view/components.
/**
 * @description Owns the feature-local superadmin system ops infrastructure flush tenant mutation responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminSystemOpsInfrastructureFlushTenantMutation(onFlush: (tenantIds: string[], idempotencyKey: string) => Promise<unknown>, selectedTenantIds: string[], idempotencyIntentRef: MutableRefObject<SuperadminInfrastructureFlushIntent | null>, confirmAction: () => Promise<boolean>, onSuccess: (completed: boolean) => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const confirmed = await confirmAction();
      if (!confirmed) return false;
      const intentIdentity = JSON.stringify([...selectedTenantIds].sort());
      if (idempotencyIntentRef.current?.identity !== intentIdentity) {
        idempotencyIntentRef.current = { identity: intentIdentity, idempotencyKey: crypto.randomUUID() };
      }
      await onFlush(selectedTenantIds, idempotencyIntentRef.current.idempotencyKey);
      return true;
    },
    onSuccess: async (completed) => {
      if (completed) {
        await Promise.allSettled([
          queryClient.invalidateQueries({ queryKey: SUPERADMIN_INFRASTRUCTURE_QUERY_KEYS.nodesAll }),
          queryClient.invalidateQueries({ queryKey: SUPERADMIN_INFRASTRUCTURE_QUERY_KEYS.redis }),
          queryClient.invalidateQueries({ queryKey: SUPERADMIN_INFRASTRUCTURE_QUERY_KEYS.tenants }),
        ]);
      }
      onSuccess(completed);
    },
  });
}

