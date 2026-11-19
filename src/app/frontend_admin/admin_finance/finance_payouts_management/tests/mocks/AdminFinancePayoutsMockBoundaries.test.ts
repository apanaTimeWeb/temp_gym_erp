import { describe, expect, it } from 'vitest';
import { normalizeAdminFinancePayoutsManagementMockPagination } from '@/app/frontend_admin/admin_finance/finance_payouts_management/utils/AdminFinancePayoutsManagementMockPagination';
import { adminPayoutsMockHandlers } from '@/app/frontend_admin/admin_finance/finance_payouts_management/mocks/handlers/AdminFinancePayoutsManagementMockHandlers';
import { setupServer } from 'msw/node';
import { beforeAll, afterAll, afterEach } from 'vitest';
const server=setupServer(...adminPayoutsMockHandlers);
beforeAll(()=>server.listen({onUnhandledRequest:'error'}));afterEach(()=>server.resetHandlers());afterAll(()=>server.close());
describe('RBG119 payouts mock input constraints',()=>{
 it('bounds positive page sizes without accepting unsafe numeric offsets',()=>{
   for(const value of ['101','99999999','1e3','0','-1']) expect(normalizeAdminFinancePayoutsManagementMockPagination(value,10)).toBe(10);
   expect(normalizeAdminFinancePayoutsManagementMockPagination('100',10)).toBe(100);
 });
 it('ignores untrusted sort keys and directions without changing response structure',async()=>{
   const url='https://example.test/admin/payouts';
   const unsafe=await (await fetch(`${url}?limit=999999&sortKey=prototype&sortDir=unsafe`)).json();
   const normal=await (await fetch(`${url}?limit=10`)).json();
   expect(unsafe.meta.limit).toBe(10);
   expect(unsafe.data).toEqual(normal.data);
   const pnl=await (await fetch(`${url}/pnl?sortKey=prototype&sortDir=unsafe`)).json();
   expect(pnl.success).toBe(true);
   expect(Array.isArray(pnl.data)).toBe(true);
 });
});
