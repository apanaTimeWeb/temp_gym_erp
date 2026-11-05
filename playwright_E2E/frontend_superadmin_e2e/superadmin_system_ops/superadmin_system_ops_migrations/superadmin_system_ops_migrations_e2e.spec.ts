import { expect, test } from '@playwright/test';

const route = '/frontend_superadmin/superadmin_system_ops/system_ops_migrations';
const versionInput = 'superadmin_system_ops_migrations-superadmin-system-ops-migrations-main-superadmin_system_ops_migrations-migrations-main-version';
const rolloutButton = 'superadmin_system_ops_migrations-superadmin-system-ops-migrations-main-migrations-main-action-1';
const validation = 'superadmin_system_ops_migrations-superadmin-system-ops-migrations-main-superadmin_system_ops_migrations-migrations-main-validation';

test.describe('Superadmin System Ops Migrations', () => {
  test.beforeEach(() => {
    test.skip(!process.env.E2E_BASE_URL || (!process.env.E2E_STORAGE_STATE && process.env.E2E_AUTH_SETUP !== 'true'), 'Requires the integrated host URL and either an authenticated storage state or configured real auth setup.');
  });
  test('loads the schema rollouts surface and version control', async ({ page }) => {
    const pageErrors: string[] = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));
    await page.goto(route);
    await expect(page).toHaveURL(/frontend_superadmin\/superadmin_system_ops\?view=migrations/);
    await expect(page.getByRole('heading', { name: /schema rollouts/i })).toBeVisible();
    await expect(page.getByTestId(versionInput)).toBeVisible();
    await expect(page.locator('nextjs-portal')).toHaveCount(0);
    expect(pageErrors).toEqual([]);
  });

  test('requires a target schema version before making a rollout request', async ({ page }) => {
    let rolloutRequests = 0;
    page.on('request', (request) => {
      if (request.method() === 'POST' && /migration|rollout/i.test(request.url())) rolloutRequests += 1;
    });
    await page.goto(route);
    const input = page.getByTestId(versionInput);
    await input.fill('');
    await page.getByTestId(rolloutButton).click();
    await expect(page.getByTestId(validation)).toBeVisible();
    expect(rolloutRequests).toBe(0);
  });
});
