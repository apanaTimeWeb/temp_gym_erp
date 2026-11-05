// Source-authored coverage for all 43 canonical Admin business leaf routes; canonical routes only; no compatibility routes are declared.
// Runtime execution requires the host app, an authenticated storage state, and an available browser.
import { test, expect } from '@playwright/test';

function requireHostAuth() {
  if (!process.env.PLAYWRIGHT_AUTH_STATE) {
    if (process.env.CI) throw new Error('CI requires PLAYWRIGHT_AUTH_STATE pointing to a host-generated authenticated storage-state file.');
    test.skip(true, 'Host-authenticated storage state is required; provide PLAYWRIGHT_AUTH_STATE.');
  }
}

const LEAF_ROUTES = [
  { label: 'Dashboard Overview', path: '/frontend_admin/admin_dashboard/dashboard_overview', hasSecondaryNavigation: false },
  { label: 'Members Directory', path: '/frontend_admin/admin_members/members_directory', hasSecondaryNavigation: true },
  { label: 'Members Blacklist Management', path: '/frontend_admin/admin_members/members_blacklist_management', hasSecondaryNavigation: true },
  { label: 'Attendance Dashboard', path: '/frontend_admin/admin_attendance/attendance_dashboard', hasSecondaryNavigation: true },
  { label: 'Reports Cross-Domain Overview', path: '/frontend_admin/admin_reports/reports_cross_domain_overview', hasSecondaryNavigation: false },
  { label: 'Sales Overview', path: '/frontend_admin/admin_sales/sales_overview', hasSecondaryNavigation: true },
  { label: 'Sales Membership Report', path: '/frontend_admin/admin_sales/sales_membership_report', hasSecondaryNavigation: true },
  { label: 'Sales Memberships', path: '/frontend_admin/admin_sales/sales_memberships', hasSecondaryNavigation: true },
  { label: 'Sales Store Sales', path: '/frontend_admin/admin_sales/sales_store_sales', hasSecondaryNavigation: true },
  { label: 'Sales Pending Payments', path: '/frontend_admin/admin_sales/sales_pending_payments', hasSecondaryNavigation: true },
  { label: 'Billing Plans Catalog', path: '/frontend_admin/admin_billing/billing_plans_catalog', hasSecondaryNavigation: true },
  { label: 'Billing Coupons Management', path: '/frontend_admin/admin_billing/billing_coupons_management', hasSecondaryNavigation: true },
  { label: 'Billing Subscriptions Overview', path: '/frontend_admin/admin_billing/billing_subscriptions_overview', hasSecondaryNavigation: true },
  { label: 'Billing Subscription Plans', path: '/frontend_admin/admin_billing/billing_subscription_plans', hasSecondaryNavigation: true },
  { label: 'Billing Subscription Invoices', path: '/frontend_admin/admin_billing/billing_subscription_invoices', hasSecondaryNavigation: true },
  { label: 'Billing Subscription Payment Methods', path: '/frontend_admin/admin_billing/billing_subscription_payment_methods', hasSecondaryNavigation: true },
  { label: 'Billing Usage Analytics', path: '/frontend_admin/admin_billing/billing_usage_analytics', hasSecondaryNavigation: true },
  { label: 'Finance Payments', path: '/frontend_admin/admin_finance/finance_payments', hasSecondaryNavigation: true },
  { label: 'Finance Expenses', path: '/frontend_admin/admin_finance/finance_expenses', hasSecondaryNavigation: true },
  { label: 'Finance Summary', path: '/frontend_admin/admin_finance/finance_summary', hasSecondaryNavigation: true },
  { label: 'Finance Branch Profit And Loss', path: '/frontend_admin/admin_finance/finance_branch_profit_and_loss', hasSecondaryNavigation: true },
  { label: 'Finance Plan Revenue Analytics', path: '/frontend_admin/admin_finance/finance_plan_revenue_analytics', hasSecondaryNavigation: true },
  { label: 'Finance Payouts Management', path: '/frontend_admin/admin_finance/finance_payouts_management', hasSecondaryNavigation: true },
  { label: 'Finance Payroll Management', path: '/frontend_admin/admin_finance/finance_payroll_management', hasSecondaryNavigation: true },
  { label: 'Finance Salary Advance Management', path: '/frontend_admin/admin_finance/finance_salary_advance_management', hasSecondaryNavigation: true },
  { label: 'Finance Staff Dues Management', path: '/frontend_admin/admin_finance/finance_staff_dues_management', hasSecondaryNavigation: true },
  { label: 'Finance Staff Ledger Management', path: '/frontend_admin/admin_finance/finance_staff_ledger_management', hasSecondaryNavigation: true },
  { label: 'Finance Profit And Loss Report', path: '/frontend_admin/admin_finance/finance_profit_and_loss_report', hasSecondaryNavigation: true },
  { label: 'Finance Revenue Report', path: '/frontend_admin/admin_finance/finance_revenue_report', hasSecondaryNavigation: true },
  { label: 'Finance Payroll Report', path: '/frontend_admin/admin_finance/finance_payroll_report', hasSecondaryNavigation: true },
  { label: 'HR Staff Management', path: '/frontend_admin/admin_hr/hr_staff_management', hasSecondaryNavigation: true },
  { label: 'HR Performance Analytics', path: '/frontend_admin/admin_hr/hr_performance_analytics', hasSecondaryNavigation: true },
  { label: 'Gyms Branches Directory', path: '/frontend_admin/admin_gyms/gyms_branches_directory', hasSecondaryNavigation: true },
  { label: 'Gyms Health Alerts Monitoring', path: '/frontend_admin/admin_gyms/gyms_health_alerts_monitoring', hasSecondaryNavigation: true },
  { label: 'Communication Notices And Announcements', path: '/frontend_admin/admin_communication/communication_notices_and_announcements', hasSecondaryNavigation: true },
  { label: 'Communication WhatsApp Campaigns', path: '/frontend_admin/admin_communication/communication_whatsapp_campaigns', hasSecondaryNavigation: true },
  { label: 'Communication Notifications Center', path: '/frontend_admin/admin_communication/communication_notifications_center', hasSecondaryNavigation: true },
  { label: 'Security Permissions Management', path: '/frontend_admin/admin_security/security_permissions_management', hasSecondaryNavigation: true },
  { label: 'Security Audit Logs Explorer', path: '/frontend_admin/admin_security/security_audit_logs_explorer', hasSecondaryNavigation: true },
  { label: 'Attendance Reports', path: '/frontend_admin/admin_attendance/attendance_reports', hasSecondaryNavigation: true },
  { label: 'Sales Membership Growth Report', path: '/frontend_admin/admin_sales/sales_membership_growth_report', hasSecondaryNavigation: true },
  { label: 'Data Export Requests', path: '/frontend_admin/admin_data_export/data_export_requests', hasSecondaryNavigation: false },
  { label: 'Settings Management', path: '/frontend_admin/admin_settings/settings_management', hasSecondaryNavigation: false },
] as const;

function escapedPath(path: string): RegExp {
  return new RegExp(`${path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:\\?.*)?$`);
}

test.describe('Admin canonical leaf route coverage', () => {
  test('covers all 43 unique canonical Admin business leaf routes', () => {
    expect(LEAF_ROUTES).toHaveLength(43);
    expect(new Set(LEAF_ROUTES.map((route) => route.path)).size).toBe(43);
  });

  for (const route of LEAF_ROUTES) {
    test(`${route.label} canonical route renders its page`, async ({ page }) => {
      requireHostAuth();
      await page.goto(route.path, { waitUntil: 'domcontentloaded' });
      await expect(page).toHaveURL(escapedPath(route.path));
      await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
      if (route.hasSecondaryNavigation) await expect(page.locator(`nav a[href=\"${route.path}\"]`)).toBeVisible();
    });
  }
});

test.describe('Admin special-purpose header route', () => {
  test('header-linked profile workflow renders', async ({ page }) => {
    requireHostAuth();
    const route = '/frontend_admin/admin_profile/profile_overview';
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(escapedPath(route));
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  });
});
