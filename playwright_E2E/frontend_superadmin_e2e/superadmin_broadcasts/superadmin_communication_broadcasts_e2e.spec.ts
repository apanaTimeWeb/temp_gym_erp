import { expect, test } from '@playwright/test';

const route = '/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns';
const readyId = 'superadmin_communication_broadcasts-superadmin-broadcasts-main-page-ready';
const controlId = 'superadmin_communication_broadcasts-superadmin-broadcasts-header-superadmin-broadcasts-header-text';

test.describe('Superadmin Announcements.*Broadcasts — feature-specific E2E', () => {
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
    await control.fill('e2e-filter-value');
    await expect(control).toHaveValue('e2e-filter-value');
  });
});
