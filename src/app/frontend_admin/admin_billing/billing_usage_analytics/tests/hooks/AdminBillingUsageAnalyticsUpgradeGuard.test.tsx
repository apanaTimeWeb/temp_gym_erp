// RBG135 regression, authored for host Vitest/RTL (not executed in source-only archive).
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAdminUsageLogic } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/hooks/useAdminBillingUsageAnalyticsLogic';
import { AdminUsageApi } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/api/admin_billing_usage_analytics_api';
import { useAdminNavigationLayoutConfirm } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/hooks/useAdminBillingUsageAnalyticsConfirm';
import { useAdminNavigationLayoutToastStore } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/state/useAdminBillingUsageAnalyticsToastStore';
vi.mock('next-intl',()=>({useTranslations:()=> (key:string)=>key}));
vi.mock('@/app/frontend_admin/admin_billing/billing_usage_analytics/api/admin_billing_usage_analytics_api',()=>({AdminUsageApi:{fetchMyUsage:vi.fn(),requestUpgrade:vi.fn()}}));
vi.mock('@/app/frontend_admin/admin_billing/billing_usage_analytics/hooks/useAdminBillingUsageAnalyticsConfirm',()=>({useAdminNavigationLayoutConfirm:vi.fn()}));
vi.mock('@/app/frontend_admin/admin_billing/billing_usage_analytics/state/useAdminBillingUsageAnalyticsToastStore',()=>({useAdminNavigationLayoutToastStore:vi.fn()}));
const confirm=vi.fn(),showToast=vi.fn();
const usage={tenantId:'t1',planName:'Growth',planTier:'Growth' as const,billingCycleEnd:'2026-11-15T00:00:00Z',monthlyPrice:4999,smsSent:10,smsLimit:100,databaseGb:1,mediaGb:1,storageLimitGb:10,activeMembers:5,memberLimit:50,staffCount:1,staffLimit:5,branchCount:1,branchLimit:5,apiCallsToday:1,apiCallsLimit:100,usageHistory:[]};
let client:QueryClient;
function wrapper({children}:{children:React.ReactNode}){return <QueryClientProvider client={client}>{children}</QueryClientProvider>}
describe('RBG135 usage upgrade guard',()=>{
 beforeEach(()=>{client=new QueryClient({defaultOptions:{queries:{retry:false},mutations:{retry:false}}});vi.clearAllMocks();vi.mocked(useAdminNavigationLayoutConfirm).mockReturnValue({confirm});vi.mocked(useAdminNavigationLayoutToastStore).mockReturnValue({toast:null,showToast,hideToast:vi.fn()});vi.mocked(AdminUsageApi.fetchMyUsage).mockResolvedValue({success:true,data:usage,message:'ok',requestId:'test'});confirm.mockResolvedValue(true);vi.mocked(AdminUsageApi.requestUpgrade).mockResolvedValue({success:true,message:'sent',data:{requestId:'upgrade-1',planName:'Pro',status:'pending',requestedAt:'2026-11-01T00:00:00Z'},requestId:'test'});});
 it('blocks unknown, current and lower tier requests before confirmation or mutation',async()=>{const {result}=renderHook(()=>useAdminUsageLogic(),{wrapper});await waitFor(()=>expect(result.current.data?.planTier).toBe('Growth'));await act(async()=>{await result.current.requestUpgrade('Unknown');await result.current.requestUpgrade('Growth');await result.current.requestUpgrade('Starter')});expect(confirm).not.toHaveBeenCalled();expect(AdminUsageApi.requestUpgrade).not.toHaveBeenCalled();});
 it('blocks competing confirmation while the first request is pending',async()=>{let finish!: (value:boolean)=>void;confirm.mockImplementationOnce(()=>new Promise<boolean>(resolve=>{finish=resolve}));const {result}=renderHook(()=>useAdminUsageLogic(),{wrapper});await waitFor(()=>expect(result.current.data?.planTier).toBe('Growth'));let pending!:Promise<void>;act(()=>{pending=result.current.requestUpgrade('Pro')});await waitFor(()=>expect(confirm).toHaveBeenCalledTimes(1));await act(async()=>{await result.current.requestUpgrade('Enterprise')});expect(confirm).toHaveBeenCalledTimes(1);await act(async()=>{finish(false);await pending});expect(AdminUsageApi.requestUpgrade).not.toHaveBeenCalled();expect(result.current.pendingUpgradePlan).toBeNull();});
});
