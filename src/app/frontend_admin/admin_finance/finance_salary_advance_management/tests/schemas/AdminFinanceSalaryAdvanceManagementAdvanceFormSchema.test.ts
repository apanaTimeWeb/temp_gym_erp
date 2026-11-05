// RESPONSIBILITY: Defines regression tests for AdminFinanceSalaryAdvanceManagementAdvanceFormSchema.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_salary_advance_management/tests/schemas/AdminFinanceSalaryAdvanceManagementAdvanceFormSchema.test.ts)

import { describe, expect, it } from 'vitest';
import { adminFinanceSalaryAdvanceManagementAdvanceFormSchema } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/schemas/AdminFinanceSalaryAdvanceManagementAdvanceFormSchema';

describe('AdminFinanceSalaryAdvanceManagementAdvanceFormSchema', () => {
  it('accepts a valid salary advance payload', () => {
    const result = adminFinanceSalaryAdvanceManagementAdvanceFormSchema.safeParse({ staffId: 'staff-1', amount: 5000, notes: 'Travel advance', paymentMode: 'UPI' });
    expect(result.success).toBe(true);
  });

  it('accepts paise-safe major values, not sub-paise amounts', () => {
    const base = { staffId: 'staff-1', notes: '', paymentMode: 'Cash' };
    for (const amount of [0.01, 1.15, 2.55, 100]) expect(adminFinanceSalaryAdvanceManagementAdvanceFormSchema.safeParse({ ...base, amount }).success).toBe(true);
    expect(adminFinanceSalaryAdvanceManagementAdvanceFormSchema.safeParse({ ...base, amount: 1.234 }).success).toBe(false);
  });

  it('rejects missing staff and non-positive amounts', () => {
    const result = adminFinanceSalaryAdvanceManagementAdvanceFormSchema.safeParse({ staffId: '', amount: 0, notes: '', paymentMode: 'Cash' });
    expect(result.success).toBe(false);
  });

  it('rejects a payment mode outside the shared option contract', () => {
    const result = adminFinanceSalaryAdvanceManagementAdvanceFormSchema.safeParse({ staffId: 'staff-1', amount: 500, notes: '', paymentMode: 'Crypto' });
    expect(result.success).toBe(false);
  });
});
