'use client';
// DATA FLOW: Reply form → validated reply mutation → ticket API/MSW → updated ticket message list → query reconciliation.
/**
 * Owns the Superadmin ticket reply mutation and keeps list/detail server state coherent.
 * It accepts validated reply text, exposes the authoritative API response message, and
 * invalidates ticket queries so the next read includes the new message.
 */


import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { replyToTicket } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/api/superadmin_support_tickets_management_api_crud.api';
import { SUPERADMIN_SUPPORT_TICKETS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/api/superadmin_support_tickets_management.query_keys';
import { replySchema } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/schemas/superadmin_support_tickets_management_types.schemas';
import { createSuperadminSupportTicketsFormApiError } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/utils/SuperadminSupportTicketsManagementFormApiErrors';

import type { SuperadminSupportTicketsReplyFormValues } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/types/superadmin_support_tickets_management_reply_form.types';

interface SuperadminSupportTicketsReplyIntent {
  identity: string;
  idempotencyKey: string;
}

interface SuperadminSupportTicketsReplyMutationInput {
  id: string;
  values: SuperadminSupportTicketsReplyFormValues;
}

/** Owns ticket reply mutations, including payload validation and detail/list cache invalidation. */
/** Purpose: Owns the useSuperadminSupportTicketsManagementTicketReply data/state orchestration for this Superadmin feature and exposes its typed UI-facing contract.
 * @description Owns the hook behavior for this Superadmin feature.
 * @dependencies Consumes feature-local state/API/query contracts and approved global infrastructure only.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
export function useSuperadminSupportTicketsManagementTicketReply() {
  const queryClient = useQueryClient();
  const t = useTranslations('superadmin_support_tickets');
  // Only the currently active reply intent is retained: same ticket + same normalized
  // text reuses its key on retry; changing either field starts a new intent.
  const idempotencyKeyRef = useRef<SuperadminSupportTicketsReplyIntent | null>(null);

  const mutation = useMutation({
    mutationFn: async ({ id, values }: SuperadminSupportTicketsReplyMutationInput) => {
      const validated = replySchema.parse(values);
      const normalizedReply = validated.replyText.trim();
      const identity = JSON.stringify([id, normalizedReply]);
      if (idempotencyKeyRef.current?.identity !== identity) {
        idempotencyKeyRef.current = { identity, idempotencyKey: crypto.randomUUID() };
      }

      const response = await replyToTicket(id, normalizedReply, idempotencyKeyRef.current.idempotencyKey);
      if (!response.success) {
        // Keep the key for this exact intent so a retry is idempotent.
        throw createSuperadminSupportTicketsFormApiError(response, t('ui.action_failed_retry'));
      }
      return response;
    },
    onSuccess: async (_response, variables) => {
      const validated = replySchema.parse(variables.values);
      const identity = JSON.stringify([variables.id, validated.replyText.trim()]);
      if (idempotencyKeyRef.current?.identity === identity) idempotencyKeyRef.current = null;

      // A confirmed server success must not be reported as a failed reply merely because
      // one cache refresh failed. Query errors remain observable through the query layer.
      await Promise.allSettled([
        queryClient.invalidateQueries({ queryKey: SUPERADMIN_SUPPORT_TICKETS_QUERY_KEYS.all }),
        queryClient.invalidateQueries({ queryKey: SUPERADMIN_SUPPORT_TICKETS_QUERY_KEYS.detail(variables.id) }),
      ]);
    },
  });

  return {
    sendReply: mutation.mutateAsync,
    isSending: mutation.isPending,
    error: mutation.error,
    abandonReplyIntent: () => {
      idempotencyKeyRef.current = null;
    },
  };
}
