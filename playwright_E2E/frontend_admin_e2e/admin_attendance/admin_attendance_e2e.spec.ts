// RESPONSIBILITY: Defines regression tests for admin_attendance_e2e.spec; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (frontend_admin_e2e/admin_attendance/admin_attendance_e2e.spec.ts)
import { test, expect } from '@playwright/test';

/** Module-owned UI workflow test. Runtime execution requires the host app and a real authenticated state. */
test.describe('admin_attendance', () => {
  test('attendance read failure exposes retry and recovers after a transient request failure', async ({ page }) => {
    if (!process.env.PLAYWRIGHT_AUTH_STATE) {
      if (process.env.CI) throw new Error('CI requires PLAYWRIGHT_AUTH_STATE pointing to a host-generated authenticated storage-state file.');
      test.skip(true, 'Host-authenticated storage state is required; provide PLAYWRIGHT_AUTH_STATE.');
    }
    let failedFirstRead = false;
    await page.route('**/admin/attendance/records*', async (route) => {
      if (!failedFirstRead) {
        failedFirstRead = true;
        await route.abort('failed');
        return;
      }
      await route.continue();
    });

    await page.goto('/frontend_admin/admin_attendance', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/frontend_admin\/admin_attendance\/attendance_dashboard(?:\?.*)?$/);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    const retry = page.locator('[data-testid="admin_attendance-admin_attendance-main-click"]');
    await expect(retry).toBeVisible();
    const recoveredRead = page.waitForResponse((response) =>
      response.request().resourceType() !== 'document' &&
      response.url().includes('/admin/attendance/records') && response.status() === 200
    );
    await retry.click();
    await recoveredRead;
    await expect(retry).toHaveCount(0);
    await expect(page.locator('[data-testid^="admin_attendance-admin_attendance-table-status-"], [data-testid="admin_attendance-admin_attendance-empty-state-state"]').first()).toBeVisible();
  });
});
