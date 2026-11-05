"use client";
// RESPONSIBILITY: Owns Admin Notifications read/mark-all mutations, idempotency lifecycle, and cache refresh.
// DATA FLOW: Notification read action → mutation hook → AdminNotificationsApi → TanStack Query invalidation → notification list state.

import { useTranslations } from 'next-intl';
import { useCallback, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ADMIN_NOTIFICATIONS_QUERY_KEYS } from '@/app/frontend_admin/admin_communication/communication_notifications_center/constants/AdminCommunicationNotificationsCenterQueryKeys';
import { AdminNotificationsApi } from '@/app/frontend_admin/admin_communication/communication_notifications_center/api/admin_communication_notifications_center_api';
import { adminToast } from '@/app/frontend_admin/admin_communication/communication_notifications_center/components/feedback/AdminCommunicationNotificationsCenterToastService';
import { clearAdminIdempotencyKey, getAdminIdempotencyKey } from '@/app/frontend_admin/admin_communication/communication_notifications_center/utils/AdminCommunicationNotificationsCenterIdempotencyIntentStore';
/** @description useAdminNotificationsMutations: Owns Admin Notifications read/mark-all mutations, idempotency lifecycle, and cache refresh. @dependencies Consumes AdminNotificationsQueryKeys, AdminNotificationsApi, AdminNavigationLayoutToastService, AdminNavigationLayoutBackendMessage, AdminNavigationLayoutIdempotencyIntentStore. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminNotificationsMutations() {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const intentKeysRef = useRef(new Map<string, string>());
  const getIntentKey = useCallback((intentId: string) => getAdminIdempotencyKey(intentKeysRef.current, intentId), []);
  const clearIntentKey = useCallback((intentId: string) => clearAdminIdempotencyKey(intentKeysRef.current, intentId), []);

  const markAsReadMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => AdminNotificationsApi.markNotificationAsRead(id, idempotencyKey),
    onSuccess: async (response, variables) => {
      clearIntentKey(`mark-read:${variables.id}`);
      adminToast.success(response.message, 'admin-success-0b7060fa');
      await queryClient.invalidateQueries({ queryKey: ADMIN_NOTIFICATIONS_QUERY_KEYS.key('list') });
    },
    onError: () => adminToast.error(t('notifications.AdminRepair.requestFailed'), 'admin-error-d646d93256'),
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: (idempotencyKey: string) => AdminNotificationsApi.markAllNotificationsAsRead(idempotencyKey),
    onSuccess: async (response) => {
      clearIntentKey('mark-all-read');
      adminToast.success(response.message, 'admin-success-84f4aebf');
      await queryClient.invalidateQueries({ queryKey: ADMIN_NOTIFICATIONS_QUERY_KEYS.key('list') });
    },
    onError: () => adminToast.error(t('notifications.AdminRepair.requestFailed'), 'admin-error-cfe272030b'),
  });

  const markAsRead = useCallback((id: string) => {
    const intentId = `mark-read:${id}`;
    markAsReadMutation.mutate({ id, idempotencyKey: getIntentKey(intentId) });
  }, [getIntentKey, markAsReadMutation]);

  const markAllAsRead = useCallback(() => {
    markAllAsReadMutation.mutate(getIntentKey('mark-all-read'));
  }, [getIntentKey, markAllAsReadMutation]);

  return {
    markAsRead,
    markAllAsRead,
    markAsReadMutation,
    markAllAsReadMutation,
    getIntentKey,
    clearIntentKey,
  };
}
