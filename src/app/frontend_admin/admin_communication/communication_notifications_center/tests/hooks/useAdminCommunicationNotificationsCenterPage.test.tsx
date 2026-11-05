// RESPONSIBILITY: Defines regression tests for useAdminCommunicationNotificationsCenterPage.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_communication/communication_notifications_center/tests/hooks/useAdminCommunicationNotificationsCenterPage.test.tsx)

import React from 'react';
import { NOTIFICATION_SEVERITY } from '@/app/frontend_admin/admin_communication/communication_notifications_center/constants/AdminCommunicationNotificationsCenterConstants';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAdminNotificationsPage } from '@/app/frontend_admin/admin_communication/communication_notifications_center/hooks/useAdminCommunicationNotificationsCenterPage';
import { AdminNotificationsApi } from '@/app/frontend_admin/admin_communication/communication_notifications_center/api/admin_communication_notifications_center_api';

vi.mock('@/app/frontend_admin/admin_communication/communication_notifications_center/api/admin_communication_notifications_center_api', () => ({
  AdminNotificationsApi: {
    fetchNotifications: vi.fn(),
    markNotificationAsRead: vi.fn(),
    markAllNotificationsAsRead: vi.fn(),
  },
}));

vi.mock('@/app/frontend_admin/admin_communication/communication_notifications_center/components/feedback/AdminCommunicationNotificationsCenterToastService', () => ({
  adminToast: { success: vi.fn(), error: vi.fn() },
}));

vi.mock('next-intl', () => ({ useLocale: () => 'en-IN' }));
vi.mock('@/app/frontend_admin/admin_navigation/components/AdminNavigationLayoutWebSocketProvider', () => ({ useAdminNavigationLayoutWebSocketEvent: () => false }));

function createWrapper() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

describe('useAdminNotificationsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(AdminNotificationsApi.fetchNotifications).mockResolvedValue({ success: true, message: 'ok', data: []  , requestId: "mock-admin-notifications-notifications-center-tests-hooks-useadminnotificationscenterpage-test-tsx-35"});
  });

  it('passes a stable key to mark-as-read and reuses it after failure', async () => {
    vi.mocked(AdminNotificationsApi.markNotificationAsRead)
      .mockRejectedValueOnce(new Error('temporary failure'))
      .mockResolvedValueOnce({ success: true, message: 'Notification marked as read', data: { id: 'n1', title: 'Payment received', body: 'Read', severity: NOTIFICATION_SEVERITY.INFO, read: true, createdAt: '2026-09-16T12:00:00Z' }, requestId: 'test-read-success'});

    const { result } = renderHook(() => useAdminNotificationsPage(), { wrapper: createWrapper() });

    await act(async () => { result.current.markAsRead('n1'); });
    await waitFor(() => expect(AdminNotificationsApi.markNotificationAsRead).toHaveBeenCalledTimes(1));
    await act(async () => { result.current.markAsRead('n1'); });
    await waitFor(() => expect(AdminNotificationsApi.markNotificationAsRead).toHaveBeenCalledTimes(2));

    const calls = vi.mocked(AdminNotificationsApi.markNotificationAsRead).mock.calls;
    expect(calls[0]?.[0]).toBe('n1');
    expect(calls[1]?.[0]).toBe('n1');
    expect(calls[0]?.[1]).toBe(calls[1]?.[1]);
  });

  it('exposes validated notifications from the actual API query result', async () => {
    vi.mocked(AdminNotificationsApi.fetchNotifications).mockResolvedValueOnce({
      success: true,
      message: 'ok',
      data: [{ id: '1', title: 'Payment received', body: 'Invoice #1', createdAt: '2026-09-16T10:00:00Z', read: false, severity: NOTIFICATION_SEVERITY.INFO }],
     requestId: "mock-admin-notifications-notifications-center-tests-hooks-useadminnotificationscenterpage-test-tsx-57"});
    const { result } = renderHook(() => useAdminNotificationsPage(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.notifications[0]?.id).toBe('1'));
    expect(result.current.notifications[0]?.unread).toBe(true);
  });

  it('does not expose a delete mutation unsupported by the API contract', () => {
    const { result } = renderHook(() => useAdminNotificationsPage(), { wrapper: createWrapper() });
    expect('deleteNotification' in result.current).toBe(false);
  });
});
