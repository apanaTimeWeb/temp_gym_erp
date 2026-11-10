// RESPONSIBILITY: Defines regression tests for AdminNavigationLayoutResponsiveTableProvider.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_navigation/tests/components/AdminNavigationLayoutResponsiveTableProvider.test.tsx)

import React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AdminNavigationLayoutResponsiveTableProvider from '@/app/frontend_admin/admin_navigation/components/shell/AdminNavigationLayoutResponsiveTableProvider';

vi.mock('@/app/frontend_admin/admin_navigation/components/shell/AdminNavigationLayoutResponsiveTableProvider.module.css', () => ({
  default: { responsiveTableScope: 'admin-responsive-table-scope' },
  responsiveTableScope: 'admin-responsive-table-scope',
}));

function ResponsiveTableFixture({ blankHeader = false }: { blankHeader?: boolean }) {
  return <>
    <AdminNavigationLayoutResponsiveTableProvider />
    <table data-admin-responsive-table>
      <thead><tr><th>{blankHeader ? '' : 'Name'}</th><th>{blankHeader ? '' : 'Amount'}</th></tr></thead>
      <tbody><tr><td data-testid="generated-cell">Riya</td><td data-label="Custom amount" data-testid="authored-cell">100</td></tr></tbody>
    </table>
  </>;
}

describe('AdminNavigationLayoutResponsiveTableProvider annotations', () => {
  it('refreshes generated labels when headers change without overwriting authored labels', async () => {
    const { rerender, getByTestId } = render(<ResponsiveTableFixture />);
    await waitFor(() => expect(getByTestId('generated-cell').getAttribute('data-label')).toBe('Name'));
    expect(getByTestId('authored-cell').getAttribute('data-label')).toBe('Custom amount');
    rerender(<ResponsiveTableFixture blankHeader />);
    await act(async () => { await Promise.resolve(); });
    await waitFor(() => expect(getByTestId('generated-cell').hasAttribute('data-label')).toBe(false));
    expect(getByTestId('authored-cell').getAttribute('data-label')).toBe('Custom amount');
  });
});
