// RESPONSIBILITY: Defines regression tests for AdminNavigationLayoutHeader.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_navigation/tests/AdminNavigationLayoutHeader.test.tsx)

import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AdminNavigationLayoutHeader from '@/app/frontend_admin/admin_navigation/components/AdminNavigationLayoutHeader';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('next/navigation', () => ({ usePathname: () => '/admin/members' }));
vi.mock('@/components/ThemeToggle', () => ({ ThemeToggle: () => <button type="button" className="min-h-11 min-w-11">Theme</button> }));
vi.mock('@/app/frontend_admin/admin_navigation/components/AdminNavigationLayoutDensityToggle', () => ({ default: () => <button type="button">Density</button> }));
vi.mock('@/app/frontend_admin/admin_navigation/components/AdminNavigationLayoutHeaderProfile', () => ({ default: () => <button type="button" className="min-h-11 min-w-11">Profile</button> }));

describe('AdminNavigationLayoutHeader responsive geometry contract', () => {
  it('uses a translucent header and hides secondary controls/context at narrow breakpoints', () => {
    render(<AdminNavigationLayoutHeader headerContextSlot={<span data-testid="header-context">Member context</span>} />);
    const header = screen.getByRole('banner');
    expect(header.className).toContain('bg-header-translucent');
    expect(header.className).toContain('backdrop-blur-md');
    expect(screen.getByTestId('header-context').parentElement?.className).toContain('hidden md:block');
    expect(screen.getByRole('button', { name: 'admin_layout.AdminNavigationLayoutKeyboardShortcuts.showHelp' }).className).toContain('hidden sm:inline-flex');
    expect(header.querySelector('button[aria-label="admin_layout.AdminNavigationLayoutHeader.text_8b9b1bbd66"]')?.className).toContain('min-w-11');
  });
});
