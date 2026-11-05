// RESPONSIBILITY: Renders and orchestrates the AdminBlacklistUseLogic.test UI for the Admin admin_blacklist feature; business/API access remains in module-owned hooks and API services.
// DATA FLOW: module API / client state → AdminBlacklistUseLogic.test → consuming Admin feature component.

import { BLACKLIST_MEMBER_STATUS_VALUES } from '@/app/frontend_admin/admin_members/members_blacklist_management/constants/AdminMembersBlacklistManagementConstants';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useAdminBlacklistLogic } from '@/app/frontend_admin/admin_members/members_blacklist_management/hooks/useAdminMembersBlacklistManagementLogic';
import { useAdminNavigationLayoutConfirm } from '@/app/frontend_admin/admin_members/members_blacklist_management/hooks/useAdminMembersBlacklistManagementConfirm';
import { AdminBlacklistApi } from '@/app/frontend_admin/admin_members/members_blacklist_management/api/admin_members_blacklist_management_api';

vi.mock('@/app/frontend_admin/admin_members/members_blacklist_management/hooks/useAdminMembersBlacklistManagementConfirm', () => ({ useAdminNavigationLayoutConfirm: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_members/members_blacklist_management/api/admin_members_blacklist_management_api', () => ({
  AdminBlacklistApi: {
    fetchBlacklist: vi.fn().mockResolvedValue({ data: [{ id: 'm1', memberId: 'M1', memberName: 'Test Member', memberPhone: '9000000000', memberEmail: 'test@example.com', reason: 'Test', blacklistedBy: 'Admin', blacklistedAt: '2026-09-18', scope: 'global', assignedGyms: ['all'], assignedGymNames: ['All Gyms'], isActive: true }] }),
    fetchKPIs: vi.fn().mockResolvedValue({ data: { totalBlacklisted: 0, globalBans: 0, gymSpecificBans: 0, addedThisMonth: 0 } }),
    addToBlacklist: vi.fn().mockResolvedValue({ data: { id: 'new-1' }, message: 'Added' }),
    toggleBlacklist: vi.fn().mockResolvedValue({ data: { id: 'm1', status: BLACKLIST_MEMBER_STATUS_VALUES.INACTIVE }, message: 'Updated' }),
    removeFromBlacklist: vi.fn(),
    propagateToAllBranches: vi.fn(),
  },
}));
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => '/admin/blacklist',
  useSearchParams: () => new URLSearchParams(),
}));

function wrapper({ children }: { children: React.ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

import { waitFor } from '@testing-library/react';

describe('useAdminBlacklistLogic confirmation contract', () => {
  const confirm = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAdminNavigationLayoutConfirm).mockReturnValue({ confirm });
    confirm.mockResolvedValue(true);
  });

  it('requires confirmation before toggling blacklist status', async () => {
    const { result } = renderHook(() => useAdminBlacklistLogic(), { wrapper });
    await waitFor(() => expect(result.current.status).toBe('success'));
    await act(async () => {
      await result.current.toggleBlacklist('m1');
    });
    expect(confirm).toHaveBeenCalledOnce();
    expect(AdminBlacklistApi.toggleBlacklist).toHaveBeenCalledWith('m1', expect.any(String));
  });

  it('requires explicit confirmation before creating a blacklist entry', async () => {
    const { result } = renderHook(() => useAdminBlacklistLogic(), { wrapper });
    await waitFor(() => expect(result.current.status).toBe('success'));
    await act(async () => {
      await result.current.saveBlacklist({ memberId: 'M-2', memberName: 'New Member', memberPhone: '9000000002', memberEmail: 'new@example.com', reason: 'Repeated policy violations', scope: 'global', assignedGyms: ['all'] });
    });
    expect(confirm).toHaveBeenCalledWith(expect.objectContaining({ type: 'danger', confirmText: expect.any(String) }));
    await waitFor(() => expect(AdminBlacklistApi.addToBlacklist).toHaveBeenCalledWith(expect.objectContaining({ memberName: 'New Member' }), expect.any(String)));
  });

  it('reuses idempotency for a failed same-payload retry but rotates for a new payload', async () => {
    vi.mocked(AdminBlacklistApi.addToBlacklist).mockRejectedValueOnce(new Error('network uncertain'));
    const payload = { memberId: 'M-5', memberName: 'Member Five', memberPhone: '9000000005', memberEmail: 'five@example.com', reason: 'Repeated policy violations', scope: 'global' as const, assignedGyms: ['all'] };
    const { result } = renderHook(() => useAdminBlacklistLogic(), { wrapper });
    await waitFor(() => expect(result.current.status).toBe('success'));
    await act(async () => { await result.current.saveBlacklist(payload); });
    await waitFor(() => expect(AdminBlacklistApi.addToBlacklist).toHaveBeenCalledTimes(1));
    const firstKey = vi.mocked(AdminBlacklistApi.addToBlacklist).mock.calls[0]?.[1];
    await act(async () => { await result.current.saveBlacklist(payload); });
    await waitFor(() => expect(AdminBlacklistApi.addToBlacklist).toHaveBeenCalledTimes(2));
    expect(vi.mocked(AdminBlacklistApi.addToBlacklist).mock.calls[1]?.[1]).toBe(firstKey);
    await act(async () => { await result.current.saveBlacklist({ ...payload, memberId: 'M-6' }); });
    await waitFor(() => expect(AdminBlacklistApi.addToBlacklist).toHaveBeenCalledTimes(3));
    expect(vi.mocked(AdminBlacklistApi.addToBlacklist).mock.calls[2]?.[1]).not.toBe(firstKey);
  });

  it('does not create a blacklist entry when confirmation is declined', async () => {
    confirm.mockResolvedValueOnce(false);
    const { result } = renderHook(() => useAdminBlacklistLogic(), { wrapper });
    await waitFor(() => expect(result.current.status).toBe('success'));
    await act(async () => {
      await result.current.saveBlacklist({ memberId: 'M-3', memberName: 'Another Member', memberPhone: '9000000003', memberEmail: 'another@example.com', reason: 'Repeated policy violations', scope: 'global', assignedGyms: ['all'] });
    });
    expect(confirm).toHaveBeenCalledOnce();
    expect(AdminBlacklistApi.addToBlacklist).not.toHaveBeenCalled();
  });

  it('does not toggle when confirmation is declined', async () => {
    confirm.mockResolvedValueOnce(false);
    const { result } = renderHook(() => useAdminBlacklistLogic(), { wrapper });
    await waitFor(() => expect(result.current.status).toBe('success'));
    await act(async () => {
      await result.current.toggleBlacklist('m1');
    });
    expect(AdminBlacklistApi.toggleBlacklist).not.toHaveBeenCalled();
  });

  it('exports the module-owned hook for feature orchestration', () => {
    expect(typeof useAdminBlacklistLogic).toBe('function');
  });

});
