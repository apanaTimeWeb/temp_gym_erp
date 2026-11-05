import { describe, expect, it } from 'vitest';

import { getSuperadminBillingInvoicesPresetRange } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/utils/SuperadminBillingInvoicesManagementDateRangeUtils';

describe('getSuperadminBillingInvoicesPresetRange', () => {
  const now = new Date(2026, 8, 20);
  it('uses month-to-date and rolling three/six month windows', () => {
    expect(getSuperadminBillingInvoicesPresetRange('this_month', now)).toEqual({ from: '2026-09-01', to: '2026-09-20' });
    expect(getSuperadminBillingInvoicesPresetRange('last_3_months', now)).toEqual({ from: '2026-06-20', to: '2026-09-20' });
    expect(getSuperadminBillingInvoicesPresetRange('last_6_months', now)).toEqual({ from: '2026-03-20', to: '2026-09-20' });
  });
  it('clamps rolling month subtraction when the prior month has fewer days', () => {
    expect(getSuperadminBillingInvoicesPresetRange('last_3_months', new Date(2026, 4, 31))).toEqual({ from: '2026-02-28', to: '2026-05-31' });
  });
});
