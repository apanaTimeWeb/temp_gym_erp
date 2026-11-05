'use client';
// DATA FLOW: Notification UI intent → stable idempotency key → validated Messaging API response → Query cache.
import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { superadminNotificationApi } from '@/app/frontend_superadmin/superadmin_communication/communication_notifications/api/superadmin_communication_notifications.api';
import { SUPERADMIN_COMMUNICATION_NOTIFICATIONS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_communication/communication_notifications/api/superadmin_communication_notifications.query_keys';
import type { SuperadminNotification } from '@/app/frontend_superadmin/superadmin_communication/communication_notifications/types/superadmin_communication_notifications.types';
import type { ApiResponse } from '@/lib/api';

type NotificationsQueryData = ApiResponse<SuperadminNotification[]>;
function reconcileReadNotification(previous: NotificationsQueryData | undefined, updated: SuperadminNotification): NotificationsQueryData | undefined {
  if (!previous?.data) return previous;
  return { ...previous, data: previous.data.map((notification) => notification.id === updated.id ? updated : notification) };
}

/**
 * @description Coordinates the use Superadmin messaging notification mutations concern within its owning Superadmin feature.
 * @dependencies Uses the typed arguments and module-local API, query-key, schema, and utility imports declared in this file; it must not depend on sibling business modules.
 * @edge-case Keep null or empty inputs safe, preserve pending/error/retry/cancellation behavior where applicable, and avoid stale or duplicate mutation effects.
 */
export function useSuperadminCommunicationNotificationsMutations() {
  const queryClient = useQueryClient();
  const idempotencyKeysRef = useRef(new Map<string, string>());
  const getKey = (scope: string) => {
    const existing = idempotencyKeysRef.current.get(scope);
    if (existing) return existing;
    const key = crypto.randomUUID();
    idempotencyKeysRef.current.set(scope, key);
    return key;
  };
  const clearKey = (scope: string) => idempotencyKeysRef.current.delete(scope);

  const markReadMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await superadminNotificationApi.markNotificationRead(id, getKey(`read:${id}`));
      if (!response.success || !response.data) throw new Error(response.message || 'Notification could not be marked read.');
      return { response, id };
    },
    onSuccess: ({ response, id }) => {
      clearKey(`read:${id}`);
      queryClient.setQueryData<NotificationsQueryData>(SUPERADMIN_COMMUNICATION_NOTIFICATIONS_QUERY_KEYS.notifications,
        (previous) => reconcileReadNotification(previous, response.data));
      void queryClient.invalidateQueries({ queryKey: SUPERADMIN_COMMUNICATION_NOTIFICATIONS_QUERY_KEYS.notifications });
    },
  });

  const markAllReadMutation = useMutation({
    mutationFn: async () => {
      const response = await superadminNotificationApi.markAllNotificationsRead(getKey('read-all'));
      if (!response.success || !response.data) throw new Error(response.message || 'Notifications could not be marked read.');
      return response;
    },
    onSuccess: (response) => {
      clearKey('read-all');
      queryClient.setQueryData<NotificationsQueryData>(SUPERADMIN_COMMUNICATION_NOTIFICATIONS_QUERY_KEYS.notifications, response);
      void queryClient.invalidateQueries({ queryKey: SUPERADMIN_COMMUNICATION_NOTIFICATIONS_QUERY_KEYS.notifications });
    },
  });

  return {
    markRead: markReadMutation.mutateAsync,
    isMarkingRead: markReadMutation.isPending,
    markAllRead: markAllReadMutation.mutateAsync,
    isMarkingAllRead: markAllReadMutation.isPending,
  };
}
