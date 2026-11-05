// RBG131: URL query coalescing and external history resets.
import { act, renderHook } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { useAdminNavigationLayoutUrlQuerySync } from '@/app/frontend_admin/admin_billing/billing_coupons_management/hooks/useAdminBillingCouponsManagementUrlQuerySync';
let current='tab=overview';
const replace=vi.fn();
vi.mock('next/navigation',()=>({useRouter:()=>({replace}),usePathname:()=>'/coupons',useSearchParams:()=>new URLSearchParams(current)}));
function useHarness(){const [search,setSearch]=useState('');const [status,setStatus]=useState('all');useAdminNavigationLayoutUrlQuerySync([{key:'search',value:search,defaultValue:'',setValue:(val)=>setSearch(typeof val === 'string' ? val : '')},{key:'status',value:status,defaultValue:'all',setValue:(val)=>setStatus(typeof val === 'string' ? val : 'all')}]);return{search,status,setSearch,setStatus}}
describe('RBG131 URL pending writes',()=>{
  it('merges search and status before router acknowledgment',()=>{
    current='tab=overview';replace.mockReset();
    const {result,rerender}=renderHook(useHarness);
    act(()=>result.current.setSearch('promo'));
    act(()=>result.current.setStatus('active'));
    const last=replace.mock.calls.at(-1)?.[0] as string;
    expect(last).toContain('search=promo');expect(last).toContain('status=active');expect(last).toContain('tab=overview');
    act(()=>{current=last.split('?')[1] ?? '';rerender()});
    act(()=>{current='tab=overview';rerender()});
    expect(result.current.search).toBe('');expect(result.current.status).toBe('all');
  });
});
