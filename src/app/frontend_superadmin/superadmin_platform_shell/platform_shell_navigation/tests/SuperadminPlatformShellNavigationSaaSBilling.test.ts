import { describe, expect, it } from 'vitest';

import { SUPERADMIN_NAV_GROUPS } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/constants/superadmin_platform_shell_navigation_config.constants';
import { SUPERADMIN_SAAS_BILLING_NAVIGATION_ITEMS } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/constants/superadmin_platform_shell_navigation_saa_s_billing.constants';

describe('Superadmin SaaS billing navigation', () => {
  it('lists only billing leaves as contextual secondary navigation', () => {
    const billingRoutes = SUPERADMIN_SAAS_BILLING_NAVIGATION_ITEMS.map(({ href }) => href);
    expect(billingRoutes).toHaveLength(4);
    expect([...billingRoutes].sort()).toEqual([
      '/frontend_superadmin/superadmin_billing/billing_coupons_management',
      '/frontend_superadmin/superadmin_billing/billing_invoices_management',
      '/frontend_superadmin/superadmin_billing/billing_plans_management',
      '/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard',
    ].sort());
    const primaryRoutes = SUPERADMIN_NAV_GROUPS.flatMap((group) => group.items.map(({ href }) => href));
    for (const route of billingRoutes) {
      expect(route.startsWith('/frontend_superadmin/superadmin_billing/')).toBe(true);
      expect(primaryRoutes).not.toContain(route);
    }
  });
});
