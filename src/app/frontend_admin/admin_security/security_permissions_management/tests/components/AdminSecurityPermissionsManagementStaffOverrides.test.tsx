// RESPONSIBILITY: Defines regression tests for AdminSecurityPermissionsManagementStaffOverrides.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_permissions/permissions_management/tests/components/AdminSecurityPermissionsManagementStaffOverrides.test.tsx)

import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import AdminPermissionsStaffOverrides from '@/app/frontend_admin/admin_security/security_permissions_management/components/staff_overrides/AdminSecurityPermissionsManagementStaffOverrides';
import { useAdminPermissionsLogic } from '@/app/frontend_admin/admin_security/security_permissions_management/hooks/useAdminSecurityPermissionsManagementLogic';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string, values?: Record<string, string>) => key === 'permissions.AdminPermissionsCatalog.roles.manager.label' ? 'Manager' : values ? `${key} ${Object.values(values).join(' ')}` : key }));
vi.mock('@/app/frontend_admin/admin_security/security_permissions_management/hooks/useAdminSecurityPermissionsManagementLogic', () => ({ useAdminPermissionsLogic: vi.fn() }));

const toggleStaffPermission = vi.fn();
const resetToDefaults = vi.fn();
const clearFilters = vi.fn();
const baseLogic = {
  overrides: [{ staffId: 's1', staffName: 'Riya Singh', role: 'manager', overrides: { 'members.view': true, 'future.unknown': true } }],
  allOverridesCount: 1,
  hasActiveFilters: false,
  clearFilters,
  toggleStaffPermission,
  resetToDefaults,
  saving: false,
};

describe('AdminPermissionsStaffOverrides', () => {
  beforeEach(() => { vi.clearAllMocks(); vi.mocked(useAdminPermissionsLogic).mockReturnValue(baseLogic as never); });
  it('renders translated roles, confirms supported updates, and keeps unknown server keys read-only', () => {
    render(<AdminPermissionsStaffOverrides />);
    expect(screen.getByText('Manager')).toBeTruthy();
    expect(screen.getByText('future.unknown')).toBeTruthy();
    expect(screen.getByTestId('admin_permissions-unknown-permission-0-1').querySelector('button')).toBeNull();
    fireEvent.click(screen.getByTestId('admin_permissions-admin_permissions-staff-overrides-toggle-0-0'));
    expect(toggleStaffPermission).toHaveBeenCalledWith('s1', 'Riya Singh', 'members.view', false);
    fireEvent.click(screen.getByRole('button', { name: /permissions\.admin_permissions_staff_overrides\.text_299ef4aaf3/i }));
    expect(resetToDefaults).toHaveBeenCalledWith('s1', 'Riya Singh', 'manager');
  });
  it('distinguishes a filtered-empty result and lets the user clear filters', () => {
    vi.mocked(useAdminPermissionsLogic).mockReturnValue({ ...baseLogic, overrides: [], allOverridesCount: 2, hasActiveFilters: true } as never);
    render(<AdminPermissionsStaffOverrides />);
    fireEvent.click(screen.getByRole('button', { name: 'permissions.admin_permissions_staff_overrides.clearFilters' }));
    expect(clearFilters).toHaveBeenCalledTimes(1);
  });
});
