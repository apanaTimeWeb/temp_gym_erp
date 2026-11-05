// RESPONSIBILITY: Defines regression tests for AdminBillingPlansCatalogCurrencyUnits.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_plans/plans_catalog/tests/utils/AdminBillingPlansCatalogCurrencyUnits.test.ts)

import { describe, expect, it } from 'vitest';
import { adminPlansMajorToMinor, adminPlansMinorToMajor } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/utils/AdminBillingPlansCatalogCurrencyUnits';

describe('plan price unit conversion', () => {
  it('round-trips form major units through integer minor-unit DTOs', () => {
    expect(adminPlansMajorToMinor(199.99)).toBe(19999);
    expect(adminPlansMinorToMajor(19999)).toBe(199.99);
  });
  it('rejects fractions of a minor unit and invalid DTO amounts', () => {
    expect(() => adminPlansMajorToMinor(1.001)).toThrow(RangeError);
    expect(() => adminPlansMinorToMajor(1.5)).toThrow(RangeError);
  });
});
