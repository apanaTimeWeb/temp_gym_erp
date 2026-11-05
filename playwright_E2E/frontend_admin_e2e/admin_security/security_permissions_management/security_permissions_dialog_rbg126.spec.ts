// RBG126 host-only regression: does not claim backend authorization or role enforcement.
import { test, expect } from '@playwright/test';

test.describe('Security permissions confirmation focus', () => {
  test('permission confirmation traps keyboard focus and Escape cancels without PATCH', async ({ page }) => {
    if (!process.env.PLAYWRIGHT_AUTH_STATE) {
      if (process.env.CI) throw new Error('PLAYWRIGHT_AUTH_STATE is mandatory for authenticated E2E in CI.');
      test.skip(true, 'Requires a real authenticated host and permissions fixture');
    }
    let writes = 0;
    await page.route('**/admin/permissions/**', async route => {
      if (route.request().method() === 'PATCH') writes++;
      await route.continue();
    });
    await page.goto('/frontend_admin/admin_security/security_permissions_management');
    const toggle = page.locator('[data-testid^="admin_permissions-admin_permissions-staff-overrides-toggle-"]').first();
    await expect(toggle).toBeVisible();
    await toggle.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    const cancel = dialog.locator('[data-admin-dialog-cancel="true"]');
    await expect(cancel).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(dialog.getByRole('button').last()).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(toggle).toBeFocused();
    expect(writes).toBe(0);
  });
});
