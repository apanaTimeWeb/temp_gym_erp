// RESPONSIBILITY: Defines runtime validation schemas for finance_branch_profit_and_loss; it does not determine server-owned business rules without a verified contract.
// DATA FLOW: API/form boundary → Zod schema → validated typed data or field-level errors → owning hook/view (admin_finance/finance_branch_profit_and_loss/schemas/AdminFinanceBranchProfitAndLossSchemas.ts)

import { z } from 'zod';
export const pnlPeriodSchema = z.enum(['THIS_MONTH', 'LAST_MONTH', 'Q1', 'Q2', 'Q3', 'Q4', 'THIS_YEAR']);
export const pnlStatusFilterSchema = z.enum(['ALL', 'PROFITABLE', 'BREAKEVEN', 'LOSS']);
export const pnlSortKeySchema = z.enum(['branchName', 'revenue', 'expenses', 'netProfit', 'marginPct']);
export const pnlSortDirectionSchema = z.enum(['asc', 'desc']);
export const branchPnlStatusSchema = z.enum(['PROFITABLE', 'BREAKEVEN', 'LOSS']);
export const branchRevenueBreakdownSchema = z.object({ memberships: z.number().int().nonnegative(), ptSessions: z.number().int().nonnegative(), products: z.number().int().nonnegative(), other: z.number().int().nonnegative() });
export const branchExpenseBreakdownSchema = z.object({ rent: z.number().int().nonnegative(), salaries: z.number().int().nonnegative(), utilities: z.number().int().nonnegative(), maintenance: z.number().int().nonnegative(), marketing: z.number().int().nonnegative() });
export const branchPnlRecordSchema = z.object({
  branchId: z.string(), branchName: z.string(), location: z.string(), revenue: z.number().int().nonnegative(), expenses: z.number().int().nonnegative(),
  netProfit: z.number().int(), marginPct: z.number().min(-100).max(100), status: branchPnlStatusSchema, momDelta: z.number(),
  revenueBreakdown: branchRevenueBreakdownSchema, expenseBreakdown: branchExpenseBreakdownSchema,
});
