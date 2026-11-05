// RESPONSIBILITY: Defines regression tests for AdminFinancePayoutsManagementScenarios.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_payouts_management/tests/scenarios/AdminFinancePayoutsManagementScenarios.test.ts)

import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import { adminFeatureMockServer as server } from '@/app/frontend_admin/admin_finance/finance_payouts_management/tests/harness/bootstrap';
import { ADMIN_PAYOUTS_MANAGEMENT_SCENARIOS, createAdminFinancePayoutsManagementScenarioHandler } from "@/app/frontend_admin/admin_finance/finance_payouts_management/mocks/scenarios/admin_finance_payouts_management.scenarios";

const scenarioProbeUrl = 'https://admin-scenario.test/admin_finance/finance_payouts_management';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('admin_finance/finance_payouts_management canonical MSW scenarios', () => {
  it('declares the five canonical scenario choices', () => {
    expect(Object.keys(ADMIN_PAYOUTS_MANAGEMENT_SCENARIOS)).toEqual(['ACTIVE', 'EMPTY', 'SERVER_500', 'TIMEOUT', 'UNAUTHORIZED']);
  });

  it('requires contract-shaped data for EMPTY', () => {
    expect(() => createAdminFinancePayoutsManagementScenarioHandler('EMPTY', scenarioProbeUrl)).toThrow(/schema-correct emptyData/);
  });

  it.each([
    ['SERVER_500', 500, 'ERR_INTERNAL'],
    ['TIMEOUT', 504, 'ERR_TIMEOUT'],
    ['UNAUTHORIZED', 401, 'ERR_UNAUTHORIZED'],
  ] as const)('returns a canonical failure envelope for %s', async (scenario, status, errorCode) => {
    server.use(createAdminFinancePayoutsManagementScenarioHandler(scenario, scenarioProbeUrl, { timeoutDelayMs: 0 }));
    const response = await fetch(scenarioProbeUrl);
    const body = await response.json() as { success: boolean; data: unknown; errorCode: string; statusCode: number; requestId: string };
    expect(response.status).toBe(status);
    expect(body.success).toBe(false);
    expect(body.data).toBeNull();
    expect(body.errorCode).toBe(errorCode);
    expect(body.statusCode).toBe(status);
    expect(body.requestId).toBeTruthy();
  });

  it('does not intercept a POST on the configured GET-only endpoint', async () => {
    server.use(http.post(scenarioProbeUrl, () => HttpResponse.json({ ok: true }, { status: 202 })));
    server.use(createAdminFinancePayoutsManagementScenarioHandler('SERVER_500', scenarioProbeUrl));
    const response = await fetch(scenarioProbeUrl, { method: 'POST' });
    expect(response.status).toBe(202);
    expect(await response.json()).toEqual({ ok: true });
  });

  it('can return an explicitly supplied empty payload without guessing the API shape', async () => {
    server.use(createAdminFinancePayoutsManagementScenarioHandler('EMPTY', scenarioProbeUrl, { emptyData: [] }));
    const response = await fetch(scenarioProbeUrl);
    const body = await response.json() as { success: boolean; data: unknown; requestId: string };
    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data).toEqual([]);
    expect(body.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });
});
