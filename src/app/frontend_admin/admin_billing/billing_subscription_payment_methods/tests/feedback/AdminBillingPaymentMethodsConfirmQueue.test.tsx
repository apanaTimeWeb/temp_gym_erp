import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AdminNavigationLayoutConfirmProvider } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/components/feedback/AdminBillingSubscriptionPaymentMethodsConfirmProvider';
import { useAdminNavigationLayoutConfirm } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/hooks/useAdminBillingSubscriptionPaymentMethodsConfirm';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

let issue: ((title: string) => Promise<boolean>) | undefined;
function Driver() {
  const { confirm } = useAdminNavigationLayoutConfirm();
  issue = (title: string) => confirm({ title, message: `${title}?`, requireTyping: true, confirmationPhrase: 'REMOVE' });
  return <button type="button">Open confirmation</button>;
}

describe('payment method confirmation FIFO', () => {
  it('does not reuse typed authorization for a queued removal', async () => {
    render(<AdminNavigationLayoutConfirmProvider><Driver /></AdminNavigationLayoutConfirmProvider>);
    if (!issue) throw new Error('Confirmation provider unavailable');
    let first!: Promise<boolean>; let second!: Promise<boolean>;
    act(() => { first = issue!('First payment method'); second = issue!('Second payment method'); });
    const input = await screen.findByRole('textbox');
    fireEvent.change(input, { target: { value: 'REMOVE' } });
    const confirm = screen.getAllByRole('button').at(-1);
    if (!confirm) throw new Error('Confirmation action missing');
    fireEvent.click(confirm);
    expect(await first).toBe(true);
    await waitFor(() => expect(screen.getByText('Second payment method')).toBeInTheDocument());
    expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('');
    const nextConfirm = screen.getAllByRole('button').at(-1);
    expect(nextConfirm).toBeDisabled();
    const cancel = screen.getByRole('button', { name: 'admin_layout.AdminNavigationLayoutConfirmModal.defaultCancel' });
    fireEvent.click(cancel); expect(await second).toBe(false);
  });
});
