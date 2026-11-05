import { z } from 'zod';

import { FINANCE_PAYMENT_METHOD_VALUES, FINANCE_PAYMENT_STATUS_VALUES } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/constants/manager_finance_payments_and_summary_shared.constants';

/**
 * @description Provides the ManagerFinancePaymentsAndSummarySchema implementation for the finance module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const paymentDateTimeSchema = z.string().datetime({ offset: true });

export const paymentStatusSchema = z.enum(FINANCE_PAYMENT_STATUS_VALUES);
export const paymentMethodSchema = z.enum(FINANCE_PAYMENT_METHOD_VALUES);

export const paymentSchema = z.object({
  id: z.string(),
  memberId: z.string(),
  amount: z.number().int(),
  method: paymentMethodSchema,
  status: paymentStatusSchema,
  notes: z.string().optional(),
  invoiceNumber: z.string(),
  receiptNumber: z.string().optional(),
  taxId: z.string().optional(),
  paidAt: paymentDateTimeSchema,
  gstAmount: z.number().int(),
  discountAmount: z.number().int(),
  couponCode: z.string().optional(),
  taxableAmount: z.number().int(),
  member: z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    plan: z.object({ name: z.string() }).optional() }).optional() });

export const financeSummarySchema = z.object({
  totalRevenue: z.number().int(),
  monthlyRevenue: z.number().int(),
  pendingAmount: z.number().int(),
  totalPayments: z.number().int().nonnegative(),
  gstCollected: z.number().int(),
  totalRefunds: z.number().int(),
  netRevenue: z.number().int(),
  revenueByMethod: z.record(paymentMethodSchema, z.number().int()),
  monthlyData: z.array(z.object({
    month: z.string(),
    revenue: z.number().int(),
    expenses: z.number().int().optional() })) });
