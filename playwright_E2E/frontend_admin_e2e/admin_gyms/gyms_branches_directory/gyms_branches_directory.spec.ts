// RESPONSIBILITY: Defines regression tests for admin_branches_e2e.spec; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (frontend_admin_e2e/admin_branches/gyms_branches_directory.spec.ts)
import { test, expect } from '@playwright/test';

/** Module-owned UI workflow test. Runtime execution requires the host app and a real authenticated state. */
test.describe('gyms_branches_directory', () => {
  test('branch metrics open detail when records exist and show a real empty state otherwise', async ({ page }) => {
    if (!process.env.PLAYWRIGHT_AUTH_STATE) {
      if (process.env.CI) throw new Error('CI requires PLAYWRIGHT_AUTH_STATE pointing to a host-generated authenticated storage-state file.');
      test.skip(true, 'Host-authenticated storage state is required; provide PLAYWRIGHT_AUTH_STATE.');
    }
    await page.goto('/frontend_admin/admin_gyms/gyms_branches_directory', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/frontend_admin\/admin_gyms\/gyms_branches_directory(?:\?.*)?$/);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    const emptyState = page.locator('[data-testid^="admin_branches-admin_branches-empty-state"]');
    const revenueAction = page.locator('[data-testid^="admin_branches-admin_branches-card-control-2-map42-"]').first();
    if (await emptyState.count()) {
      await expect(emptyState).toBeVisible();
      await expect(revenueAction).toHaveCount(0);
      return;
    }
    await expect(revenueAction).toBeVisible();
    await revenueAction.click();
    await expect(page.locator('[data-testid^="admin_branches-admin_branches-detail-drawer-control-2"]')).toBeVisible();
  });
});
