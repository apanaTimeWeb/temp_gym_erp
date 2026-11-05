import { afterAll,beforeAll,beforeEach,describe,expect,it } from 'vitest';
import { setupServer } from 'msw/node';
import { adminFinanceStaffDuesManagementMockHandlers,readAdminFinanceMockPageParam } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/mocks/handlers/AdminFinanceStaffDuesManagementMockHandlers';
const origin='https://staff-dues-mock.test';const server=setupServer(...adminFinanceStaffDuesManagementMockHandlers);
beforeAll(()=>server.listen({onUnhandledRequest:'error'}));afterAll(()=>server.close());beforeEach(async()=>{expect((await fetch(`${origin}/admin/hr/__mock-reset`,{method:'HEAD'})).status).toBe(204);});
const getStaff=async(query:string)=>(await(await fetch(`${origin}/admin/hr/staff?${query}`)).json());
describe('staff dues mock query contract',()=>{
 it('rejects noncanonical, oversize, and negative pagination',()=>{
  for(const raw of ['', '0','101','1000','2.5','2e2',' 2 ','Infinity','9007199254740991'])expect(readAdminFinanceMockPageParam(raw,10)).toBe(10);
  expect(readAdminFinanceMockPageParam('100',10)).toBe(100);
 });
 it('does not accept arbitrary property sorting or invalid direction',async()=>{
  const safe=await getStaff('sortKey=name&sortDir=asc&limit=100');const unsafe=await getStaff('sortKey=__proto__&sortDir=asc&limit=100');const dir=await getStaff('sortKey=name&sortDir=invalid&limit=100');
  expect(unsafe.data.staff.map((s:{id:string})=>s.id)).toEqual(safe.data.staff.map((s:{id:string})=>s.id));
  expect(dir.data.staff.map((s:{id:string})=>s.id)).toEqual(safe.data.staff.map((s:{id:string})=>s.id));
 });
 it('trims searches and clamps obsolete pagination metadata',async()=>{
  const all=await getStaff('limit=100');const spaces=await getStaff('search=%20%20%20&limit=100');expect(spaces.data.total).toBe(all.data.total);
  const old=await getStaff('page=99&limit=10');expect(old.meta.page).toBe(old.meta.totalPages);expect(old.meta.hasNextPage).toBe(false);
 });
});
