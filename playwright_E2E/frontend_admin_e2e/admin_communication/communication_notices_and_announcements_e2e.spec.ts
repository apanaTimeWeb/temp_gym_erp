// RESPONSIBILITY: Defines regression tests for communication_notices_and_announcements_e2e.spec; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (frontend_admin_e2e/admin_communication/communication_notices_and_announcements_e2e.spec.ts)
import { test, expect } from '@playwright/test';

/** Module-owned UI workflow test. Runtime execution requires the host app and a real authenticated state. */
test.describe('Communication notices and announcements', () => {
  test('announcement creation dialog opens and can be dismissed', async ({ page }) => {
    if (!process.env.PLAYWRIGHT_AUTH_STATE) {
      if (process.env.CI) throw new Error('CI requires PLAYWRIGHT_AUTH_STATE pointing to a host-generated authenticated storage-state file.');
      test.skip(true, 'Host-authenticated storage state is required; provide PLAYWRIGHT_AUTH_STATE.');
    }
    await page.goto('/frontend_admin/admin_communication/communication_notices_and_announcements', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/frontend_admin\/admin_communication\/communication_notices_and_announcements(?:\?.*)?$/);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    const opener = page.locator('[data-testid="admin_announcements-admin_announcements-main-click"]');
    await expect(opener).toBeVisible();
    await opener.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.locator('form')).toBeVisible();
    await expect(dialog.locator('input, textarea, select').first()).toBeVisible();
    const close = dialog.locator('button[data-testid="admin_announcements-admin_announcements-modal-click-2"]');
    await expect(close).toBeVisible();
    await close.click();
    await expect(dialog).toHaveCount(0);
  });
});
