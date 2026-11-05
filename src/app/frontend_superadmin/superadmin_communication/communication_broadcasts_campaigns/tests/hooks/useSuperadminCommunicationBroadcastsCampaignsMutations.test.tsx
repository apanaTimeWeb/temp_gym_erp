vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key, useLocale: () => 'en' }));
import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { broadcastsApi } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/api/superadmin_communication_broadcasts_campaigns.api';
import { useSuperadminCommunicationBroadcastsCampaignsMutations } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/hooks/useSuperadminCommunicationBroadcastsCampaignsMutations';

import type { BroadcastFormData, SuperadminCommunicationBroadcastsTenant } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns.types';
import type { ReactNode } from 'react';

const mocks = vi.hoisted(() => ({ createBroadcast: vi.fn(), updateBroadcast: vi.fn(), deleteBroadcast: vi.fn(), fetchBroadcasts: vi.fn(), fetchTenants: vi.fn(), fetchRecipientCount: vi.fn() }));
vi.mock('@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/api/superadmin_communication_broadcasts_campaigns.api', () => ({ broadcastsApi: mocks }));

const gyms = [
  { id: 'gym-1', name: 'Gym One', plan: 'Pro', ownerName: 'Owner One', phone: '900000001' },
  { id: 'gym-2', name: 'Gym Two', plan: 'Starter', ownerName: 'Owner Two', phone: '900000002' },
] as SuperadminCommunicationBroadcastsTenant[];
const form = { reset: vi.fn() } as never;
const wrapper = ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client: new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } }) }, children);

beforeEach(() => { vi.clearAllMocks(); });

describe('useSuperadminCommunicationBroadcastsCampaignsMutations all-gyms recipient resolution', () => {
  it('expands an empty targetGymIds sentinel to every available gym exactly once', async () => {
    mocks.createBroadcast.mockResolvedValue({ success: true, message: 'Created', data: { id: 'broadcast-1', title: 'All gyms', content: 'Notice', status: 'SENT', targetGymIds: [], scheduledDate: null, totalRecipients: 2, deliveredCount: 0, failedCount: 0 } });
    const setQueueRecipients = vi.fn(); const setQueueBroadcastId = vi.fn(); const setQueueTitle = vi.fn(); const setQueueModalOpen = vi.fn(); const setIsModalOpen = vi.fn();
    const { result } = renderHook(() => useSuperadminCommunicationBroadcastsCampaignsMutations({ setIsModalOpen, setEditingId: vi.fn(), form, gyms, setQueueRecipients, setQueueBroadcastId, setQueueTitle, setQueueModalOpen }), { wrapper });
    await act(async () => { await result.current.createMutation.mutateAsync({ data: { title: 'All gyms', content: 'Notice', targetGymIds: [], status: 'SENT', scheduledDate: null } as BroadcastFormData, idempotencyKey: 'intent-1' }); });
    await waitFor(() => expect(setQueueRecipients).toHaveBeenCalledTimes(1));
    expect(setQueueRecipients).toHaveBeenCalledWith([
      { id: 'gym-1', name: 'Gym One', phone: '900000001' },
      { id: 'gym-2', name: 'Gym Two', phone: '900000002' },
    ]);
    expect(new Set(setQueueRecipients.mock.calls[0]![0].map((recipient: { id: string }) => recipient.id)).size).toBe(2);
    expect(setQueueBroadcastId).toHaveBeenCalledWith('broadcast-1');
    expect(setQueueTitle).toHaveBeenCalledWith('All gyms');
    expect(setQueueModalOpen).toHaveBeenCalledWith(true);
  });

  it('does not claim queue completion if the authoritative gym list is empty', async () => {
    mocks.createBroadcast.mockResolvedValue({ success: true, message: 'Created', data: { id: 'broadcast-empty', title: 'No eligible gyms', content: 'Notice', status: 'SENT', targetGymIds: [], scheduledDate: null, totalRecipients: 0, deliveredCount: 0, failedCount: 0 } });
    const setQueueRecipients = vi.fn(); const setQueueModalOpen = vi.fn();
    const { result } = renderHook(() => useSuperadminCommunicationBroadcastsCampaignsMutations({ setIsModalOpen: vi.fn(), setEditingId: vi.fn(), form, gyms: [], setQueueRecipients, setQueueBroadcastId: vi.fn(), setQueueTitle: vi.fn(), setQueueModalOpen }), { wrapper });
    await act(async () => { await result.current.createMutation.mutateAsync({ data: { title: 'No eligible gyms', content: 'Notice', targetGymIds: [], status: 'SENT', scheduledDate: null } as BroadcastFormData, idempotencyKey: 'intent-empty' }); });
    expect(setQueueRecipients).toHaveBeenCalledWith([]);
    expect(setQueueModalOpen).toHaveBeenCalledWith(true);
  });
});
