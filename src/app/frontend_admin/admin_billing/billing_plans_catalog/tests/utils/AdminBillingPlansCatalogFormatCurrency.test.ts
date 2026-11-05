// RESPONSIBILITY: Defines regression tests for AdminBillingPlansCatalogFormatCurrency.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_plans/plans_catalog/tests/utils/AdminBillingPlansCatalogFormatCurrency.test.ts)

import { describe, expect, it } from 'vitest';
import { AdminPlansFormatCurrency } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/utils/AdminBillingPlansCatalogFormatCurrency';

describe('AdminPlansFormatCurrency', () => {
  it('formats minor-unit INR amounts using the supplied locale', () => {
    expect(AdminPlansFormatCurrency(123456, 'INR', 'en-IN')).toBe('₹1,234.56');
  });
  it('returns the documented placeholder for non-finite amounts', () => {
    expect(AdminPlansFormatCurrency(Number.NaN, 'INR', 'en-IN')).toBe('—');
  });

  it('does not infer currency identity from locale and rejects fractional minor units', () => {
    expect(AdminPlansFormatCurrency(123456, undefined, 'en-IN')).toBe('—');
    expect(AdminPlansFormatCurrency(123456, 'IN', 'en-IN')).toBe('—');
    expect(AdminPlansFormatCurrency(123456.7, 'INR', 'en-IN')).toBe('—');
  });
});
