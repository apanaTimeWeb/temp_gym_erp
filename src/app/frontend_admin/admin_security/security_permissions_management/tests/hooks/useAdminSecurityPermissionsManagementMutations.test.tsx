// RESPONSIBILITY: Defines regression tests for useAdminSecurityPermissionsManagementMutations.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_permissions/permissions_management/tests/hooks/useAdminSecurityPermissionsManagementMutations.test.tsx)

import { describe, expect, it, vi, beforeEach } from 'vitest';
import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminPermissionsApi } from '@/app/frontend_admin/admin_security/security_permissions_management/api/admin_security_permissions_management_api';
import { adminToast } from '@/app/frontend_admin/admin_security/security_permissions_management/components/feedback/AdminSecurityPermissionsManagementToastService';
import { useAdminPermissionsMutations } from '@/app/frontend_admin/admin_security/security_permissions_management/hooks/useAdminSecurityPermissionsManagementMutations';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_admin/admin_security/security_permissions_management/components/feedback/AdminSecurityPermissionsManagementToastService', () => ({ adminToast: { success: vi.fn(), error: vi.fn() } }));
vi.mock('@/app/frontend_admin/admin_security/security_permissions_management/components/feedback/AdminSecurityPermissionsManagementBackendMessage', () => ({ getAdminBackendMessage: () => null }));
vi.mock('@/app/frontend_admin/admin_security/security_permissions_management/api/admin_security_permissions_management_api', () => ({
  AdminPermissionsApi: {
    updateStaffPermission: vi.fn().mockResolvedValue({ message: 'ok' }),
    resetToDefaults: vi.fn().mockResolvedValue({ message: 'ok' })
  },
}));

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

describe('useAdminPermissionsMutations', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('executes the mutation through the module API boundary', async () => {
    const { result } = renderHook(() => useAdminPermissionsMutations(), { wrapper });
    await act(async () => { await result.current.updateStaffMutation.mutateAsync({ staffId: 'staff-1', permission: 'members.view', enabled: true, idempotencyKey: 'idem-1' }); });
    await waitFor(() => expect(AdminPermissionsApi.updateStaffPermission).toHaveBeenCalledWith('staff-1', { permission: 'members.view', enabled: true }, 'idem-1'));
  });

  it('shows a localized fallback toast when a reset mutation fails without a safe backend message', async () => {
    vi.mocked(AdminPermissionsApi.resetToDefaults).mockRejectedValueOnce(new Error('opaque transport failure'));
    const { result } = renderHook(() => useAdminPermissionsMutations(), { wrapper });
    await act(async () => {
      await expect(result.current.resetMutation.mutateAsync({ staffId: 'staff-1', idempotencyKey: 'idem-reset-1' })).rejects.toThrow('opaque transport failure');
    });
    await waitFor(() => expect(adminToast.error).toHaveBeenCalledWith('permissions.AdminPermissionsError.mutationFailed', 'admin_permissions-reset-error'));
  });

  it('never exposes a backend permission error in a mutation toast', async () => {
    const sensitiveMessage = 'authorization failure: internal token=not-for-ui';
    vi.mocked(AdminPermissionsApi.updateStaffPermission).mockRejectedValueOnce(new Error(sensitiveMessage));
    const { result } = renderHook(() => useAdminPermissionsMutations(), { wrapper });
    await act(async () => {
      await expect(result.current.updateStaffMutation.mutateAsync({ staffId: 'staff-1', permission: 'members.view', enabled: true, idempotencyKey: 'idem-private' })).rejects.toThrow(sensitiveMessage);
    });
    await waitFor(() => expect(adminToast.error).toHaveBeenCalledWith('permissions.AdminPermissionsError.mutationFailed', 'admin_permissions-update-error'));
    expect(JSON.stringify(vi.mocked(adminToast.error).mock.calls)).not.toContain('internal token');
  });

});
