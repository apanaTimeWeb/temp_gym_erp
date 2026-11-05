import {describe, expect, it, beforeEach} from 'vitest';

import { INITIAL_PLANS } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/mocks/fixtures/SuperadminBillingPlansManagementMockFixtures';
import { resetSuperadminBillingPlansMockState } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/mocks/handlers/SuperadminBillingPlansManagementMockHandlers';



beforeEach(() => {
  resetSuperadminBillingPlansMockState();
});

describe('Superadmin Plans module fixture contract', () => {
  it('provides plan records with pricing and lifecycle fields consumed by the UI', () => {
    expect(Array.isArray(INITIAL_PLANS)).toBe(true);
    expect(INITIAL_PLANS.length).toBeGreaterThan(0);
    expect(INITIAL_PLANS.every((plan) => Boolean(plan.id && plan.name && plan.currency))).toBe(true);
    expect(INITIAL_PLANS.every((plan) => typeof plan.priceMonthly === 'number')).toBe(true);
  });

});
