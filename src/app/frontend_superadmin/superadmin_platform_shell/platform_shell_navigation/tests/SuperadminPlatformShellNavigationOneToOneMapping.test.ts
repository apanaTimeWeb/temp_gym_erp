import { describe, expect, it } from 'vitest';

import { SUPERADMIN_NAV_GROUPS } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/constants/superadmin_platform_shell_navigation_config.constants';
import { SUPERADMIN_SAAS_BILLING_NAVIGATION_ITEMS } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/constants/superadmin_platform_shell_navigation_saa_s_billing.constants';

const EXPECTED_PRIMARY_DOMAINS = [
  'superadmin_account',
  'superadmin_affiliates',
  'superadmin_analytics',
  'superadmin_audit_compliance',
  'superadmin_billing',
  'superadmin_communication',
  'superadmin_dashboard',
  'superadmin_gyms',
  'superadmin_platform_configuration',
  'superadmin_support',
  'superadmin_system_ops',
  'superadmin_team',
] as const;

const BILLING_LEAF_ROUTES = [
  '/frontend_superadmin/superadmin_billing/billing_coupons_management',
  '/frontend_superadmin/superadmin_billing/billing_invoices_management',
  '/frontend_superadmin/superadmin_billing/billing_plans_management',
  '/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard',
] as const;

describe('Superadmin primary navigation domain ownership', () => {
  it('maps each primary clickable destination to one distinct real business domain root', () => {
    const items = SUPERADMIN_NAV_GROUPS.flatMap((group) => group.items);
    const routeDomains = items.map(({ href }) => {
      const match = href.match(/^\/frontend_superadmin\/(superadmin_[a-z0-9_]+)$/);
      expect(match, `Primary navigation URL must be a domain root: ${href}`).not.toBeNull();
      return match?.[1] ?? '';
    });

    expect(items).toHaveLength(12);
    expect(new Set(routeDomains).size).toBe(routeDomains.length);
    expect([...routeDomains].sort()).toEqual([...EXPECTED_PRIMARY_DOMAINS].sort());
    expect(items.some(({ href }) => href.includes('/billing_plans_management'))).toBe(false);
    expect(items.some(({ href }) => href.includes('/communication_messaging_center'))).toBe(false);
    expect(items.some(({ href }) => href.includes('/platform_configuration_features_management'))).toBe(false);
  });
});

describe('Superadmin billing secondary navigation', () => {
  it('keeps all billing leaf routes inside the billing domain and out of primary navigation', () => {
    const billing = SUPERADMIN_SAAS_BILLING_NAVIGATION_ITEMS;
    const billingRoutes = billing.map(({ href }) => href);
    expect(billing).toHaveLength(4);
    expect([...billingRoutes].sort()).toEqual([...BILLING_LEAF_ROUTES].sort());

    const primaryRoutes = SUPERADMIN_NAV_GROUPS.flatMap((group) => group.items).map(({ href }) => href);
    for (const route of billingRoutes) {
      expect(route.startsWith('/frontend_superadmin/superadmin_billing/')).toBe(true);
      expect(primaryRoutes).not.toContain(route);
    }
  });
});
