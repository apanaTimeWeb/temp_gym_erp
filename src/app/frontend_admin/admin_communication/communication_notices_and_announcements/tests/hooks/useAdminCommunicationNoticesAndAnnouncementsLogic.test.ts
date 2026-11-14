// RESPONSIBILITY: Defines regression tests for useAdminCommunicationNoticesAndAnnouncementsLogic.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_communication/communication_notices_and_announcements/tests/hooks/useAdminCommunicationNoticesAndAnnouncementsLogic.test.ts)

import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminAnnouncementsLogic } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/hooks/useAdminCommunicationNoticesAndAnnouncementsLogic';

const store = {
  search: '', statusFilter: 'all', priorityFilter: 'all', gymFilter: 'all', currentPage: 1, showModal: false, editingAnnouncementId: null, form: {},
  setSearch: vi.fn(), setStatusFilter: vi.fn(), setPriorityFilter: vi.fn(), setGymFilter: vi.fn(), setCurrentPage: vi.fn(), setEditingAnnouncementId: vi.fn(), setForm: vi.fn(), setShowModal: vi.fn(),
};
const createMutation = { mutate: vi.fn(), isPending: false };
const updateMutation = { mutate: vi.fn(), isPending: false };
const deleteMutation = { mutate: vi.fn(), isPending: false };
const pinMutation = { mutate: vi.fn(), isPending: false };
const getIntentKey = vi.fn((id: string) => `idem:${id}`);
const clearIntentKey = vi.fn();
const confirm = vi.fn();
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_communication/communication_notices_and_announcements/state/useAdminCommunicationNoticesAndAnnouncementsStore', () => ({ useAdminAnnouncementsStore: () => store }));
vi.mock('@/app/frontend_admin/admin_communication/communication_notices_and_announcements/hooks/useAdminCommunicationNoticesAndAnnouncementsUrlQuerySync', () => ({ useAdminNavigationLayoutUrlQuerySync: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_communication/communication_notices_and_announcements/hooks/useAdminCommunicationNoticesAndAnnouncementsConfirm', () => ({ useAdminNavigationLayoutConfirm: () => ({ confirm }) }));
vi.mock('@/app/frontend_admin/admin_communication/communication_notices_and_announcements/hooks/useAdminCommunicationNoticesAndAnnouncementsMutations', () => ({ useAdminAnnouncementsMutations: () => ({ getIntentKey, clearIntentKey, createMutation, updateMutation, deleteMutation, pinMutation }) }));

describe('useAdminAnnouncementsLogic', () => {
  beforeEach(() => {
    vi.mocked(useQuery).mockReset().mockReturnValueOnce({ data: { data: [{ id: 'a1', title: 'Notice', body: 'Body', priority: 'HIGH', audience: 'ALL', gymIds: ['all'], publishedAt: '2026-10-05T09:00:00Z', expiresAt: '2026-10-10T09:00:00Z', isPinned: false, status: 'published' }], meta: { total: 1, totalPages: 1 } }, status: 'success' } as never).mockReturnValueOnce({ data: { data: { total: 1 } }, status: 'success' } as never);
    store.setEditingAnnouncementId.mockReset(); store.setForm.mockReset(); store.setShowModal.mockReset();
    deleteMutation.mutate.mockReset();
    confirm.mockReset().mockResolvedValue(true);
  });

  it('opens create/edit flows and builds mutation payloads from current form state', async () => {
    const { result } = renderHook(() => useAdminAnnouncementsLogic());
    act(() => result.current.openCreate());
    expect(store.setEditingAnnouncementId).toHaveBeenCalledWith(null);
    expect(store.setShowModal).toHaveBeenCalledWith(true);
    act(() => result.current.openEdit((vi.mocked(useQuery).mock.results[0]?.value?.data?.data?.[0] ?? {}) as never));
    expect(store.setEditingAnnouncementId).toHaveBeenCalledWith('a1');
    result.current.saveAnnouncement({ title: 'New', body: 'Body', priority: 'HIGH', audience: 'ALL', gymIds: ['all'], publishedAt: '2026-10-05T09:00', expiresAt: '2026-10-10T09:00', isPinned: false } as never);
    expect(createMutation.mutate).toHaveBeenCalledWith(expect.objectContaining({ payload: expect.objectContaining({ title: 'New' }), idempotencyKey: 'idem:create-announcement' }), expect.anything());
    await result.current.deleteAnnouncement('a1', 'Notice');
    expect(deleteMutation.mutate).toHaveBeenCalledWith({ id: 'a1', idempotencyKey: 'idem:delete-announcement:a1' });
  });
});
