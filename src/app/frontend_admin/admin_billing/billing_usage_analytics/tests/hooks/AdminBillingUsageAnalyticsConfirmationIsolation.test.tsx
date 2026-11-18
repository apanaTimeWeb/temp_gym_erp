// RBG135 host-only React integration: FIFO confirmations must never retain typed authorization.
import React from 'react';
import {describe,it,expect,vi} from 'vitest';
import {render,screen,fireEvent,act} from '@testing-library/react';
import {ConfirmContext,AdminNavigationLayoutConfirmProvider} from '@/app/frontend_admin/admin_billing/billing_usage_analytics/components/feedback/AdminBillingUsageAnalyticsConfirmProvider';
import type {AdminConfirmContextType} from '@/app/frontend_admin/admin_billing/billing_usage_analytics/types/AdminBillingUsageAnalyticsConfirmTypes';
vi.mock('next-intl',()=>({useTranslations:()=> (k:string)=>k}));
let api:AdminConfirmContextType|undefined;
function Probe(){api=React.useContext(ConfirmContext);return <span>ready</span>}
describe('RBG135 confirmation queue',()=>{
 it('remounts the second dialog and denies a blank required phrase',async()=>{
  render(<AdminNavigationLayoutConfirmProvider><Probe/></AdminNavigationLayoutConfirmProvider>);
  let first!:Promise<boolean>,second!:Promise<boolean>;
  act(()=>{first=api!.confirm({title:'First',message:'first',requireTyping:true,confirmationPhrase:'REMOVE'});second=api!.confirm({title:'Second',message:'second',requireTyping:true,confirmationPhrase:'  '})});
  fireEvent.change(screen.getByRole('textbox'),{target:{value:'REMOVE'}});
  await act(async()=>{fireEvent.click(screen.getByRole('button',{name:'usage.AdminUsageDialog.confirm'}))});expect(await first).toBe(true);
  expect(screen.getByText('Second')).toBeTruthy();expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('');expect((screen.getByRole('button',{name:'usage.AdminUsageDialog.confirm'}) as HTMLButtonElement).disabled).toBe(true);
  await act(async()=>{fireEvent.click(screen.getByRole('button',{name:'usage.AdminUsageDialog.cancel'}))});expect(await second).toBe(false);
 });
});
