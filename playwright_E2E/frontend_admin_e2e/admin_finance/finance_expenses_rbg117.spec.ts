// HOST-ONLY SPEC: Authoring is not evidence of execution against authenticated production.
import { test, expect } from '@playwright/test';
test('Expenses date filter and expense list remain accessible after navigation', async ({page}) => {
  await page.goto('/frontend_admin/admin_finance/finance_expenses?range=custom&startDate=2026-02-30&endDate=2026-03-01');
  await expect(page.getByTestId('admin_finance-admin_finance-date-filter-custom-range')).toBeVisible();
  await expect(page.getByTestId('finance-overview-finance-overview-date-filter-dropdown-admin-finance-custom-start-date')).toHaveAttribute('aria-invalid','true');
});
