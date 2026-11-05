import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { adminFinanceMockHandlers } from '@/app/frontend_admin/admin_finance/finance_payments/mocks/handlers/AdminFinancePaymentsMockHandlers';
import { ADMIN_FINANCE_API } from '@/app/frontend_admin/admin_finance/finance_payments/config/admin_finance_payments.url_config';
const server=setupServer(...adminFinanceMockHandlers);
beforeAll(()=>server.listen({onUnhandledRequest:'error'}));afterEach(()=>server.resetHandlers());afterAll(()=>server.close());
describe('RBG118 bounded mock Payments pagination',()=>{
  it('rejects huge page sizes and treats whitespace-only search as empty',async()=>{
    const url=new URL(ADMIN_FINANCE_API.payments,'https://example.test');
    url.searchParams.set('limit','99999999');
    url.searchParams.set('search','   ');
    const result=await (await fetch(url)).json();
    expect(result.meta.limit).toBe(10);
    expect(result.data.payments.length).toBeLessThanOrEqual(10);
    const normal=new URL(ADMIN_FINANCE_API.payments,'https://example.test');
    expect(result.meta.total).toBe((await (await fetch(normal)).json()).meta.total);
  });
});
