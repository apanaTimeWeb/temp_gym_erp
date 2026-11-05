import { renderHook } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { useAdminPayoutsLogic } from '@/app/frontend_admin/admin_finance/finance_payouts_management/hooks/useAdminFinancePayoutsManagementLogic';
const setPage=vi.hoisted(()=>vi.fn());
vi.mock('@/app/frontend_admin/admin_finance/finance_payouts_management/hooks/useAdminFinancePayoutsManagementUrlQuerySync',()=>({useAdminNavigationLayoutUrlQuerySync:vi.fn()}));
vi.mock('@/app/frontend_admin/admin_finance/finance_payouts_management/state/useAdminFinancePayoutsManagementStore',()=>({useAdminPayoutsStore:Object.assign(()=>({activeTab:'summary',setActiveTab:vi.fn(),monthFilter:'all',setMonthFilter:vi.fn(),gymFilter:'all',setGymFilter:vi.fn(),statusFilter:'all',setStatusFilter:vi.fn(),currentPage:8,setCurrentPage:setPage}),{getState:()=>({setCurrentPage:setPage})})}));
vi.mock('@tanstack/react-query',()=>({useQuery:vi.fn()}));
import { useQuery } from '@tanstack/react-query';
describe('RBG119 payout obsolete page recovery',()=>{
 it('navigates to the last valid page after a settled successful fetch',()=>{
   vi.mocked(useQuery).mockReset().mockReturnValueOnce({status:'success',isFetching:false,data:{data:[],meta:{total:15,totalPages:2}}} as never).mockReturnValueOnce({status:'success',data:[]} as never).mockReturnValueOnce({status:'success',data:{}} as never);
   renderHook(()=>useAdminPayoutsLogic());
   expect(setPage).toHaveBeenCalledWith(2);
 });
});
