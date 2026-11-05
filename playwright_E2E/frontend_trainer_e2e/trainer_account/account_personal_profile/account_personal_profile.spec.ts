// HOST E2E: requires a configured authenticated trainer storage-state and a running Next.js host.
import { test, expect } from '@playwright/test';
const base = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';
const route = '/frontend_trainer/trainer_account/account_personal_profile';
test.describe('trainer_account/account_personal_profile', () => {
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
// Security is a separately owned route; do not target the retired combined-profile tab.
test('dedicated Security route exposes its password workflow', async ({ page }) => {
  await page.goto(`${base}/frontend_trainer/trainer_account/account_security`);
  await expect(page).toHaveURL(/\/frontend_trainer\/trainer_account\/account_security/);
  await expect(page.getByRole('heading', { name: /security/i })).toBeVisible();
});

// Requires an authenticated host with the profile form loaded and the production confirm provider.
test('dirty profile rejects unapproved programmatic same-origin navigation', async ({ page }) => {
  await page.goto(`${base}${route}`);
  const name = page.locator('#trainer-profile-name');
  await expect(name).toBeVisible();
  await name.fill(`${await name.inputValue()} Edited`);
  await page.evaluate(() => window.history.pushState({}, '', '/frontend_trainer/trainer_account/account_security'));
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('dialog').getByRole('button').first().click();
  await expect(name).toHaveValue(/Edited$/);
});
