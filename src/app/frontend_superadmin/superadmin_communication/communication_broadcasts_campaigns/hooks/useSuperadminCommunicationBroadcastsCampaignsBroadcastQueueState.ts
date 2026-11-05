'use client';
// DATA FLOW: Inputs enter useSuperadminCommunicationBroadcastsCampaignsBroadcastQueueState, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
import { useState } from 'react';

import type { SuperadminBroadcastQueueRecipientDraft } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns_broadcast_queue_state.types';



/** Owns local draft state for opening and closing the Broadcast delivery queue. */
/** Purpose: Owns the useSuperadminCommunicationBroadcastsCampaignsBroadcastQueueState data/state orchestration for this Superadmin feature and exposes its typed UI-facing contract. */
/**
 * @description Manages broadcasts state, queries, and UI interactions for useSuperadminCommunicationBroadcastsCampaignsBroadcastQueueState.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminCommunicationBroadcastsCampaignsBroadcastQueueState → consuming feature component.
/**
 * @description Coordinates the use Superadmin broadcasts broadcast queue state concern within its owning Superadmin feature.
 * @dependencies Uses the typed arguments and module-local API, query-key, schema, and utility imports declared in this file; it must not depend on sibling business modules.
 * @edge-case Keep null or empty inputs safe, preserve pending/error/retry/cancellation behavior where applicable, and avoid stale or duplicate mutation effects.
 */
export function useSuperadminCommunicationBroadcastsCampaignsBroadcastQueueState() {
  const [queueModalOpen, setQueueModalOpen] = useState(false);
  const [queueRecipients, setQueueRecipients] = useState<SuperadminBroadcastQueueRecipientDraft[]>([]);
  const [queueBroadcastId, setQueueBroadcastId] = useState<string | null>(null);
  const [queueTitle, setQueueTitle] = useState('');
  return { queueModalOpen, queueRecipients, queueBroadcastId, queueTitle, setQueueModalOpen, setQueueRecipients, setQueueBroadcastId, setQueueTitle };
}
