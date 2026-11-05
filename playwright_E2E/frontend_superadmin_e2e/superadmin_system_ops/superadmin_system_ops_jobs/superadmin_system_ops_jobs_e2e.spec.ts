import { expect, test } from '@playwright/test';

const route = '/frontend_superadmin/superadmin_system_ops/system_ops_jobs';
const statusFilter = 'superadmin_system_ops_jobs-superadmin-system-ops-jobs-header-superadmin_system_ops_jobs-header-SearchableDropdown-50';
const queueFilter = 'superadmin_system_ops_jobs-superadmin-system-ops-jobs-header-superadmin_system_ops_jobs-header-SearchableDropdown-54';

test.describe('Superadmin System Ops Jobs', () => {
  test('loads the jobs view and its primary actions', async ({ page }) => {
    const pageErrors: string[] = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));
    await page.goto(route);
    await expect(page).toHaveURL(/frontend_superadmin\/superadmin_system_ops\?view=jobs/);
    await expect(page.getByRole('heading', { name: /background jobs/i })).toBeVisible();
    await expect(page.getByTestId(statusFilter)).toBeVisible();
    await expect(page.getByTestId(queueFilter)).toBeVisible();
    await expect(page.getByRole('button', { name: /retry all failed/i })).toBeVisible();
    await expect(page.locator('nextjs-portal')).toHaveCount(0);
    expect(pageErrors).toEqual([]);
  });

  test('provides queue and status filtering controls without triggering a mutation', async ({ page }) => {
    await page.goto(route);
    const status = page.getByTestId(statusFilter);
    const queue = page.getByTestId(queueFilter);
    await expect(status).toBeVisible();
    await expect(queue).toBeVisible();
    await status.click();
    await expect(status).toBeVisible();
    await page.keyboard.press('Escape');
    await queue.click();
    await expect(queue).toBeVisible();
    await page.keyboard.press('Escape');
  });
});
