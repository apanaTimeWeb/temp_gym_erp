// RESPONSIBILITY: Defines regression tests for admin_plans_e2e.spec; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (frontend_admin_e2e/admin_plans/billing_plans_catalog.spec.ts)
import { test, expect } from '@playwright/test';

/** Module-owned UI workflow test. Runtime execution requires the host app and a real authenticated state. */
test.describe('billing_plans_catalog', () => {
  test('plan creation validates required fields and can be cancelled', async ({ page }) => {
    if (!process.env.PLAYWRIGHT_AUTH_STATE) {
      if (process.env.CI) throw new Error('CI requires PLAYWRIGHT_AUTH_STATE pointing to a host-generated authenticated storage-state file.');
      test.skip(true, 'Host-authenticated storage state is required; provide PLAYWRIGHT_AUTH_STATE.');
    }
    await page.goto('/frontend_admin/admin_billing/billing_plans_catalog', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/frontend_admin\/admin_billing\/billing_plans_catalog(?:\?.*)?$/);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    await page.locator('[data-testid="admin_plans-admin_plans-toolbar-click-2"]').click();
    const dialog = page.getByRole('dialog', { name: /plan/i });
    await expect(dialog).toBeVisible();
    await expect(dialog.locator('#admin_plans-name')).toBeVisible();
    const cancel = dialog.locator('[data-testid="admin_plans-admin_plans-modal-click"]');
    await expect(cancel).toBeVisible();
    await cancel.click();
    await expect(dialog).toHaveCount(0);
  });
});
