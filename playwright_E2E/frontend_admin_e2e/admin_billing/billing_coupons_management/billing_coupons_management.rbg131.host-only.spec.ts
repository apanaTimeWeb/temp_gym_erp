// HOST-ONLY: requires an authenticated tenant with seeded coupon records and Next.js/Playwright.
// RBG131 authoring only; never run or claim pass without the real host and backend.
import { test, expect } from '@playwright/test';
test('coupon query remains stable after a search and browser history navigation', async ({ page }) => {
  await page.goto('/frontend_admin/admin_billing/billing_coupons_management?tab=overview');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.goto('/frontend_admin/admin_billing/billing_coupons_management?search=promo&status=all&tab=overview');
  await expect(page).toHaveURL(/search=promo/);
  await page.goBack();
  await expect(page).not.toHaveURL(/(?:\?|&)search=promo(?:&|$)/);
  await expect(page).toHaveURL(/tab=overview/);
});
