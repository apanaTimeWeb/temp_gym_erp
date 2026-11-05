import { expect, test } from '@playwright/test';

const route = '/frontend_superadmin/superadmin_gyms/gyms_directory?view=add';
const readyId = 'superadmin_gyms-superadmin-gyms-add-gym-form-add-gym-form-link';
const controlId = 'superadmin_gyms-superadmin-gyms-add-gym-form-add-gym-gym-name';

test.describe('Superadmin Add Gym — feature-specific E2E', () => {
  test('renders the owning feature surface without client or Next.js errors', async ({ page }) => {
    const pageErrors: string[] = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));
    await page.goto(route);
    await expect(page).toHaveURL(/frontend_superadmin\/superadmin_gyms\?view=add/);
    await expect(page.getByTestId(readyId)).toBeVisible();
    await expect(page.locator('nextjs-portal')).toHaveCount(0);
    expect(pageErrors).toEqual([]);
  });

  test('verifies the feature-owned primary control instead of a generic page container', async ({ page }) => {
    await page.goto(route);
    await expect(page.getByTestId(readyId)).toBeVisible();
    const control = page.getByTestId(controlId);
    await expect(control).toBeVisible();
    await control.fill('e2e-filter-value');
    await expect(control).toHaveValue('e2e-filter-value');
  });
});
