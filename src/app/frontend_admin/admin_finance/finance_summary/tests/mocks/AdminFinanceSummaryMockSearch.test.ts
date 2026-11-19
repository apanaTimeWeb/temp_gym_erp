// Host-only MSW/Vitest regression specification; authored, not executed in source archive.
import { afterAll,afterEach,beforeAll,describe,expect,it } from 'vitest';
import { setupServer } from 'msw/node';
import { adminFinanceMockHandlers } from '../../mocks/handlers/AdminFinanceSummaryMockHandlers';
import { ADMIN_FINANCE_API } from '../../config/admin_finance_summary.url_config';
const server=setupServer(...adminFinanceMockHandlers);
beforeAll(()=>server.listen({onUnhandledRequest:'error'}));afterEach(()=>server.resetHandlers());afterAll(()=>server.close());
const payments=async(q:string)=>{
 const url=new URL(ADMIN_FINANCE_API.payments,'https://app.example.test');url.search=q;
 return (await (await fetch(url)).json()).data as {total:number};
};
describe('Finance Summary mock payment filtering',()=>{
 it('trims whitespace around search while preserving matches',async()=>{expect((await payments('?search=%20Rahul%20Sharma%20')).total).toBe(1)});
 it('treats separators consistently in net banking method',async()=>{
  expect((await payments('?method=net-banking')).total).toBeGreaterThan(0);
  expect((await payments('?method=Net_Banking')).total).toBeGreaterThan(0);
 });
});
