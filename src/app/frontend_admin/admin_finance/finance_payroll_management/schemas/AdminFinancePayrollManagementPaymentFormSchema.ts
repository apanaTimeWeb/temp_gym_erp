// RESPONSIBILITY: Defines runtime validation schemas for hr_management; it does not determine server-owned business rules without a verified contract.
// DATA FLOW: API/form boundary → Zod schema → validated typed data or field-level errors → owning hook/view (admin_finance/finance_payroll_management/schemas/AdminFinancePayrollManagementPaymentFormSchema.ts)

import { z } from 'zod';

/**
 * @description Validates the payroll payment amount before the mutation boundary.
 * @dependencies Zod only.
 * @edge-case Rejects zero, negative, non-integer, and non-finite payment amounts.
 */
export const adminFinancePayrollManagementPaymentFormSchema = z.object({ amount: z.number().finite().positive().max(Number.MAX_SAFE_INTEGER / 100) });

