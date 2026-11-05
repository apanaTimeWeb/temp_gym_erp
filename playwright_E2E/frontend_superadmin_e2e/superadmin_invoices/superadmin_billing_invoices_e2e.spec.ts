import { expect, test } from '@playwright/test';

const route = '/frontend_superadmin/superadmin_billing/billing_invoices_management';
const readyId = 'superadmin_billing_invoices-superadmin-invoices-main-page-ready';
const hostAuthConfigured = Boolean(process.env.E2E_BASE_URL && (process.env.E2E_STORAGE_STATE || process.env.E2E_AUTH_SETUP === 'true'));

test.describe('Superadmin Invoices — feature-specific E2E', () => {
  test('renders the owning feature surface without client or Next.js errors', async ({ page }) => {
    test.skip(!hostAuthConfigured, 'Requires the integrated host URL and an approved authenticated E2E storage state.');
    const pageErrors: string[] = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));
    await page.goto(route);
    await expect(page.getByTestId(readyId)).toBeVisible();
    await expect(page.locator('nextjs-portal')).toHaveCount(0);
    expect(pageErrors).toEqual([]);
  });

  test('records a manual payment only after confirmation and refreshes the invoice list', async ({ page }) => {
    test.skip(!hostAuthConfigured, 'Requires the integrated host URL and an approved authenticated E2E storage state.');

    const tenant = { id: 'tenant-e2e', name: 'E2E Billing Gym', plan: 'Pro' };
    const initialInvoices = [{
      id: 'inv-e2e-existing', tenantId: tenant.id, tenantName: tenant.name, amount: 10000,
      currency: 'INR', status: 'PENDING', issuedAt: '2026-10-01T00:00:00.000Z',
      dueDate: '2026-10-31T00:00:00.000Z', invoiceType: 'RECURRING', planName: tenant.plan,
    }];
    let invoices = [...initialInvoices];
    let paymentRequestCount = 0;
    let capturedIdempotencyKey: string | undefined;
    let capturedPayment: { gymId: string; amount: number; planName: string; currency?: string } | undefined;

    await page.route('**/superadmin/gyms', async (routeHandler) => {
      await routeHandler.fulfill({
        status: 200,
        contentType: 'application/json',
        json: { success: true, message: 'Success', data: [tenant] },
      });
    });

    await page.route('**/superadmin/saas-billing/invoices/manual-payment', async (routeHandler) => {
      paymentRequestCount += 1;
      capturedIdempotencyKey = routeHandler.request().headers()['idempotency-key'];
      capturedPayment = routeHandler.request().postDataJSON() as typeof capturedPayment;
      const createdInvoice = {
        id: 'inv-e2e-created', tenantId: tenant.id, tenantName: tenant.name, amount: 499900,
        currency: 'INR', status: 'PAID', issuedAt: '2026-10-14T00:00:00.000Z',
        dueDate: '2026-10-14T00:00:00.000Z', paidAt: '2026-10-14T00:00:00.000Z',
        paymentMethod: 'Manual', invoiceType: 'ONE_TIME', planName: tenant.plan,
      };
      invoices = [createdInvoice, ...invoices];
      await routeHandler.fulfill({
        status: 200,
        contentType: 'application/json',
        json: { success: true, message: 'Payment recorded', data: createdInvoice },
      });
    });

    await page.route('**/superadmin/saas-billing/invoices**', async (routeHandler) => {
      const url = new URL(routeHandler.request().url());
      if (url.pathname.endsWith('/manual-payment')) {
        await routeHandler.fallback();
        return;
      }
      const search = (url.searchParams.get('search') ?? '').toLowerCase();
      const status = url.searchParams.get('status');
      const filtered = invoices.filter((invoice) => {
        const matchesSearch = !search || invoice.tenantName.toLowerCase().includes(search) || invoice.id.toLowerCase().includes(search);
        const matchesStatus = !status || status === 'ALL' || invoice.status === status;
        return matchesSearch && matchesStatus;
      });
      const pageNumber = Math.max(1, Number(url.searchParams.get('page')) || 1);
      const limit = Math.max(1, Number(url.searchParams.get('limit')) || 10);
      await routeHandler.fulfill({
        status: 200,
        contentType: 'application/json',
        json: { success: true, message: 'Success', data: filtered.slice((pageNumber - 1) * limit, pageNumber * limit), meta: { total: filtered.length, page: pageNumber, limit, totalPages: Math.ceil(filtered.length / limit) } },
      });
    });

    await page.goto(route);
    await expect(page.getByTestId(readyId)).toBeVisible();
    await page.getByTestId('superadmin_billing_invoices-superadmin-invoices-header-header-log-manual-payment').click();
    await expect(page.getByTestId('superadmin_billing_invoices-log-payment-dialog')).toBeVisible();
    await page.getByTestId('superadmin_billing_invoices-superadmin-invoices-log-payment-modal-modal-superadmin-invoices-gym').click();
    await page.getByRole('option', { name: /E2E Billing Gym/ }).click();
    await page.getByTestId('superadmin_billing_invoices-superadmin-invoices-log-payment-modal-superadmin-invoices-payment-amount').fill('4999');
    await page.getByTestId('superadmin_billing_invoices-superadmin-invoices-log-payment-modal-log-payment-modal-submit').click();

    // The manual-payment hook must ask for confirmation before it sends the mutation.
    const confirmPayment = page.getByRole('button', { name: 'Record Payment', exact: true });
    await expect(confirmPayment).toBeVisible();
    expect(paymentRequestCount).toBe(0);
    await confirmPayment.click();

    await expect.poll(() => paymentRequestCount).toBe(1);
    expect(capturedIdempotencyKey).toBeTruthy();
    expect(capturedPayment).toMatchObject({ gymId: tenant.id, amount: 4999, planName: tenant.plan, currency: 'INR' });
    await expect(page.getByText('inv-e2e-created')).toBeVisible();
    await expect(page.getByText('Payment recorded')).toBeVisible();
  });
});
