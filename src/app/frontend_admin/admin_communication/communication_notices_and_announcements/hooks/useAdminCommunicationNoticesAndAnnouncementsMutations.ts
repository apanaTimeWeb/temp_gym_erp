"use client";
// RESPONSIBILITY: Owns all TanStack Query mutations and cache updates for Admin Announcements.
// DATA FLOW: Announcement form/action → mutation hook → AdminAnnouncementsApi → TanStack Query invalidation → announcement UI and backend feedback.

import { useTranslations } from 'next-intl';
import { useCallback, useRef } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { ADMIN_ANNOUNCEMENTS_QUERY_KEYS } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/constants/AdminCommunicationNoticesAndAnnouncementsQueryKeys';
import { AdminAnnouncementsApi } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/api/admin_communication_notices_and_announcements_api';
import { useAdminAnnouncementsStore } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/state/useAdminCommunicationNoticesAndAnnouncementsStore';
import { adminToast } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/components/feedback/AdminCommunicationNoticesAndAnnouncementsToastService';
import { clearAdminIdempotencyKey, getAdminIdempotencyKey } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/utils/AdminCommunicationNoticesAndAnnouncementsIdempotencyIntentStore';
import type { AnnouncementFormValues } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/types/AdminCommunicationNoticesAndAnnouncementsTypes';
/** @description useAdminAnnouncementsMutations: Owns all TanStack Query mutations and cache updates for Admin Announcements. @dependencies Consumes AdminAnnouncementsQueryKeys, AdminAnnouncementsApi, useAdminAnnouncementsStore, AdminNavigationLayoutToastService, AdminNavigationLayoutBackendMessage, AdminNavigationLayoutIdempotencyIntentStore. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminAnnouncementsMutations() {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const store = useAdminAnnouncementsStore();
  const idempotencyKeysRef = useRef(new Map<string, string>());
  const intentPayloadsRef = useRef(new Map<string, string>());
  const clearIntentKey = useCallback((intentId: string) => {
    clearAdminIdempotencyKey(idempotencyKeysRef.current, intentId);
    intentPayloadsRef.current.delete(intentId);
  }, []);
  const getIntentKey = useCallback((intentId: string, payloadSignature?: string) => {
    const lastSignature = intentPayloadsRef.current.get(intentId);
    if (payloadSignature !== undefined && lastSignature !== undefined && lastSignature !== payloadSignature) {
      clearAdminIdempotencyKey(idempotencyKeysRef.current, intentId);
    }
    if (payloadSignature !== undefined) intentPayloadsRef.current.set(intentId, payloadSignature);
    return getAdminIdempotencyKey(idempotencyKeysRef.current, intentId);
  }, []);

  const createMutation = useMutation({
    mutationFn: ({ payload, idempotencyKey, intentId }: { payload: AnnouncementFormValues; idempotencyKey: string; intentId: string }) => AdminAnnouncementsApi.createAnnouncement(payload, idempotencyKey),
    onSuccess: (response, variables) => { clearIntentKey(variables.intentId); adminToast.success(response.message, 'admin-success-33383590'); store.setShowModal(false); void queryClient.invalidateQueries({ queryKey: ADMIN_ANNOUNCEMENTS_QUERY_KEYS.key() }); },
    onError: () => adminToast.error(t('announcements.AdminRepair.requestFailed'), 'admin-error-6481815840'),
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, payload, idempotencyKey, intentId }: { id: string; payload: AnnouncementFormValues; idempotencyKey: string; intentId: string }) => AdminAnnouncementsApi.updateAnnouncement(id, payload, idempotencyKey),
    onSuccess: (response, variables) => { clearIntentKey(variables.intentId); adminToast.success(response.message, 'admin-success-c151e3e9'); store.setShowModal(false); store.setEditingAnnouncementId(null); void queryClient.invalidateQueries({ queryKey: ADMIN_ANNOUNCEMENTS_QUERY_KEYS.key() }); },
    onError: () => adminToast.error(t('announcements.AdminRepair.requestFailed'), 'admin-error-72b190472c'),
  });
  const deleteMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => AdminAnnouncementsApi.deleteAnnouncement(id, idempotencyKey),
    onSuccess: (response, variables) => { adminToast.success(response.message, 'admin-success-05945f3e'); clearIntentKey(`delete-announcement:${variables.id}`); void queryClient.invalidateQueries({ queryKey: ADMIN_ANNOUNCEMENTS_QUERY_KEYS.key() }); },
    onError: () => adminToast.error(t('announcements.AdminRepair.requestFailed'), 'admin-error-f6f10488f8'),
  });
  const pinMutation = useMutation({
    mutationFn: ({ id, idempotencyKey, intentId }: { id: string; idempotencyKey: string; intentId: string }) => AdminAnnouncementsApi.togglePin(id, idempotencyKey),
    onSuccess: (response, variables) => { clearIntentKey(variables.intentId); adminToast.success(response.message, 'admin-success-d9cfd2a7'); void Promise.all([
        queryClient.invalidateQueries({ queryKey: ADMIN_ANNOUNCEMENTS_QUERY_KEYS.key('list') }),
        queryClient.invalidateQueries({ queryKey: ADMIN_ANNOUNCEMENTS_QUERY_KEYS.key('kpis') }),
      ]); },
    onError: () => adminToast.error(t('announcements.AdminRepair.requestFailed'), 'admin-error-01a0fd9c95'),
  });

  return {
    getIntentKey,
    clearIntentKey,
    createMutation,
    updateMutation,
    deleteMutation,
    pinMutation,
  };
}
