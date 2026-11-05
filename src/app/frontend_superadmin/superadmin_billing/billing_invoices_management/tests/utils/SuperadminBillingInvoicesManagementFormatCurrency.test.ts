import { describe, expect, it } from 'vitest';
import { toMinorCurrencyUnits } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/utils/SuperadminBillingInvoicesManagementFormatCurrency';
import { formatCurrency } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/utils/SuperadminBillingInvoicesManagementFormatCurrency';

describe('SuperadminBillingInvoicesFormatCurrency', () => {
  it('formats two-decimal currency amounts from minor units', () => {
    expect(formatCurrency(5000, 'INR', 'en-IN')).toBe('₹50.00');
    expect(formatCurrency(5000, 'USD', 'en-US')).toBe('$50.00');
  });
  it('formats zero-decimal currency amounts without applying a 100x divisor', () => {
    expect(formatCurrency(1234, 'JPY', 'en-US')).toBe('¥1,234');
    expect(formatCurrency(1234, 'KRW', 'en-US')).toBe('₩1,234');
  });
  it('formats three-decimal currency amounts using their actual exponent', () => {
    expect(formatCurrency(1234, 'KWD', 'en-US')).toBe('KWD 1.234');
    expect(formatCurrency(1234, 'JOD', 'en-US')).toBe('JOD 1.234');
  });
  it('uses an en dash for non-finite monetary amounts', () => {
    expect(formatCurrency(Number.NaN, 'INR', 'en-IN')).toBe('—');
  });
});

describe('toMinorCurrencyUnits', () => {
  it('converts major units using the ISO currency exponent', () => {
    expect(toMinorCurrencyUnits(4999.95, 'INR')).toBe(499995);
    expect(toMinorCurrencyUnits(12, 'JPY')).toBe(12);
    expect(toMinorCurrencyUnits(12.345, 'KWD')).toBe(12345);
  });
  it('rejects unsafe or over-precision values', () => {
    expect(() => toMinorCurrencyUnits(1.001, 'INR')).toThrow(RangeError);
    expect(() => toMinorCurrencyUnits(Number.MAX_VALUE, 'INR')).toThrow(RangeError);
  });
});
