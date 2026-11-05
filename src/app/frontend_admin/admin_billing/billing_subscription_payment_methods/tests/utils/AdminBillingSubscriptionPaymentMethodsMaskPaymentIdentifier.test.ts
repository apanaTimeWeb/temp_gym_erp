// RESPONSIBILITY: Defines regression tests for AdminSubscriptionsManagementMaskPaymentIdentifier.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_subscription_payment_methods/tests/utils/AdminSubscriptionsManagementMaskPaymentIdentifier.test.ts)

import { describe, expect, it } from 'vitest';
import { maskAdminSubscriptionsUpiIdentifier } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/utils/AdminBillingSubscriptionPaymentMethodsMaskPaymentIdentifier';

describe('UPI identifier masking', () => {
  it('retains a short local hint and bank domain without exposing the full identifier', () => {
    const value = maskAdminSubscriptionsUpiIdentifier('maaz.ahmad@bank');
    expect(value).toBe('ma••••••••@bank');
    expect(value).not.toContain('maaz.ahmad');
  });
  it('uses a safe placeholder for missing or malformed identifiers', () => {
    expect(maskAdminSubscriptionsUpiIdentifier(undefined)).toBe('—');
    expect(maskAdminSubscriptionsUpiIdentifier('invalid')).toBe('••••');
  });
});
