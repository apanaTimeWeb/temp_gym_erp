import { expect, test } from '@playwright/test';

const route = '/frontend_superadmin/superadmin_account/account_profile_overview';
const readyId = 'superadmin_account_profile-superadmin-profile-main-page-ready';
const controlId = 'superadmin_account_profile-profile-profile-main-tab-security';

test.describe('Superadmin My Profile — feature-specific E2E', () => {
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
    await control.click();
    await expect(page.getByRole('heading', { name: /security/i })).toBeVisible();
  });
});
