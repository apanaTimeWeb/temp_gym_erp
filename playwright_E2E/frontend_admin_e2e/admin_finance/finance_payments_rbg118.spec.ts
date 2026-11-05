// HOST-ONLY: requires running authenticated host; authored here, not executed.
import { test, expect } from '@playwright/test';
test('Payments invalid custom dates are accessible and do not create invalid input bounds', async ({page}) => {
  await page.goto('/frontend_admin/admin_finance/finance_payments?range=custom&startDate=2026-02-30&endDate=2026-03-01');
  await expect(page.getByTestId('admin_finance-admin_finance-date-filter-custom-range')).toBeVisible();
  const start=page.locator('#admin-finance-custom-start-date');
  const end=page.locator('#admin-finance-custom-end-date');
  await expect(start).toHaveAttribute('aria-invalid','true');
  await expect(end).not.toHaveAttribute('min','2026-02-30');
});
