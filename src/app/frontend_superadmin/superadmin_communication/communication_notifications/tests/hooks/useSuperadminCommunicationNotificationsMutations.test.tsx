import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { superadminNotificationApi } from '@/app/frontend_superadmin/superadmin_communication/communication_notifications/api/superadmin_communication_notifications.api';
import { useSuperadminCommunicationNotificationsMutations } from '@/app/frontend_superadmin/superadmin_communication/communication_notifications/hooks/useSuperadminCommunicationNotificationsMutations';

import type { ReactNode } from 'react';



vi.mock('@/app/frontend_superadmin/superadmin_communication/communication_notifications/api/superadmin_communication_notifications.api', () => ({ superadminNotificationApi: { markNotificationRead: vi.fn(), markAllNotificationsRead: vi.fn() } }));

describe('useSuperadminCommunicationNotificationsMutations', () => {
  it('marks one notification read through the API and exposes the read action only while pending', async () => {
    vi.mocked(superadminNotificationApi.markNotificationRead).mockResolvedValue({ success: true, message: 'Read', data: { id: 'n-1' } , requestId: 'test-request-id'} as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminCommunicationNotificationsMutations(), { wrapper });
    await result.current.markRead('n-1');
    expect(superadminNotificationApi.markNotificationRead).toHaveBeenCalledWith('n-1', expect.any(String));
    expect(result.current.isMarkingRead).toBe(false);
  });
});
