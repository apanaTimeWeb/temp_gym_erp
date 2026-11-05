// RESPONSIBILITY: Defines regression tests for AdminNavigationLayoutTableSkeleton.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_navigation/tests/components/AdminNavigationLayoutTableSkeleton.test.tsx)

import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AdminNavigationLayoutTableSkeleton from '@/app/frontend_admin/admin_navigation/components/AdminNavigationLayoutTableSkeleton';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

describe('AdminNavigationLayoutTableSkeleton accessibility', () => {
  it('exposes one polite status announcement and hides decorative skeleton cells', () => {
    const { container } = render(<AdminNavigationLayoutTableSkeleton rows={2} columns={3} />);
    const status = screen.getByRole('status');
    expect(status.getAttribute('aria-live')).toBe('polite');
    expect(status.getAttribute('aria-busy')).toBe('true');
    expect(status.textContent).toContain('admin_layout.AdminNavigationLayoutTableSkeleton.text_loading_table');
    expect(container.querySelector('[aria-hidden="true"]')).toBeTruthy();
  });
});
