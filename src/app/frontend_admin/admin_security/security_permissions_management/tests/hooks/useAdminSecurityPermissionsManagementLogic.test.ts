// RESPONSIBILITY: Defines regression tests for useAdminSecurityPermissionsManagementLogic.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_permissions/permissions_management/tests/hooks/useAdminSecurityPermissionsManagementLogic.test.ts)

import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminPermissionsLogic } from '@/app/frontend_admin/admin_security/security_permissions_management/hooks/useAdminSecurityPermissionsManagementLogic';

const confirm = vi.fn();
const updateStaffMutation = { mutateAsync: vi.fn(), isPending: false };
const resetMutation = { mutateAsync: vi.fn(), isPending: false };
const setEditingStaffId = vi.fn();
const setActiveRole = vi.fn();
const setStaffSearch = vi.fn();
const getIntentKey = vi.fn((id: string) => `idem:${id}`);
const clearIntentKey = vi.fn();

vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string, values?: Record<string, string>) => values ? `${key} ${Object.values(values).join(' ')}` : key }));
vi.mock('@/app/frontend_admin/admin_security/security_permissions_management/hooks/useAdminSecurityPermissionsManagementConfirm', () => ({ useAdminNavigationLayoutConfirm: () => ({ confirm }) }));
const activeOperations = new Set<string>();
vi.mock('@/app/frontend_admin/admin_security/security_permissions_management/state/useAdminSecurityPermissionsManagementStore', () => ({ useAdminPermissionsStore: () => ({ activeRole: 'all', staffSearch: 'riya', pendingStaffOperations: Object.fromEntries([...activeOperations].map(id => [id, true])), tryBeginStaffOperation: (staffId: string) => { if (!staffId.trim() || activeOperations.has(staffId)) return false; activeOperations.add(staffId); return true; }, endStaffOperation: (staffId: string) => { activeOperations.delete(staffId); }, setEditingStaffId, setActiveRole, setStaffSearch }) }));
vi.mock('@/app/frontend_admin/admin_security/security_permissions_management/hooks/useAdminSecurityPermissionsManagementMutations', () => ({ useAdminPermissionsMutations: () => ({ updateStaffMutation, resetMutation, getIntentKey, clearIntentKey }) }));

const queryResults = [
  { data: { data: [{ role: 'manager', permissions: { 'members.view': true } }] }, status: 'success' },
  { data: { data: [{ staffId: 's1', staffName: 'Riya Singh', role: 'manager' }, { staffId: 's2', staffName: 'Aman', role: 'trainer' }] }, status: 'success' },
];

describe('useAdminPermissionsLogic', () => {
  beforeEach(() => {
    activeOperations.clear();
    confirm.mockReset();
    updateStaffMutation.mutateAsync.mockReset();
    updateStaffMutation.mutateAsync.mockResolvedValue({ message: 'ok' });
    resetMutation.mutateAsync.mockReset();
    setEditingStaffId.mockReset();
    setActiveRole.mockReset();
    setStaffSearch.mockReset();
    getIntentKey.mockClear();
    clearIntentKey.mockReset();
    vi.mocked(useQuery).mockReset();
    queryResults.forEach((value) => vi.mocked(useQuery).mockReturnValueOnce(value as never));
    confirm.mockResolvedValue(true);
    resetMutation.mutateAsync.mockResolvedValue({ message: 'ok' });
  });

  it('filters overrides by staff search and sends confirmed permission updates', async () => {
    const { result } = renderHook(() => useAdminPermissionsLogic());
    expect(result.current.roleDefaults).toEqual([{ role: 'manager', permissions: { 'members.view': true } }]);
    expect(result.current.overrides).toHaveLength(1);
    expect(result.current.overrides[0]?.staffId).toBe('s1');
    await result.current.toggleStaffPermission('s1', 'Riya Singh', 'members.view', true);
    expect(confirm).toHaveBeenCalledWith(expect.objectContaining({
      type: 'warning',
      message: 'permissions.AdminPermissionsConfirm.changeMessage permissions.AdminPermissionsCatalog.members.view.label Riya Singh',
    }));
    expect(updateStaffMutation.mutateAsync).toHaveBeenCalledWith({ staffId: 's1', permission: 'members.view', enabled: true, idempotencyKey: 'idem:["permission","s1","members.view",true]' });
  });

  it('clears the edit target after resetting defaults', async () => {
    const { result } = renderHook(() => useAdminPermissionsLogic());
    await result.current.resetToDefaults('s1', 'Riya Singh', 'manager' as never);
    expect(resetMutation.mutateAsync).toHaveBeenCalledWith({ staffId: 's1', idempotencyKey: 'idem:["reset","s1"]' });
    expect(setEditingStaffId).toHaveBeenCalledWith(null);
  });

  it('reuses the same idempotency key for retries of the same permission intent', async () => {
    const { result } = renderHook(() => useAdminPermissionsLogic());
    await result.current.toggleStaffPermission('s1', 'Riya Singh', 'members.view', true);
    await result.current.toggleStaffPermission('s1', 'Riya Singh', 'members.view', true);
    expect(updateStaffMutation.mutateAsync.mock.calls[0]?.[0].idempotencyKey).toBe(updateStaffMutation.mutateAsync.mock.calls[1]?.[0].idempotencyKey);
    expect(getIntentKey).toHaveBeenCalledWith(JSON.stringify(['permission', 's1', 'members.view', true]));
  });

  it('keeps the edit target when reset API rejects and returns a recoverable false result', async () => {
    setEditingStaffId.mockReset();
    resetMutation.mutateAsync.mockRejectedValueOnce(new Error('network failure'));
    const { result } = renderHook(() => useAdminPermissionsLogic());
    await expect(result.current.resetToDefaults('s1', 'Riya Singh', 'manager' as never)).resolves.toBe(false);
    expect(setEditingStaffId).not.toHaveBeenCalledWith(null);
  });

});
