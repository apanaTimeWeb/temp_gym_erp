import { beforeAll, afterAll, afterEach, describe, expect, it } from 'vitest';

import { infrastructureApi } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/api/superadmin_system_ops_cache_management.api';
import { setSuperadminSystemOpsCacheManagementScenario } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/mocks/scenarios/superadmin_system_ops_cache_management.scenarios';
import { cacheMockServer, resetCacheHarness } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/tests/harness/bootstrap';


beforeAll(() => cacheMockServer.listen({ onUnhandledRequest: 'error' }));
afterAll(() => cacheMockServer.close()); afterEach(resetCacheHarness);
describe('isolated cache API transport and mutable MSW state', () => {
 it('global flush changes authoritative telemetry and safe retry preserves the outcome', async () => {
  const before = await infrastructureApi.fetchRedisTelemetry(); expect(before.success).toBe(true);
  if (!before.success) throw new Error('Expected telemetry success');
  expect(before.data.totalKeysCached).toBeGreaterThan(0);
  const key = crypto.randomUUID();
  expect((await infrastructureApi.flushGlobalCache(key)).success).toBe(true);
  expect((await infrastructureApi.flushGlobalCache(key)).success).toBe(true);
  const after = await infrastructureApi.fetchRedisTelemetry();
  if (!after.success) throw new Error('Expected telemetry success');
  expect(after.data.totalKeysCached).toBe(0);
 });
 it('requires a mutation key and refuses to reuse a key for another intent', async () => {
  expect((await infrastructureApi.flushGlobalCache('')).success).toBe(false);
  const key = crypto.randomUUID(); await infrastructureApi.flushGlobalCache(key);
  const result = await infrastructureApi.flushTenantCache(['tenant-1'], key);
  expect(result.success).toBe(false); if (!result.success) expect(result.statusCode).toBe(409);
 });
 it('requires a tenant selection without reporting a fake success', async () => {
  expect((await infrastructureApi.flushTenantCache([], crypto.randomUUID())).success).toBe(false);
 });
 it('supports empty tenant results and explicit server/auth failure envelopes', async () => {
  setSuperadminSystemOpsCacheManagementScenario('empty');
  const result = await infrastructureApi.fetchTenants(); expect(result.success).toBe(true);
  if (result.success) expect(result.data).toEqual([]);
  setSuperadminSystemOpsCacheManagementScenario('server_error');
  expect((await infrastructureApi.fetchRedisTelemetry()).success).toBe(false);
  setSuperadminSystemOpsCacheManagementScenario('unauthorized');
  const denied = await infrastructureApi.fetchRedisTelemetry(); expect(denied.success).toBe(false);
  if (!denied.success) expect(denied.statusCode).toBe(401);
 });
});
