// RBG132 host-only RTL: accessible dialog IDs and fail-closed typed confirmation.
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ConfirmDialog from '@/app/frontend_admin/admin_billing/billing_subscription_plans/components/feedback/AdminBillingSubscriptionPlansConfirmModal';
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
describe('subscription plans confirmation dialog',()=>{
 it('associates heading, description and input, and rejects blank required phrase',()=>{
  render(<ConfirmDialog isOpen title="Sensitive" message="Check" requireTyping confirmationPhrase="  " onConfirm={vi.fn()} onCancel={vi.fn()} />);
  const dialog=screen.getByRole('dialog');
  expect(dialog.getAttribute('aria-labelledby')).toBe(screen.getByText('Sensitive').id);
  expect(dialog.getAttribute('aria-describedby')).toBe(screen.getByText('Check').id);
  const input=screen.getByRole('textbox') as HTMLInputElement;
  expect(input.id.length).toBeGreaterThan(1);
  expect((screen.getByRole('button',{name:'subscriptions.AdminSubscriptionDialog.confirm'}) as HTMLButtonElement).disabled).toBe(true);
 });
});
