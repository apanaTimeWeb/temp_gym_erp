// RESPONSIBILITY: Defines runtime validation schemas for hr_management; it does not determine server-owned business rules without a verified contract.
// DATA FLOW: API/form boundary → Zod schema → validated typed data or field-level errors → owning hook/view (admin_finance/finance_payroll_management/schemas/AdminFinancePayrollManagementPayrollFormSchema.ts)

import { z } from 'zod';

export const payrollFormSchema = z.object({
  staffId: z.string().min(1, '__i18n:hr.validation.staffRequired'),
  month: z.string().min(1, '__i18n:hr.validation.monthRequired'),
  amount: z.number().finite().min(0, '__i18n:hr.validation.amountNonNegative'),
  paidAmount: z.number().finite().min(0, '__i18n:hr.validation.paidAmountNonNegative'),
  notes: z.string().optional(),
}).refine((value) => value.paidAmount <= value.amount, {
  path: ['paidAmount'],
  message: '__i18n:hr.validation.paidAmountCannotExceedAmount',
});
