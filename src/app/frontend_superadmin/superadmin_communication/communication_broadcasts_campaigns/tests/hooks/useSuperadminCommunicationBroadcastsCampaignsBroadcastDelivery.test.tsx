import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { deliverBroadcastToRecipient } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/api/superadmin_communication_broadcasts_campaigns.api';
import { useSuperadminCommunicationBroadcastsCampaignsBroadcastDelivery } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/hooks/useSuperadminCommunicationBroadcastsCampaignsBroadcastDelivery';
import { MOCK_SUPERADMIN_COMMUNICATION_BROADCASTS } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/mocks/fixtures/SuperadminCommunicationBroadcastsCampaignsMockFixtures';

import type { ReactNode } from 'react';

vi.mock('@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/api/superadmin_communication_broadcasts_campaigns.api', () => ({ deliverBroadcastToRecipient: vi.fn() }));
const delivered = { success: true, message: 'Delivered', data: { broadcast: MOCK_SUPERADMIN_COMMUNICATION_BROADCASTS[0], recipientId: 'r-1', deliveryStatus: 'DELIVERED', deliveredAt: '2026-10-01T10:00:00Z' } };
const failed = { success: true, message: 'Delivery failed', data: { broadcast: MOCK_SUPERADMIN_COMMUNICATION_BROADCASTS[0], recipientId: 'r-1', deliveryStatus: 'FAILED', deliveredAt: null } };
const wrapper = ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client: new QueryClient({ defaultOptions: { mutations: { retry: false }, queries: { retry: false } } }) }, children);

afterEach(() => vi.unstubAllGlobals());

describe('useSuperadminCommunicationBroadcastsCampaignsBroadcastDelivery', () => {
  it('owns the idempotency key and returns only an actually delivered response', async () => {
    vi.stubGlobal('crypto', { randomUUID: vi.fn(() => 'intent-1') });
    vi.mocked(deliverBroadcastToRecipient).mockResolvedValue(delivered as never);
    const { result } = renderHook(() => useSuperadminCommunicationBroadcastsCampaignsBroadcastDelivery(), { wrapper });
    let output: unknown;
    await act(async () => { output = await result.current.deliverRecipient({ broadcastId: 'b-1', recipientId: 'r-1' }); });
    await waitFor(() => expect(deliverBroadcastToRecipient).toHaveBeenCalledWith('b-1', 'r-1', 'intent-1'));
    expect(output).toEqual(delivered);
  });

  it('treats a FAILED delivery result inside a successful envelope as a failed mutation', async () => {
    vi.stubGlobal('crypto', { randomUUID: vi.fn(() => 'stable-intent') });
    vi.mocked(deliverBroadcastToRecipient).mockResolvedValueOnce(failed as never).mockResolvedValueOnce(delivered as never);
    const { result } = renderHook(() => useSuperadminCommunicationBroadcastsCampaignsBroadcastDelivery(), { wrapper });
    await act(async () => { await expect(result.current.deliverRecipient({ broadcastId: 'b-1', recipientId: 'r-1' })).rejects.toThrow('delivery failed'); });
    await act(async () => { await result.current.deliverRecipient({ broadcastId: 'b-1', recipientId: 'r-1' }); });
    expect(deliverBroadcastToRecipient).toHaveBeenNthCalledWith(1, 'b-1', 'r-1', 'stable-intent');
    expect(deliverBroadcastToRecipient).toHaveBeenNthCalledWith(2, 'b-1', 'r-1', 'stable-intent');
  });
});
