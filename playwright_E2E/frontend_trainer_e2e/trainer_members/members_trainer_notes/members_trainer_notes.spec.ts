// HOST E2E: requires a configured authenticated trainer storage-state and a running Next.js host.
import { test, expect } from '@playwright/test';
const base = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';
const route = '/frontend_trainer/trainer_members/members_trainer_notes';
test.describe('trainer_members/members_trainer_notes', () => {
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
// Draft protection across module-local navigation; requires host auth and mock member fixture.
test('dirty note shows confirmation before navigating to Members Directory', async ({ page }) => {
  await page.goto(`${base}${route}?id=MEM-001`);
  const editor = page.locator('#trainer-notes-text');
  await expect(editor).toBeVisible();
    await editor.fill('An unsaved trainer note');
    await page.locator('a[href*="members_directory_and_profile"]').click();
    await expect(page.getByRole('alertdialog')).toBeVisible();
    await page.getByRole('alertdialog').getByRole('button').first().click();
    await expect(editor).toHaveValue('An unsaved trainer note');
});

// Host browser checkpoint; unlike source-only checks, this must run with real Next.js routing.
test('dirty note prevents programmatic same-origin navigation without consent', async ({ page }) => {
  await page.goto(`${base}${route}?id=MEM-001`);
  const editor = page.locator('#trainer-notes-text');
  await expect(editor).toBeVisible();
  await editor.fill('A draft requiring navigation confirmation');
  await page.evaluate(() => window.history.pushState({}, '', '/frontend_trainer/trainer_members/members_directory_and_profile'));
  await expect(page.getByRole('alertdialog')).toBeVisible();
  await page.getByRole('alertdialog').getByRole('button').first().click();
  await expect(editor).toHaveValue('A draft requiring navigation confirmation');
});
