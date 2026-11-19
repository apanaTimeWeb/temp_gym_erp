import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import AdminConfirmModal from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/components/feedback/AdminBillingSubscriptionPaymentMethodsConfirmModal';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

describe('billing confirmation keyboard and typed-intent accessibility', () => {
  it('focuses cancel, traps Tab and Shift+Tab, handles Escape and restores opener focus', () => {
    const opener = document.createElement('button');
    document.body.append(opener);
    opener.focus();
    const onCancel = vi.fn();
    const { unmount } = render(<AdminConfirmModal isOpen title="Change payment" message="Continue?" onCancel={onCancel} onConfirm={vi.fn()} />);
    const dialog = screen.getByRole('dialog');
    const cancel = screen.getByRole('button', { name: 'admin_layout.AdminNavigationLayoutConfirmModal.defaultCancel' });
    const confirm = screen.getByRole('button', { name: 'admin_layout.AdminNavigationLayoutConfirmModal.defaultConfirm' });
    expect(cancel).toHaveFocus();
    confirm.focus(); fireEvent.keyDown(dialog, { key: 'Tab' }); expect(cancel).toHaveFocus();
    cancel.focus(); fireEvent.keyDown(dialog, { key: 'Tab', shiftKey: true }); expect(confirm).toHaveFocus();
    fireEvent.keyDown(dialog, { key: 'Escape' }); expect(onCancel).toHaveBeenCalledTimes(1);
    unmount(); expect(opener).toHaveFocus(); opener.remove();
  });

  it('requires actual typed text even if the provided phrase is whitespace', () => {
    render(<AdminConfirmModal isOpen title="Remove" message="Continue?" onCancel={vi.fn()} onConfirm={vi.fn()} requireTyping confirmationPhrase="   " />);
    const dialog = screen.getByRole('dialog');
    const confirm = Array.from(dialog.querySelectorAll('button')).at(-1);
    expect(confirm).toBeDisabled();
    expect(dialog.querySelector('input')).toHaveFocus();
  });
});
