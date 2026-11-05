// RESPONSIBILITY: Defines regression tests for useAdminCommunicationNoticesAndAnnouncementsStore.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_communication/communication_notices_and_announcements/tests/store/useAdminCommunicationNoticesAndAnnouncementsStore.test.ts)

import { beforeEach, describe, expect, it } from 'vitest';
import { useAdminAnnouncementsStore } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/state/useAdminCommunicationNoticesAndAnnouncementsStore';

describe('useAdminAnnouncementsStore', () => {
  beforeEach(() => {
    useAdminAnnouncementsStore.setState({ editingAnnouncementId: null });
  });

  it('stores only the selected announcement identity for edit mode', () => {
    useAdminAnnouncementsStore.getState().setEditingAnnouncementId('announcement-001');
    expect(useAdminAnnouncementsStore.getState().editingAnnouncementId).toBe('announcement-001');
    expect('editingAnnouncement' in useAdminAnnouncementsStore.getState()).toBe(false);
  });
});
