// RESPONSIBILITY: Defines regression tests for admin_sales_e2e.spec; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (frontend_admin_e2e/admin_sales/admin_sales_e2e.spec.ts)
import { test, expect } from '@playwright/test';

function requireHostAuth() {
  if (!process.env.PLAYWRIGHT_AUTH_STATE) {
    if (process.env.CI) throw new Error('CI requires PLAYWRIGHT_AUTH_STATE pointing to a host-generated authenticated storage-state file.');
    test.skip(true, 'Host-authenticated storage state is required; provide PLAYWRIGHT_AUTH_STATE.');
  }
}

test.describe('admin_sales', () => {
  test('search URL updates immediately while API query uses the debounced value', async ({ page }) => {
    requireHostAuth();
    const requestedSearches: string[] = [];
    page.on('request', (request) => {
      const url = new URL(request.url());
      if (url.pathname.startsWith('/admin/sales/')) requestedSearches.push(url.searchParams.get('search') ?? '');
    });
    await page.goto('/frontend_admin/admin_sales', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/frontend_admin\/admin_sales\/sales_overview(?:\?.*)?$/);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    const search = page.locator('#admin-sales-capability-search');
    await expect(search).toBeVisible();
    const beforeFill = requestedSearches.length;
    await search.fill('E2E-filter-query');
    await expect(search).toHaveValue('E2E-filter-query');
    await expect(page).toHaveURL(/search=E2E-filter-query/);
    await page.waitForTimeout(150);
    expect(requestedSearches.slice(beforeFill).filter((value) => value === 'E2E-filter-query')).toHaveLength(0);
    await expect.poll(() => requestedSearches.slice(beforeFill).filter((value) => value === 'E2E-filter-query').length).toBeGreaterThan(0);
    await page.locator('nav a[href="/frontend_admin/admin_sales/sales_memberships"]').click();
    await expect(page).toHaveURL(/\/frontend_admin\/admin_sales\/sales_memberships(?:\?.*)?$/);
    await expect(page.getByRole('heading', { level: 1, name: /memberships/i })).toBeVisible();
  });
});
