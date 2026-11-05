// RESPONSIBILITY: Defines regression tests for AdminSubscriptionsManagementPaginateInvoices.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_subscription_invoices/tests/utils/AdminSubscriptionsManagementPaginateInvoices.test.ts)

import { ADMIN_SUBSCRIPTIONS_INVOICE_STATUS_VALUES } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/constants/AdminBillingSubscriptionInvoicesConstants';
import { describe, expect, it } from 'vitest';
import { paginateAdminBillingSubscriptionInvoices } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/utils/AdminBillingSubscriptionInvoicesPaginateInvoices';
import type { Invoice } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/types/AdminBillingSubscriptionInvoicesTypes';

describe('paginateAdminBillingSubscriptionInvoices', () => {
  it('returns stable page metadata and distinct invoice pages', () => {
    const invoices = Array.from({ length: 11 }, (_, index) => ({
      id: `inv-${index}`,
      invoiceNo: `INV-${index}`,
      date: '2026-01-01',
      dueDate: '2026-01-07',
      amount: 1000,
      status: ADMIN_SUBSCRIPTIONS_INVOICE_STATUS_VALUES.PAID,
      planName: 'Growth',
      billingCycle: 'monthly',
      pdfUrl: 'data:application/pdf;base64,JVBERi0xLjQKJUVPRg==',
    } satisfies Invoice));

    const first = paginateAdminBillingSubscriptionInvoices(invoices, 1, 10);
    const second = paginateAdminBillingSubscriptionInvoices(invoices, 2, 10);

    expect(first.items).toHaveLength(10);
    expect(second.items).toHaveLength(1);
    expect(first.hasNextPage).toBe(true);
    expect(second.hasPrevPage).toBe(true);
    expect(first.items[0]?.id).not.toBe(second.items[0]?.id);
  });

  it('normalizes malformed and unsafe page/limit inputs without non-finite metadata', () => {
    const invoices = Array.from({ length: 18 }, (_, i) => ({ id: `inv-${i}` } as Invoice));
    for (const bad of [NaN, Infinity, -Infinity, 0, -2, 1.5, Number.MAX_SAFE_INTEGER + 1]) {
      const pagination = paginateAdminBillingSubscriptionInvoices(invoices, bad, bad);
      expect(pagination.page).toBe(1);
      expect(pagination.limit).toBe(10);
      expect(pagination.items).toHaveLength(10);
      expect(pagination.totalPages).toBe(2);
      expect(Number.isSafeInteger(pagination.totalPages)).toBe(true);
    }
    const capped = paginateAdminBillingSubscriptionInvoices(invoices, 2, 999999);
    expect(capped.limit).toBe(10);
    expect(capped.items).toHaveLength(8);
    expect(capped.hasPrevPage).toBe(true);
    const small = paginateAdminBillingSubscriptionInvoices(invoices, 1, 3);
    expect(small.limit).toBe(3);
    expect(small.totalPages).toBe(6);
  });
});
