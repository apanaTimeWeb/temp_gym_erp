import { expect, test } from '@playwright/test';

const route = '/frontend_superadmin/superadmin_team';
const ready = 'superadmin_team-superadmin-team-main-page-ready';
const checkbox = 'superadmin_team-superadmin-team-roles-and-alert-preferences-panel-alert-preferences-panel-checkbox';

test.describe('Superadmin Team', () => {
  test('loads team information and alert preferences', async ({ page }) => {
    const pageErrors: string[] = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));
    await page.goto(route);
    await expect(page.getByTestId(ready)).toBeVisible();
    await expect(page.getByTestId(checkbox).first()).toBeVisible();
    await expect(page.locator('nextjs-portal')).toHaveCount(0);
    expect(pageErrors).toEqual([]);
  });

  test('allows alert preference draft changes without saving implicitly', async ({ page }) => {
    await page.goto(route);
    await expect(page.getByTestId(ready)).toBeVisible();
    const preference = page.getByTestId(checkbox).first();
    const original = await preference.isChecked();
    await preference.setChecked(!original);
    if (original) await expect(preference).not.toBeChecked();
    else await expect(preference).toBeChecked();
    await expect(page.getByRole('button', { name: /save preferences/i })).toBeVisible();
  });
});
