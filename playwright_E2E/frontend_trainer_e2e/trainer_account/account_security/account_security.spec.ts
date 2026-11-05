// HOST E2E: requires a configured authenticated trainer storage-state and a running Next.js host.
import { test, expect } from '@playwright/test';
const base = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';
const route = '/frontend_trainer/trainer_account/account_security';
test.describe('trainer_account/account_security', () => {
  test('canonical trainer route mounts without a Next.js error', async ({page}) => {
    await page.goto(`${base}${route}`);
    await expect(page).toHaveURL(new RegExp(route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    await expect(page.locator('#trainer-main-content')).toBeVisible();
    await expect(page.locator('body')).not.toContainText(/Application error|Internal Server Error/i);
  });
  test('has a visible role shell on a small viewport', async ({page}) => {
    await page.setViewportSize({width:390,height:844});
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.goto(`${base}${route}`);
    await expect(page.locator('#trainer-sidebar')).toBeAttached();
    await expect(page.locator('#trainer-main-content')).toBeVisible();
  });
});

// Negative API transport fixtures are test-scoped and do not claim a production auth redirect.
for (const [status, code] of [[403, 'FORBIDDEN'], [401, 'UNAUTHORIZED']] as const) {
  test(`security screen handles HTTP ${status} without exposing sensitive form data`, async ({ page }) => {
    await page.route('**/trainer/profile*', async (route) => {
      await route.fulfill({
        status, contentType: 'application/json',
        body: JSON.stringify({ success: false, requestId: `test-${status}`, data: null, message: 'Request denied', errorCode: code, statusCode: status }),
      });
    });
    await page.goto(`${base}${route}`);
    // Host auth middleware may redirect before client API is called; both outcomes remain safe.
    if (page.url().includes(route)) {
      await expect(page.getByRole('alert')).toBeVisible();
      await expect(page.getByTestId('trainer_profile-main-password_submit')).toHaveCount(0);
    } else {
      await expect(page).not.toHaveURL(new RegExp(`${route}$`));
    }
  });
}
