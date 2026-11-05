// RESPONSIBILITY: Defines regression tests for communication_notifications_center_e2e.spec; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (frontend_admin_e2e/admin_communication/communication_notifications_center_e2e.spec.ts)
import { test, expect } from '@playwright/test';

/** Module-owned UI workflow test. Runtime execution requires the host app and a real authenticated state. */
test.describe('Communication notifications center', () => {
  test('notification list retry recovers from a transient failed request', async ({ page }) => {
    if (!process.env.PLAYWRIGHT_AUTH_STATE) {
      if (process.env.CI) throw new Error('CI requires PLAYWRIGHT_AUTH_STATE pointing to a host-generated authenticated storage-state file.');
      test.skip(true, 'Host-authenticated storage state is required; provide PLAYWRIGHT_AUTH_STATE.');
    }
    let failedFirstRead = false;
    await page.route('**/admin/notifications*', async (route) => {
      if (!failedFirstRead && route.request().method() === 'GET') {
        failedFirstRead = true;
        await route.abort('failed');
        return;
      }
      await route.continue();
    });

    await page.goto('/frontend_admin/admin_communication/communication_notifications_center', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/frontend_admin\/admin_communication\/communication_notifications_center(?:\?.*)?$/);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    const retry = page.locator('[data-testid="admin_notifications-admin_notifications-client-control-2"]');
    await expect(retry).toBeVisible();
    const recoveredRead = page.waitForResponse((response) =>
      response.request().resourceType() !== 'document' &&
      response.request().method() === 'GET' && response.url().includes('/admin/notifications') &&
      response.status() === 200
    );
    await retry.click();
    await recoveredRead;
    await expect(page.locator('[role="alert"]')).toHaveCount(0);
    await expect(page.locator('[data-testid^="admin_notifications-admin_notifications-list-control-map26-"], [data-testid="admin_notifications-admin_notifications-empty-state-state"]').first()).toBeVisible();
  });
});
