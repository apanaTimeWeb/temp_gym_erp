// RESPONSIBILITY: Defines regression tests for admin_coupons_e2e.spec; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (frontend_admin_e2e/admin_coupons/billing_coupons_management.spec.ts)
import { test, expect } from '@playwright/test';

/** Module-owned UI workflow test. Runtime execution requires the host app and a real authenticated state. */
test.describe('billing_coupons_management', () => {
  test('coupon creation opens a form and preserves safe cancel behavior', async ({ page }) => {
    if (!process.env.PLAYWRIGHT_AUTH_STATE) {
      if (process.env.CI) throw new Error('CI requires PLAYWRIGHT_AUTH_STATE pointing to a host-generated authenticated storage-state file.');
      test.skip(true, 'Host-authenticated storage state is required; provide PLAYWRIGHT_AUTH_STATE.');
    }
    await page.goto('/frontend_admin/admin_billing/billing_coupons_management', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/frontend_admin\/admin_billing\/billing_coupons_management(?:\?.*)?$/);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    await page.locator('[data-testid="admin_coupons-admin_coupons-toolbar-click"]').click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.locator('form')).toBeVisible();
    await expect(dialog.locator('input').first()).toBeVisible();
    const cancel = dialog.locator('[data-testid="admin_coupons-admin_coupons-modal-click-4"]');
    await expect(cancel).toBeVisible();
    await cancel.click();
    await expect(dialog).toHaveCount(0);
  });
});
