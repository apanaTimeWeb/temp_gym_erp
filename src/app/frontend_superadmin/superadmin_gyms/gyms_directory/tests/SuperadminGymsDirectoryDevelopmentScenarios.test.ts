import { getResponse } from 'msw';
import { describe, expect, it } from 'vitest';

import { createSuperadminGymsDirectoryDevelopmentHandler } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/mocks/scenarios/superadmin_gyms_directory_development.scenarios';
import { superadminGymsHandlers as superadminGymsHandlers } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/mocks/SuperadminGymsDirectoryMockHandlers';

import type { SuperadminGymsDirectoryDevelopmentScenario } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/mocks/scenarios/superadmin_gyms_directory_development.scenarios';


const read = superadminGymsHandlers.find(handler => handler.info.method === 'GET' && typeof handler.info.path === 'string' && !/export|download/i.test(handler.info.path));
const path = read && typeof read.info.path === 'string' ? read.info.path.replace(/^\*/, '').replace(/:(\w+)/g, 'fixture-id') : '';
function request() { return new Request(new URL(path, window.location.origin)); }
async function response(scenario: SuperadminGymsDirectoryDevelopmentScenario) { return getResponse([createSuperadminGymsDirectoryDevelopmentHandler(() => scenario)], request()); }
function arrays(value: unknown): unknown[][] {
 if (Array.isArray(value)) return [value];
 if (value && typeof value === 'object') return Object.values(value).flatMap(arrays);
 return [];
}
describe('SuperadminGymsDirectory isolated development scenarios', () => {
 it('resolves the same local read contract as the original feature handler', async () => {
  expect(read).toBeDefined();
  const original = await getResponse(superadminGymsHandlers, request());
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
