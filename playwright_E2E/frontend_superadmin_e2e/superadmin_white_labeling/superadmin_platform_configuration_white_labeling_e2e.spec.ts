import { expect, test } from '@playwright/test';

const route = '/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings';
const ready = 'superadmin_platform_configuration_white_labeling-superadmin-white-labeling-main-page-ready';
const search = 'superadmin_platform_configuration_white_labeling-superadmin-white-labeling-main-superadmin-white-labeling-search';
const status = 'superadmin_platform_configuration_white_labeling-superadmin-white-labeling-main-superadmin-white-labeling-status';

test.describe('Superadmin White Labeling', () => {
  test('loads the domain management surface and filter controls', async ({ page }) => {
    const pageErrors: string[] = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));
    await page.goto(route);
    await expect(page.getByRole('heading', { name: /white labeling.*domains/i })).toBeVisible();
    await expect(page.getByTestId(ready)).toBeVisible();
    await expect(page.getByTestId(status)).toBeVisible();
    await expect(page.locator('nextjs-portal')).toHaveCount(0);
    expect(pageErrors).toEqual([]);
  });

  test('updates search and status filter controls without mutating domain status', async ({ page }) => {
    await page.goto(route);
    const searchInput = page.getByTestId(search);
    const statusSelect = page.getByTestId(status);
    await expect(searchInput).toBeVisible();
    await searchInput.fill('example.test');
    await expect(searchInput).toHaveValue('example.test');
    await statusSelect.selectOption({ index: 0 });
    await expect(statusSelect).toBeVisible();
  });
});
