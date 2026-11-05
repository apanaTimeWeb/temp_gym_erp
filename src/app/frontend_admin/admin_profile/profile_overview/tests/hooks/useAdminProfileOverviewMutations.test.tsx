// RESPONSIBILITY: Defines regression tests for useAdminProfileOverviewMutations.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_profile/profile_overview/tests/hooks/useAdminProfileOverviewMutations.test.tsx)

import { describe, expect, it, vi, beforeEach } from 'vitest';
// Hook now uses localized error fallback; keep host-independent tests deterministic.
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminProfileApi } from '@/app/frontend_admin/admin_profile/profile_overview/api/admin_profile_overview_api';
import { useAdminProfileMutations } from '@/app/frontend_admin/admin_profile/profile_overview/hooks/useAdminProfileOverviewMutations';

vi.mock('@/app/frontend_admin/admin_profile/profile_overview/api/admin_profile_overview_api', () => ({
  AdminProfileApi: {
    updateProfile: vi.fn().mockResolvedValue({ success: true, message: 'Profile updated', data: { id: 'admin-1', name: 'Riya Singh', phone: '9876543210', email: 'riya@example.test', role: 'ADMIN', branchName: 'North', joinedAt: '2026-01-01', avatarInitial: 'R' }  , requestId: "mock-admin-profile-profile-overview-tests-hooks-useadminprofileoverviewmutations-test-tsx-13"}),
    updatePassword: vi.fn().mockResolvedValue({ success: true, message: 'Password updated', data: null  , requestId: "mock-admin-profile-profile-overview-tests-hooks-useadminprofileoverviewmutations-test-tsx-14"}),
  },
}));

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
const wrapper = ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

describe('useAdminProfileMutations', () => {
  beforeEach(() => { vi.clearAllMocks(); queryClient.clear(); });

  it('sends the exact profile payload with a stable idempotency key', async () => {
    const { result } = renderHook(() => useAdminProfileMutations(), { wrapper });
    await act(async () => { await result.current.updateProfile({ name: 'Riya Singh', phone: '9876543210' }); });
    await waitFor(() => expect(AdminProfileApi.updateProfile).toHaveBeenCalledTimes(1));
    const [payload, key] = vi.mocked(AdminProfileApi.updateProfile).mock.calls[0];
    expect(payload).toEqual({ name: 'Riya Singh', phone: '9876543210' });
    expect(key).toEqual(expect.any(String));
    expect(key.length).toBeGreaterThan(8);
  });

  it('reuses the idempotency key when retrying the same user intent after failure', async () => {
    vi.mocked(AdminProfileApi.updateProfile).mockRejectedValueOnce(new Error('temporary')).mockResolvedValueOnce({ success: true, message: 'Profile updated', data: { id: 'admin-1', name: 'Riya Singh', phone: '9876543210', email: 'riya@example.test', role: 'ADMIN', branchName: 'North', joinedAt: '2026-01-01', avatarInitial: 'R' }  , requestId: "mock-admin-profile-profile-overview-tests-hooks-useadminprofileoverviewmutations-test-tsx-35"} as never);
    const { result } = renderHook(() => useAdminProfileMutations(), { wrapper });
    await act(async () => { await expect(result.current.updateProfile({ name: 'Riya Singh', phone: '9876543210' })).rejects.toThrow('temporary'); });
    await act(async () => { await result.current.updateProfile({ name: 'Riya Singh', phone: '9876543210' }); });
    const calls = vi.mocked(AdminProfileApi.updateProfile).mock.calls;
    expect(calls).toHaveLength(2);
    expect(calls[0][1]).toBe(calls[1][1]);
  });
});
