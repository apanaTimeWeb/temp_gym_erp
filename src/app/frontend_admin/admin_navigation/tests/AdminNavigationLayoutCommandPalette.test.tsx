// RESPONSIBILITY: Defines regression tests for AdminNavigationLayoutCommandPalette.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_navigation/tests/AdminNavigationLayoutCommandPalette.test.tsx)

import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import AdminNavigationLayoutCommandPalette from '@/app/frontend_admin/admin_navigation/components/command_palette/AdminNavigationLayoutCommandPalette';
import { ADMIN_NAV_GROUPS } from '@/app/frontend_admin/admin_navigation/config/admin_navigation_shell.url_config';

const router = vi.hoisted(() => ({ push: vi.fn() }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('next/navigation', () => ({ useRouter: () => router }));
vi.mock('@/app/frontend_admin/admin_navigation/components/command_palette/AdminNavigationLayoutCommandPalette.module.css', () => ({
  default: { palette: 'admin-command-palette', results: 'admin-command-results' },
  palette: 'admin-command-palette',
  results: 'admin-command-results',
}));

describe('AdminNavigationLayoutCommandPalette keyboard listbox', () => {
  beforeEach(() => router.push.mockReset());
  it('exposes active option semantics and selects the arrow-key active route with Enter', async () => {
    render(<AdminNavigationLayoutCommandPalette />);
    act(() => window.dispatchEvent(new Event('open-admin-command-palette')));
    const dialog = await screen.findByRole('dialog');
    const input = screen.getByRole('combobox');
    const firstOption = screen.getByTestId('admin_navigation-admin-command-palette-result-0');
    expect(input.getAttribute('aria-controls')).toBeTruthy();
    expect(input.getAttribute('aria-activedescendant')).toBe(firstOption.id);
    expect(firstOption.getAttribute('role')).toBe('option');
    expect(firstOption.tagName).not.toBe('BUTTON');
    expect(firstOption.getAttribute('tabindex')).toBeNull();
    const allRoutes = ADMIN_NAV_GROUPS.flatMap((group) => group.items.map((item) => item.href));
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    await waitFor(() => expect(input.getAttribute('aria-activedescendant')).toBe(screen.getByTestId('admin_navigation-admin-command-palette-result-1').id));
    expect(document.activeElement).toBe(input);
    fireEvent.keyDown(window, { key: 'Enter' });
    expect(router.push).toHaveBeenCalledWith(allRoutes[1]);
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    expect(dialog).toBeTruthy();
  });
});
