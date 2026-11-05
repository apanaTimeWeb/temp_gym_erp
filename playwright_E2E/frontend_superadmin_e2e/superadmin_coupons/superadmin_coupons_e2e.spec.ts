import { expect, test } from '@playwright/test';

const route = '/frontend_superadmin/superadmin_billing/billing_coupons_management';
const readyId = 'superadmin_coupons-superadmin-coupons-main-page-ready';
const controlId = 'superadmin_coupons-superadmin-coupons-header-coupons-header-create-coupon';

test.describe('Superadmin Coupons — feature-specific E2E', () => {
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
    await page.getByTestId(controlId).click();
    await expect(page.getByRole('dialog')).toBeVisible();
  });
});
