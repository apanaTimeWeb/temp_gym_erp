import { expect, test } from '@playwright/test';

const route = '/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard';
const ready = 'superadmin_billing_usage_meters-superadmin-usage-meters-main-page-ready';
const dateRange = 'superadmin_billing_usage_meters-superadmin-usage-meters-main-date-range';
const invalidRange = 'superadmin_billing_usage_meters-invalid-date-range';
const fromDate = 'superadmin_billing_usage_meters-superadmin-usage-meters-main-usage-meters-main-date';
const toDate = 'superadmin_billing_usage_meters-superadmin-usage-meters-main-meters-main-date-2';

async function selectCustomRange(page: import('@playwright/test').Page) {
  await page.getByTestId(dateRange).click();
  await page.getByText('Custom Range', { exact: true }).click();
}

test.describe('Superadmin Usage Meters', () => {
  test('loads usage meters and date-range controls', async ({ page }) => {
    const pageErrors: string[] = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));
    await page.goto(route);
    await selectCustomRange(page);
    await page.getByTestId(fromDate).fill('2026-09-01');
    await page.getByTestId(toDate).fill('2026-10-31');
    await expect(page.getByRole('heading', { name: /usage meters/i })).toBeVisible();
    await expect(page.getByTestId(ready)).toBeVisible();
    await expect(page.locator('nextjs-portal')).toHaveCount(0);
    expect(pageErrors).toEqual([]);
  });

  test('selects custom range, keeps controls available for correction, and accepts a valid interval', async ({ page }) => {
    await page.goto(route);
    await selectCustomRange(page);

    const from = page.getByTestId(fromDate);
    const to = page.getByTestId(toDate);
    await expect(from).toBeVisible();
    await expect(to).toBeVisible();
    await expect(page.getByLabel('From date')).toBeVisible();
    await expect(page.getByLabel('To date')).toBeVisible();

    await from.fill('2026-01-31');
    await to.fill('2026-01-01');
    await expect(page.getByTestId(invalidRange)).toBeVisible();
    await expect(from).toBeVisible();
    await expect(to).toBeVisible();

    await to.fill('2026-02-01');
    await expect(page.getByTestId(invalidRange)).toHaveCount(0);
    await expect(from).toHaveValue('2026-01-31');
    await expect(to).toHaveValue('2026-02-01');
  });
});
