// RESPONSIBILITY: Defines regression tests for useAdminFinancePayrollManagementPaymentModalForm.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_payroll_management/tests/hooks/useAdminFinancePayrollManagementPaymentModalForm.test.ts)

import { describe, expect, it } from 'vitest';
import { adminFinancePayrollManagementPaymentFormSchema } from '@/app/frontend_admin/admin_finance/finance_payroll_management/schemas/AdminFinancePayrollManagementPaymentFormSchema';

describe('AdminFinancePayrollManagement payment form contract', () => {
  it('rejects zero or negative payment amounts', () => {
    expect(adminFinancePayrollManagementPaymentFormSchema.safeParse({ amount: 0 }).success).toBe(false);
    expect(adminFinancePayrollManagementPaymentFormSchema.safeParse({ amount: -1 }).success).toBe(false);
  });
});
