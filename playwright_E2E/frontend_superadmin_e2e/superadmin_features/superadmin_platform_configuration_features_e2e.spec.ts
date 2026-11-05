import { expect, test } from '@playwright/test';

const route = '/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management';
const readyId = 'superadmin_platform_configuration_features-superadmin-features-main-page-ready';
const searchId = 'superadmin_platform_configuration_features-superadmin-features-flags-panel-flags-panel-search-input';

test.describe('Superadmin Features — user-visible workflows', () => {
  test('renders the owning feature surface without client or Next.js errors', async ({ page }) => {
    const pageErrors: string[] = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));
    await page.goto(route);
    await expect(page.getByTestId(readyId)).toBeVisible();
    await expect(page.locator('nextjs-portal')).toHaveCount(0);
    expect(pageErrors).toEqual([]);
  });

  test('feature search changes the actual visible flag list and can be cleared', async ({ page }) => {
    await page.goto(route);
    await expect(page.getByTestId(readyId)).toBeVisible();
    const search = page.getByTestId(searchId);
    const flagArticles = page.locator('[aria-labelledby="superadmin_platform_configuration_features-flags-title"] article');
    await expect(search).toBeVisible();
    await expect.poll(() => flagArticles.count()).toBeGreaterThan(0);
    const initialFlagCount = await flagArticles.count();
    await search.fill('e2e-no-matching-feature-flag');
    await expect(page.getByTestId('superadmin_platform_configuration_features-superadmin-features-flags-panel-flags-panel-empty-state')).toBeVisible();
    await expect(flagArticles).toHaveCount(0);
    await search.fill('');
    await expect.poll(() => flagArticles.count()).toBe(initialFlagCount);
  });

  test('feature metadata editor opens for the selected feature and can be dismissed', async ({ page }) => {
    await page.goto(route);
    await expect(page.getByTestId(readyId)).toBeVisible();
    const flagArticle = page.locator('[aria-labelledby="superadmin_platform_configuration_features-flags-title"] article').first();
    await expect(flagArticle).toBeVisible();
    await flagArticle.getByRole('button', { name: /edit feature metadata/i }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('textbox').first()).toBeVisible();
    await dialog.getByRole('button', { name: /cancel|close/i }).click();
    await expect(dialog).toHaveCount(0);
  });

  test('release note can be created and then deleted through confirmation', async ({ page }) => {
    const unique = Date.now().toString();
    const title = `E2E release note ${unique}`;
    await page.goto(route);
    await expect(page.getByTestId(readyId)).toBeVisible();
    await page.getByTestId('superadmin_platform_configuration_features-header-tab-notes').click();
    await page.getByTestId('superadmin_platform_configuration_features-superadmin-features-release-notes-panel-notes-panel-version-input').fill(`v9.${unique.slice(-4)}.0`);
    await page.getByTestId('superadmin_platform_configuration_features-superadmin-features-release-notes-panel-notes-panel-title-input').fill(title);
    await page.getByTestId('superadmin_platform_configuration_features-superadmin-features-release-notes-panel-notes-panel-content-input').fill('End-to-end test note for the delete workflow.');
    await page.getByTestId('superadmin_platform_configuration_features-superadmin-features-release-notes-panel-release-notes-panel-submit').click();
    const publishDialog = page.getByRole('dialog').last();
    await expect(publishDialog).toBeVisible();
    await publishDialog.getByRole('button', { name: /publish/i }).click();
    const note = page.getByRole('article').filter({ hasText: title });
    await expect(note).toBeVisible();
    await note.getByRole('button', { name: new RegExp(`delete release note for ${title}`, 'i') }).click();
    const deleteDialog = page.getByRole('dialog').last();
    await expect(deleteDialog).toBeVisible();
    await deleteDialog.getByRole('button', { name: /delete/i }).click();
    await expect(note).toHaveCount(0);
  });
});
