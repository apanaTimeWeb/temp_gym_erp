import { SUPERADMIN_INVOICE_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/constants/superadmin_billing_invoices_management.constants';
import type { SaaSInvoice } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/types/superadmin_billing_invoices_management.types';

export interface SuperadminInvoiceCurrencyMetrics {
  totalRevenue: number;
  failedRevenue: number;
  pendingRevenue: number;
}

/** Currency amounts are never summed across different ISO currency codes. */
export function calculateSuperadminInvoiceMetrics(invoices: SaaSInvoice[]) {
  const byCurrency: Record<string, SuperadminInvoiceCurrencyMetrics> = {};
  let overdueCount = 0;
  for (const invoice of invoices) {
    const currency = invoice.currency;
    const metrics = byCurrency[currency] ??= { totalRevenue: 0, failedRevenue: 0, pendingRevenue: 0 };
    const amount = Number.isFinite(invoice.amount) ? invoice.amount : 0;
    if (invoice.status === SUPERADMIN_INVOICE_STATUS_CODES.PAID) metrics.totalRevenue += amount;
    if (invoice.status === SUPERADMIN_INVOICE_STATUS_CODES.FAILED) metrics.failedRevenue += amount;
    if (invoice.status === SUPERADMIN_INVOICE_STATUS_CODES.PENDING) metrics.pendingRevenue += amount;
    if (invoice.status === SUPERADMIN_INVOICE_STATUS_CODES.OVERDUE) overdueCount += 1;
  }
  return { totalsByCurrency: byCurrency, overdueCount };
}
