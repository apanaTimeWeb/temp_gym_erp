import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { broadcastsApi } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/api/superadmin_communication_broadcasts_campaigns.api';
import { useSuperadminCommunicationBroadcastsCampaignsBroadcastModalData } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/hooks/useSuperadminCommunicationBroadcastsCampaignsBroadcastModalData';

import type { ReactNode } from 'react';

vi.mock('@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/api/superadmin_communication_broadcasts_campaigns.api', () => ({
  broadcastsApi: { fetchTenants: vi.fn(), fetchRecipientCount: vi.fn() },
}));

const makeWrapper = () => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
};

describe('useSuperadminCommunicationBroadcastsCampaignsBroadcastModalData', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns tenant options and recipient count from the current API object contract', async () => {
    vi.mocked(broadcastsApi.fetchTenants).mockResolvedValue({ success: true, message: 'ok', data: [{ id: 'gym-1', name: 'Gym One', plan: 'Pro' }] } as never);
    vi.mocked(broadcastsApi.fetchRecipientCount).mockResolvedValue({ success: true, message: 'ok', data: { count: 12 } } as never);
    const { result } = renderHook(() => useSuperadminCommunicationBroadcastsCampaignsBroadcastModalData(true, true), { wrapper: makeWrapper() });
    await waitFor(() => expect(result.current.gyms).toHaveLength(1));
    await waitFor(() => expect(result.current.recipientCount).toBe(12));
    expect(result.current.isPendingGyms).toBe(false);
    expect(result.current.gymsError).toBeNull();
  });

  it('preserves a real empty tenant result instead of fabricating options', async () => {
    vi.mocked(broadcastsApi.fetchTenants).mockResolvedValue({ success: true, message: 'ok', data: [] } as never);
    const { result } = renderHook(() => useSuperadminCommunicationBroadcastsCampaignsBroadcastModalData(true, false), { wrapper: makeWrapper() });
    await waitFor(() => expect(result.current.isPendingGyms).toBe(false));
    expect(result.current.gyms).toEqual([]);
    expect(broadcastsApi.fetchRecipientCount).not.toHaveBeenCalled();
  });
});
