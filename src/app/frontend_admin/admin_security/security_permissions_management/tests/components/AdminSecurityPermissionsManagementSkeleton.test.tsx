// RESPONSIBILITY: Defines regression tests for AdminSecurityPermissionsManagementSkeleton.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_permissions/permissions_management/tests/components/AdminSecurityPermissionsManagementSkeleton.test.tsx)

import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AdminPermissionsSkeleton from '@/app/frontend_admin/admin_security/security_permissions_management/components/main_view/AdminSecurityPermissionsManagementSkeleton';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

describe('AdminPermissionsSkeleton loading semantics', () => {
  it('announces loading once and uses the canonical highlight token for decoration', () => {
    const { container } = render(<AdminPermissionsSkeleton />);
    const status = screen.getByRole('status');
    expect(status.getAttribute('aria-live')).toBe('polite');
    expect(status.getAttribute('aria-busy')).toBe('true');
    expect(status.textContent).toContain('permissions.PermissionsLoading.label');
    expect(container.querySelector('[aria-hidden="true"]')?.textContent).toBe('');
    expect(container.querySelector('.bg-skeleton-highlight')).toBeTruthy();
  });
});
