// RESPONSIBILITY: Renders the useSuperadminCommunicationMessagingCenter.test UI for the messaging feature. Business/data orchestration is delegated to module-owned hooks.


import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import {describe, expect, it, vi, beforeEach} from 'vitest';

import { superadminMessagingApi } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/api/superadmin_communication_messaging_center.api';
import { useSuperadminCommunicationMessagingCenter } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/hooks/useSuperadminCommunicationMessagingCenter';
import { resetSuperadminCommunicationMessagingMockState } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/mocks/handlers/SuperadminCommunicationMessagingCenterMockHandlers';

import type { ReactNode } from 'react';

const mockedUseUrlState = vi.hoisted(() => ({
  getParam: vi.fn((key: string, defaultValue = '') => key === 'search' ? 'iron' : defaultValue),
  setParams: vi.fn(),
}));

vi.mock('@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/hooks/useSuperadminCommunicationMessagingCenterUrlState', () => ({
  useSuperadminCommunicationMessagingCenterUrlState: () => mockedUseUrlState,
}));
vi.mock('@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/hooks/useSuperadminCommunicationMessagingCenterDebouncedValue', () => ({
  useSuperadminCommunicationMessagingCenterDebouncedValue: (value: string) => value,
}));
vi.mock('@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/api/superadmin_communication_messaging_center.api', () => ({
  superadminMessagingApi: {
    fetchMessages: vi.fn(async () => ({ success: true, message: 'ok', data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 1 } , requestId: 'test-request-id'})),
    fetchNotifications: vi.fn(async () => ({ success: true, message: 'ok', data: [] , requestId: 'test-request-id'})),
    fetchTenants: vi.fn(async () => ({ success: true, message: 'ok', data: [] , requestId: 'test-request-id'})),
    markNotificationRead: vi.fn(),
    markAllNotificationsRead: vi.fn(),
    sendMessage: vi.fn(),
  },
}));

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

beforeEach(() => {
  vi.clearAllMocks();
  mockedUseUrlState.getParam.mockImplementation((key: string, defaultValue = '') => key === 'search' ? 'iron' : defaultValue);
  resetSuperadminCommunicationMessagingMockState();
});

describe('useSuperadminCommunicationMessagingCenter', () => {
  it('passes URL-backed search/filter parameters to the messages API', async () => {
    const { result } = renderHook(() => useSuperadminCommunicationMessagingCenter(), { wrapper });
    await waitFor(() => expect(result.current.messagesIsPending).toBe(false));
    expect(vi.mocked(superadminMessagingApi.fetchMessages)).toHaveBeenCalledWith(expect.objectContaining({ search: 'iron', page: '1', limit: '10' }));
  });

  it('treats a resolved ApiFailure envelope as a message query error', async () => {
    vi.mocked(superadminMessagingApi.fetchMessages).mockResolvedValue({ success: false, message: 'denied', data: null , errorCode: 'TEST_FAILURE', statusCode: 500, requestId: 'test-request-id'} as never);
    const { result } = renderHook(() => useSuperadminCommunicationMessagingCenter(), { wrapper });
    await waitFor(() => expect(result.current.messagesIsError).toBe(true));
    expect(result.current.messages).toEqual([]);
  });

  it('updates search atomically with page reset instead of two competing URL writes', () => {
    const { result } = renderHook(() => useSuperadminCommunicationMessagingCenter(), { wrapper });
    result.current.setSearch('fit');
    expect(mockedUseUrlState.setParams).toHaveBeenCalledWith({ search: 'fit', page: '1' });
  });

  it('normalizes invalid URL-backed tab, channel, and pagination values locally', () => {
    mockedUseUrlState.getParam.mockImplementation((key: string, defaultValue = '') => {
      if (key === 'tab') return 'retired-tab';
      if (key === 'channel') return 'UNKNOWN_CHANNEL';
      if (key === 'page') return 'Infinity';
      return key === 'search' ? 'iron' : defaultValue;
    });
    const { result } = renderHook(() => useSuperadminCommunicationMessagingCenter(), { wrapper });
    expect(result.current.tab).toBe('messages');
    expect(result.current.channelFilter).toBe('ALL');
    expect(result.current.currentPage).toBe(1);
  });
});
