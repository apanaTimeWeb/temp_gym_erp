import { expect, test } from '@playwright/test';

const route = '/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure';
const ready = 'superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-main-page';
const refresh = 'superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-header-superadmin_system_ops_infrastructure-header-refresh';

test.describe('Superadmin System Ops Infrastructure', () => {
  test('loads the infrastructure view without a framework error overlay', async ({ page }) => {
    const pageErrors: string[] = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));
    await page.goto(route);
    await expect(page).toHaveURL(/frontend_superadmin\/superadmin_system_ops\/system_ops_infrastructure/);
    await expect(page.getByRole('heading', { name: /server infrastructure/i })).toBeVisible();
    await expect(page.getByTestId(ready)).toBeVisible();
    await expect(page.locator('nextjs-portal')).toHaveCount(0);
    expect(pageErrors).toEqual([]);
  });

  test('legacy infrastructure view redirects to the standalone leaf', async ({ page }) => {
    await page.goto('/frontend_superadmin/superadmin_system_ops/system_ops_overview?view=infrastructure');
    await expect(page).toHaveURL(/system_ops_infrastructure/);
    await expect(page.getByTestId(ready)).toBeVisible();
  });

  test('exposes and executes the non-destructive metrics refresh control', async ({ page }) => {
    await page.goto(route);
    await expect(page.getByTestId(ready)).toBeVisible();
    const refreshButton = page.getByTestId(refresh);
    await expect(refreshButton).toBeVisible();
    await expect(refreshButton).toBeEnabled();
    await refreshButton.click();
    await expect(page.getByTestId(ready)).toBeVisible();
  });
});
