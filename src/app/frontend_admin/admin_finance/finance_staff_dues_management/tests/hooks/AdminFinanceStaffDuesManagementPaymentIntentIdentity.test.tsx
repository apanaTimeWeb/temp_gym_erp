import { act,renderHook } from '@testing-library/react';
import { describe,expect,it,vi } from 'vitest';
import { useAdminFinanceStaffDuesManagementDuePaymentMutation } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/hooks/useAdminFinanceStaffDuesManagementDuePaymentMutation';
const requests=vi.hoisted(()=>({values:[] as {payload:Record<string,unknown>;key:string}[], failNext:false}));
vi.mock('@/app/frontend_admin/admin_finance/finance_staff_dues_management/api/admin_finance_staff_dues_management_api',()=>({AdminFinanceStaffDuesManagementApi:{payDue:async(payload:Record<string,unknown>,key:string)=>{requests.values.push({payload,key});if(requests.failNext){requests.failNext=false;throw Error('ambiguous network failure');}return{message:'Saved'};}}}));
vi.mock('@/app/frontend_admin/admin_finance/finance_staff_dues_management/hooks/useAdminFinanceStaffDuesManagementConfirm',()=>({useAdminNavigationLayoutConfirm:()=>({confirm:async()=>true})}));
vi.mock('@tanstack/react-query',()=>({useQueryClient:()=>({invalidateQueries:async()=>undefined}),useMutation:({mutationFn}:{mutationFn:(args:any)=>Promise<unknown>})=>({mutateAsync:mutationFn,isPending:false})}));
vi.mock('next-intl',()=>({useTranslations:()=>(key:string)=>key}));
describe('due-payment mutation retry identity',()=>{
 it('reuses an ambiguous retry key for exactly the same details but not a changed payment',async()=>{
  requests.values=[];requests.failNext=true;
  const {result}=renderHook(()=>useAdminFinanceStaffDuesManagementDuePaymentMutation(vi.fn()));
  const base={staffId:'s1',amount:10,notes:'first',paymentMode:'UPI'};
  await act(async()=>{await expect(result.current.payDue(base)).rejects.toThrow();});
  await act(async()=>{expect(await result.current.payDue(base)).toBe(true);});
  await act(async()=>{expect(await result.current.payDue({...base,paymentMode:'Cash'})).toBe(true);});
  await act(async()=>{expect(await result.current.payDue({...base,notes:'changed'})).toBe(true);});
  expect(requests.values).toHaveLength(4);
  expect(requests.values[0]?.key).toBe(requests.values[1]?.key);
  expect(new Set(requests.values.slice(1).map((r)=>r.key)).size).toBe(3);
  expect(requests.values.every((r)=>r.payload.amount===1000)).toBe(true);
 });
});
