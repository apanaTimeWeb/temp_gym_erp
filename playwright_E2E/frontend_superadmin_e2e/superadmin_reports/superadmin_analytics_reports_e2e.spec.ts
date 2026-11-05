import { expect, test } from '@playwright/test';

const route = '/frontend_superadmin/superadmin_analytics/analytics_reports_center';
const readyId = 'superadmin_analytics_reports-superadmin-reports-main-page-ready';
const controlId = 'superadmin_analytics_reports-superadmin-reports-main-main-report-start-date';

test.describe('Superadmin Reports — feature-specific E2E', () => {
  test('renders the owning feature surface without client or Next.js errors', async ({ page }) => {
    const pageErrors: string[] = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));
    await page.goto(route);
    await expect(page.getByTestId(readyId)).toBeVisible();
    await expect(page.locator('nextjs-portal')).toHaveCount(0);
    expect(pageErrors).toEqual([]);
  });

  test('verifies the feature-owned primary control instead of a generic page container', async ({ page }) => {
    await page.goto(route);
    await expect(page.getByTestId(readyId)).toBeVisible();
    const control = page.getByTestId(controlId);
    await expect(control).toBeVisible();
    await control.fill('2026-02-14');
    await expect(control).toHaveValue('2026-02-14');
  });
});
