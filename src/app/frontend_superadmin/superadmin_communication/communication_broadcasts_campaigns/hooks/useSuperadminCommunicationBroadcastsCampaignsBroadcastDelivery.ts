'use client';

// DATA FLOW: Queue recipient → validated delivery mutation → Broadcasts API/MSW → mutable delivery state → refreshed broadcast result.
/**
 * Owns the Superadmin broadcast recipient-delivery mutation.
 * Input: a broadcast ID and tenant-recipient ID. Output: the validated delivery response.
 * Side effect: the feature server-state cache is invalidated so delivery counters remain authoritative.
 * Invariant: delivery behavior stays inside the broadcasts feature; it never writes notification state directly.
 */


import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deliverBroadcastToRecipient } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/api/superadmin_communication_broadcasts_campaigns.api';
import { SUPERADMIN_COMMUNICATION_BROADCASTS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/api/superadmin_communication_broadcasts_campaigns.query_keys';
import { createSuperadminCommunicationBroadcastsCampaignsFormApiError } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/utils/SuperadminCommunicationBroadcastsCampaignsFormApiErrors';

import type { SuperadminBroadcastDeliveryResult } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns_broadcast_delivery.types';
import type { ApiResponse } from '@/lib/api';

/** Owns recipient delivery mutations for Broadcasts and reconciles the relevant query caches. */
/** Purpose: Owns the useSuperadminCommunicationBroadcastsCampaignsBroadcastDelivery data/state orchestration for this Superadmin feature and exposes its typed UI-facing contract. */
/**
 * @description Manages broadcasts state, queries, and UI interactions for useSuperadminCommunicationBroadcastsCampaignsBroadcastDelivery.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminCommunicationBroadcastsCampaignsBroadcastDelivery → consuming feature component.
/**
 * @description Coordinates the use Superadmin broadcasts broadcast delivery concern within its owning Superadmin feature.
 * @dependencies Uses the typed arguments and module-local API, query-key, schema, and utility imports declared in this file; it must not depend on sibling business modules.
 * @edge-case Keep null or empty inputs safe, preserve pending/error/retry/cancellation behavior where applicable, and avoid stale or duplicate mutation effects.
 */
export function useSuperadminCommunicationBroadcastsCampaignsBroadcastDelivery() {
  const queryClient = useQueryClient();
  const idempotencyKeysRef = useRef(new Map<string, string>());
  const mutation = useMutation({
    mutationFn: async ({ broadcastId, recipientId, idempotencyKey }: { broadcastId: string; recipientId: string; idempotencyKey: string }) => {
      const response = await deliverBroadcastToRecipient(broadcastId, recipientId, idempotencyKey);
      if (!response.success) throw createSuperadminCommunicationBroadcastsCampaignsFormApiError(response);
      if (!response.data || response.data.deliveryStatus !== 'DELIVERED') {
        throw new Error('Broadcast recipient delivery failed');
      }
      return response;
    },
    onSuccess: async (_response, variables) => {
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_COMMUNICATION_BROADCASTS_QUERY_KEYS.all });
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_COMMUNICATION_BROADCASTS_QUERY_KEYS.detail(variables.broadcastId) });
      idempotencyKeysRef.current.delete(`${variables.broadcastId}:${variables.recipientId}`);
    },
  });
  const deliverRecipient = (variables: { broadcastId: string; recipientId: string }) => {
    const intentKey = `${variables.broadcastId}:${variables.recipientId}`;
    const idempotencyKey = idempotencyKeysRef.current.get(intentKey) ?? crypto.randomUUID();
    idempotencyKeysRef.current.set(intentKey, idempotencyKey);
    return mutation.mutateAsync({ ...variables, idempotencyKey }) as Promise<ApiResponse<SuperadminBroadcastDeliveryResult>>;
  };
  return {
    deliverRecipient,
    isDelivering: mutation.isPending,
    deliveryError: mutation.error,
  };
}
