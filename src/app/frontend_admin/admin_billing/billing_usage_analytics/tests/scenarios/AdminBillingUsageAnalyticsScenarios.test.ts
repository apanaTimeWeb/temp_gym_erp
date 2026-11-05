// RESPONSIBILITY: Defines regression tests for AdminBillingUsageAnalyticsScenarios.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_usage/usage_analytics/tests/scenarios/AdminBillingUsageAnalyticsScenarios.test.ts)

import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { adminFeatureMockServer as server } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/tests/harness/bootstrap';
import { ADMIN_USAGE_ANALYTICS_SCENARIOS, createAdminBillingUsageAnalyticsScenarioHandler } from "@/app/frontend_admin/admin_billing/billing_usage_analytics/mocks/scenarios/admin_billing_usage_analytics.scenarios";

const scenarioProbeUrl = 'https://admin-scenario.test/admin_usage/usage_analytics';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('admin_usage/usage_analytics canonical MSW scenarios', () => {
  it('declares the five canonical scenario choices', () => {
    expect(Object.keys(ADMIN_USAGE_ANALYTICS_SCENARIOS)).toEqual(['ACTIVE', 'EMPTY', 'SERVER_500', 'TIMEOUT', 'UNAUTHORIZED']);
  });

  it('requires contract-shaped data for EMPTY', () => {
    expect(() => createAdminBillingUsageAnalyticsScenarioHandler('EMPTY', scenarioProbeUrl)).toThrow(/schema-correct emptyData/);
  });

  it.each([
    ['SERVER_500', 500, 'ERR_INTERNAL'],
    ['TIMEOUT', 504, 'ERR_TIMEOUT'],
    ['UNAUTHORIZED', 401, 'ERR_UNAUTHORIZED'],
  ] as const)('returns a canonical failure envelope for %s', async (scenario, status, errorCode) => {
    server.use(createAdminBillingUsageAnalyticsScenarioHandler(scenario, scenarioProbeUrl, { timeoutDelayMs: 0 }));
    const response = await fetch(scenarioProbeUrl);
    const body = await response.json() as { success: boolean; data: unknown; errorCode: string; statusCode: number; requestId: string };
    expect(response.status).toBe(status);
    expect(body.success).toBe(false);
    expect(body.data).toBeNull();
    expect(body.errorCode).toBe(errorCode);
    expect(body.statusCode).toBe(status);
    expect(body.requestId).toBeTruthy();
  });

  it('can return an explicitly supplied empty payload without guessing the API shape', async () => {
    server.use(createAdminBillingUsageAnalyticsScenarioHandler('EMPTY', scenarioProbeUrl, { emptyData: [] }));
    const response = await fetch(scenarioProbeUrl);
    const body = await response.json() as { success: boolean; data: unknown; requestId: string };
    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data).toEqual([]);
    expect(body.requestId).toBe('scenario-empty');
  });
});
