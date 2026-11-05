// RBG131 host-only RTL regression: every FIFO request gets a fresh typed confirmation field.
import { describe, expect, it } from 'vitest';
import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { ConfirmContext, AdminNavigationLayoutConfirmProvider } from '@/app/frontend_admin/admin_billing/billing_coupons_management/components/feedback/AdminBillingCouponsManagementConfirmProvider';
import type { AdminConfirmContextType } from '@/app/frontend_admin/admin_billing/billing_coupons_management/types/AdminBillingCouponsManagementConfirmTypes';
import { vi } from 'vitest';
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
let api: AdminConfirmContextType | undefined;
function Probe() { api = React.useContext(ConfirmContext); return <button>caller</button>; }
describe('RBG131 queued coupon authorization', () => {
  it('does not carry the first typed DELETE phrase into the second confirmation', async () => {
    render(<AdminNavigationLayoutConfirmProvider><Probe /></AdminNavigationLayoutConfirmProvider>);
    let first!: Promise<boolean>, second!: Promise<boolean>;
    await act(async () => {
      first = api!.confirm({ title:'First coupon',message:'Delete first?',requireTyping:true,confirmationPhrase:'DELETE' });
      second = api!.confirm({ title:'Second coupon',message:'Delete second?',requireTyping:true,confirmationPhrase:'DELETE' });
    });
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'DELETE' } });
    fireEvent.click(screen.getByRole('button', { name: 'admin_layout.AdminNavigationLayoutConfirmModal.defaultConfirm' }));
    expect(await first).toBe(true);
    expect(screen.getByText('Second coupon')).toBeTruthy();
    expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('');
    const buttons = screen.getAllByRole('button');
    expect(buttons.find(b => b.textContent === 'admin_layout.AdminNavigationLayoutConfirmModal.defaultConfirm')?.hasAttribute('disabled')).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: 'admin_layout.AdminNavigationLayoutConfirmModal.defaultCancel' }));
    expect(await second).toBe(false);
  });
});
