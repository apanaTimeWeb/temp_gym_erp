import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { superadminNotificationApi } from '@/app/frontend_superadmin/superadmin_communication/communication_notifications/api/superadmin_communication_notifications.api';
import { useSuperadminCommunicationNotifications } from '@/app/frontend_superadmin/superadmin_communication/communication_notifications/hooks/useSuperadminCommunicationNotifications';
import type { ReactNode } from 'react';

vi.mock('@/app/frontend_superadmin/superadmin_communication/communication_notifications/api/superadmin_communication_notifications.api', () => ({ superadminNotificationApi: { fetchNotifications: vi.fn(), markNotificationRead: vi.fn(), markAllNotificationsRead: vi.fn() } }));
vi.mock('@/app/frontend_superadmin/superadmin_communication/communication_notifications/hooks/useSuperadminCommunicationNotificationsSocketEvent', () => ({ useSuperadminCommunicationNotificationsSocketEvent: vi.fn() }));
vi.mock('@/app/frontend_superadmin/superadmin_communication/communication_notifications/hooks/useSuperadminCommunicationNotificationsMutations', () => ({ useSuperadminCommunicationNotificationsMutations: () => ({ markRead: vi.fn(), isMarkingRead: false, markAllRead: vi.fn(), isMarkingAllRead: false }) }));

describe('useSuperadminCommunicationNotifications', () => {
  it('loads notifications through the service contract and exposes recoverable query state', async () => {
    vi.mocked(superadminNotificationApi.fetchNotifications).mockResolvedValue({ success: true, message: 'ok', data: [] , requestId: 'test-request-id'} as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminCommunicationNotifications(), { wrapper });
    await waitFor(() => expect(result.current.isPending).toBe(false));
    expect(result.current.isError).toBe(false);
    expect(result.current.notifications).toEqual([]);
    expect(superadminNotificationApi.fetchNotifications).toHaveBeenCalledTimes(1);
  });
});
