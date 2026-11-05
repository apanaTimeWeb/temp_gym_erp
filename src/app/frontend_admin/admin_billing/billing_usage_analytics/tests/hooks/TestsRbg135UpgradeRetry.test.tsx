// RBG135 regression; host-only RTL execution required.
import React from 'react';
import { describe,it,expect,vi } from 'vitest';
import {renderHook,act,waitFor} from '@testing-library/react';
import {QueryClient,QueryClientProvider} from '@tanstack/react-query';
import {useAdminUsageLogic} from '@/app/frontend_admin/admin_billing/billing_usage_analytics/hooks/useAdminBillingUsageAnalyticsLogic';
import {AdminUsageApi} from '@/app/frontend_admin/admin_billing/billing_usage_analytics/api/admin_billing_usage_analytics_api';
import {useAdminNavigationLayoutConfirm} from '@/app/frontend_admin/admin_billing/billing_usage_analytics/hooks/useAdminBillingUsageAnalyticsConfirm';
import {useAdminNavigationLayoutToastStore} from '@/app/frontend_admin/admin_billing/billing_usage_analytics/state/useAdminBillingUsageAnalyticsToastStore';
vi.mock('next-intl',()=>({useTranslations:()=> (key:string)=>key}));
vi.mock('@/app/frontend_admin/admin_billing/billing_usage_analytics/api/admin_billing_usage_analytics_api',()=>({AdminUsageApi:{fetchMyUsage:vi.fn(),requestUpgrade:vi.fn()}}));
vi.mock('@/app/frontend_admin/admin_billing/billing_usage_analytics/hooks/useAdminBillingUsageAnalyticsConfirm',()=>({useAdminNavigationLayoutConfirm:vi.fn()}));
vi.mock('@/app/frontend_admin/admin_billing/billing_usage_analytics/state/useAdminBillingUsageAnalyticsToastStore',()=>({useAdminNavigationLayoutToastStore:vi.fn()}));
const usage={tenantId:'t',planName:'Growth',planTier:'Growth',billingCycleEnd:'2026-11-15',monthlyPrice:4999,smsSent:1,smsLimit:10,databaseGb:1,mediaGb:2,storageLimitGb:5,activeMembers:1,memberLimit:5,staffCount:1,staffLimit:5,branchCount:1,branchLimit:5,apiCallsToday:1,apiCallsLimit:10,usageHistory:[]};
const client=new QueryClient({defaultOptions:{queries:{retry:false},mutations:{retry:false}}});
function wrapper({children}:{children:React.ReactNode}){return <QueryClientProvider client={client}>{children}</QueryClientProvider>}
describe('RBG135 upgrade retry intent',()=>{
 it('reuses original retry key after transient error and clears after success',async()=>{
  const toast=vi.fn();vi.mocked(useAdminNavigationLayoutConfirm).mockReturnValue({confirm:vi.fn().mockResolvedValue(true)});vi.mocked(useAdminNavigationLayoutToastStore).mockReturnValue({toast:null,showToast:toast,hideToast:vi.fn()});vi.mocked(AdminUsageApi.fetchMyUsage).mockResolvedValue({success:true,data:usage,message:'ok',requestId:'test'});
  vi.mocked(AdminUsageApi.requestUpgrade).mockReset().mockRejectedValueOnce(new Error('private gateway secret')).mockResolvedValueOnce({success:true,data:{requestId:'u',planName:'Pro',status:'pending',requestedAt:'2026-11-01T00:00:00Z'},message:'sent',requestId:'test'});
  const {result}=renderHook(()=>useAdminUsageLogic(),{wrapper});await waitFor(()=>expect(result.current.data?.planTier).toBe('Growth'));
  await act(async()=>{await result.current.requestUpgrade('Pro')});await act(async()=>{await result.current.requestUpgrade('Pro')});
  const requests=vi.mocked(AdminUsageApi.requestUpgrade).mock.calls;expect(requests).toHaveLength(2);expect(requests[0][1]).toBe(requests[1][1]);expect(JSON.stringify(toast.mock.calls)).not.toContain('private gateway secret');
 });
});
