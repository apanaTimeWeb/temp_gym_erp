// RESPONSIBILITY: Defines regression tests for AdminBillingPlansCatalogScenarios.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_plans/plans_catalog/tests/scenarios/AdminBillingPlansCatalogScenarios.test.ts)

import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { adminFeatureMockServer as server } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/tests/harness/bootstrap';
import { resetAdminPlansMockState } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/mocks/handlers/AdminBillingPlansCatalogMockHandlers';
import { ADMIN_PLANS_CATALOG_SCENARIOS, createAdminBillingPlansCatalogScenarioHandler } from "@/app/frontend_admin/admin_billing/billing_plans_catalog/mocks/scenarios/admin_billing_plans_catalog.scenarios";

const scenarioProbeUrl = 'https://admin-scenario.test/admin_plans/plans_catalog';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => { server.resetHandlers(); resetAdminPlansMockState(); });
afterAll(() => server.close());

describe('admin_plans/plans_catalog canonical MSW scenarios', () => {
  it('declares the five canonical scenario choices', () => {
    expect(Object.keys(ADMIN_PLANS_CATALOG_SCENARIOS)).toEqual(['ACTIVE', 'EMPTY', 'SERVER_500', 'TIMEOUT', 'UNAUTHORIZED']);
  });

  it('requires contract-shaped data for EMPTY', () => {
    expect(() => createAdminBillingPlansCatalogScenarioHandler('EMPTY', scenarioProbeUrl)).toThrow(/schema-correct emptyData/);
  });

  it.each([
    ['SERVER_500', 500, 'ERR_INTERNAL'],
    ['TIMEOUT', 504, 'ERR_TIMEOUT'],
    ['UNAUTHORIZED', 401, 'ERR_UNAUTHORIZED'],
  ] as const)('returns a canonical failure envelope for %s', async (scenario, status, errorCode) => {
    server.use(createAdminBillingPlansCatalogScenarioHandler(scenario, scenarioProbeUrl, { timeoutDelayMs: 0 }));
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
    server.use(createAdminBillingPlansCatalogScenarioHandler('EMPTY', scenarioProbeUrl, { emptyData: [] }));
    const response = await fetch(scenarioProbeUrl);
    const body = await response.json() as { success: boolean; data: unknown; requestId: string };
    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data).toEqual([]);
    expect(body.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$|scenario-empty/i);
  });
  it('preserves optional priceCustom minor units through plan create and update mock responses', async () => {
    const base = 'https://admin-scenario.test/admin/plans';
    const createResponse = await fetch(`${base}/createPlan`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Custom Plan', tier: 'Gold', price1Month: 115, price3Month: 255,
        price6Month: 299, price12Month: 1001, priceCustom: 129, features: ['A'] }),
    });
    expect(createResponse.status).toBe(200);
    const created = await createResponse.json() as { data: { id: string; priceCustom: number } };
    expect(created.data.priceCustom).toBe(129);

    const updateResponse = await fetch(`${base}/updatePlan`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: created.data.id, priceCustom: 255 }),
    });
    expect(updateResponse.status).toBe(200);
    const updated = await updateResponse.json() as { data: { priceCustom: number } };
    expect(updated.data.priceCustom).toBe(255);
    const listResponse = await fetch(`${base}/fetchAllPlans?search=Custom%20Plan`);
    const list = await listResponse.json() as { data: Array<{ priceCustom?: number }> };
    expect(list.data[0]?.priceCustom).toBe(255);
  });

});
