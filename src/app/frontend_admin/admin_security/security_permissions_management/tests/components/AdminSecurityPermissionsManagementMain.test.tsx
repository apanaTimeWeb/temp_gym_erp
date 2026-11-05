// RESPONSIBILITY: Defines regression tests for AdminSecurityPermissionsManagementMain.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_permissions/permissions_management/tests/components/AdminSecurityPermissionsManagementMain.test.tsx)

import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import AdminPermissionsMain from '@/app/frontend_admin/admin_security/security_permissions_management/components/main_view/AdminSecurityPermissionsManagementMain';
import { useAdminPermissionsLogic } from '@/app/frontend_admin/admin_security/security_permissions_management/hooks/useAdminSecurityPermissionsManagementLogic';

const retry = vi.fn();
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_admin/admin_security/security_permissions_management/hooks/useAdminSecurityPermissionsManagementLogic', () => ({ useAdminPermissionsLogic: vi.fn() }));

describe('AdminPermissionsMain error recovery', () => {
  beforeEach(() => { vi.clearAllMocks(); vi.mocked(useAdminPermissionsLogic).mockReturnValue({ status: 'error', isError: true, retry } as never); });
  it('announces a localized alert and retry action with a touch-sized target', () => {
    render(<AdminPermissionsMain />);
    expect(screen.getByRole('alert').textContent).toContain('permissions.PermissionsError.text_06340cfc2a');
    const button = screen.getByRole('button', { name: 'permissions.PermissionsError.text_cef2fe093b' });
    expect(button.className).toContain('min-h-11');
    fireEvent.click(button);
    expect(retry).toHaveBeenCalledTimes(1);
  });
});
