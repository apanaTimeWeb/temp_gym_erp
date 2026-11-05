import { describe, it, expect } from 'vitest';
import { setupServer } from 'msw/node';
import { adminFinanceMockHandlers } from '@/app/frontend_admin/admin_finance/finance_expenses/mocks/handlers/AdminFinanceExpensesMockHandlers';
import { ADMIN_FINANCE_API } from '@/app/frontend_admin/admin_finance/finance_expenses/config/admin_finance_expenses.url_config';
import { beforeAll, afterAll, afterEach } from 'vitest';
const server=setupServer(...adminFinanceMockHandlers);
beforeAll(()=>server.listen({onUnhandledRequest:'error'}));afterEach(()=>server.resetHandlers());afterAll(()=>server.close());
describe('RBG117 bounded mock pagination',()=>{
  it('rejects very large limits and keeps pagination consistent',async()=>{
    const url=new URL(ADMIN_FINANCE_API.expenses,'https://example.test');
    url.searchParams.set('limit','99999999');
    const result=await (await fetch(url)).json();
    expect(result.meta.limit).toBe(8);
    expect(result.data.expenses.length).toBeLessThanOrEqual(8);
  });
});
