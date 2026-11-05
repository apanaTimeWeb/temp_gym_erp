import { describe, expect, it } from 'vitest';
import { createSuperadminBillingCouponsFormSchema } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/schemas/superadmin_billing_coupons_management_contract.schemas';

describe('coupon expiry date-only validation', () => {
  const schema = createSuperadminBillingCouponsFormSchema({
    codeMin: 'min', codeMax: 'max', codeFormat: 'format', discountTypeRequired: 'type',
    discountPositive: 'positive', maxUsesInteger: 'integer', maxUsesMinimum: 'minimum',
    expiryRequired: 'required', expiryFuture: 'future', percentageMax: 'percentage',
  });
  const base = { code: 'SAVE10', discountType: 'PERCENTAGE' as const, discountValue: 10, maxUses: 10 };

  it('accepts the current browser-local calendar date, matching the date input min value', () => {
    const now = new Date();
    const localToday = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    expect(schema.safeParse({ ...base, expiryDate: localToday }).success).toBe(true);
  });

  it('rejects impossible calendar dates and dates before local today', () => {
    expect(schema.safeParse({ ...base, expiryDate: '2026-02-30' }).success).toBe(false);
    const now = new Date(); now.setDate(now.getDate() - 1);
    const yesterday = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    expect(schema.safeParse({ ...base, expiryDate: yesterday }).success).toBe(false);
  });
});
