// RESPONSIBILITY: Regression coverage for local Usage MSW upgrade state, UUID identity and reset.
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { adminFeatureMockServer, resetAdminFeatureMockServer } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/tests/harness/bootstrap';
import { getAdminUsageMockUpgradeRequest, resetAdminUsageMockState } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/mocks/handlers/AdminBillingUsageAnalyticsMockHandlers';

const url = 'https://admin-usage.test/admin/usage/upgrade-request';
const post = (key: string, planName: string) => fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': key }, body: JSON.stringify({ planName }) });

describe('Usage mock upgrade identity', () => {
  beforeAll(() => adminFeatureMockServer.listen({ onUnhandledRequest: 'error' }));
  afterEach(() => resetAdminFeatureMockServer());
  afterAll(() => adminFeatureMockServer.close());

  it('uses distinct UUID request IDs for independent upgrades but replays the same key', async () => {
    const first = (await (await post(crypto.randomUUID(), 'Growth')).json()) as { data: { requestId: string } };
    const secondKey = crypto.randomUUID();
    const second = (await (await post(secondKey, 'Pro')).json()) as { data: { requestId: string } };
    const replay = (await (await post(secondKey, 'Pro')).json()) as { data: { requestId: string } };
    expect(first.data.requestId).not.toBe(second.data.requestId);
    expect(replay.data.requestId).toBe(second.data.requestId);
    expect(second.data.requestId).toMatch(/^upgrade-[0-9a-f-]{36}$/);
  });
  it('clears request state for the next standalone test', async () => {
    await post(crypto.randomUUID(), 'Growth');
    expect(getAdminUsageMockUpgradeRequest()).not.toBeNull();
    resetAdminUsageMockState();
    expect(getAdminUsageMockUpgradeRequest()).toBeNull();
  });
});
