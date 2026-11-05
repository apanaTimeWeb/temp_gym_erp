// RESPONSIBILITY: Defines regression tests for AdminSecurityPermissionsManagementMatrix.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_permissions/permissions_management/tests/components/AdminSecurityPermissionsManagementMatrix.test.tsx)

import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AdminPermissionsMatrix from '@/app/frontend_admin/admin_security/security_permissions_management/components/matrix/AdminSecurityPermissionsManagementMatrix';
import { useAdminPermissionsLogic } from '@/app/frontend_admin/admin_security/security_permissions_management/hooks/useAdminSecurityPermissionsManagementLogic';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_admin/admin_security/security_permissions_management/hooks/useAdminSecurityPermissionsManagementLogic', () => ({ useAdminPermissionsLogic: vi.fn() }));

describe('AdminPermissionsMatrix zebra rows and catalog contract', () => {
  it('alternates semantic row surfaces and renders known permission labels safely', () => {
    vi.mocked(useAdminPermissionsLogic).mockReturnValue({
      roleDefaults: [
        { role: 'manager', permissions: { 'members.view': true, 'members.create': false, 'future.unknown': true } },
        { role: 'trainer', permissions: {} },
        { role: 'receptionist', permissions: {} },
      ],
    } as never);
    const { container } = render(<AdminPermissionsMatrix />);
    const viewLabel = screen.getByText('permissions.AdminPermissionsCatalog.members.view.label');
    const createLabel = screen.getByText('permissions.AdminPermissionsCatalog.members.create.label');
    expect(viewLabel.closest('tr')?.className).toContain('bg-card');
    expect(createLabel.closest('tr')?.className).toContain('bg-surface-zebra');
    expect(screen.getByTestId('admin_permissions-adminpermissionsmatrix-status-manager-members-view').textContent).toBe('permissions.admin_permissions_matrix.auto_abfb1a2940');
  });
});
