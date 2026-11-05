// RESPONSIBILITY: Runtime validation schemas for Manager Expenses API responses and form payloads.
import { z } from 'zod';

import { EXPENSE_STATUS_VALUES } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/constants/manager_expense_register_and_reporting_shared.constants';

/**
 * @description Provides the ManagerExpenseRegisterAndReportingSchema implementation for the expenses module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const calendarDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => {
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}, 'Expected a valid calendar date');
const dateTimeSchema = z.string().datetime({ offset: true });

export const managerExpenseSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  amount: z.number().int(),
  date: calendarDateSchema,
  status: z.enum(EXPENSE_STATUS_VALUES),
  referenceNo: z.string().optional(),
  notes: z.string().optional(),
  receiptUrl: z.string().optional(),
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema.optional(),
  vendorName: z.string().optional(),
  paymentMode: z.string().optional(),
  approvedBy: z.string().optional(),
  isRecurring: z.boolean().default(false),
  recurringFrequency: z.string().nullable().optional(),
  taxAmount: z.number().int().optional() });

export const managerExpensesListResponseSchema = z.object({
  expenses: z.array(managerExpenseSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number() });

export const managerExpenseStatsSchema = z.object({
  totalAmount: z.number().int(),
  paidAmount: z.number().int(),
  pendingAmount: z.number().int(),
  thisMonthAmount: z.number().int() });

export const managerExpenseDeleteResponseSchema = z.object({ id: z.string() });
