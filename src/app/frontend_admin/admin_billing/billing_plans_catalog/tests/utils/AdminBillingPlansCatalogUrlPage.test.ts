import { describe, expect, it } from 'vitest';
import { normalizeAdminBillingPlansCatalogUrlPage } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/utils/AdminBillingPlansCatalogUrlPage';

describe('AdminBillingPlansCatalog URL pagination', () => {
  it('preserves valid page values and bounds huge requests', () => {
    expect(normalizeAdminBillingPlansCatalogUrlPage('2')).toBe(2);
    expect(normalizeAdminBillingPlansCatalogUrlPage(3)).toBe(3);
    expect(normalizeAdminBillingPlansCatalogUrlPage('100001')).toBe(100000);
  });
  it('rejects malformed inbound page strings and outgoing actions', () => {
    for (const raw of [null, '', '0', '-1', '1.5', '2abc', '1e4', 'Infinity', ' 2 ', '9007199254740992']) expect(normalizeAdminBillingPlansCatalogUrlPage(raw)).toBe(1);
    expect(normalizeAdminBillingPlansCatalogUrlPage(1.25)).toBe(1);
    expect(normalizeAdminBillingPlansCatalogUrlPage(Infinity)).toBe(1);
  });
});
