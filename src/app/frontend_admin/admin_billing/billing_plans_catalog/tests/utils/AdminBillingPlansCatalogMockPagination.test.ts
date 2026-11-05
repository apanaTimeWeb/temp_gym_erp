import { describe, expect, it } from 'vitest';
import { normalizeAdminBillingPlansCatalogMockPagination } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/utils/AdminBillingPlansCatalogMockPagination';

describe('AdminBillingPlansCatalog mock HTTP pagination', () => {
  it('retains valid positive integer pagination and existing default values', () => {
    expect(normalizeAdminBillingPlansCatalogMockPagination(null, 10)).toBe(10);
    expect(normalizeAdminBillingPlansCatalogMockPagination('2', 1)).toBe(2);
    expect(normalizeAdminBillingPlansCatalogMockPagination('3', 8)).toBe(3);
  });
  it('rejects malformed values without unsafe offsets or infinite metadata', () => {
    for (const raw of ['0', '-1', '1.5', '1e5', 'Infinity', 'NaN', '', ' 2 ', '9007199254740992']) {
      expect(normalizeAdminBillingPlansCatalogMockPagination(raw, 8)).toBe(8);
    }
  });
});
