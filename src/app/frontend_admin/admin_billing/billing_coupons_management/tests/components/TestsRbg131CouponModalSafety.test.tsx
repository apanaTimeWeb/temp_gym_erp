// RBG131: dynamic dialog IDs and disabled confirmation on empty required phrase.
import { describe, expect, it, vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import AdminNavigationLayoutConfirmModal from '@/app/frontend_admin/admin_billing/billing_coupons_management/components/feedback/AdminBillingCouponsManagementConfirmModal';
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
describe('RBG131 coupon confirmation accessibility', () => {
  it('links accessible IDs and refuses whitespace-only required phrase', () => {
    render(<AdminNavigationLayoutConfirmModal isOpen title="Coupon" message="Proceed?" onConfirm={vi.fn()} onCancel={vi.fn()} requireTyping confirmationPhrase="   " />);
    const dialog=screen.getByRole('dialog');
    expect(document.getElementById(dialog.getAttribute('aria-labelledby')!)).toHaveTextContent('Coupon');
    expect(document.getElementById(dialog.getAttribute('aria-describedby')!)).toHaveTextContent('Proceed?');
    expect(screen.getByRole('button',{name:'admin_layout.AdminNavigationLayoutConfirmModal.defaultConfirm'})).toBeDisabled();
  });
});
