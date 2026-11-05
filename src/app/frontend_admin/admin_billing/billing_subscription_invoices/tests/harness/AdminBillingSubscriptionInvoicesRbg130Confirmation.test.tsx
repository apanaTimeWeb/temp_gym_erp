import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { AdminNavigationLayoutConfirmProvider } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/components/feedback/AdminBillingSubscriptionInvoicesConfirmProvider';
import { useAdminNavigationLayoutConfirm } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/hooks/useAdminBillingSubscriptionInvoicesConfirm';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
function Probe() {
  const { confirm } = useAdminNavigationLayoutConfirm();
  const [responses, setResponses] = useState<boolean[]>([]);
  return <><button type="button" onClick={() => {
    void confirm({ title: 'First change', message: 'Remove first?', requireTyping: true, confirmationPhrase: 'REMOVE' }).then(v => setResponses(a => [...a, v]));
    void confirm({ title: 'Second change', message: 'Remove second?', requireTyping: true, confirmationPhrase: 'REMOVE' }).then(v => setResponses(a => [...a, v]));
  }}>Queue confirmations</button><output data-testid="response-count">{responses.length}</output></>;
}
describe('RBG130 queued billing confirmations', () => {
  it('does not reuse the first typed authorization for the second queued request', async () => {
    render(<AdminNavigationLayoutConfirmProvider><Probe /></AdminNavigationLayoutConfirmProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'Queue confirmations' }));
    const first = screen.getByRole('dialog', { name: 'First change' });
    const input = first.querySelector('input')!;
    fireEvent.change(input, { target: { value: 'REMOVE' } });
    fireEvent.click(screen.getByRole('button', { name: 'admin_layout.AdminNavigationLayoutConfirmModal.defaultConfirm' }));
    await waitFor(() => expect(screen.getByRole('dialog', { name: 'Second change' })).toBeTruthy());
    const secondInput = screen.getByRole('dialog').querySelector('input')!;
    expect(secondInput.value).toBe('');
    expect(screen.getByRole('button', { name: 'admin_layout.AdminNavigationLayoutConfirmModal.defaultConfirm' }).hasAttribute('disabled')).toBe(true);
    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => expect(screen.getByTestId('response-count').textContent).toBe('2'));
  });
});
