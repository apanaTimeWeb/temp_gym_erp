// RBG134 host-only RTL: queued authorizations do not share typed input state.
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ConfirmContext, AdminNavigationLayoutConfirmProvider } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/components/feedback/AdminBillingSubscriptionsOverviewConfirmProvider';
import type { AdminConfirmContextType } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/types/AdminBillingSubscriptionsOverviewConfirmTypes';
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
let api: AdminConfirmContextType | undefined;
function Probe() { api = React.useContext(ConfirmContext); return <span>ready</span>; }
describe('subscription plan confirmation FIFO safety', () => {
 it('clears typed authorization between queued destructive requests', async () => {
  render(<AdminNavigationLayoutConfirmProvider><Probe /></AdminNavigationLayoutConfirmProvider>);
  let a!:Promise<boolean>, b!:Promise<boolean>;
  act(() => { a=api!.confirm({title:'First plan',message:'first',requireTyping:true,confirmationPhrase:'REMOVE'}); b=api!.confirm({title:'Second plan',message:'second',requireTyping:true,confirmationPhrase:'REMOVE'}); });
  fireEvent.change(screen.getByRole('textbox'),{target:{value:'REMOVE'}});
  await act(async () => { fireEvent.click(screen.getByRole('button',{name:'subscriptions.AdminSubscriptionDialog.confirm'})); });
  expect(await a).toBe(true);
  expect(screen.getByText('Second plan')).toBeTruthy();
  expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('');
  expect((screen.getByRole('button',{name:'subscriptions.AdminSubscriptionDialog.confirm'}) as HTMLButtonElement).disabled).toBe(true);
  await act(async () => { fireEvent.click(screen.getByRole('button',{name:'subscriptions.AdminSubscriptionDialog.cancel'})); });
  expect(await b).toBe(false);
 });
});
