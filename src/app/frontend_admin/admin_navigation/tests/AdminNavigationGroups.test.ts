// RESPONSIBILITY: Verifies the 13 canonical Admin domain destinations and clean-break routing policy.
import { describe, expect, it } from 'vitest';
import { ADMIN_DOMAIN_ROOT_ROUTES, ADMIN_NAV_GROUPS } from '@/app/frontend_admin/admin_navigation/config/admin_navigation_shell.url_config';

const expectedGroups = [
  { groupKey: 'overview', hrefs: ['/frontend_admin/admin_dashboard'] },
  { groupKey: 'operations', hrefs: ['/frontend_admin/admin_members', '/frontend_admin/admin_attendance', '/frontend_admin/admin_sales', '/frontend_admin/admin_gyms'] },
  { groupKey: 'financeBilling', hrefs: ['/frontend_admin/admin_billing', '/frontend_admin/admin_finance'] },
  { groupKey: 'people', hrefs: ['/frontend_admin/admin_hr'] },
  { groupKey: 'communication', hrefs: ['/frontend_admin/admin_communication'] },
  { groupKey: 'accessControl', hrefs: ['/frontend_admin/admin_security'] },
  { groupKey: 'insights', hrefs: ['/frontend_admin/admin_reports'] },
  { groupKey: 'system', hrefs: ['/frontend_admin/admin_data_export', '/frontend_admin/admin_settings'] },
];

describe('Admin canonical domain-first sidebar registry', () => {
  it('exposes exactly the approved 13 business domain roots', () => {
    const hrefs = Object.values(ADMIN_DOMAIN_ROOT_ROUTES);
    expect(hrefs).toHaveLength(13);
    expect(new Set(hrefs).size).toBe(13);
    expect(ADMIN_DOMAIN_ROOT_ROUTES).not.toHaveProperty('profile');
    expect(ADMIN_DOMAIN_ROOT_ROUTES).not.toHaveProperty('navigation');
  });

  it('keeps all primary destinations as roots in the approved hierarchy', () => {
    expect(ADMIN_NAV_GROUPS.map(({ groupKey, items }) => ({ groupKey, hrefs: items.map(({ href }) => href) }))).toEqual(expectedGroups);
    const hrefs = ADMIN_NAV_GROUPS.flatMap(({ items }) => items.map(({ href }) => href));
    expect(hrefs).toHaveLength(13);
    expect(new Set(hrefs).size).toBe(13);
  });

});
