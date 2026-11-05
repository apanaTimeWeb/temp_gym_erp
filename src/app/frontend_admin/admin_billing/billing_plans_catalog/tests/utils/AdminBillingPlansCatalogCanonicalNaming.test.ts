// RESPONSIBILITY: Regression test for canonical Plans Catalog constants and query key module identity.
// DATA FLOW: static owning constants registry → stable exports → isolated Vitest assertions.
import { describe, expect, it } from 'vitest';
import { EMPTY_PLAN_FORM, TIERS, PLANS_ITEMS_PER_PAGE } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/constants/admin_billing_plans_catalog.constants';
import { ADMIN_PLANS_QUERY_KEYS } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/constants/admin_billing_plans_catalog.query_keys';

describe('Admin Billing Plans Catalog canonical constants registry', () => {
  it('retains existing business constants through the canonical artifact path', () => {
    expect(TIERS).toEqual(['Bronze', 'Silver', 'Gold']);
    expect(EMPTY_PLAN_FORM.tier).toBe('Gold');
    expect(PLANS_ITEMS_PER_PAGE).toBe(10);
  });
  it('retains stable and isolated list/detail query key construction', () => {
    expect(ADMIN_PLANS_QUERY_KEYS.lists()).toEqual(['admin_plans', 'list']);
    expect(ADMIN_PLANS_QUERY_KEYS.detail('p1')).toEqual(['admin_plans', 'detail', 'p1']);
  });
});
