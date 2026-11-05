"use client";
// RESPONSIBILITY: Coordinates Admin Announcements query/mutation state, URL-shareable filters, and pagination.
// DATA FLOW: AdminAnnouncementsApi → TanStack Query → useAdminAnnouncementsLogic → AdminAnnouncementsMain/table/modal

import { ADMIN_ANNOUNCEMENTS_QUERY_KEYS } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/constants/AdminCommunicationNoticesAndAnnouncementsQueryKeys';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminAnnouncementsApi } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/api/admin_communication_notices_and_announcements_api';
import { useAdminAnnouncementsStore } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/state/useAdminCommunicationNoticesAndAnnouncementsStore';
import { useAdminNavigationLayoutConfirm } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/hooks/useAdminCommunicationNoticesAndAnnouncementsConfirm';
import { useAdminNavigationLayoutUrlQuerySync } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/hooks/useAdminCommunicationNoticesAndAnnouncementsUrlQuerySync';
import { ANNOUNCEMENTS_ITEMS_PER_PAGE, EMPTY_ANNOUNCEMENT_FORM } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/constants/AdminCommunicationNoticesAndAnnouncementsConstants';
import type { Announcement, AnnouncementFormValues } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/types/AdminCommunicationNoticesAndAnnouncementsTypes';
import { useAdminAnnouncementsMutations } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/hooks/useAdminCommunicationNoticesAndAnnouncementsMutations';
import { useAdminAnnouncementsDebounce } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/hooks/useAdminCommunicationNoticesAndAnnouncementsDebounce';
import { adminAnnouncementLocalDateTimeToUtc, adminAnnouncementUtcToLocalDateTime } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/utils/AdminCommunicationNoticesAndAnnouncementsDateTime';
import { adminAnnouncementPinIntent } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/utils/AdminCommunicationNoticesAndAnnouncementsPinIntent';
import { normalizeAdminAnnouncementsPage } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/utils/AdminCommunicationNoticesAndAnnouncementsPageBoundary';
/** @description useAdminAnnouncementsLogic: Coordinates Admin Announcements query/mutation state, URL-shareable filters, and pagination. @dependencies Consumes AdminAnnouncementsQueryKeys, AdminAnnouncementsApi, useAdminAnnouncementsStore, useAdminNavigationLayoutConfirm, useAdminNavigationLayoutUrlQuerySync, AdminAnnouncementsConstants. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminAnnouncementsLogic() {
  const { confirm } = useAdminNavigationLayoutConfirm();
  const store = useAdminAnnouncementsStore();
  const { search, statusFilter, priorityFilter, gymFilter, currentPage } = store;
  const debouncedSearch = useAdminAnnouncementsDebounce(search, 300);
  useAdminNavigationLayoutUrlQuerySync([
    { key: 'search', value: search, defaultValue: '', setValue: (val) => store.setSearch(typeof val === 'string' ? val : '') },
    { key: 'status', value: statusFilter, defaultValue: 'all', setValue: (val) => { const normalized = typeof val === 'string' ? val : ''; if (['all', 'active', 'scheduled', 'expired', 'draft'].includes(normalized)) store.setStatusFilter(normalized as 'all' | import('@/app/frontend_admin/admin_communication/communication_notices_and_announcements/types/AdminCommunicationNoticesAndAnnouncementsTypes').AnnouncementStatus); } },
    { key: 'priority', value: priorityFilter, defaultValue: 'all', setValue: (val) => { const normalized = typeof val === 'string' ? val : ''; if (['all', 'high', 'medium', 'low'].includes(normalized)) store.setPriorityFilter(normalized as 'all' | import('@/app/frontend_admin/admin_communication/communication_notices_and_announcements/types/AdminCommunicationNoticesAndAnnouncementsTypes').AnnouncementPriority); } },
    { key: 'gym', value: gymFilter, defaultValue: 'all', setValue: (val) => store.setGymFilter(typeof val === 'string' ? val : 'all') },
    { key: 'page', value: currentPage, defaultValue: 1, setValue: (value) => store.setCurrentPage(normalizeAdminAnnouncementsPage(value ?? null)), },
  ]);

  const queryParams = {
    page: currentPage,
    limit: ANNOUNCEMENTS_ITEMS_PER_PAGE,
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
    ...(statusFilter !== 'all' ? { status: statusFilter as Announcement['status'] } : {}),
    ...(priorityFilter !== 'all' ? { priority: priorityFilter as Announcement['priority'] } : {}),
    ...(gymFilter !== 'all' ? { gymId: gymFilter } : {}),
  };
  const announcementsQuery = useQuery({
    queryKey: ADMIN_ANNOUNCEMENTS_QUERY_KEYS.key('list', queryParams),
    queryFn: () => AdminAnnouncementsApi.fetchAnnouncements(queryParams),
    staleTime: 1000 * 60 * 2,
  });
  const kpisQuery = useQuery({
    queryKey: ADMIN_ANNOUNCEMENTS_QUERY_KEYS.key('kpis'),
    queryFn: () => AdminAnnouncementsApi.fetchKPIs(), staleTime: 1000 * 60 * 5,
  });
  const response = announcementsQuery.data;
  const paginated = response?.data ?? [];
  const totalItems = response?.meta?.total ?? paginated.length;
  const totalPages = Math.max(1, response?.meta?.totalPages ?? Math.ceil(totalItems / ANNOUNCEMENTS_ITEMS_PER_PAGE));

  const { getIntentKey, clearIntentKey, createMutation, updateMutation, deleteMutation, pinMutation } = useAdminAnnouncementsMutations();

  const openCreate = useCallback(() => { store.setEditingAnnouncementId(null); store.setForm(EMPTY_ANNOUNCEMENT_FORM); store.setShowModal(true); }, [store]);
  const openEdit = useCallback((announcement: Announcement) => { store.setEditingAnnouncementId(announcement.id); store.setForm({ title: announcement.title, body: announcement.body, priority: announcement.priority, audience: announcement.audience, gymIds: announcement.gymIds, publishedAt: adminAnnouncementUtcToLocalDateTime(announcement.publishedAt), expiresAt: adminAnnouncementUtcToLocalDateTime(announcement.expiresAt), isPinned: announcement.isPinned }); store.setShowModal(true); }, [store]);
  const saveAnnouncement = useCallback((data: AnnouncementFormValues, onValidationError?: (error: unknown) => void) => {
    const payload: AnnouncementFormValues = { ...data, publishedAt: adminAnnouncementLocalDateTimeToUtc(data.publishedAt), expiresAt: adminAnnouncementLocalDateTimeToUtc(data.expiresAt) };
    if (store.editingAnnouncementId) {
      const intentId = `update-announcement:${store.editingAnnouncementId}`;
      updateMutation.mutate({ id: store.editingAnnouncementId, payload, idempotencyKey: getIntentKey(intentId, JSON.stringify(payload)), intentId }, { onError: onValidationError });
    } else {
      const intentId = 'create-announcement';
      createMutation.mutate({ payload, idempotencyKey: getIntentKey(intentId, JSON.stringify(payload)), intentId }, { onError: onValidationError });
    }
  }, [createMutation, getIntentKey, store.editingAnnouncementId, updateMutation]);
  const abandonDraftIntent = useCallback(() => {
    clearIntentKey(store.editingAnnouncementId ? `update-announcement:${store.editingAnnouncementId}` : 'create-announcement');
  }, [clearIntentKey, store.editingAnnouncementId]);
  const t = useTranslations();

  const deleteAnnouncement = useCallback(async (id: string, _title: string) => { const intentId = `delete-announcement:${id}`; const ok = await confirm({ title: t('announcements.AdminAnnouncementsConfirm.deleteTitle'), message: t('announcements.AdminAnnouncementsConfirm.deleteMessage'), confirmText: t('announcements.AdminAnnouncementsConfirm.deleteConfirm'), type: 'danger' }); if (ok) deleteMutation.mutate({ id, idempotencyKey: getIntentKey(intentId) }); else clearIntentKey(intentId); }, [clearIntentKey, confirm, deleteMutation, getIntentKey, t]);

  const togglePin = useCallback((id: string) => {
    const target = paginated.find((item) => item.id === id);
    if (!target || pinMutation.isPending) return;
    const intentId = adminAnnouncementPinIntent(id, target.isPinned);
    pinMutation.mutate({ id, idempotencyKey: getIntentKey(intentId), intentId });
  }, [getIntentKey, paginated, pinMutation]);

  return { paginated, filtered: paginated, status: announcementsQuery.status, error: announcementsQuery.error, retryAnnouncements: announcementsQuery.refetch, kpis: kpisQuery.data?.data ?? null, kpisStatus: kpisQuery.status, kpisError: kpisQuery.error, retryKpis: kpisQuery.refetch, showModal: store.showModal, setShowModal: store.setShowModal, editingAnnouncementId: store.editingAnnouncementId, openCreate, openEdit, saveAnnouncement, deleteAnnouncement, togglePin, saving: createMutation.isPending || updateMutation.isPending, abandonDraftIntent, currentPage, setCurrentPage: store.setCurrentPage, totalPages, totalItems };
}
