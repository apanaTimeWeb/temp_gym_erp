import { expect, test } from '@playwright/test';

const billingRoutes = [
  { label: 'SaaS Billing', href: '/frontend_superadmin/superadmin_billing/billing_plans_management' },
  { label: 'Invoices', href: '/frontend_superadmin/superadmin_billing/billing_invoices_management' },
  { label: 'Coupons', href: '/frontend_superadmin/superadmin_billing/billing_coupons_management' },
  { label: 'Usage Meters', href: '/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard' },
] as const;

test.describe('Superadmin Billing — secondary navigation', () => {
  test('shows all four billing leaves and marks the current leaf active', async ({ page }) => {
    await page.goto(billingRoutes[1].href);
    const navigation = page.getByTestId('superadmin-domain-secondary-navigation-billing');
    await expect(navigation).toBeVisible();

    for (const route of billingRoutes) {
      await expect(navigation.getByRole('link', { name: route.label })).toHaveAttribute('href', route.href);
    }
    await expect(navigation.getByRole('link', { name: 'Invoices' })).toHaveAttribute('aria-current', 'page');
    await expect(navigation.getByRole('link', { name: 'SaaS Billing' })).not.toHaveAttribute('aria-current', 'page');
  });

  test('navigates between all four existing billing leaves without changing their URLs', async ({ page }) => {
    for (const route of billingRoutes) {
      await page.goto(route.href);
      const navigation = page.getByTestId('superadmin-domain-secondary-navigation-billing');
      await expect(navigation).toBeVisible();
      await expect(navigation.getByRole('link', { name: route.label })).toHaveAttribute('aria-current', 'page');
      await expect(page).toHaveURL(new RegExp(`${route.href.replaceAll('/', '\\/')}(?:$|[?#])`));
    }
  });
});
