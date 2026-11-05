// RESPONSIBILITY: Models the cache API with deterministic scenarios and idempotent, validated mutation effects.
import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse, delay } from 'msw';
import { z } from 'zod';

import { SUPERADMIN_SYSTEM_OPS_CACHE_MANAGEMENT_API as API } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/config/superadmin_system_ops_cache_management.url_config';
import { getSuperadminSystemOpsCacheManagementScenario } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/mocks/scenarios/superadmin_system_ops_cache_management.scenarios';
import { MOCK_REDIS_TELEMETRY } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/mocks/SuperadminSystemOpsCacheManagementMockData';
import { MOCK_SUPERADMIN_INFRASTRUCTURE_TENANTS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/mocks/SuperadminSystemOpsCacheManagementMockFixtures';


let telemetry = { ...MOCK_REDIS_TELEMETRY };
const intents = new Map<string, string>();
const tenantPayload = z.object({ tenantIds: z.array(z.string().min(1)).min(1) });
function failure(message: string, statusCode: number) {
 return HttpResponse.json({ success: false, message, data: null, errorCode: `MOCK_${statusCode}`, statusCode, requestId: crypto.randomUUID() }, { status: statusCode });
}
function success<T extends import('msw').JsonBodyType>(message: string, data: T) {
 return HttpResponse.json({ success: true, message, data, requestId: crypto.randomUUID() });
}
async function scenarioFailure() {
 const scenario = getSuperadminSystemOpsCacheManagementScenario();
 if (scenario === 'server_error') return failure('Cache service unavailable', StatusCodes.INTERNAL_SERVER_ERROR);
 if (scenario === 'unauthorized') return failure('Session expired', StatusCodes.UNAUTHORIZED);
 if (scenario === 'slow') { await delay(15000); return failure('Cache request timed out', StatusCodes.GATEWAY_TIMEOUT); }
 return null;
}
async function flush(request: Request, scoped: boolean) {
 const failed = await scenarioFailure(); if (failed) return failed;
 const key = request.headers.get('Idempotency-Key');
 if (!key) return failure('Idempotency-Key is required', StatusCodes.BAD_REQUEST);
 let payload: { tenantIds: string[] } | null = null;
 if (scoped) {
  const parsed = tenantPayload.safeParse(await request.json());
  if (!parsed.success) return failure('Choose at least one tenant', StatusCodes.BAD_REQUEST);
  payload = parsed.data;
 }
 const fingerprint = JSON.stringify({ scoped, payload });
 const prior = intents.get(key);
 if (prior && prior !== fingerprint) return failure('Idempotency key intent conflict', StatusCodes.CONFLICT);
 if (!prior) {
  intents.set(key, fingerprint);
  if (!scoped) telemetry = { ...telemetry, totalKeysCached: 0 };
 }
 return success(scoped ? 'Tenant cache flushed' : 'Global cache flushed', null);
}
/** Clears mutable synthetic fixture state between isolated tests. */
export function resetSuperadminSystemOpsCacheManagementMockState() { telemetry = { ...MOCK_REDIS_TELEMETRY }; intents.clear(); }
export const superadminInfrastructureHandlers = [
 http.get(`*${API.REDIS_TELEMETRY}`, async () => {
  const failed = await scenarioFailure(); if (failed) return failed;
  return success('Cache telemetry loaded', getSuperadminSystemOpsCacheManagementScenario() === 'empty' ? { ...telemetry, totalKeysCached: 0 } : telemetry);
 }),
 http.get(`*${API.TENANTS}`, async () => {
  const failed = await scenarioFailure(); if (failed) return failed;
  return success('Tenants loaded', getSuperadminSystemOpsCacheManagementScenario() === 'empty' ? [] : MOCK_SUPERADMIN_INFRASTRUCTURE_TENANTS);
 }),
 http.post(`*${API.REDIS_FLUSH_GLOBAL}`, ({ request }) => flush(request, false)),
 http.post(`*${API.REDIS_FLUSH_TENANT}`, ({ request }) => flush(request, true)),
];
