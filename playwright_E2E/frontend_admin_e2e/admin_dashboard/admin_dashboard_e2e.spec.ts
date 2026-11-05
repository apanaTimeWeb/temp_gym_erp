// RESPONSIBILITY: Defines regression tests for admin_dashboard_e2e.spec; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (frontend_admin_e2e/admin_dashboard/admin_dashboard_e2e.spec.ts)
import { test, expect } from '@playwright/test';

/** Module-owned UI workflow test. Runtime execution requires the host app and a real authenticated state. */
test.describe('admin_dashboard', () => {
  test('dashboard renders its headline and KPI surface', async ({ page }) => {
    if (!process.env.PLAYWRIGHT_AUTH_STATE) {
      if (process.env.CI) throw new Error('CI requires PLAYWRIGHT_AUTH_STATE pointing to a host-generated authenticated storage-state file.');
      test.skip(true, 'Host-authenticated storage state is required; provide PLAYWRIGHT_AUTH_STATE.');
    }
    await page.goto('/frontend_admin/admin_dashboard', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/frontend_admin\/admin_dashboard\/dashboard_overview(?:\?.*)?$/);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    const dashboardSurface = page.locator('[data-testid^="admin_dashboard-"]');
    await expect(dashboardSurface.first()).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
  });
});
