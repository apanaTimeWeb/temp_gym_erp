import { expect, test } from '@playwright/test';

const route = '/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview';

test.describe('Superadmin Global Audit — feature-specific E2E', () => {
  test('renders the owning feature surface without client or Next.js errors', async ({ page }) => {
    const pageErrors: string[] = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));
    await page.goto(route);
    await expect(page.getByTestId('superadmin-global-audit-ready')).toBeVisible();
    await expect(page.locator('nextjs-portal')).toHaveCount(0);
    expect(pageErrors).toEqual([]);
  });

  test('search filters actual audit rows and an unmatched term resolves to an empty state', async ({ page }) => {
    await page.goto(route);
    await expect(page.getByTestId('superadmin-global-audit-ready')).toBeVisible();
    const search = page.getByTestId('superadmin-global-audit-search');
    await search.fill('DELETED_MEMBER');
    await expect(page.getByText('DELETED_MEMBER')).toBeVisible();
    await expect(page.locator('tbody tr')).toHaveCount(1);
    await search.fill('no-such-audit-action-8391');
    await expect(page.getByText('No audit logs match your search.')).toBeVisible();
    await expect(page.locator('tbody tr')).toHaveCount(0);
  });
});
