import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { SUPERADMIN_BILLING_INVOICES_MANAGEMENT_API } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/config/superadmin_billing_invoices_management.url_config';
import { MOCK_SUPERADMIN_BILLING_INVOICES } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/mocks/fixtures/SuperadminBillingInvoicesManagementMockFixtures';
import { superadminInvoicesHandlers, resetSuperadminBillingInvoicesMockState } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/mocks/handlers/SuperadminBillingInvoicesManagementMockHandlers';


const server = setupServer(...superadminInvoicesHandlers);
const listUrl = `http://localhost${SUPERADMIN_BILLING_INVOICES_MANAGEMENT_API.BASE}?page=1&limit=100`;
const paymentUrl = `http://localhost${SUPERADMIN_BILLING_INVOICES_MANAGEMENT_API.MANUAL_PAYMENT}`;
const paymentBody = { gymId: 't1', amount: 1000, planName: 'Pro', currency: 'INR' };

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => { server.resetHandlers(); resetSuperadminBillingInvoicesMockState(); });
afterAll(() => server.close());
beforeEach(() => resetSuperadminBillingInvoicesMockState());

async function createManualPayment(key: string, body = paymentBody) {
  return fetch(paymentUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Idempotency-Key': key },
    body: JSON.stringify(body),
  });
}

describe('Superadmin invoices MSW idempotency and reset', () => {
  it('replays the same payment intent without adding a duplicate invoice', async () => {
    const before = await (await fetch(listUrl)).json() as { meta: { total: number } };
    const firstResponse = await createManualPayment('manual-payment-intent-1');
    const first = await firstResponse.json() as { data: { id: string; amount: number } };
    const replayResponse = await createManualPayment('manual-payment-intent-1');
    const replay = await replayResponse.json() as { data: { id: string; amount: number } };
    const after = await (await fetch(listUrl)).json() as { data: Array<{ id: string }>; meta: { total: number } };

    expect(firstResponse.ok).toBe(true);
    expect(replayResponse.ok).toBe(true);
    expect(replay.data.id).toBe(first.data.id);
    expect(first.data.amount).toBe(100000); // Mock response uses integer paise; request remains major-unit pending backend DTO.
    expect(after.meta.total).toBe(before.meta.total + 1);
    expect(after.data.filter((invoice) => invoice.id === first.data.id)).toHaveLength(1);
  });

  it('rejects reusing an idempotency key for a different payment intent', async () => {
    await createManualPayment('manual-payment-intent-conflict');
    const response = await createManualPayment('manual-payment-intent-conflict', { ...paymentBody, amount: 2000 });
    expect(response.status).toBe(409);
  });

  it('resets mutable invoice data and idempotency records to the fixtures', async () => {
    await createManualPayment('manual-payment-reset');
    resetSuperadminBillingInvoicesMockState();
    const response = await fetch(listUrl);
    const body = await response.json() as { data: Array<{ id: string }>; meta: { total: number } };
    expect(body.meta.total).toBe(MOCK_SUPERADMIN_BILLING_INVOICES.length);
    expect(body.data.some((invoice) => invoice.id.startsWith('inv') && !MOCK_SUPERADMIN_BILLING_INVOICES.some((fixture) => fixture.id === invoice.id))).toBe(false);
  });
});
