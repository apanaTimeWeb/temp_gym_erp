import { getResponse } from 'msw';
import { describe, expect, it } from 'vitest';

import { createSuperadminSystemOpsJobsDevelopmentHandler } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/mocks/scenarios/superadmin_system_ops_jobs_development.scenarios';
import { superadminJobsHandlers } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/mocks/SuperadminSystemOpsJobsMockHandlers';

import type { SuperadminSystemOpsJobsDevelopmentScenario } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/mocks/scenarios/superadmin_system_ops_jobs_development.scenarios';


const read = superadminJobsHandlers.find(handler => handler.info.method === 'GET' && typeof handler.info.path === 'string' && !/export|download/i.test(handler.info.path));
const path = read && typeof read.info.path === 'string' ? read.info.path.replace(/^\*/, '').replace(/:(\w+)/g, 'fixture-id') : '';
function request() { return new Request(new URL(path, window.location.origin)); }
async function response(scenario: SuperadminSystemOpsJobsDevelopmentScenario) { return getResponse([createSuperadminSystemOpsJobsDevelopmentHandler(() => scenario)], request()); }
function arrays(value: unknown): unknown[][] {
 if (Array.isArray(value)) return [value];
 if (value && typeof value === 'object') return Object.values(value).flatMap(arrays);
 return [];
}
describe('SuperadminSystemOpsJobs isolated development scenarios', () => {
 it('resolves the same local read contract as the original feature handler', async () => {
  expect(read).toBeDefined();
  const original = await getResponse(superadminJobsHandlers, request());
  expect(original?.status).toBe(200);
  const active = await response('ACTIVE');
  expect(active?.status).toBe(original?.status);
  const originalBody = await original?.json();
  const activeBody = await active?.json();
  expect(originalBody?.success).toBe(true);
  expect(activeBody?.success).toBe(true);
  expect(activeBody?.data).toEqual(originalBody?.data);
 });
 it('returns an empty collection response through the local network handler', async () => {
  const empty = await response('EMPTY');
  expect(empty).toBeDefined();
  const body = await empty?.json();
  expect(body.success).toBe(true);
  for (const array of arrays(body.data)) expect(array).toHaveLength(0);
 });
 it('returns canonical server and authorization failures without executing the underlying handler', async () => {
  const server = await response('SERVER_500');
  expect(server?.status).toBe(500);
  expect(await server?.json()).toMatchObject({ success: false, data: null, statusCode: 500, errorCode: 'INTERNAL_SERVER_ERROR' });
  const denied = await response('UNAUTHORIZED');
  expect(denied?.status).toBe(401);
  expect(await denied?.json()).toMatchObject({ success: false, data: null, statusCode: 401, errorCode: 'UNAUTHORIZED' });
 });
});
