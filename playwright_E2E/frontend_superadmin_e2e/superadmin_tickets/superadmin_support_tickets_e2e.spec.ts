import { expect, test } from '@playwright/test';

const route = '/frontend_superadmin/superadmin_support/support_tickets_management';
const search = 'superadmin_support_tickets-superadmin-tickets-header-tickets-header-filter-1';
const filterToggle = 'superadmin_support_tickets-superadmin-tickets-header-header-filter-2-1';

test.describe('Superadmin Support Tickets', () => {
  test('loads the ticket table and search surface', async ({ page }) => {
    const pageErrors: string[] = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));
    await page.goto(route);
    await expect(page.getByRole('heading', { name: /support tickets/i })).toBeVisible();
    await expect(page.getByTestId(search)).toBeVisible();
    await expect(page.getByTestId('superadmin_support_tickets-superadmin-tickets-main-page-ready')).toBeVisible();
    await expect(page.locator('nextjs-portal')).toHaveCount(0);
    expect(pageErrors).toEqual([]);
  });

  test('filters the visible ticket list from the search control', async ({ page }) => {
    await page.goto(route);
    const searchInput = page.getByTestId(search);
    await expect(searchInput).toBeVisible();
    await searchInput.fill('E2E no-match ticket');
    await expect(searchInput).toHaveValue('E2E no-match ticket');
    await page.getByTestId(filterToggle).click();
    await expect(page.getByLabel(/status/i)).toBeVisible();
  });
});
