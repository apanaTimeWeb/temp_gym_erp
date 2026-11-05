import { SUPERADMIN_INVOICE_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/constants/superadmin_billing_invoices_management.constants';
import type { SaaSInvoice } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/types/superadmin_billing_invoices_management.types';

export type SuperadminBillingInvoicesAgingBucketName = 'Not Yet Due' | '0-30 Days' | '31-60 Days' | '60+ Days';
export interface SuperadminBillingInvoicesAgingBucket {
  amountByCurrency: Record<string, number>;
  count: number;
  invoices: SaaSInvoice[];
}
export type SuperadminBillingInvoicesAgingBuckets = Record<SuperadminBillingInvoicesAgingBucketName, SuperadminBillingInvoicesAgingBucket>;

function localCalendarDate(value: string, label: string): Date {
  const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  const date = dateOnly
    ? new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]))
    : new Date(value);
  if (!Number.isFinite(date.getTime()) || (dateOnly && (date.getFullYear() !== Number(dateOnly[1]) || date.getMonth() + 1 !== Number(dateOnly[2]) || date.getDate() !== Number(dateOnly[3])))) throw new RangeError(`${label} is invalid.`);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function calendarDayOrdinal(date: Date): number {
  return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000);
}

/** Uses local calendar days for date-time instants and preserves date-only ISO calendar values as entered. */
export function calculateSuperadminBillingInvoicesAging(invoices: SaaSInvoice[], now = new Date()): { agingBuckets: SuperadminBillingInvoicesAgingBuckets; totalUnpaidByCurrency: Record<string, number> } {
  const today = localCalendarDate(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`, 'Current date');
  const buckets: SuperadminBillingInvoicesAgingBuckets = {
    'Not Yet Due': { amountByCurrency: {}, count: 0, invoices: [] },
    '0-30 Days': { amountByCurrency: {}, count: 0, invoices: [] },
    '31-60 Days': { amountByCurrency: {}, count: 0, invoices: [] },
    '60+ Days': { amountByCurrency: {}, count: 0, invoices: [] },
  };
  const totalUnpaidByCurrency: Record<string, number> = {};
  for (const invoice of invoices) {
    if (invoice.status === SUPERADMIN_INVOICE_STATUS_CODES.PAID) continue;
    const amount = Number.isFinite(invoice.amount) ? invoice.amount : 0;
    const currency = invoice.currency;
    totalUnpaidByCurrency[currency] = (totalUnpaidByCurrency[currency] ?? 0) + amount;
    const dueDate = localCalendarDate(invoice.dueDate, `Invoice ${invoice.id} due date`);
    const diffDays = calendarDayOrdinal(today) - calendarDayOrdinal(dueDate);
    const bucketName: SuperadminBillingInvoicesAgingBucketName = (() => { if (diffDays <= 0) { return ('Not Yet Due'); } if (diffDays <= 30) { return ('0-30 Days'); } if (diffDays <= 60) { return ('31-60 Days'); } return ('60+ Days'); })();
    const bucket = buckets[bucketName];
    bucket.amountByCurrency[currency] = (bucket.amountByCurrency[currency] ?? 0) + amount;
    bucket.count += 1;
    bucket.invoices.push(invoice);
  }
  return { agingBuckets: buckets, totalUnpaidByCurrency };
}
