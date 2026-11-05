import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { gymsApi } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/api/superadmin_gyms_detail.api';
import { useSuperadminGymsDetailExitGhostLogin } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/hooks/useSuperadminGymsDetailExitGhostLogin';

import type { Mock } from 'vitest';

vi.mock('@/app/frontend_superadmin/superadmin_gyms/gyms_detail/api/superadmin_gyms_detail.api', () => ({ gymsApi: { exitGhostLogin: vi.fn() } }));
vi.mock('@/app/frontend_superadmin/superadmin_gyms/gyms_detail/state/useSuperadminGymsDetailGymGhostLoginStore', () => ({
  useSuperadminGymsDetailGymGhostLoginStore: (selector: (state: { clearGhostLogin: () => void }) => unknown) => selector({ clearGhostLogin: vi.fn() }),
}));

describe('useSuperadminGymsDetailExitGhostLogin', () => {
  it('reuses the same idempotency key after a failed exit intent', async () => {
    vi.mocked(gymsApi.exitGhostLogin).mockResolvedValue({ success: false, message: 'Exit failed' , data: null, errorCode: 'TEST_FAILURE', statusCode: 500, requestId: 'test-request-id'} as never);
    const queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: React.ReactNode }) => createElement(QueryClientProvider, { client: queryClient }, children);
    const { result } = renderHook(() => useSuperadminGymsDetailExitGhostLogin(), { wrapper });
    await act(async () => { await expect(result.current.exitGhostLogin()).rejects.toThrow('Exit failed'); });
    await act(async () => { await expect(result.current.exitGhostLogin()).rejects.toThrow('Exit failed'); });
    expect(gymsApi.exitGhostLogin).toHaveBeenCalledTimes(2);
    const exitGhostLoginMock = gymsApi.exitGhostLogin as unknown as Mock;
    expect(exitGhostLoginMock.mock.calls[0]?.[0]).toBe(exitGhostLoginMock.mock.calls[1]?.[0]);
  });
});
