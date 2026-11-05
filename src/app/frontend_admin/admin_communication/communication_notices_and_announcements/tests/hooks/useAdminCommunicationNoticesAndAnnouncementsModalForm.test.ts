// RESPONSIBILITY: Defines regression tests for useAdminCommunicationNoticesAndAnnouncementsModalForm.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_communication/communication_notices_and_announcements/tests/hooks/useAdminCommunicationNoticesAndAnnouncementsModalForm.test.ts)

import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAdminAnnouncementsModalForm } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/hooks/useAdminCommunicationNoticesAndAnnouncementsModalForm';

const setShowModal = vi.fn();
const store = { form: { title: '', body: '', priority: 'NORMAL', audience: 'ALL', gymIds: ['all'], publishedAt: '2026-10-05T09:00', expiresAt: '2026-10-10T09:00', isPinned: false } };
vi.mock('@/app/frontend_admin/admin_communication/communication_notices_and_announcements/hooks/useAdminCommunicationNoticesAndAnnouncementsLogic', () => ({ useAdminAnnouncementsLogic: () => ({ showModal: true, setShowModal, editingAnnouncementId: 'a1', saveAnnouncement: vi.fn(), saving: false }) }));
vi.mock('@/app/frontend_admin/admin_communication/communication_notices_and_announcements/state/useAdminCommunicationNoticesAndAnnouncementsStore', () => ({ useAdminAnnouncementsStore: () => store }));
vi.mock('@/app/frontend_admin/admin_communication/communication_notices_and_announcements/hooks/useAdminCommunicationNoticesAndAnnouncementsUnsavedChangesGuard', () => ({ useAdminAnnouncementsUnsavedChangesGuard: () => ({ confirmDiscardIfDirty: vi.fn().mockResolvedValue(true) }) }));

describe('useAdminAnnouncementsModalForm', () => {
  it('detects edit mode, toggles array values, and closes after confirmation', async () => {
    const { result } = renderHook(() => useAdminAnnouncementsModalForm());
    expect(result.current.isEdit).toBe(true);
    expect(result.current.toggleArrayValue(['email'], 'sms')).toEqual(['email', 'sms']);
    expect(result.current.toggleArrayValue(['email', 'sms'], 'email')).toEqual(['sms']);
    await act(async () => result.current.handleClose());
    expect(setShowModal).toHaveBeenCalledWith(false);
  });
});
