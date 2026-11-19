// RESPONSIBILITY: Regression checks for separate confirmation requests in Settings provider FIFO queue.
// DATA FLOW: double confirm → first typed decision → second dialog reset → second decision.
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useAdminNavigationLayoutConfirm } from '@/app/frontend_admin/admin_settings/settings_management/hooks/useAdminSettingsManagementConfirm';
import { AdminNavigationLayoutConfirmProvider } from '@/app/frontend_admin/admin_settings/settings_management/components/feedback/AdminSettingsManagementConfirmProvider';
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
function Trigger({ receive }: { receive: (promises: Promise<boolean>[]) => void }) {
  const { confirm } = useAdminNavigationLayoutConfirm();
  return <button onClick={() => receive([
    confirm({ title: 'First setting', message: 'First', requireTyping: true, confirmationPhrase: 'RESET' }),
    confirm({ title: 'Second setting', message: 'Second', requireTyping: true, confirmationPhrase: 'RESET' }),
  ])}>Open queue</button>;
}
describe('RBG127 Settings queued confirmations', () => {
  it('never carries authorization text to a subsequent confirmation', async () => {
    let promises: Promise<boolean>[] = [];
    render(<AdminNavigationLayoutConfirmProvider><Trigger receive={(value) => { promises = value; }} /></AdminNavigationLayoutConfirmProvider>);
    fireEvent.click(screen.getByText('Open queue'));
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'RESET' } });
    fireEvent.click(screen.getByRole('button', { name: 'admin_layout.AdminNavigationLayoutConfirmModal.defaultConfirm' }));
    await waitFor(() => expect(screen.getByRole('heading', { name: 'Second setting' })).toBeTruthy());
    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(screen.getByRole('button', { name: 'admin_layout.AdminNavigationLayoutConfirmModal.defaultConfirm' })).toBeDisabled();
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(await Promise.all(promises)).toEqual([true, false]);
  });
});
