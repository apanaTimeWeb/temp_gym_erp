import { getResponse } from 'msw';
import { describe, expect, it } from 'vitest';

import { superadminProfileHandlers } from '@/app/frontend_superadmin/superadmin_account/account_security/mocks/handlers/SuperadminAccountSecurityMockHandlers';
import { createSuperadminAccountSecurityDevelopmentHandler } from '@/app/frontend_superadmin/superadmin_account/account_security/mocks/scenarios/superadmin_account_security_development.scenarios';

import type { SuperadminAccountSecurityDevelopmentScenario } from '@/app/frontend_superadmin/superadmin_account/account_security/mocks/scenarios/superadmin_account_security_development.scenarios';


const read = superadminProfileHandlers.find(handler => handler.info.method === 'GET' && typeof handler.info.path === 'string' && !/export|download/i.test(handler.info.path));
const path = read && typeof read.info.path === 'string' ? read.info.path.replace(/^\*/, '').replace(/:(\w+)/g, 'fixture-id') : '';
function request() { return new Request(new URL(path, window.location.origin)); }
async function response(scenario: SuperadminAccountSecurityDevelopmentScenario) { return getResponse([createSuperadminAccountSecurityDevelopmentHandler(() => scenario)], request()); }
function arrays(value: unknown): unknown[][] {
 if (Array.isArray(value)) return [value];
 if (value && typeof value === 'object') return Object.values(value).flatMap(arrays);
 return [];
}
describe('SuperadminAccountSecurity isolated development scenarios', () => {
 it('resolves the same local read contract as the original feature handler', async () => {
  expect(read).toBeDefined();
  const original = await getResponse(superadminProfileHandlers, request());
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
