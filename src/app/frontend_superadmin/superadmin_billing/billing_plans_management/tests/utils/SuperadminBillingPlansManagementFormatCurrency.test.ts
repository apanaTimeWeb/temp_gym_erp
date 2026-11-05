import { describe, expect, it } from 'vitest';

import { formatCurrency } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/utils/SuperadminBillingPlansManagementFormatCurrency';



describe('SuperadminBillingPlansFormatCurrency', () => {
  it('converts minor units to localized currency text', () => {
    expect(formatCurrency(12500, 'INR', 'en-IN')).toContain('125.00');
  });
});


describe('three-decimal currencies', () => {
  it('preserves all three minor-unit decimal places for KWD and BHD', () => {
    expect(formatCurrency(12345, 'KWD', 'en-US')).toContain('12.345');
    expect(formatCurrency(12345, 'BHD', 'en-US')).toContain('12.345');
  });
});
