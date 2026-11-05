vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key, useLocale: () => 'en-IN' }));
import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { gymsApi } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/api/superadmin_gyms_detail.api';
import { useSuperadminGymsDetailActions } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/hooks/useSuperadminGymsDetailActions';

import type { ReactNode } from 'react';



vi.mock('@/app/frontend_superadmin/superadmin_gyms/gyms_detail/api/superadmin_gyms_detail.api', () => ({ gymsApi: { impersonateTenant: vi.fn(), setGhostLoginCookie: vi.fn() } }));
vi.mock('@/app/frontend_superadmin/superadmin_gyms/gyms_detail/state/useSuperadminGymsDetailGymGhostLoginStore', () => ({ useSuperadminGymsDetailGymGhostLoginStore: (selector: (state: { startGhostLogin: (tenantId: string) => void }) => unknown) => selector({ startGhostLogin: vi.fn() }) }));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe('useSuperadminGymsDetailActions', () => {
  beforeEach(() => { vi.clearAllMocks(); });
  it('reuses the same two-step idempotency keys when a ghost-login intent is retried after failure', async () => {
    vi.mocked(gymsApi.impersonateTenant).mockResolvedValue({ success: false, message: 'Temporary failure', data: null , errorCode: 'TEST_FAILURE', statusCode: 500, requestId: 'test-request-id'} as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
    const { result } = renderHook(() => useSuperadminGymsDetailActions(), { wrapper });
    const gym = { id: 'gym-1', name: 'Gym Alpha', plan: 'PRO', adminEmail: 'admin@example.com' };
    act(() => { result.current.startGhostLogin(gym); });
    await waitFor(() => expect(gymsApi.impersonateTenant).toHaveBeenCalledTimes(1));
    act(() => { result.current.startGhostLogin(gym); });
    await waitFor(() => expect(gymsApi.impersonateTenant).toHaveBeenCalledTimes(2));
    expect(vi.mocked(gymsApi.impersonateTenant).mock.calls[0]?.[1]).toBe(vi.mocked(gymsApi.impersonateTenant).mock.calls[1]?.[1]);
  });
});
