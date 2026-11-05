import { afterEach, describe, expect, it } from 'vitest';
import { displaySuperadminInvoiceValue, formatSuperadminInvoiceDate } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/utils/SuperadminBillingInvoicesManagementDisplayUtils';


const originalTimezone = process.env.TZ;
afterEach(() => { process.env.TZ = originalTimezone; });

describe('invoice display utilities', () => {
  it('uses a stable fallback for nullish and blank values without hiding zero', () => {
    expect(displaySuperadminInvoiceValue(null)).toBe('—');
    expect(displaySuperadminInvoiceValue('   ')).toBe('—');
    expect(displaySuperadminInvoiceValue(0)).toBe('0');
  });
  it('preserves date-only calendar days independently of UTC offset', () => {
    process.env.TZ = 'America/Los_Angeles';
    expect(formatSuperadminInvoiceDate('2026-10-01', 'en')).toBe('Oct 1, 2026');
  });
  it('formats dates with date-fns and safely falls back for invalid dates', () => {
    expect(formatSuperadminInvoiceDate('2026-10-01T00:00:00Z', 'en')).toBe('Oct 1, 2026');
    expect(formatSuperadminInvoiceDate('invalid', 'en')).toBe('—');
  });
});
