import { expect, test } from '@playwright/test';

// Requires an authenticated, integrated host environment. No mock backend contract invented.
const route = '/frontend_superadmin/superadmin_analytics/analytics_reports_cancellations';

test.describe('superadmin_analytics_reports_cancellations: independent feature route', () => {
  test.skip(!process.env.E2E_STORAGE_STATE && process.env.E2E_AUTH_SETUP !== 'true', 'Provide authenticated host session');

  test('loads the own route without client-side exceptions', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(route);
    await expect(page).toHaveURL(new RegExp('superadmin_analytics/analytics_reports_cancellations'));
    await expect(page.locator('main, [role="main"]')).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('shows the independently owned feature surface', async ({ page }) => {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('link', { name: /./ }).first()).toBeVisible();
  });
});
