// RESPONSIBILITY: Defines regression tests for useAdminMembersBlacklistManagementMutations.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_blacklist/blacklist_management/tests/hooks/useAdminMembersBlacklistManagementMutations.test.tsx)

import { describe, expect, it, vi, beforeEach } from 'vitest';
import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminBlacklistApi } from '@/app/frontend_admin/admin_members/members_blacklist_management/api/admin_members_blacklist_management_api';
import { useAdminBlacklistMutations } from '@/app/frontend_admin/admin_members/members_blacklist_management/hooks/useAdminMembersBlacklistManagementMutations';

import { adminToast } from '@/app/frontend_admin/admin_members/members_blacklist_management/components/feedback/AdminMembersBlacklistManagementToastService';
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_admin/admin_members/members_blacklist_management/components/feedback/AdminMembersBlacklistManagementToastService', () => ({ adminToast: { success: vi.fn(), error: vi.fn() } }));

vi.mock('@/app/frontend_admin/admin_members/members_blacklist_management/api/admin_members_blacklist_management_api', () => ({
  AdminBlacklistApi: {
    addToBlacklist: vi.fn().mockResolvedValue({ message: 'ok' }),
    removeFromBlacklist: vi.fn().mockResolvedValue({ message: 'ok' }),
    toggleBlacklist: vi.fn().mockResolvedValue({ message: 'ok' }),
    propagateToAllBranches: vi.fn().mockResolvedValue({ message: 'ok' })
  },
}));

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

describe('useAdminBlacklistMutations', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('executes the mutation through the module API boundary', async () => {
    const { result } = renderHook(() => useAdminBlacklistMutations(), { wrapper });
    await act(async () => { await result.current.addMutation.mutateAsync({ id: 'id-1', staffId: 'staff-1', planId: 'plan-1', permission: 'view', enabled: true, payload: {}, data: {}, planName: 'Pro', intentId: 'intent-1', idempotencyKey: 'idem-1' } as never); });
    await waitFor(() => expect(AdminBlacklistApi.addToBlacklist).toHaveBeenCalled());
  });

  it('redacts raw backend details from the blacklist mutation toast', async () => {
    const rawMessage = 'internal auth session=secret';
    vi.mocked(AdminBlacklistApi.addToBlacklist).mockRejectedValueOnce(new Error(rawMessage));
    const { result } = renderHook(() => useAdminBlacklistMutations(), { wrapper });
    await act(async () => { await expect(result.current.addMutation.mutateAsync({ payload: {}, idempotencyKey: 'blacklist-private', intentId: 'blacklist-private' } as never)).rejects.toThrow(rawMessage); });
    await waitFor(() => expect(adminToast.error).toHaveBeenCalledWith('blacklist.AdminRepair.requestFailed', 'admin-error-1f0bf3da16'));
    expect(JSON.stringify(vi.mocked(adminToast.error).mock.calls)).not.toContain('session=secret');
  });
});
