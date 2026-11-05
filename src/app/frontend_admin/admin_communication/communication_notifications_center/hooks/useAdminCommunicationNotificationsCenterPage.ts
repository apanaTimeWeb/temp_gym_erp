"use client";
// RESPONSIBILITY: Owns TanStack Query state and notification mutations for the Admin notification page.
// DATA FLOW: AdminNotificationsApi → TanStack Query → AdminNotificationsClient → AdminNotificationsList

import { ADMIN_NOTIFICATIONS_QUERY_KEYS } from '@/app/frontend_admin/admin_communication/communication_notifications_center/constants/AdminCommunicationNotificationsCenterQueryKeys';
import { useLocale } from 'next-intl';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';
import { AdminNotificationsApi } from '@/app/frontend_admin/admin_communication/communication_notifications_center/api/admin_communication_notifications_center_api';
import { useAdminNotificationsMutations } from '@/app/frontend_admin/admin_communication/communication_notifications_center/hooks/useAdminCommunicationNotificationsCenterMutations';
import type { NotificationItem } from '@/app/frontend_admin/admin_communication/communication_notifications_center/types/AdminCommunicationNotificationsCenterTypes';
import { useAdminNavigationLayoutWebSocketEvent } from '@/app/frontend_admin/admin_navigation/components/AdminNavigationLayoutWebSocketProvider';
import { mapAdminNotificationToItem } from '@/app/frontend_admin/admin_communication/communication_notifications_center/utils/AdminCommunicationNotificationsCenterFormatters';

/** @description useAdminNotificationsPage: Owns TanStack Query state and notification mutations for the Admin notification page. @dependencies Consumes AdminNotificationsQueryKeys, AdminNotificationsApi, useAdminNotificationsMutations, AdminNotificationsTypes. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export const useAdminNotificationsPage = () => {
  const locale = useLocale();
  const queryClient = useQueryClient();
  const notificationsQuery = useQuery({
    queryKey: ADMIN_NOTIFICATIONS_QUERY_KEYS.key('list'),
    queryFn: () => AdminNotificationsApi.fetchNotifications(),
    staleTime: 1000 * 60,
  });

const handleSocketNotification = useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: ADMIN_NOTIFICATIONS_QUERY_KEYS.key() });
  }, [queryClient]);
  const websocketConnected = useAdminNavigationLayoutWebSocketEvent('NOTIFICATION_RECEIVED', handleSocketNotification);

  const previousWebsocketConnectedRef = useRef(false);
  useEffect(() => {
    if (websocketConnected && !previousWebsocketConnectedRef.current) {
      void queryClient.invalidateQueries({ queryKey: ADMIN_NOTIFICATIONS_QUERY_KEYS.key() });
    }
    previousWebsocketConnectedRef.current = websocketConnected;
  }, [queryClient, websocketConnected]);

  // EFFECT: Recovers authoritative notification state after tab visibility/focus changes.
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        void queryClient.invalidateQueries({ queryKey: ADMIN_NOTIFICATIONS_QUERY_KEYS.key() });
      }
    };
    window.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('focus', handleVisibility);
    return () => {
      window.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('focus', handleVisibility);
    };
  }, [queryClient]);

  const notifications = (notificationsQuery.data?.data ?? []).map((notification) => mapAdminNotificationToItem(notification, locale));

  const { markAsRead, markAllAsRead, markAllAsReadMutation } = useAdminNotificationsMutations();

  return {
    notifications,
    status: notificationsQuery.status,
    error: notificationsQuery.error,
    isError: notificationsQuery.isError,
    retry: notificationsQuery.refetch,
    markAllAsRead,
    isMarkAllPending: markAllAsReadMutation.isPending,
    markAsRead,
  };
};
