import {describe, expect, it, beforeEach} from 'vitest';

import { MOCK_INVOICE_TENANTS, MOCK_SUPERADMIN_BILLING_INVOICES } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/mocks/fixtures/SuperadminBillingInvoicesManagementMockFixtures';
import { resetSuperadminBillingInvoicesMockState } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/mocks/handlers/SuperadminBillingInvoicesManagementMockHandlers';



beforeEach(() => {
  resetSuperadminBillingInvoicesMockState();
});

describe('Superadmin Invoices module fixture contract', () => {
  it('provides the minimum fixture contract required by the module data flow', () => {
    const tenantIds = MOCK_INVOICE_TENANTS.map((tenant) => tenant.id);
    const uniqueTenantIds = new Set(tenantIds);
    expect(MOCK_INVOICE_TENANTS.every((tenant) => Boolean(tenant.id && tenant.name && tenant.plan))).toBe(true);
    expect(uniqueTenantIds.size).toBe(tenantIds.length);
    expect(MOCK_SUPERADMIN_BILLING_INVOICES.every((invoice) => uniqueTenantIds.has(invoice.tenantId))).toBe(true);
  });

});
