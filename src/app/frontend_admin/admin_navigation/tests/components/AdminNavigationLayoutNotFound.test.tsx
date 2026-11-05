// RESPONSIBILITY: Defines regression tests for AdminNavigationLayoutNotFound.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_navigation/tests/components/AdminNavigationLayoutNotFound.test.tsx)

import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AdminNavigationLayoutNotFound from '@/app/frontend_admin/admin_navigation/components/shell/AdminNavigationLayoutNotFound';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('next/link', () => ({ default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => <a href={href} {...props}>{children}</a> }));

describe('AdminNavigationLayoutNotFound return action', () => {
  it('keeps the return link keyboard/touch accessible', () => {
    render(<AdminNavigationLayoutNotFound title="Missing" description="Not found" returnLink="/admin/dashboard" returnText="Dashboard" />);
    const link = screen.getByRole('link', { name: 'Dashboard' });
    expect(link.getAttribute('href')).toBe('/admin/dashboard');
    expect(link.className).toContain('min-h-11');
    expect(link.className).toContain('min-w-11');
  });
});
