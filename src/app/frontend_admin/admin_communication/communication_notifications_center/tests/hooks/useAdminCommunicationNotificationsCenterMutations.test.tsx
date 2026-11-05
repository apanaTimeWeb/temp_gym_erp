// RESPONSIBILITY: Defines regression tests for useAdminCommunicationNotificationsCenterMutations.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_communication/communication_notifications_center/tests/hooks/useAdminCommunicationNotificationsCenterMutations.test.tsx)

import { describe, expect, it, vi, beforeEach } from 'vitest';
import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminNotificationsApi } from '@/app/frontend_admin/admin_communication/communication_notifications_center/api/admin_communication_notifications_center_api';
import { useAdminNotificationsMutations } from '@/app/frontend_admin/admin_communication/communication_notifications_center/hooks/useAdminCommunicationNotificationsCenterMutations';

import { adminToast } from '@/app/frontend_admin/admin_communication/communication_notifications_center/components/feedback/AdminCommunicationNotificationsCenterToastService';

vi.mock('@/app/frontend_admin/admin_communication/communication_notifications_center/components/feedback/AdminCommunicationNotificationsCenterToastService', () => ({ adminToast: { error: vi.fn(), success: vi.fn() } }));

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_admin/admin_communication/communication_notifications_center/api/admin_communication_notifications_center_api', () => ({
  AdminNotificationsApi: {
    markNotificationAsRead: vi.fn().mockResolvedValue({ message: 'ok' }),
    markAllNotificationsAsRead: vi.fn().mockResolvedValue({ message: 'ok' })
  },
}));

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

describe('useAdminNotificationsMutations', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('executes the mutation through the module API boundary', async () => {
    const { result } = renderHook(() => useAdminNotificationsMutations(), { wrapper });
    await act(async () => { await result.current.markAsReadMutation.mutateAsync({ id: 'id-1', idempotencyKey: 'idem-1' }); });
    await waitFor(() => expect(AdminNotificationsApi.markNotificationAsRead).toHaveBeenCalled());
  });

  it('does not reveal backend exception details in failure toast', async () => {
    vi.mocked(AdminNotificationsApi.markNotificationAsRead).mockRejectedValueOnce(new Error('PRIVATE_DB_CONNECTION_STRING'));
    const { result } = renderHook(() => useAdminNotificationsMutations(), { wrapper });
    await act(async () => {
      await expect(result.current.markAsReadMutation.mutateAsync({ id: 'n-1', idempotencyKey: 'test-idempotency' })).rejects.toThrow('PRIVATE_DB_CONNECTION_STRING');
    });
    expect(adminToast.error).toHaveBeenCalledWith('notifications.AdminRepair.requestFailed', expect.stringMatching(/^admin-error-/));
    expect(JSON.stringify(vi.mocked(adminToast.error).mock.calls)).not.toContain('PRIVATE_DB_CONNECTION_STRING');
  });
});
