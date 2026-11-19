import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useAdminNavigationLayoutConfirm } from '@/app/frontend_admin/admin_security/security_permissions_management/hooks/useAdminSecurityPermissionsManagementConfirm';
import { AdminNavigationLayoutConfirmProvider } from '@/app/frontend_admin/admin_security/security_permissions_management/components/feedback/AdminSecurityPermissionsManagementConfirmProvider';
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

function Probe({ observe }: { observe: (calls: Promise<boolean>[]) => void }) {
  const { confirm } = useAdminNavigationLayoutConfirm();
  return <button onClick={() => observe([
    confirm({ title: 'First reset', message: 'First', requireTyping: true, confirmationPhrase: 'RESET' }),
    confirm({ title: 'Second reset', message: 'Second', requireTyping: true, confirmationPhrase: 'RESET' }),
  ])}>Open both</button>;
}

describe('RBG126 queued permission confirmations', () => {
  it('requires a fresh typed phrase on each queued request and resolves both results independently', async () => {
    let calls: Promise<boolean>[] = [];
    render(<AdminNavigationLayoutConfirmProvider><Probe observe={(value) => { calls = value; }} /></AdminNavigationLayoutConfirmProvider>);
    fireEvent.click(screen.getByText('Open both'));
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'RESET' } });
    fireEvent.click(screen.getByRole('button', { name: 'admin_layout.AdminNavigationLayoutConfirmModal.defaultConfirm' }));
    await waitFor(() => expect(screen.getByRole('heading', { name: 'Second reset' })).toBeTruthy());
    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(screen.getByRole('button', { name: 'admin_layout.AdminNavigationLayoutConfirmModal.defaultConfirm' })).toBeDisabled();
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(await Promise.all(calls)).toEqual([true, false]);
  });
});
