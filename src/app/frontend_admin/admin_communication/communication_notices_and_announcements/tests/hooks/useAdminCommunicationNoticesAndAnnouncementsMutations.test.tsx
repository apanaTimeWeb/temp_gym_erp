// RESPONSIBILITY: Defines regression tests for useAdminCommunicationNoticesAndAnnouncementsMutations.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_communication/communication_notices_and_announcements/tests/hooks/useAdminCommunicationNoticesAndAnnouncementsMutations.test.tsx)

import { describe, expect, it, vi, beforeEach } from 'vitest';
import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminAnnouncementsApi } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/api/admin_communication_notices_and_announcements_api';
import { useAdminAnnouncementsMutations } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/hooks/useAdminCommunicationNoticesAndAnnouncementsMutations';

import { adminToast } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/components/feedback/AdminCommunicationNoticesAndAnnouncementsToastService';

vi.mock('@/app/frontend_admin/admin_communication/communication_notices_and_announcements/components/feedback/AdminCommunicationNoticesAndAnnouncementsToastService', () => ({ adminToast: { error: vi.fn(), success: vi.fn() } }));

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_admin/admin_communication/communication_notices_and_announcements/api/admin_communication_notices_and_announcements_api', () => ({
  AdminAnnouncementsApi: {
    createAnnouncement: vi.fn().mockResolvedValue({ message: 'ok' }),
    updateAnnouncement: vi.fn().mockResolvedValue({ message: 'ok' }),
    deleteAnnouncement: vi.fn().mockResolvedValue({ message: 'ok' }),
    togglePin: vi.fn().mockResolvedValue({ message: 'ok' })
  },
}));

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

describe('useAdminAnnouncementsMutations', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('reuses idempotency only for the same immutable intent payload', () => {
    const { result } = renderHook(() => useAdminAnnouncementsMutations(), { wrapper });
    const first = result.current.getIntentKey('create-announcement', '{"title":"one"}');
    expect(result.current.getIntentKey('create-announcement', '{"title":"one"}')).toBe(first);
    const changed = result.current.getIntentKey('create-announcement', '{"title":"two"}');
    expect(changed).not.toBe(first);
    result.current.clearIntentKey('create-announcement');
    expect(result.current.getIntentKey('create-announcement', '{"title":"two"}')).not.toBe(changed);
  });

  it('executes the mutation through the module API boundary', async () => {
    const { result } = renderHook(() => useAdminAnnouncementsMutations(), { wrapper });
    await act(async () => { await result.current.createMutation.mutateAsync({ id: 'id-1', staffId: 'staff-1', planId: 'plan-1', permission: 'view', enabled: true, payload: {}, data: {}, planName: 'Pro', intentId: 'intent-1', idempotencyKey: 'idem-1' } as never); });
    await waitFor(() => expect(AdminAnnouncementsApi.createAnnouncement).toHaveBeenCalled());
  });

  it('does not reveal backend exception details in failure toast', async () => {
    vi.mocked(AdminAnnouncementsApi.createAnnouncement).mockRejectedValueOnce(new Error('PRIVATE_DB_CONNECTION_STRING'));
    const { result } = renderHook(() => useAdminAnnouncementsMutations(), { wrapper });
    await act(async () => {
      await expect(result.current.createMutation.mutateAsync({ payload: {} as never, intentId: 'create-announcement', idempotencyKey: 'test-idempotency' })).rejects.toThrow('PRIVATE_DB_CONNECTION_STRING');
    });
    expect(adminToast.error).toHaveBeenCalledWith('announcements.AdminRepair.requestFailed', expect.stringMatching(/^admin-error-/));
    expect(JSON.stringify(vi.mocked(adminToast.error).mock.calls)).not.toContain('PRIVATE_DB_CONNECTION_STRING');
  });
});
