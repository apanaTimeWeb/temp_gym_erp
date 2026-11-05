// RESPONSIBILITY: Defines regression tests for AdminSecurityPermissionsManagementLoadingRoute.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_permissions/permissions_management/tests/components/AdminSecurityPermissionsManagementLoadingRoute.test.tsx)

import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import PermissionsLoading from '@/app/frontend_admin/admin_security/security_permissions_management/loading';

vi.mock('next-intl/server', () => ({ getTranslations: async () => (key: string) => key }));

describe('Admin Permissions route loading state', () => {
  it('provides accessible loading feedback and decorative highlight surfaces', async () => {
    render(await PermissionsLoading());
    const status = screen.getByRole('status');
    expect(status.getAttribute('aria-busy')).toBe('true');
    expect(status.getAttribute('aria-live')).toBe('polite');
    expect(status.textContent).toContain('permissions.PermissionsLoading.label');
    expect(document.querySelector('.bg-skeleton-highlight')).toBeTruthy();
  });
});
