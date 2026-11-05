// HOST E2E: requires a configured authenticated trainer storage-state and a running Next.js host.
import { test, expect } from '@playwright/test';
const base = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';
const route = '/frontend_trainer/trainer_dashboard/dashboard_overview';
test.describe('trainer_dashboard/dashboard_overview', () => {
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

// 320–1920px responsive matrix required by global web design/architecture DoD.
for (const width of [320, 375, 425, 768, 1024, 1440, 1920]) {
  test(`dashboard viewport ${width}px does not cause window horizontal scrolling`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(`${base}${route}`);
    await expect(page.locator('#trainer-main-content')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, `Viewport ${width}px overflows by ${overflow}px`).toBeLessThanOrEqual(1);
    await expect(page.locator('body')).not.toContainText(/Application error|Internal Server Error/i);
  });
}
