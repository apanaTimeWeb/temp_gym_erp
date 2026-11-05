// RESPONSIBILITY: Defines regression tests for AdminFinanceStaffDuesManagementDueFormSchema.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_staff_dues_management/tests/schemas/AdminFinanceStaffDuesManagementDueFormSchema.test.ts)

import { describe, expect, it } from 'vitest';
import { adminFinanceStaffDuesManagementDueFormSchema } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/schemas/AdminFinanceStaffDuesManagementDueFormSchema';

describe('AdminHrDueFormSchema', () => {
  it('accepts a valid due-payment payload', () => {
    const result = adminFinanceStaffDuesManagementDueFormSchema.safeParse({ staffId: 'staff-1', amount: 3500, notes: 'Monthly due', paymentMode: 'Bank Transfer' });
    expect(result.success).toBe(true);
  });

  it('accepts decimal-safe major amounts and rejects more than two decimals', () => {
    const base = { staffId: 'staff-1', notes: '', paymentMode: 'Cash' };
    for (const amount of [0.01, 1.15, 2.55, 35]) expect(adminFinanceStaffDuesManagementDueFormSchema.safeParse({ ...base, amount }).success).toBe(true);
    for (const amount of [1.234, 0.001]) expect(adminFinanceStaffDuesManagementDueFormSchema.safeParse({ ...base, amount }).success).toBe(false);
  });

  it('rejects zero amount and unsupported payment modes', () => {
    const result = adminFinanceStaffDuesManagementDueFormSchema.safeParse({ staffId: 'staff-1', amount: 0, notes: '', paymentMode: 'Wallet' });
    expect(result.success).toBe(false);
  });

  it('rejects a payment mode outside the shared option contract', () => {
    const result = adminFinanceStaffDuesManagementDueFormSchema.safeParse({ staffId: 'staff-1', amount: 500, notes: '', paymentMode: 'Crypto' });
    expect(result.success).toBe(false);
  });
});
