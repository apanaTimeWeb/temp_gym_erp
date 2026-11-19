import { describe, expect, it } from 'vitest';
import { maskAdminSubscriptionsUpiIdentifier } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/utils/AdminBillingSubscriptionPaymentMethodsMaskPaymentIdentifier';
import { paginateAdminSubscriptionsInvoices } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/utils/AdminBillingSubscriptionPaymentMethodsPaginateInvoices';

describe('payment identifiers and bounded invoice metadata', () => {
  it('never displays the complete local part of a short UPI identifier', () => {
    expect(maskAdminSubscriptionsUpiIdentifier('x@bank')).not.toContain('x@');
    expect(maskAdminSubscriptionsUpiIdentifier('ab@bank')).not.toContain('ab@');
    expect(maskAdminSubscriptionsUpiIdentifier('alex@bank')).toMatch(/^al•+@bank$/);
  });
  it('bounds large or malformed pages and page sizes consistently', () => {
    const records = Array.from({ length: 7 }, (_, index) => ({ id: String(index) })) as never[];
    const large = paginateAdminSubscriptionsInvoices(records, 999999, 2);
    expect(large.page).toBe(4); expect(large.items).toHaveLength(1); expect(large.hasNextPage).toBe(false);
    const invalid = paginateAdminSubscriptionsInvoices(records, Number.NaN, Infinity);
    expect(invalid.page).toBe(1); expect(invalid.limit).toBe(10);
    const oversized = paginateAdminSubscriptionsInvoices(records, 1, 999999);
    expect(oversized.limit).toBe(100);
  });
});
