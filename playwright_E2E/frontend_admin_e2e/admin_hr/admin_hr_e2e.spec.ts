// RESPONSIBILITY: Regression tests for HR staff and performance workflows; finance workflows remain owned by admin_finance.
// DATA FLOW: authenticated host app → HR route shell → staff/performance views using canonical routes only.
import { test, expect } from '@playwright/test';

function requireHostAuth() {
  if (!process.env.PLAYWRIGHT_AUTH_STATE) {
    if (process.env.CI) throw new Error('CI requires PLAYWRIGHT_AUTH_STATE pointing to a host-generated authenticated storage-state file.');
    test.skip(true, 'Host-authenticated storage state is required; provide PLAYWRIGHT_AUTH_STATE.');
  }
}

test.describe('admin_hr', () => {
  test('HR secondary navigation exposes only staff and performance workflows', async ({ page }) => {
    requireHostAuth();
    await page.goto('/frontend_admin/admin_hr', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/frontend_admin\/admin_hr\/hr_staff_management(?:\?.*)?$/);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();

    const workflowRoutes = ['hr_staff_management', 'hr_performance_analytics'];
    const secondaryNav = page.locator('nav a[href^="/frontend_admin/admin_hr/"]');
    await expect(secondaryNav).toHaveCount(2);
    for (const route of workflowRoutes) {
      await expect(page.locator(`nav a[href="/frontend_admin/admin_hr/${route}"]`)).toBeVisible();
    }
    await expect(page.locator('nav a[href*="payroll"], nav a[href*="advance"], nav a[href*="dues"], nav a[href*="ledger"]')).toHaveCount(0);
  });

});
