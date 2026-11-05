// RESPONSIBILITY: Finance ledger's mock GET contract is safe, bounded, deterministic, and cannot sort arbitrary object fields.
// DATA FLOW: leaf MSW handler → HTTP response → safe search/sort/pagination assertions.
import { afterAll,beforeAll,beforeEach,describe,expect,it } from 'vitest';
import { setupServer } from 'msw/node';
import { adminFinanceStaffLedgerManagementMockHandlers } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/mocks/handlers/AdminFinanceStaffLedgerManagementMockHandlers';
import { normalizeAdminFinanceStaffLedgerManagementMockPagination } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/utils/AdminFinanceStaffLedgerManagementMockPagination';
const origin='https://staff-ledger-mock.test';const server=setupServer(...adminFinanceStaffLedgerManagementMockHandlers);
beforeAll(()=>server.listen({onUnhandledRequest:'error'}));afterAll(()=>server.close());
beforeEach(async()=>{expect((await fetch(`${origin}/admin/hr/__mock-reset`,{method:'HEAD'})).status).toBe(204);});
async function staff(query:string){const response=await fetch(`${origin}/admin/hr/staff?${query}`);expect(response.ok).toBe(true);return response.json();}
describe('Finance staff ledger mock query',()=>{
 it('accepts only bounded decimal page and limit values',()=>{
  for(const raw of ['0','-1','1.5','1e6','101','1000',' 2 ','Infinity'])expect(normalizeAdminFinanceStaffLedgerManagementMockPagination(raw,10)).toBe(10);
  expect(normalizeAdminFinanceStaffLedgerManagementMockPagination('100',10)).toBe(100);
 });
 it('rejects arbitrary sorting keys and unsupported sort directions',async()=>{
  const safe=await staff('sortKey=name&sortDir=asc&limit=100');
  const unsafe=await staff('sortKey=__proto__&sortDir=invalid&limit=100');
  expect(unsafe.data.staff.map((s:{id:string})=>s.id)).toEqual(safe.data.staff.map((s:{id:string})=>s.id));
 });
 it('normalizes whitespace-only searches and clamps obsolete pages',async()=>{
  const base=await staff('limit=100');const empty=await staff('search=%20%20%20&limit=100');expect(empty.data.total).toBe(base.data.total);
  const old=await staff('page=99&limit=10');expect(old.meta.page).toBe(old.meta.totalPages);expect(old.meta.hasNextPage).toBe(false);
  const invalid=await staff('limit=999999');expect(invalid.meta.limit).toBe(10);
 });
});
