import { setupServer } from 'msw/node';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { SUPERADMIN_BILLING_PLANS_MANAGEMENT_API } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/config/superadmin_billing_plans_management.url_config';
import { INITIAL_PLANS } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/mocks/fixtures/SuperadminBillingPlansManagementMockFixtures';
import { mockPlansList, resetSuperadminBillingPlansMockState, superadminPlansHandlers } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/mocks/handlers/SuperadminBillingPlansManagementMockHandlers';


const server = setupServer(...superadminPlansHandlers);
const baseUrl = `http://localhost${SUPERADMIN_BILLING_PLANS_MANAGEMENT_API.BASE}`;

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
beforeEach(() => resetSuperadminBillingPlansMockState());

describe('Superadmin Plans MSW mutation contract', () => {
  const createPayload = () => {
    const plan = INITIAL_PLANS[0];
    return {
      name: 'RBG6 Replay Plan',
      priceMonthly: plan.priceMonthly,
      priceAnnual: plan.priceAnnual,
      maxMembers: plan.maxMembers,
      maxStaff: plan.maxStaff,
      dbLimitGb: plan.dbLimitGb,
      binaryLimitGb: plan.binaryLimitGb,
      features: [...plan.features],
      isPublic: plan.isPublic,
      trialDays: plan.trialDays,
      setupFee: plan.setupFee,
      currency: plan.currency,
    };
  };

  it('rejects mutations without Idempotency-Key without changing the list', async () => {
    const response = await fetch(baseUrl, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(createPayload()),
    });
    expect(response.status).toBe(400);
    expect(mockPlansList).toHaveLength(INITIAL_PLANS.length);
  });

  it('replays the same create intent without duplicating the plan', async () => {
    const request = () => fetch(baseUrl, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': 'rbg6-plan-create-1' }, body: JSON.stringify(createPayload()),
    });
    const first = await request();
    const firstBody = await first.json();
    const replay = await request();
    const replayBody = await replay.json();
    expect(first.ok).toBe(true);
    expect(replay.ok).toBe(true);
    expect(replayBody.data.id).toBe(firstBody.data.id);
    expect(mockPlansList.filter((plan) => plan.name === 'RBG6 Replay Plan')).toHaveLength(1);
  });

  it('rejects key reuse for a different create payload without applying the second intent', async () => {
    const request = (name: string) => fetch(baseUrl, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': 'rbg6-plan-conflict-1' },
      body: JSON.stringify({ ...createPayload(), name }),
    });
    expect((await request('First Intent Plan')).status).toBe(200);
    expect((await request('Different Intent Plan')).status).toBe(409);
    expect(mockPlansList.some((plan) => plan.name === 'First Intent Plan')).toBe(true);
    expect(mockPlansList.some((plan) => plan.name === 'Different Intent Plan')).toBe(false);
  });

  it('does not mutate the list when validation fails', async () => {
    const response = await fetch(baseUrl, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': 'rbg6-plan-invalid-1' }, body: JSON.stringify({ name: '' }),
    });
    expect(response.status).toBe(400);
    expect(mockPlansList).toHaveLength(INITIAL_PLANS.length);
  });
});
