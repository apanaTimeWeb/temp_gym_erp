// RESPONSIBILITY: Defines feature-local TypeScript contracts for hr_management; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_salary_advance_management/types/AdminFinanceSalaryAdvanceManagementAdvanceFormTypes.ts)

import type { z } from 'zod';
import type { adminFinanceSalaryAdvanceManagementAdvanceFormSchema } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/schemas/AdminFinanceSalaryAdvanceManagementAdvanceFormSchema';

export type AdminFinanceSalaryAdvanceManagementAdvanceFormValues = z.infer<typeof adminFinanceSalaryAdvanceManagementAdvanceFormSchema>;
