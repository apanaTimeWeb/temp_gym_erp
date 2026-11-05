// RESPONSIBILITY: Defines regression tests for AdminSecurityPermissionsManagementRoleCard.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_permissions/permissions_management/tests/components/AdminSecurityPermissionsManagementRoleCard.test.tsx)

import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AdminPermissionsRoleCard from '@/app/frontend_admin/admin_security/security_permissions_management/components/role_card/AdminSecurityPermissionsManagementRoleCard';
import { useAdminPermissionsLogic } from '@/app/frontend_admin/admin_security/security_permissions_management/hooks/useAdminSecurityPermissionsManagementLogic';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_admin/admin_security/security_permissions_management/hooks/useAdminSecurityPermissionsManagementLogic', () => ({ useAdminPermissionsLogic: vi.fn() }));

describe('AdminPermissionsRoleCard supported catalog counts', () => {
  it('does not count unknown forward-compatible response keys as enabled capabilities', () => {
    vi.mocked(useAdminPermissionsLogic).mockReturnValue({
      roleDefaults: [{ role: 'manager', permissions: { 'members.view': true, 'future.unknown': true } }],
    } as never);
    const { container } = render(<AdminPermissionsRoleCard role="manager" />);
    expect(container.querySelector('.text-2xl')?.textContent).toBe('1');
  });
});
