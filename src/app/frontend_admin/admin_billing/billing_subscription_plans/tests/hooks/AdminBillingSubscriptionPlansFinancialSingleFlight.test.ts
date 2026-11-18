// RBG132 host-only RTL regression: API settlement, guardrails, and retry-key semantics.
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useAdminSubscriptionsLogic } from '@/app/frontend_admin/admin_billing/billing_subscription_plans/hooks/useAdminBillingSubscriptionPlansLogic';
const confirm=vi.fn().mockResolvedValue(true);const clear=vi.fn();const key=vi.fn((x:string)=>`key:${x}`);
let subscription: {autoRenew:boolean}|null={autoRenew:true};
const mutations={
 upgradeMutation:{isPending:false,mutateAsync:vi.fn().mockResolvedValue({})},
 autoRenewMutation:{isPending:false,mutateAsync:vi.fn().mockResolvedValue({})},
 setDefaultPMMutation:{isPending:false,mutateAsync:vi.fn().mockResolvedValue({})},
 removePMMutation:{isPending:false,mutateAsync:vi.fn().mockResolvedValue({})},getIntentKey:key,clearIntentKey:clear,
};
vi.mock('next-intl',()=>({useTranslations:()=>(x:string)=>x}));
vi.mock('@/app/frontend_admin/admin_billing/billing_subscription_plans/hooks/useAdminBillingSubscriptionPlansConfirm',()=>({useAdminNavigationLayoutConfirm:()=>({confirm})}));
vi.mock('@/app/frontend_admin/admin_billing/billing_subscription_plans/state/useAdminBillingSubscriptionPlansStore',()=>({useAdminSubscriptionsStore:()=>({showUpgradeConfirm:null,setShowUpgradeConfirm:vi.fn(),currentInvoicePage:1,setCurrentInvoicePage:vi.fn()})}));
vi.mock('@/app/frontend_admin/admin_billing/billing_subscription_plans/hooks/useAdminBillingSubscriptionPlansQueries',()=>({useAdminSubscriptionsQueries:()=>({subscription,plans:[{id:'pro',name:'Pro',tier:'pro',isCurrent:false}],paymentMethods:[{id:'default',isDefault:true},{id:'secondary',isDefault:false}],status:'success',isPending:false})}));
vi.mock('@/app/frontend_admin/admin_billing/billing_subscription_plans/hooks/useAdminBillingSubscriptionPlansMutations',()=>({useAdminSubscriptionsMutations:()=>mutations}));
describe('RBG132 subscription financial-action gate',()=>{
 beforeEach(()=>{vi.clearAllMocks();confirm.mockResolvedValue(true);subscription={autoRenew:true};Object.values(mutations).forEach(v=>{if(typeof v==='object'&&'mutateAsync' in v)v.mutateAsync.mockResolvedValue({});});});
 it('rejects removing the default payment method and invalid upgrade target',async()=>{
  const {result}=renderHook(()=>useAdminSubscriptionsLogic());
  await act(async()=>{await result.current.handleRemovePaymentMethod('default');await result.current.handleUpgrade('missing','Unknown');});
  expect(confirm).not.toHaveBeenCalled();expect(mutations.removePMMutation.mutateAsync).not.toHaveBeenCalled();
 });
 it('does not resolve confirmation action until API settles, and blocks another write',async()=>{
  let release!:()=>void;
  mutations.upgradeMutation.mutateAsync.mockImplementationOnce(()=>new Promise<void>(resolve=>{release=resolve;}));
  const {result}=renderHook(()=>useAdminSubscriptionsLogic());
  let running!:Promise<void>;
  act(()=>{running=result.current.handleUpgrade('pro','Pro');});
  await act(async()=>{await Promise.resolve();});
  expect(mutations.upgradeMutation.mutateAsync).toHaveBeenCalledTimes(1);
  await act(async()=>{await result.current.toggleAutoRenew();});
  expect(mutations.autoRenewMutation.mutateAsync).not.toHaveBeenCalled();
  await act(async()=>{release();await running;});
  expect(mutations.upgradeMutation.mutateAsync).toHaveBeenCalledWith({planId:'pro',idempotencyKey:'key:upgrade-plan:pro'});
 });
});
