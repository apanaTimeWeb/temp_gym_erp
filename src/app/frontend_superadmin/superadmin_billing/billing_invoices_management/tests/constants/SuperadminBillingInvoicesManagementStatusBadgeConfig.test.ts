import { describe, expect, it } from 'vitest';

import { getSuperadminBillingInvoicesStatusBadgeClasses } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/constants/superadmin_billing_invoices_management_status_badge_config.constants';



describe('getSuperadminBillingInvoicesStatusBadgeClasses', () => {
  it('maps the documented status to semantic design tokens', () => {
    expect(getSuperadminBillingInvoicesStatusBadgeClasses('PAID')).toContain('bg-success-bg');
  });
  it('falls back safely for an unknown status', () => {
    expect(getSuperadminBillingInvoicesStatusBadgeClasses('UNKNOWN_STATUS')).toContain('bg-input');
  });
});
