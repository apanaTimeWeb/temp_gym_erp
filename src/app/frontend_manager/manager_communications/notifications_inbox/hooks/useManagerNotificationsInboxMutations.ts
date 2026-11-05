// DATA FLOW: User action → ManagerNotificationsInboxMutations → ManagerNotificationsInboxApi → TanStack Query invalidation → Notifications UI.
'use client';
import { useRef } from 'react';
import { useCallback } from 'react';

import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';

import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureIdempotency';
import { ManagerInfrastructureShowErrorToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowErrorToast';
import { ManagerInfrastructureShowSuccessToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowSuccessToast';

import { ManagerNotificationsInboxApi } from '@/app/frontend_manager/manager_communications/notifications_inbox/api/manager_notifications_inbox.api';
import { ManagerNotificationsInboxQueryKeys } from '@/app/frontend_manager/manager_communications/notifications_inbox/api/manager_notifications_inbox.query_keys';
import { MANAGER_NOTIFICATION_DELETE_ACTION } from '@/app/frontend_manager/manager_communications/notifications_inbox/constants/manager_notifications_inbox_shared.constants';

/**
 * @description Owns notification read/delete mutations, confirmation, idempotency lifecycle, and cache invalidation for user-triggered notification actions.
 * @dependencies Uses ManagerNotificationsInboxApi, ManagerNotificationsInboxQueryKeys, confirmation/toast infrastructure, and module translations.
 * @edge-case Destructive deletion is confirmed before key generation; failed requests retain the existing cache and expose the backend error through the approved toast layer.
 */
export function useManagerNotificationsInboxMutations() {
  const t = useTranslations('MANAGER_NOTIFICATIONS_INBOX');
  const { confirm } = useConfirm();
  const queryClient = useQueryClient();
  const intentKeysRef = useRef(new Map<string, string>());
  const invalidate = useCallback(() => queryClient.invalidateQueries({ queryKey: ManagerNotificationsInboxQueryKeys.all }), [queryClient]);

  const readMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => ManagerNotificationsInboxApi.markNotificationRead(id, idempotencyKey),
    onSuccess: (response, variables) => { ManagerInfrastructureShowSuccessToast(response.message, `manager-notifications-mark-read-${variables.id}`); if (intentKeysRef.current.get(`read:${variables.id}`) === variables.idempotencyKey) intentKeysRef.current.delete(`read:${variables.id}`); void invalidate(); },
    onError: (error, id) => { ManagerInfrastructureShowErrorToast(error, `manager-notifications-mark-read-${id}`); },
  });
  const readAllMutation = useMutation({
    mutationFn: ({ idempotencyKey }: { idempotencyKey: string }) => ManagerNotificationsInboxApi.markAllNotificationsRead(idempotencyKey),
    onSuccess: (response, variables) => { ManagerInfrastructureShowSuccessToast(response.message, 'manager-notifications-mark-all-read'); if (intentKeysRef.current.get('read-all') === variables.idempotencyKey) intentKeysRef.current.delete('read-all'); void invalidate(); },
    onError: (error) => { ManagerInfrastructureShowErrorToast(error, 'manager-notifications-mark-all-read'); },
  });
  const deleteMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => ManagerNotificationsInboxApi.deleteNotification(id, idempotencyKey),
    onSuccess: (response, variables) => { ManagerInfrastructureShowSuccessToast(response.message, `manager-notifications-delete-${variables.id}`); if (intentKeysRef.current.get(`delete:${variables.id}`) === variables.idempotencyKey) intentKeysRef.current.delete(`delete:${variables.id}`); void invalidate(); },
    onError: (error, id) => { ManagerInfrastructureShowErrorToast(error, `manager-notifications-delete-${id}`); },
  });

  const handleDelete = useCallback(async (id: string) => {
    const confirmed = await confirm({
      title: t('DELETE_NOTIFICATION_TITLE'),
      message: t('DELETE_NOTIFICATION_MESSAGE'),
      confirmText: t(MANAGER_NOTIFICATION_DELETE_ACTION),
      cancelText: t('KEEP_NOTIFICATION'),
      type: 'danger',
    });
    if (confirmed) { const idempotencyKey = intentKeysRef.current.get(`delete:${id}`) ?? ManagerInfrastructureIdempotency(); intentKeysRef.current.set(`delete:${id}`, idempotencyKey); await deleteMutation.mutateAsync({ id, idempotencyKey }); }
  }, [confirm, deleteMutation, t]);

  const handleMarkRead = useCallback(async (id: string) => {
    const idempotencyKey = intentKeysRef.current.get(`read:${id}`) ?? ManagerInfrastructureIdempotency(); intentKeysRef.current.set(`read:${id}`, idempotencyKey); await readMutation.mutateAsync({ id, idempotencyKey });
  }, [readMutation]);

  const handleMarkAllRead = useCallback(async () => {
    const idempotencyKey = intentKeysRef.current.get('read-all') ?? ManagerInfrastructureIdempotency(); intentKeysRef.current.set('read-all', idempotencyKey); await readAllMutation.mutateAsync({ idempotencyKey });
  }, [readAllMutation]);

  return {
    handleMarkRead,
    handleMarkAllRead,
    handleDelete,
    saving: readMutation.isPending || readAllMutation.isPending || deleteMutation.isPending,
  };
}
