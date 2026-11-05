// RESPONSIBILITY: Defines regression tests for AdminNavigationLayoutHeaderProfile.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_navigation/tests/AdminNavigationLayoutHeaderProfile.test.tsx)

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import AdminNavigationLayoutHeaderProfile from '@/app/frontend_admin/admin_navigation/components/AdminNavigationLayoutHeaderProfile';

const authMocks = vi.hoisted(() => ({ getUser: vi.fn(), logout: vi.fn() }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/lib/api', () => ({ getUser: authMocks.getUser, logout: authMocks.logout }));
vi.mock('next/link', () => ({ default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => <a href={href} {...props}>{children}</a> }));

describe('AdminNavigationLayoutHeaderProfile menu accessibility', () => {
  beforeEach(() => { authMocks.getUser.mockReturnValue({ name: 'Admin User', email: 'admin@example.test', role: 'admin' }); authMocks.logout.mockReset(); });

  it('supports ArrowDown, ArrowUp, Home, and End within the profile menu', () => {
    render(<AdminNavigationLayoutHeaderProfile profileHref="/admin/profile" settingsHref="/admin/settings" />);
    const trigger = screen.getByRole('button', { name: 'admin_navigation.AdminNavigationLayoutHeaderProfile.text_45a612f7ef' });
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    const profileItem = screen.getByRole('menuitem', { name: /text_9ba8d391c5/ });
    const settingsItem = screen.getByRole('menuitem', { name: /text_c7f73bb54d/ });
    const logoutItem = screen.getByRole('menuitem', { name: /text_6e78c91f5a/ });
    expect(document.activeElement).toBe(profileItem);

    fireEvent.keyDown(profileItem, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(settingsItem);
    fireEvent.keyDown(settingsItem, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(logoutItem);
    fireEvent.keyDown(logoutItem, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(profileItem);
    fireEvent.keyDown(profileItem, { key: 'End' });
    expect(document.activeElement).toBe(logoutItem);
    fireEvent.keyDown(logoutItem, { key: 'Home' });
    expect(document.activeElement).toBe(profileItem);
    fireEvent.keyDown(profileItem, { key: 'ArrowUp' });
    expect(document.activeElement).toBe(logoutItem);
  });

  it('exposes menu state and restores focus when Escape closes it', () => {
    render(<AdminNavigationLayoutHeaderProfile profileHref="/admin/profile" settingsHref="/admin/settings" />);
    const trigger = screen.getByRole('button', { name: 'admin_navigation.AdminNavigationLayoutHeaderProfile.text_45a612f7ef' });
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    trigger.focus();
    fireEvent.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByRole('menu')).toBeTruthy();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('menu')).toBeNull();
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(trigger);
  });
});
