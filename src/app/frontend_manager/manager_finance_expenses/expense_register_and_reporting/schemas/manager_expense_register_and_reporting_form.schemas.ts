// RESPONSIBILITY: Defines validation rules for creating and editing expenses.
import { z } from 'zod';

import { EXPENSE_STATUS_VALUES } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/constants/manager_expense_register_and_reporting_shared.constants';

/**
 * @description Provides the ManagerExpenseRegisterAndReportingFormSchema implementation for the expenses module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const managerExpensesFormSchema = z.object({
  title: z.string().trim().min(2, 'Title is required'),
  category: z.string().trim().min(2, 'Category is required'),
  amount: z.number().finite().min(1, 'Amount must be greater than 0').max(1_000_000_000, 'Amount is too large'),
  date: z.string().date('Date is required'),
  status: z.enum(EXPENSE_STATUS_VALUES),
  referenceNo: z.string().optional(),
  notes: z.string().optional(),
  receiptUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});
