'use client';
// DATA FLOW: SuperadminCommunicationBroadcastsBroadcastModal → useSuperadminCommunicationBroadcastsCampaignsBroadcastModalData → Broadcasts API → TanStack Query cache.
import { useQuery } from '@tanstack/react-query';

import { broadcastsApi } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/api/superadmin_communication_broadcasts_campaigns.api';
import { SUPERADMIN_COMMUNICATION_BROADCASTS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/api/superadmin_communication_broadcasts_campaigns.query_keys';

import type { SuperadminCommunicationBroadcastsTenant } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns.types';



/**
 * Purpose: Owns server-state reads required by the Broadcast create/edit modal.
 * Input: enabled flag controlled by modal visibility and no business state.
 * Output: tenant options, loading/error state, and recipient-count preview data.
 */
/**
 * @description Manages broadcasts state, queries, and UI interactions for useSuperadminCommunicationBroadcastsCampaignsBroadcastModalData.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminCommunicationBroadcastsCampaignsBroadcastModalData → consuming feature component.
/**
 * @description Coordinates the use Superadmin broadcasts broadcast modal data concern within its owning Superadmin feature.
 * @dependencies Uses the typed arguments and module-local API, query-key, schema, and utility imports declared in this file; it must not depend on sibling business modules.
 * @edge-case Keep null or empty inputs safe, preserve pending/error/retry/cancellation behavior where applicable, and avoid stale or duplicate mutation effects.
 */
export function useSuperadminCommunicationBroadcastsCampaignsBroadcastModalData(enabled: boolean, shouldLoadRecipientCount: boolean) {
  const tenantsQuery = useQuery({
    queryKey: SUPERADMIN_COMMUNICATION_BROADCASTS_QUERY_KEYS.modalTenants,
    queryFn: async () => {
      const response = await broadcastsApi.fetchTenants();
      if (!response.success) throw new Error(response.message || 'Failed to load broadcast tenants');
      return response;
    },
    enabled,
  });

  const recipientCountQuery = useQuery({
    queryKey: SUPERADMIN_COMMUNICATION_BROADCASTS_QUERY_KEYS.modalRecipientCount,
    queryFn: async () => {
      const response = await broadcastsApi.fetchRecipientCount();
      if (!response.success) throw new Error(response.message || 'Failed to load recipient count');
      return response;
    },
    enabled: enabled && shouldLoadRecipientCount,
  });

  return {
    gyms: (tenantsQuery.data?.data as SuperadminCommunicationBroadcastsTenant[] | undefined) ?? [],
    isPendingGyms: tenantsQuery.isPending,
    gymsError: tenantsQuery.error,
    retryGyms: tenantsQuery.refetch,
    recipientCount: recipientCountQuery.data?.data?.count,
    recipientCountError: recipientCountQuery.error,
    retryRecipientCount: recipientCountQuery.refetch,
    isRecipientCountLoading: recipientCountQuery.isPending,
  };
}
