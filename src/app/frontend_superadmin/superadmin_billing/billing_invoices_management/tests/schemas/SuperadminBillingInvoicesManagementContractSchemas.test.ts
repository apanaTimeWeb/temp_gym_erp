import { describe, expect, it } from 'vitest';

import { CreateManualPaymentDtoSchema, SuperadminBillingInvoicesCurrencyCodeSchema, isSupportedCurrencyCodeFallback } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/schemas/superadmin_billing_invoices_management_contract.schemas';

describe('SuperadminBillingInvoicesCurrencyCodeSchema', () => {
  it.each(['INR', 'USD', 'EUR', 'JPY'])('accepts supported ISO currency code %s', (currency) => {
    expect(SuperadminBillingInvoicesCurrencyCodeSchema.safeParse(currency).success).toBe(true);
  });

  it.each(['inr', 'ZZZ', 'ABC', 'US', '', '12A'])('rejects unsupported or malformed currency code %s', (currency) => {
    expect(SuperadminBillingInvoicesCurrencyCodeSchema.safeParse(currency).success).toBe(false);
  });
});


describe('CreateManualPaymentDtoSchema amount units', () => {
  it('preserves the existing positive major-unit request contract until the backend DTO is supplied', () => {
    const result = CreateManualPaymentDtoSchema.parse({ gymId: 'gym-1', amount: 4999.95, planName: 'Gold', currency: 'INR' });
    expect(result.amount).toBe(4999.95);
    expect(result.currency).toBe('INR');
  });

  it('rejects zero, negative, and non-finite amounts', () => {
    for (const amount of [0, -1, 1.005, Number.NaN, Number.POSITIVE_INFINITY]) {
      expect(CreateManualPaymentDtoSchema.safeParse({ gymId: 'gym-1', amount, planName: 'Gold', currency: 'INR' }).success).toBe(false);
    }
  });
});

describe('currency validation fallback', () => {
  it('uses Intl.DisplayNames when supportedValuesOf is unavailable', () => {
    expect(isSupportedCurrencyCodeFallback('INR')).toBe(true);
    expect(isSupportedCurrencyCodeFallback('ZZZ')).toBe(false);
    expect(isSupportedCurrencyCodeFallback('ABC')).toBe(false);
  });
});
