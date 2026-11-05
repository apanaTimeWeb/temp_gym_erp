import { expect, test } from '@playwright/test';

const route = '/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management';
const readyId = 'superadmin_platform_configuration_integrations-superadmin-integrations-main-page-ready';
const controlId = 'superadmin_platform_configuration_integrations-webhooks-developer-access-panel';

test.describe('Superadmin Integrations — feature-specific E2E', () => {
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
    await expect(page.getByTestId(controlId)).toBeVisible();
  });
});
