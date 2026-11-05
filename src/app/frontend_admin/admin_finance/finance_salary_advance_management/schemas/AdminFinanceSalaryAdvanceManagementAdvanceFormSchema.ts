// RESPONSIBILITY: Owns Zod validation for the Admin Finance salary-advance submission form.
// DATA FLOW: API/form boundary → Zod schema → validated typed data or field-level errors → owning hook/view (admin_finance/finance_salary_advance_management/schemas/AdminFinanceSalaryAdvanceManagementAdvanceFormSchema.ts)

import { z } from 'zod';
import { ADMIN_FINANCE_SALARY_ADVANCE_MANAGEMENT_PAYMENT_MODE_VALUES } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/constants/AdminFinanceSalaryAdvanceManagementConstants';

export const adminFinanceSalaryAdvanceManagementAdvanceFormSchema = z.object({
  staffId: z.string().min(1, '__i18n:hr.validation.staffRequired'),
  amount: z.number().finite().positive({ message: '__i18n:hr.validation.advanceAmountMin' }).max(Number.MAX_SAFE_INTEGER / 100).refine((value) => /^\d+(?:\.\d{1,2})?$/.test(String(value)), { message: '__i18n:hr.validation.amountMaxTwoDecimals' }),
  notes: z.string().max(500, '__i18n:hr.validation.notesMax').optional(),
  paymentMode: z.enum(ADMIN_FINANCE_SALARY_ADVANCE_MANAGEMENT_PAYMENT_MODE_VALUES),
});


