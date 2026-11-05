// HOST-ONLY P&L date range regression. Authenticated Next.js host required; NOT EXECUTED in this package.
import { test, expect } from '@playwright/test';
test.describe('Finance Profit and Loss Report dates', () => {
  test.beforeEach(() => test.skip(!process.env.PLAYWRIGHT_AUTH_STATE, 'Requires authenticated host and fixtures'));
  test('rejects invalid February date and accepts leap date', async ({ page }) => {
    await page.goto('/frontend_admin/admin_finance/finance_profit_and_loss_report?range=custom&startDate=2026-02-30&endDate=2026-03-01');
    await expect(page.getByTestId('reports-analytics-reports-analytics-date-filter-dropdown-status-region')).toHaveClass(/text-danger/);
    await page.goto('/frontend_admin/admin_finance/finance_profit_and_loss_report?range=custom&startDate=2028-02-29&endDate=2028-03-01');
    await expect(page.getByTestId('reports-analytics-reports-analytics-date-filter-dropdown-status-region')).toHaveClass(/text-secondary/);
  });
  test('moves to leap day with PageUp without losing keyboard focus', async ({ page }) => {
    await page.goto('/frontend_admin/admin_finance/finance_profit_and_loss_report?range=custom&startDate=2028-03-31');
    await page.getByTestId('admin-finance-pnl-date-range-trigger').click();
    await page.getByTestId('admin-finance-pnl-calendar-day-2028-03-31').press('PageUp');
    await expect(page.getByRole('grid', { name: /February 2028/i })).toBeVisible();
    await expect(page.getByTestId('admin-finance-pnl-calendar-day-2028-02-29')).toBeFocused();
  });
});
