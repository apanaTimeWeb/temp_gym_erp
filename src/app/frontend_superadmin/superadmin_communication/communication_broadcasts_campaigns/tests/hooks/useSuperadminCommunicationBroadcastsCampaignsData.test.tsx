import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { broadcastsApi } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/api/superadmin_communication_broadcasts_campaigns.api';
import { useSuperadminCommunicationBroadcastsCampaignsData } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/hooks/useSuperadminCommunicationBroadcastsCampaignsData';

import type { ReactNode } from 'react';



const params: Record<string, string> = {};
const setParam = vi.fn((key: string, value: string) => { params[key] = value; });
vi.mock('@/hooks/useUrlState', () => ({ useUrlState: () => ({ getParam: (key: string, fallback: string) => params[key] ?? fallback, setParam }) }));
vi.mock('@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/api/superadmin_communication_broadcasts_campaigns.api', () => ({ broadcastsApi: { fetchBroadcasts: vi.fn(), fetchTenants: vi.fn() } }));

describe('useSuperadminCommunicationBroadcastsCampaignsData', () => {
  beforeEach(() => { Object.keys(params).forEach((key) => delete params[key]); vi.clearAllMocks(); });
  it('builds server-side list params and exposes broadcast/tenant data', async () => {
    vi.mocked(broadcastsApi.fetchBroadcasts).mockResolvedValue({ success: true, message: 'Loaded', data: [{ id: 'b-1' }], meta: { total: 1 } } as never);
    vi.mocked(broadcastsApi.fetchTenants).mockResolvedValue({ success: true, message: 'Loaded', data: [{ id: 'gym-1' }] } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
    const { result } = renderHook(() => useSuperadminCommunicationBroadcastsCampaignsData(), { wrapper });
    await waitFor(() => expect(result.current.status).not.toBe('pending'));
    expect(broadcastsApi.fetchBroadcasts).toHaveBeenCalledWith({ page: '1', limit: '10' });
    expect(result.current.broadcasts).toHaveLength(1);
    act(() => result.current.setCurrentPage(2));
    expect(setParam).toHaveBeenCalledWith('page', '2');
  });
});
