"use client";
// DATA FLOW: Notification action → useTrainerNotificationsMutations → module API → query invalidation/recovery → notification UI
// RESPONSIBILITY: Owns Trainer notification read-state mutations and targeted Query invalidation.
import { useCallback } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { markTrainerNotificationsTrainerNotificationRead, markTrainerNotificationsAllTrainerNotificationsRead } from '@/app/frontend_trainer/trainer_account/account_notifications/api/TrainerAccountNotificationsNotificationsApi';

import { TRAINER_NOTIFICATIONS_QUERY_KEYS } from '@/app/frontend_trainer/trainer_account/account_notifications/utils/TrainerAccountNotificationsNotificationsQueryKeys';

import type { TrainerNotificationsMarkReadMutationVariables } from '@/app/frontend_trainer/trainer_account/account_notifications/types/TrainerAccountNotificationsNotificationsMutationTypes';







/**
 * @description Owns notification read-state mutations for the Trainer Notifications feature.
 * @dependencies Trainer Notifications API and canonical notification query-key registry.
 * @edge-case Keeps read/unread changes consistent with subsequent paginated list reads and exposes only command functions plus pending state.
 */
/**
 * @description Manages TrainerNotificationsMutations state and data flow for the notifications feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented notifications module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerNotificationsMutations() {
  const queryClient = useQueryClient();
  const invalidateLists = useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: TRAINER_NOTIFICATIONS_QUERY_KEYS.lists() });
  }, [queryClient]);
  const markReadMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: TrainerNotificationsMarkReadMutationVariables) => markTrainerNotificationsTrainerNotificationRead(id, idempotencyKey),
    onSuccess: invalidateLists,
  });
  const markAllMutation = useMutation({
    mutationFn: (idempotencyKey: string) => markTrainerNotificationsAllTrainerNotificationsRead(idempotencyKey),
    onSuccess: invalidateLists,
  });
  return {
    markAsRead: useCallback((variables: TrainerNotificationsMarkReadMutationVariables) => markReadMutation.mutateAsync(variables), [markReadMutation]),
    markAsReadPending: markReadMutation.isPending,
    markAllAsRead: useCallback((idempotencyKey: string) => markAllMutation.mutateAsync(idempotencyKey), [markAllMutation]),
    markAllAsReadPending: markAllMutation.isPending,
  };
}
