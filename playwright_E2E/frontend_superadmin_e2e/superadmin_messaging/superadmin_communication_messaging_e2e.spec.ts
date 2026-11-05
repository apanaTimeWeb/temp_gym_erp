import { expect, test } from '@playwright/test';

const route = '/frontend_superadmin/superadmin_communication/communication_messaging_center';
const readyId = 'superadmin_communication_messaging-superadmin-messaging-main-page-ready';
const controlId = 'superadmin_communication_messaging-superadmin-messaging-main-superadmin_communication_messaging-main-compose';

test.describe('Superadmin Tenant Messaging — feature-specific E2E', () => {
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
