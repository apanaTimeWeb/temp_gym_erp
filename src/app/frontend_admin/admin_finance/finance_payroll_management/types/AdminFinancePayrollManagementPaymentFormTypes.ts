// RESPONSIBILITY: Defines feature-local TypeScript contracts for hr_management; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_payroll_management/types/AdminFinancePayrollManagementPaymentFormTypes.ts)

import type { z } from 'zod';
import type { adminFinancePayrollManagementPaymentFormSchema } from '@/app/frontend_admin/admin_finance/finance_payroll_management/schemas/AdminFinancePayrollManagementPaymentFormSchema';

export type AdminFinancePayrollManagementPaymentFormValues = z.infer<typeof adminFinancePayrollManagementPaymentFormSchema>;
