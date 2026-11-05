import { describe, expect, it } from 'vitest';
import { fromSuperadminBillingPlansMinorUnits, toSuperadminBillingPlansMinorUnits } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/utils/SuperadminBillingPlansManagementMoneyUtils';

describe('SuperadminBillingPlansMoneyUtils', () => {
  it('converts INR major units to minor units and back', () => {
    expect(toSuperadminBillingPlansMinorUnits(4999, 'INR')).toBe(499900);
    expect(fromSuperadminBillingPlansMinorUnits(499900, 'INR')).toBe(4999);
  });
  it('uses the currency exponent for zero- and three-decimal currencies', () => {
    expect(toSuperadminBillingPlansMinorUnits(1234, 'JPY')).toBe(1234);
    expect(toSuperadminBillingPlansMinorUnits(1.234, 'KWD')).toBe(1234);
    expect(fromSuperadminBillingPlansMinorUnits(1234, 'KWD')).toBe(1.234);
  });
  it('rejects non-finite and negative amounts', () => {
    expect(() => toSuperadminBillingPlansMinorUnits(Number.NaN)).toThrow(RangeError);
    expect(() => toSuperadminBillingPlansMinorUnits(-1)).toThrow(RangeError);
  });
});
