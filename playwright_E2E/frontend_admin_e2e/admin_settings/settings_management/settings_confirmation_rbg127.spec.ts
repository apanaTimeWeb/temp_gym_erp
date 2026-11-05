// HOST-ONLY RBG127 regression; requires real authenticated Next.js app and settings API fixtures.
import { test, expect } from '@playwright/test';
test.describe('Settings payment confirmation', () => {
  test('Escape cancels the confirmation without issuing a settings update', async ({ page }) => {
    if (!process.env.PLAYWRIGHT_AUTH_STATE) {
      if (process.env.CI) throw new Error('Authenticated Playwright storage state is mandatory in CI.');
      test.skip(true, 'Authenticated host and payment settings fixtures are required');
    }
    let mutationCount = 0;
    await page.route('**/admin/settings/updateSettings*', async (route) => {
      if (route.request().method() !== 'GET') mutationCount += 1;
      await route.continue();
    });
    await page.goto('/frontend_admin/admin_settings/settings_management?tab=payment');
    const save = page.locator('[data-testid="admin_settings-admin_settings-payment-gateway-submit-2"]');
    await expect(save).toBeVisible();
    await save.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    const cancel = dialog.locator('[data-admin-dialog-cancel="true"]');
    await expect(cancel).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(dialog.getByRole('button').last()).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(save).toBeFocused();
    expect(mutationCount).toBe(0);
  });
});
