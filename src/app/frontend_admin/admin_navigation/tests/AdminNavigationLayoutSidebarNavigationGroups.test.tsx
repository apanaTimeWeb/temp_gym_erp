// RESPONSIBILITY: Verifies the Admin sidebar renders the approved accessible 13-domain hierarchy.
import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import AdminNavigationLayoutSidebarNavigation from '@/app/frontend_admin/admin_navigation/components/sidebar_navigation/AdminNavigationLayoutSidebarNavigation';

const routeState = vi.hoisted(() => ({ pathname: '/frontend_admin/admin_dashboard/dashboard_overview' }));
vi.mock('next/navigation', () => ({ usePathname: () => routeState.pathname }));
vi.mock('next/link', () => ({ default: ({ href, children, ...props }: React.ComponentProps<'a'>) => <a href={href} {...props}>{children}</a> }));
afterEach(() => {
  routeState.pathname = '/frontend_admin/admin_dashboard/dashboard_overview';
});

vi.mock('next-intl', () => {
  const translations: Record<string, string> = {
    'admin_navigation.AdminNavigation.groups.overview': 'Overview',
    'admin_navigation.AdminNavigation.groups.operations': 'Members & Operations',
    'admin_navigation.AdminNavigation.groups.financeBilling': 'Billing & Finance',
    'admin_navigation.AdminNavigation.groups.people': 'People',
    'admin_navigation.AdminNavigation.groups.communication': 'Communication',
    'admin_navigation.AdminNavigation.groups.accessControl': 'Security & Access',
    'admin_navigation.AdminNavigation.groups.insights': 'Reports & Insights',
    'admin_navigation.AdminNavigation.groups.system': 'System',
    'admin_navigation.AdminNavigation.items.dashboard': 'Dashboard',
    'admin_navigation.AdminNavigation.items.members': 'Members',
    'admin_navigation.AdminNavigation.items.attendance': 'Attendance',
    'admin_navigation.AdminNavigation.items.sales': 'Sales',
    'admin_navigation.AdminNavigation.items.billing': 'Billing',
    'admin_navigation.AdminNavigation.items.finance': 'Finance',
    'admin_navigation.AdminNavigation.items.hr': 'HR',
    'admin_navigation.AdminNavigation.items.gyms': 'Gyms & Branches',
    'admin_navigation.AdminNavigation.items.communication': 'Communication',
    'admin_navigation.AdminNavigation.items.security': 'Security',
    'admin_navigation.AdminNavigation.items.reports': 'Reports',
    'admin_navigation.AdminNavigation.items.dataExport': 'Data Export',
    'admin_navigation.AdminNavigation.items.settings': 'Settings',
    'admin_navigation.AdminNavigationLayoutSidebar.text_a68d28f1ee': 'No navigation results',
  };
  return { useTranslations: () => (key: string) => translations[key] ?? key };
});

const expectedGroups = [
  { key: 'overview', label: 'Overview', hrefs: ['/frontend_admin/admin_dashboard'] },
  { key: 'operations', label: 'Members & Operations', hrefs: ['/frontend_admin/admin_members', '/frontend_admin/admin_attendance', '/frontend_admin/admin_sales', '/frontend_admin/admin_gyms'] },
  { key: 'financeBilling', label: 'Billing & Finance', hrefs: ['/frontend_admin/admin_billing', '/frontend_admin/admin_finance'] },
  { key: 'people', label: 'People', hrefs: ['/frontend_admin/admin_hr'] },
  { key: 'communication', label: 'Communication', hrefs: ['/frontend_admin/admin_communication'] },
  { key: 'accessControl', label: 'Security & Access', hrefs: ['/frontend_admin/admin_security'] },
  { key: 'insights', label: 'Reports & Insights', hrefs: ['/frontend_admin/admin_reports'] },
  { key: 'system', label: 'System', hrefs: ['/frontend_admin/admin_data_export', '/frontend_admin/admin_settings'] },
];

describe('Admin domain-first sidebar visual and accessible grouping', () => {
  it('renders all approved group headings and ordered domain-root destinations', () => {
    render(<AdminNavigationLayoutSidebarNavigation isCollapsed={false} isMobileOpen={false} searchQuery="" />);
    const groups = screen.getAllByRole('group');
    expect(groups).toHaveLength(expectedGroups.length);
    expectedGroups.forEach((expected, index) => {
      const group = groups[index];
      expect(group).toHaveAttribute('data-testid', `admin_navigation-admin-sidebar-group-${expected.key}`);
      expect(group).toHaveAttribute('aria-label', expected.label);
      expect(group).toHaveAttribute('aria-labelledby', `admin-navigation-sidebar-group-label-${expected.key}`);
      expect(within(group).getByTestId(`admin_navigation-admin-sidebar-group-label-${expected.key}`)).toHaveTextContent(expected.label);
      expect(within(group).getAllByRole('link').map((link) => link.getAttribute('href'))).toEqual(expected.hrefs);
      if (index > 0) expect(group.className).toContain('border-t border-border pt-3');
    });
    const allHrefs = groups.flatMap((group) => within(group).getAllByRole('link').map((link) => link.getAttribute('href')));
    expect(allHrefs).toHaveLength(13);
    expect(new Set(allHrefs).size).toBe(13);
  });
  it('keeps the target Billing item active on a canonical Billing leaf route', () => {
    routeState.pathname = '/frontend_admin/admin_billing/billing_coupons_management';
    render(<AdminNavigationLayoutSidebarNavigation isCollapsed={false} isMobileOpen={false} searchQuery="" />);
    expect(screen.getByRole('link', { name: 'Billing' })).toHaveAttribute('aria-current', 'page');
    routeState.pathname = '/frontend_admin/admin_dashboard/dashboard_overview';
  });

  it('preserves accessible group names when the sidebar is collapsed', () => {
    render(<AdminNavigationLayoutSidebarNavigation isCollapsed isMobileOpen={false} searchQuery="" />);
    for (const expected of expectedGroups) {
      const group = screen.getByRole('group', { name: expected.label });
      expect(within(group).getByTestId(`admin_navigation-admin-sidebar-group-label-${expected.key}`).className).toContain('sr-only');
      const firstLink = within(group).getAllByRole('link')[0];
      expect(firstLink).toHaveAttribute('aria-label');
      expect(firstLink.getAttribute('title')).toContain(expected.label);
    }
  });
  it('shows the same group headings in the open mobile drawer', () => {
    render(<AdminNavigationLayoutSidebarNavigation isCollapsed isMobileOpen searchQuery="" />);
    const groups = screen.getAllByRole('group');
    expect(groups).toHaveLength(expectedGroups.length);
    expectedGroups.forEach((expected, index) => {
      const heading = within(groups[index]).getByTestId(`admin_navigation-admin-sidebar-group-label-${expected.key}`);
      expect(heading).toHaveTextContent(expected.label);
      expect(heading.className).toContain('block');
      expect(heading.className).not.toContain('sr-only');
    });
  });
  it('filters destinations by localized labels and removes only empty groups', () => {
    render(<AdminNavigationLayoutSidebarNavigation isCollapsed={false} isMobileOpen={false} searchQuery="finance" />);
    const groups = screen.getAllByRole('group');
    expect(groups).toHaveLength(1);
    expect(groups[0]).toHaveAttribute('aria-label', 'Billing & Finance');
    expect(within(groups[0]).getAllByRole('link').map((link) => link.getAttribute('href'))).toEqual(['/frontend_admin/admin_finance']);
  });
});
