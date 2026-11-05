// RESPONSIBILITY: Defines regression tests for AdminNavigationLayoutSidebarLayering.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_navigation/tests/AdminNavigationLayoutSidebarLayering.test.tsx)

import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import AdminNavigationLayoutSidebar from '@/app/frontend_admin/admin_navigation/components/AdminNavigationLayoutSidebar';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('next/navigation', () => ({ usePathname: () => '/admin/members' }));
vi.mock('@/lib/api', () => ({ getUser: () => ({ name: 'Admin User', role: 'admin' }) }));
vi.mock('@/app/frontend_admin/admin_navigation/components/sidebar_brand/AdminNavigationLayoutSidebarBrand', () => ({ default: () => null }));
vi.mock('@/app/frontend_admin/admin_navigation/components/sidebar_navigation/AdminNavigationLayoutSidebarNavigation', () => ({ default: () => null }));
vi.mock('@/app/frontend_admin/admin_navigation/components/sidebar_user_footer/AdminNavigationLayoutSidebarUserFooter', () => ({ default: () => null }));

const originalWidth = window.innerWidth;
afterEach(() => { Object.defineProperty(window, 'innerWidth', { configurable: true, value: originalWidth }); });

describe('AdminNavigationLayoutSidebar elevation hierarchy', () => {
  it('keeps the desktop sidebar at z-20 and raises only the mobile drawer/backdrop', async () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 375 });
    render(<AdminNavigationLayoutSidebar isCollapsed={false} setIsCollapsed={vi.fn()} />);
    const sidebar = screen.getByRole('complementary');
    expect(sidebar.className).toContain('z-20');
    act(() => window.dispatchEvent(new Event('toggle-sidebar')));
    await waitFor(() => expect(sidebar.className).toContain('z-40'));
    expect(screen.getByTestId('admin_navigation-admin-sidebar-click').className).toContain('z-30');
  });
});
