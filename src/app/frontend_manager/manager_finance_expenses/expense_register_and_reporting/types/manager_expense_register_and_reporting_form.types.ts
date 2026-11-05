import type { z } from 'zod';

import type { managerExpensesFormSchema } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/schemas/manager_expense_register_and_reporting_form.schemas';


export type ExpenseFormValues = z.infer<typeof managerExpensesFormSchema>;
/**
 * @description Provides the ManagerExpenseRegisterAndReportingFormTypes implementation for the expenses module.
 * @dependencies @/app/frontend_manager/manager_finance_expenses/manager_expenses_schemas/ManagerExpenseRegisterAndReportingFormSchema
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
