// RESPONSIBILITY: Defines regression tests for admin_gym_health_alerts_e2e.spec; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (frontend_admin_e2e/admin_gym_health_alerts/gyms_health_alerts_monitoring.spec.ts)
import { test, expect } from '@playwright/test';

/** Module-owned UI workflow test. Runtime execution requires the host app and a real authenticated state. */
test.describe('gyms_health_alerts_monitoring', () => {
  test('health-alert list retry recovers from a transient failed read', async ({ page }) => {
    if (!process.env.PLAYWRIGHT_AUTH_STATE) {
      if (process.env.CI) throw new Error('CI requires PLAYWRIGHT_AUTH_STATE pointing to a host-generated authenticated storage-state file.');
      test.skip(true, 'Host-authenticated storage state is required; provide PLAYWRIGHT_AUTH_STATE.');
    }
    let failedFirstListRead = false;
    await page.route('**/frontend_admin/admin_gyms/gyms_health_alerts_monitoring*', async (route) => {
      if (!failedFirstListRead && route.request().resourceType() !== 'document' && route.request().method() === 'GET') {
        failedFirstListRead = true;
        await route.abort('failed');
        return;
      }
      await route.continue();
    });

    await page.goto('/frontend_admin/admin_gyms/gyms_health_alerts_monitoring', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/frontend_admin\/admin_gyms\/gyms_health_alerts_monitoring(?:\?.*)?$/);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    const errorState = page.locator('[data-testid="admin_gym_health_alerts-admin_gym_health_alerts-table-control"]');
    await expect(errorState).toBeVisible();
    const retry = errorState.getByRole('button');
    await expect(retry).toBeVisible();
    const recoveredRead = page.waitForResponse((response) =>
      response.request().resourceType() !== 'document' &&
      response.url().includes('/frontend_admin/admin_gyms/gyms_health_alerts_monitoring') && response.status() === 200
    );
    await retry.click();
    await recoveredRead;
    await expect(errorState).toHaveCount(0);
    await expect(page.locator('table, [data-testid="admin_gym_health_alerts-admin_gym_health_alerts-empty-state-state"]').first()).toBeVisible();
  });
});
