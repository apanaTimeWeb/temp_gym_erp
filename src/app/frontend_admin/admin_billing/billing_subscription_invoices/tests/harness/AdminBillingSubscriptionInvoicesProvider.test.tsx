// RESPONSIBILITY: Tests the isolated route/harness confirmation context for billing_subscription_invoices.
// DATA FLOW: Harness → feature-owned provider → feature-owned hook → visible modal → resolved confirmation.
import { useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AdminBillingSubscriptionInvoicesHarness from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/tests/harness/AdminBillingSubscriptionInvoicesHarness';
import { useAdminNavigationLayoutConfirm } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/hooks/useAdminBillingSubscriptionInvoicesConfirm';

function ConfirmationProbe() {
  const { confirm } = useAdminNavigationLayoutConfirm();
  const [outcome, setOutcome] = useState('pending');
  return <>
    <button type="button" onClick={() => void confirm({
      title: 'Discard draft', message: 'Discard your changes?',
      confirmText: 'Discard', cancelText: 'Keep editing', type: 'warning',
    }).then((accepted: boolean) => setOutcome(accepted ? 'accepted' : 'cancelled'))}>Open confirmation</button>
    <output data-testid="confirmation-result">{outcome}</output>
  </>;
}

describe('billing_subscription_invoices provider integration', () => {
  it('supplies a real context in the standalone harness and resolves cancellation', async () => {
    render(<AdminBillingSubscriptionInvoicesHarness><ConfirmationProbe /></AdminBillingSubscriptionInvoicesHarness>);
    fireEvent.click(screen.getByRole('button', { name: 'Open confirmation' }));
    expect(screen.getByRole('dialog', { name: 'Discard draft' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Keep editing' }));
    await waitFor(() => expect(screen.getByTestId('confirmation-result').textContent).toBe('cancelled'));
  });

  it('resolves confirmation without dropping the mounted provider', async () => {
    render(<AdminBillingSubscriptionInvoicesHarness><ConfirmationProbe /></AdminBillingSubscriptionInvoicesHarness>);
    fireEvent.click(screen.getByRole('button', { name: 'Open confirmation' }));
    fireEvent.click(screen.getByRole('button', { name: 'Discard' }));
    await waitFor(() => expect(screen.getByTestId('confirmation-result').textContent).toBe('accepted'));
  });
});
