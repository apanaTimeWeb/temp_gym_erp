// Source-authored E2E contract: primary sidebar links are domain roots; leaf destinations live in each domain's secondary navigation.
import { test, expect } from '@playwright/test';

function requireHostAuth() {
  if (!process.env.PLAYWRIGHT_AUTH_STATE) {
    if (process.env.CI) throw new Error('CI requires PLAYWRIGHT_AUTH_STATE pointing to a host-generated authenticated storage-state file.');
    test.skip(true, 'Host-authenticated storage state is required; provide PLAYWRIGHT_AUTH_STATE.');
  }
}

const EXPECTED_GROUPS = [
  { key: 'overview', label: 'Overview', hrefs: ['/frontend_admin/admin_dashboard'] },
  { key: 'operations', label: 'Members & Operations', hrefs: ['/frontend_admin/admin_members','/frontend_admin/admin_attendance','/frontend_admin/admin_sales','/frontend_admin/admin_gyms'] },
  { key: 'financeBilling', label: 'Billing & Finance', hrefs: ['/frontend_admin/admin_billing','/frontend_admin/admin_finance'] },
  { key: 'people', label: 'People', hrefs: ['/frontend_admin/admin_hr'] },
  { key: 'communication', label: 'Communication', hrefs: ['/frontend_admin/admin_communication'] },
  { key: 'accessControl', label: 'Security & Access', hrefs: ['/frontend_admin/admin_security'] },
  { key: 'insights', label: 'Reports & Insights', hrefs: ['/frontend_admin/admin_reports'] },
  { key: 'system', label: 'System', hrefs: ['/frontend_admin/admin_data_export','/frontend_admin/admin_settings'] },
] as const;

const LEGACY_URLS = [
  "/frontend_admin/admin_finance/finance_plan_revenue_analytics",
  "/frontend_admin/admin_finance/finance_branch_profit_and_loss",
  "/frontend_admin/admin_finance/finance_payments",
  "/frontend_admin/admin_sales/sales_overview",
  "/frontend_admin/admin_billing/billing_subscription_invoices",
  "/frontend_admin/admin_billing/billing_subscriptions_overview",
  "/frontend_admin/admin_billing/billing_subscription_payment_methods",
  "/frontend_admin/admin_hr/hr_performance_analytics",
  "/frontend_admin/admin_finance/finance_salary_advance_management",
  "/frontend_admin/admin_finance/finance_staff_dues_management",
  "/frontend_admin/admin_finance/finance_staff_ledger_management",
  "/frontend_admin/admin_hr/hr_staff_management",
  "/frontend_admin/admin_finance/finance_payroll_management",
  "/frontend_admin/admin_finance/finance_revenue_report",
  "/frontend_admin/admin_finance/finance_payroll_report",
  "/frontend_admin/admin_finance/finance_profit_and_loss_report",
  "/frontend_admin/admin_finance/finance_revenue_report",
] as const;

test('Admin sidebar exposes 13 target domain-root destinations in eight accessible logical groups', async ({ page }) => {
  requireHostAuth();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/frontend_admin/admin_dashboard', { waitUntil: 'domcontentloaded' });
  const sidebar = page.locator('[data-admin-shell-sidebar]');
  const links = sidebar.locator('a[href^="/frontend_admin/"]');
  await expect(links).toHaveCount(13);
  const actualHrefs = await links.evaluateAll((nodes) => nodes.map((node) => (node as HTMLAnchorElement).getAttribute('href')));
  expect(actualHrefs).toEqual(EXPECTED_GROUPS.flatMap((group) => group.hrefs));
  expect(actualHrefs.every((href) => href && !LEGACY_URLS.includes(href as (typeof LEGACY_URLS)[number]))).toBe(true);

  const groups = sidebar.locator('[role="group"][data-testid^="admin_navigation-admin-sidebar-group-"]');
  await expect(groups).toHaveCount(8);
  for (const [index, expected] of EXPECTED_GROUPS.entries()) {
    const group = groups.nth(index);
    await expect(group).toHaveAttribute('data-testid', `admin_navigation-admin-sidebar-group-${expected.key}`);
    await expect(group).toHaveAttribute('role', 'group');
    await expect(group).toHaveAttribute('aria-label', expected.label);
    await expect(group).toHaveAttribute('aria-labelledby', `admin-navigation-sidebar-group-label-${expected.key}`);
    const groupLabel = group.getByTestId(`admin_navigation-admin-sidebar-group-label-${expected.key}`);
    await expect(groupLabel).toHaveText(expected.label);
    await expect(groupLabel).toBeVisible();
    if (index > 0) await expect(group).toHaveClass(/border-t border-border pt-3/);
    const groupLinks = group.locator('a[href^="/frontend_admin/"]');
    await expect(groupLinks).toHaveCount(expected.hrefs.length);
    expect(await groupLinks.evaluateAll((nodes) => nodes.map((node) => (node as HTMLAnchorElement).getAttribute('href'))).then((hrefs) => hrefs)).toEqual(expected.hrefs);
  }

  await page.getByTestId('admin_navigation-admin-header-sidebar-toggle').click();
  await expect(groups).toHaveCount(8);
  for (const expected of EXPECTED_GROUPS) {
    const group = groups.filter({ has: page.getByTestId(`admin_navigation-admin-sidebar-group-label-${expected.key}`) });
    const groupLabel = group.getByTestId(`admin_navigation-admin-sidebar-group-label-${expected.key}`);
    await expect(groupLabel).toHaveClass(/sr-only/);
    const firstLink = group.locator('a').first();
    const itemLabel = await firstLink.getAttribute('aria-label');
    await expect(firstLink).toHaveAttribute('title', `${expected.label} — ${itemLabel}`);
  }
});
