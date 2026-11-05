import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { adminFeatureMockServer, resetAdminFeatureMockServer } from '@/app/frontend_admin/admin_hr/hr_staff_management/tests/harness/bootstrap';
const base = 'https://admin-hr-mock.test/admin/hr/staff';
describe('RBG128 HR staff mock safety', () => {
 beforeAll(() => adminFeatureMockServer.listen({onUnhandledRequest: 'error'}));
 afterEach(() => resetAdminFeatureMockServer());
 afterAll(() => adminFeatureMockServer.close());
 it('bounds list pagination, rejects arbitrary sort keys and ignores blank searches', async () => {
  const res = await (await fetch(`${base}?limit=999999&page=999999999&sortKey=__proto__&search=%20%20`)).json() as {meta: {limit:number,page:number,totalPages:number},data:{staff:unknown[],total:number}};
  expect(res.meta.limit).toBe(100);
  expect(res.meta.page).toBe(res.meta.totalPages);
  expect(res.data.total).toBeGreaterThan(0);
 });
 it('prevents HR patch requests from changing Finance-owned balances', async () => {
  const first = await (await fetch(base)).json() as {data:{staff:Array<{id:string,currentDue?:number} >}};
  const id = first.data.staff[0].id;
  const response = await fetch(`${base}/${id}`, { method: 'PATCH', headers: {'Content-Type':'application/json'}, body: JSON.stringify({currentDue: 999999}) });
  expect(response.status).toBe(400);
 });
});
