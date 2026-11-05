// HOST-ONLY regression: run in authenticated Next.js with seeded report data. NOT executed in isolated source package.
import { test, expect } from '@playwright/test';
test.describe('Finance revenue report calendar', () => {
  test.beforeEach(() => test.skip(!process.env.PLAYWRIGHT_AUTH_STATE, 'Authenticated host/fixtures required'));
  test('shows an invalid date range instead of accepting February 30', async ({ page }) => {
    await page.goto('/frontend_admin/admin_finance/finance_revenue_report?range=custom&startDate=2026-02-30&endDate=2026-03-01');
    await expect(page.getByTestId('admin-finance-revenue-date-range-status')).toHaveClass(/text-danger/);
  });
  test('preserves keyboard month navigation and accessible calendar focus', async ({ page }) => {
    await page.goto('/frontend_admin/admin_finance/finance_revenue_report?range=custom&startDate=2028-03-31');
    await page.getByTestId('admin-finance-revenue-date-range-trigger').click();
    await page.getByTestId('admin-finance-revenue-calendar-day-2028-03-31').press('PageUp');
    await expect(page.getByRole('grid', { name: /February 2028/i })).toBeVisible();
    await expect(page.getByTestId('admin-finance-revenue-calendar-day-2028-02-29')).toBeFocused();
  });
});
