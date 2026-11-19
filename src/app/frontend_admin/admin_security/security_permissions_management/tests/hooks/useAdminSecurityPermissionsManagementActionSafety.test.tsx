import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAdminPermissionsLogic } from '@/app/frontend_admin/admin_security/security_permissions_management/hooks/useAdminSecurityPermissionsManagementLogic';

const confirm = vi.fn();
const mutateAsync = vi.fn();
const resetAsync = vi.fn();
const clearIntentKey = vi.fn();
const getIntentKey = vi.fn((intent: string) => `key-${intent}`);
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@tanstack/react-query', () => ({ useQuery: () => ({ status: 'success', data: { data: [] }, isError: false, refetch: vi.fn() }) }));
vi.mock('@/app/frontend_admin/admin_security/security_permissions_management/hooks/useAdminSecurityPermissionsManagementConfirm', () => ({ useAdminNavigationLayoutConfirm: () => ({ confirm }) }));
const activeOperations = new Set<string>();
vi.mock('@/app/frontend_admin/admin_security/security_permissions_management/state/useAdminSecurityPermissionsManagementStore', () => ({ useAdminPermissionsStore: () => ({ activeRole: 'all', staffSearch: '', pendingStaffOperations: Object.fromEntries([...activeOperations].map(id => [id, true])), tryBeginStaffOperation: (staffId: string) => { if (!staffId.trim() || activeOperations.has(staffId)) return false; activeOperations.add(staffId); return true; }, endStaffOperation: (staffId: string) => { activeOperations.delete(staffId); }, setActiveRole: vi.fn(), setStaffSearch: vi.fn(), setEditingStaffId: vi.fn() }) }));
vi.mock('@/app/frontend_admin/admin_security/security_permissions_management/hooks/useAdminSecurityPermissionsManagementMutations', () => ({ useAdminPermissionsMutations: () => ({ updateStaffMutation: { mutateAsync, isPending: false }, resetMutation: { mutateAsync: resetAsync, isPending: false }, getIntentKey, clearIntentKey }) }));

describe('RBG126 permission action safety', () => {
  beforeEach(() => { activeOperations.clear(); vi.clearAllMocks(); confirm.mockResolvedValue(true); mutateAsync.mockResolvedValue({ success: true }); resetAsync.mockResolvedValue({ success: true }); });

  it('does not issue duplicate writes during the confirmation + mutation window', async () => {
    let finish!: (value: boolean) => void;
    confirm.mockImplementationOnce(() => new Promise<boolean>((resolve) => { finish = resolve; }));
    const { result } = renderHook(() => useAdminPermissionsLogic());
    const first = result.current.toggleStaffPermission('staff-1', 'Alex', 'members.view', true);
    expect(await result.current.toggleStaffPermission('staff-1', 'Alex', 'members.view', true)).toBe(false);
    finish(true);
    expect(await first).toBe(true);
    expect(mutateAsync).toHaveBeenCalledTimes(1);
  });

  it('does not report success on mutation failure, and keeps the idempotency key for retries', async () => {
    mutateAsync.mockRejectedValueOnce(new Error('network unavailable'));
    const { result } = renderHook(() => useAdminPermissionsLogic());
    expect(await result.current.toggleStaffPermission('staff-1', 'Alex', 'members.view', true)).toBe(false);
    expect(clearIntentKey).not.toHaveBeenCalled();
  });

  it('abandons a declined permission intent key and avoids a write', async () => {
    confirm.mockResolvedValueOnce(false);
    const { result } = renderHook(() => useAdminPermissionsLogic());
    expect(await result.current.toggleStaffPermission('staff-1', 'Alex', 'members.view', true)).toBe(false);
    expect(clearIntentKey).toHaveBeenCalledWith('["permission","staff-1","members.view",true]');
    expect(mutateAsync).not.toHaveBeenCalled();
  });
});
