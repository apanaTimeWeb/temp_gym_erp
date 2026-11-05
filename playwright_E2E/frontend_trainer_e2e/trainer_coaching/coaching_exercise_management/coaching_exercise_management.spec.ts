// HOST E2E: requires a configured authenticated trainer storage-state and a running Next.js host.
import { test, expect } from '@playwright/test';
const base = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';
const route = '/frontend_trainer/trainer_coaching/coaching_exercise_management';
test.describe('trainer_coaching/coaching_exercise_management', () => {
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
