// RESPONSIBILITY: Defines regression tests for admin_permissions_e2e.spec; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (frontend_admin_e2e/admin_permissions/security_permissions_management.spec.ts)
import { test, expect } from '@playwright/test';

/** Module-owned UI workflow test. Runtime execution requires the host app and a real authenticated state. */
test.describe('security_permissions_management', () => {
  test('permissions query failure exposes retry and returns to a permissions surface', async ({ page }) => {
    if (!process.env.PLAYWRIGHT_AUTH_STATE) {
      if (process.env.CI) throw new Error('CI requires PLAYWRIGHT_AUTH_STATE pointing to a host-generated authenticated storage-state file.');
      test.skip(true, 'Host-authenticated storage state is required; provide PLAYWRIGHT_AUTH_STATE.');
    }
    let failedFirstApiRead = false;
    await page.route('**/frontend_admin/admin_security/security_permissions_management*', async (route) => {
      if (!failedFirstApiRead && route.request().resourceType() !== 'document' && route.request().method() === 'GET') {
        failedFirstApiRead = true;
        await route.abort('failed');
        return;
      }
      await route.continue();
    });

    await page.goto('/frontend_admin/admin_security/security_permissions_management', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/frontend_admin\/admin_security\/security_permissions_management(?:\?.*)?$/);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    const error = page.getByRole('alert');
    await expect(error).toBeVisible();
    const retry = error.getByRole('button', { name: /Retry|पुनः प्रयास/i });
    await expect(retry).toBeVisible();
    const recoveredRead = page.waitForResponse((response) =>
      response.request().resourceType() !== 'document' &&
      response.url().includes('/frontend_admin/admin_security/security_permissions_management') && response.status() === 200
    );
    await retry.click();
    await recoveredRead;
    await expect(page.locator('[role="alert"]')).toHaveCount(0);
    await expect(page.locator('[data-testid="admin_permissions-admin_permissions-toolbar-control"]')).toBeVisible();
  });
});
