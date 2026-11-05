import { describe, expect, it } from 'vitest';
import { ADMIN_PLANS_GET_ONE_URL } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/config/admin_billing_plans_catalog.url_config';

describe('AdminBillingPlansCatalog URL path segment boundary', () => {
  it('preserves the existing endpoint for an ordinary identifier', () => {
    expect(ADMIN_PLANS_GET_ONE_URL('valid-1')).toBe("/admin/plans/valid-1");
  });
  it('encodes separators, query and fragment delimiters in identifiers', () => {
    expect(ADMIN_PLANS_GET_ONE_URL('a/b?x#y')).toBe("/admin/plans/a%2Fb%3Fx%23y");
  });
  it.each(['', ' ', '.', '..'])('rejects empty or reserved identifier %s', (id) => {
    expect(() => ADMIN_PLANS_GET_ONE_URL(id)).toThrow(TypeError);
  });
});
