import { describe, expect, it } from 'vitest';

import { SuperadminBillingCouponsWhatsAppReceiptFormatter } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/utils/SuperadminBillingCouponsManagementWhatsappReceiptFormatter';

describe('SuperadminBillingCouponsWhatsappReceiptFormatter', () => {
  it('formats the canonical receipt sections deterministically', () => {
    const output = SuperadminBillingCouponsWhatsAppReceiptFormatter({
      title: 'Test Receipt',
      sections: [{ title: 'Payment', items: { Total: 'INR 100', Status: 'PAID' } }],
    });

    expect(output).toContain('Test Receipt');
    expect(output).toContain('Total: INR 100');
    expect(output).toContain('Status: PAID');
  });
});
