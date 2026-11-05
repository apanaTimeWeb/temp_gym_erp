// RESPONSIBILITY: Defines regression tests for AdminNavigationLayoutConfirmProvider.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_navigation/tests/feedback/AdminNavigationLayoutConfirmProvider.test.tsx)

import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AdminNavigationLayoutConfirmProvider } from '@/app/frontend_admin/admin_navigation/components/feedback/AdminNavigationLayoutConfirmProvider';
import { useAdminNavigationLayoutConfirm } from '@/app/frontend_admin/admin_navigation/hooks/useAdminNavigationLayoutConfirm';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
function ConfirmInvoker() {
  const { confirm } = useAdminNavigationLayoutConfirm();
  return <button type="button" onClick={() => { void confirm({ title: 'First request', message: 'First message', confirmText: 'Confirm first' }); void confirm({ title: 'Second request', message: 'Second message', confirmText: 'Confirm second' }); }}>Start both</button>;
}

describe('AdminNavigationLayoutConfirmProvider', () => {
  afterEach(() => vi.restoreAllMocks());
  it('queues a second confirmation instead of overwriting the first resolver', async () => {
    render(<AdminNavigationLayoutConfirmProvider><ConfirmInvoker /></AdminNavigationLayoutConfirmProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'Start both' }));
    expect(screen.getByRole('dialog').textContent).toContain('First message');
    fireEvent.click(screen.getByRole('button', { name: 'Confirm first' }));
    await waitFor(() => expect(screen.getByRole('dialog').textContent).toContain('Second message'));
    fireEvent.click(screen.getByRole('button', { name: 'Confirm second' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  });
});
