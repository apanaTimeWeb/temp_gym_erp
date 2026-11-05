import { expect, test } from '@playwright/test';

const route = '/superadmin/gyms/tenant-001';
const readyId = 'superadmin_gyms-superadmin-gyms-gym-detail-main-page-ready';
const controlId = 'superadmin_gyms-superadmin-gyms-gym-detail-main-gym-detail-main-button';

test.describe('Superadmin Gym — feature-specific E2E', () => {
  test('renders the owning feature surface without client or Next.js errors', async ({ page }) => {
    const pageErrors: string[] = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));
    await page.goto(route);
    await expect(page).toHaveURL(/frontend_superadmin\/superadmin_gyms\?view=detail.*gymId=tenant-001/);
    await expect(page.getByTestId(readyId)).toBeVisible();
    await expect(page.locator('nextjs-portal')).toHaveCount(0);
    expect(pageErrors).toEqual([]);
  });

  test('verifies the feature-owned primary control instead of a generic page container', async ({ page }) => {
    await page.goto(route);
    await expect(page.getByTestId(readyId)).toBeVisible();
    await expect(page.getByTestId(controlId)).toBeVisible();
  });
});
