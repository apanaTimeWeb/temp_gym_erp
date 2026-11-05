'use client';

// RESPONSIBILITY: Owns outbound tenant-message mutation, idempotency, and message-list cache reconciliation.


import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { superadminMessagingApi } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/api/superadmin_communication_messaging_center.api';
import { SUPERADMIN_COMMUNICATION_MESSAGING_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/api/superadmin_communication_messaging_center.query_keys';
import { createSuperadminCommunicationMessagingFormApiError } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/utils/SuperadminCommunicationMessagingCenterFormApiErrors';

// DATA FLOW: API / URL state / module client state → useRef → superadmin_communication_messaging view components.
/**
 * Purpose: Dedicated mutation boundary for sending a Superadmin tenant message.
 * Inputs: validated message payload from the compose form.
 * Output: mutation state and mutateAsync.
 * Side effects: one idempotency key per send intent and targeted message-list invalidation.
 * Invariant: the page/query hook does not instantiate TanStack mutations.
 */
/**
 * @description Sends a tenant-scoped messaging request through the feature API and reconciles server state.
 * @dependencies Uses the messaging API facade, idempotency-key lifecycle, and TanStack Query cache.
 * @edge-case Keeps one key per send intent, surfaces safe failure handling, and invalidates affected lists only after authoritative success.
 */

// DATA FLOW: Feature/API/query inputs → useSuperadminCommunicationMessagingCenterSendMutation → owning feature view/components.
/**
 * @description Owns the feature-local superadmin messaging send mutation responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminCommunicationMessagingCenterSendMutation() {
  const queryClient = useQueryClient();
  const idempotencyKeyRef = useRef<{ fingerprint: string; key: string } | null>(null);
  return useMutation({
    mutationFn: async (payload: Parameters<typeof superadminMessagingApi.sendMessage>[0]) => {
      const fingerprint = JSON.stringify(payload);
      if (!idempotencyKeyRef.current || idempotencyKeyRef.current.fingerprint !== fingerprint) idempotencyKeyRef.current = { fingerprint, key: crypto.randomUUID() };
      const response = await superadminMessagingApi.sendMessage(payload, idempotencyKeyRef.current.key);
      if (!response.success) throw createSuperadminCommunicationMessagingFormApiError(response);
      return response;
    },
    onSuccess: () => {
      idempotencyKeyRef.current = null;
      void queryClient.invalidateQueries({ queryKey: SUPERADMIN_COMMUNICATION_MESSAGING_QUERY_KEYS.messages });
    },
  });
}
