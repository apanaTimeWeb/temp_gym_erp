// RESPONSIBILITY: Defines regression tests for AdminBillingPlansCatalogSchemas.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_plans/plans_catalog/tests/schemas/AdminBillingPlansCatalogSchemas.test.ts)

import { describe, expect, it } from 'vitest';
import { planFormSchema, planSchema } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/schemas/AdminBillingPlansCatalogSchemas';

const validForm = { name: 'Gold Plan', tier: 'Gold', price1Month: '100', price3Month: '270', price6Month: '500', price12Month: '900', priceCustom: '20', features: 'Member access' };

const validPlan = { id: 'p1', name: 'Gold Plan', tier: 'Gold', price1Month: 100, price3Month: 270, price6Month: 500, price12Month: 900, features: ['Member access'], isActive: true };

describe('Admin Plans schemas', () => {
  it('accepts configured plan tiers', () => {
    expect(planSchema.safeParse(validPlan).success).toBe(true);
  });

  it('rejects tiers that are not in the module-owned tier list', () => {
    expect(planSchema.safeParse({ ...validPlan, tier: 'Platinum' }).success).toBe(false);
    expect(planFormSchema.safeParse({ ...validForm, tier: 'Platinum' }).success).toBe(false);
  });

  it('rejects blank numeric fields rather than treating an empty string as zero', () => {
    expect(planFormSchema.safeParse({ ...validForm, price1Month: '' }).success).toBe(false);
    expect(planFormSchema.safeParse({ ...validForm, priceCustom: '   ' }).success).toBe(false);
  });
  it.each(['1.15', '2.55', '0.29', '10.01', '0', '0.00'])('accepts valid two-decimal price %s for every price field', (price) => {
    for (const field of ['price1Month', 'price3Month', 'price6Month', 'price12Month', 'priceCustom'] as const) {
      expect(planFormSchema.safeParse({ ...validForm, [field]: price }).success).toBe(true);
    }
  });

  it.each(['1.234', '-1', 'Infinity', 'NaN', '1e3', '90071992547410.00'])('rejects invalid or unsafe price %s', (price) => {
    for (const field of ['price1Month', 'price3Month', 'price6Month', 'price12Month', 'priceCustom'] as const) {
      expect(planFormSchema.safeParse({ ...validForm, [field]: price }).success).toBe(false);
    }
  });

});
