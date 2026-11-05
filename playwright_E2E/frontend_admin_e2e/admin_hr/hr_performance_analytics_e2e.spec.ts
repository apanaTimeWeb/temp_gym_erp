// RESPONSIBILITY: Defines regression tests for admin_hr_performance_e2e.spec; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (frontend_admin_e2e/admin_hr/hr_performance_analytics_e2e.spec.ts)
import { test, expect } from '@playwright/test';

const requireAuth = () => {
  if (!process.env.PLAYWRIGHT_AUTH_STATE) {
    if (process.env.CI) throw new Error('CI requires PLAYWRIGHT_AUTH_STATE pointing to a host-generated authenticated storage-state file.');
    test.skip(true, 'Host-authenticated storage state is required; provide PLAYWRIGHT_AUTH_STATE.');
  }
};

test.describe('HR performance analytics', () => {
  test('canonical route renders the performance report and filters', async ({ page }) => {
    requireAuth();
    await page.goto('/frontend_admin/admin_hr/hr_performance_analytics', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/frontend_admin\/admin_hr\/hr_performance_analytics(?:\?.*)?$/);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    await expect(page.getByRole('textbox').first()).toBeVisible();
  });

});
