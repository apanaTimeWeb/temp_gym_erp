// Host-only Playwright smoke regression: requires authenticated running Next.js host. NOT executed in this source archive.
import {test,expect} from '@playwright/test';
test.describe('Finance Summary date filter',()=>{
 test.beforeEach(()=>test.skip(!process.env.PLAYWRIGHT_AUTH_STATE,'Authenticated host/fixtures required'));
 test('marks impossible custom dates invalid, then permits canonical leap dates',async({page})=>{
  await page.goto('/frontend_admin/admin_finance/finance_summary?range=custom&startDate=2026-02-30&endDate=2026-03-01');
  await expect(page.getByTestId('finance-overview-finance-overview-date-filter-dropdown-admin-finance-custom-end-date')).toHaveAttribute('aria-invalid','true');
  await page.goto('/frontend_admin/admin_finance/finance_summary?range=custom&startDate=2028-02-29&endDate=2028-03-01');
  await expect(page.getByTestId('finance-overview-finance-overview-date-filter-dropdown-admin-finance-custom-end-date')).toHaveAttribute('min','2028-02-29');
 });
});
