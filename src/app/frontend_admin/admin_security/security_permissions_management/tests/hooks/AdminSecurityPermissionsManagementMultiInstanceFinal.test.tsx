// RESPONSIBILITY: Guards permission writes across multiple independent React hook instances.
// DATA FLOW: concurrent actions -> shared feature Zustand guard -> confirmation -> awaited mutations -> released guard.
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAdminPermissionsLogic } from '@/app/frontend_admin/admin_security/security_permissions_management/hooks/useAdminSecurityPermissionsManagementLogic';
import { useAdminPermissionsStore } from '@/app/frontend_admin/admin_security/security_permissions_management/state/useAdminSecurityPermissionsManagementStore';

const mocks = vi.hoisted(() => ({ confirm: vi.fn(), update: vi.fn(), reset: vi.fn(), clear: vi.fn(), get: vi.fn((key: string) => `idem:${key}`) }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@tanstack/react-query', () => ({ useQuery: () => ({ status: 'success', isError: false, data: { data: [] }, refetch: vi.fn() }) }));
vi.mock('@/app/frontend_admin/admin_security/security_permissions_management/hooks/useAdminSecurityPermissionsManagementConfirm', () => ({ useAdminNavigationLayoutConfirm: () => ({ confirm: mocks.confirm }) }));
vi.mock('@/app/frontend_admin/admin_security/security_permissions_management/hooks/useAdminSecurityPermissionsManagementMutations', () => ({ useAdminPermissionsMutations: () => ({ updateStaffMutation: { mutateAsync: mocks.update, isPending: false }, resetMutation: { mutateAsync: mocks.reset, isPending: false }, getIntentKey: mocks.get, clearIntentKey: mocks.clear }) }));

beforeEach(() => { vi.clearAllMocks(); useAdminPermissionsStore.setState({pendingStaffOperations: {}}); mocks.confirm.mockResolvedValue(true); mocks.update.mockResolvedValue({success:true}); mocks.reset.mockResolvedValue({success:true}); });

describe('shared permission guard across separate rendered consumers', () => {
  it('blocks a reset from a second hook instance while a change waits for confirmation', async () => {
    let finish!: (ok: boolean) => void;
    mocks.confirm.mockImplementationOnce(() => new Promise<boolean>((resolve) => { finish = resolve; }));
    const a = renderHook(() => useAdminPermissionsLogic());
    const b = renderHook(() => useAdminPermissionsLogic());
    let first!: Promise<boolean>;
    await act(async () => { first = a.result.current.toggleStaffPermission('staff-1', 'Alex', 'members.view', true); });
    await expect(b.result.current.resetToDefaults('staff-1', 'Alex', 'manager')).resolves.toBe(false);
    expect(mocks.reset).not.toHaveBeenCalled();
    await act(async () => { finish(true); await first; });
    expect(mocks.update).toHaveBeenCalledTimes(1);
    expect(useAdminPermissionsStore.getState().pendingStaffOperations).toEqual({});
    a.unmount(); b.unmount();
  });
  it('releases the operation guard after a failed request for retry from a different hook', async () => {
    mocks.update.mockRejectedValueOnce(new Error('offline'));
    const a = renderHook(() => useAdminPermissionsLogic());
    const b = renderHook(() => useAdminPermissionsLogic());
    await expect(a.result.current.toggleStaffPermission('staff-1', 'Alex', 'members.view', true)).resolves.toBe(false);
    expect(useAdminPermissionsStore.getState().pendingStaffOperations).toEqual({});
    await expect(b.result.current.toggleStaffPermission('staff-1', 'Alex', 'members.view', true)).resolves.toBe(true);
    expect(mocks.update.mock.calls[0][0].idempotencyKey).toBe(mocks.update.mock.calls[1][0].idempotencyKey);
    a.unmount(); b.unmount();
  });
});
